import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  sanitizeText,
  escapeFormulaInjection,
  submitToGoogleSheet,
  RawLeadPayload,
  SanitizedLead,
} from '@/lib/leadsSecurity';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    endpoint: 'Urban Deca Homes Inquiries & Site Tour Ingestion API',
    security: ['rate-limiting', 'anti-formula-injection', 'honeypot-shield', 'privacy-consent-enforcement'],
  });
}

export async function POST(req: NextRequest) {
  try {
    // 1. Client IP Extraction & Sliding-Window Rate Limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = (forwarded ? forwarded.split(',')[0].trim() : realIp) || '127.0.0.1';

    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many submissions detected from this device. Please wait a few minutes or call our sales hotline directly.',
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload
    const body: RawLeadPayload = await req.json();

    // 3. Spam Honeypot Detection
    if (body.honeypot && body.honeypot.trim().length > 0) {
      // Silently return success to mislead bots without recording spam in the Google Sheet
      return NextResponse.json({
        success: true,
        message: 'Inquiry received successfully.',
      });
    }

    // 4. Privacy Consent Verification (RA 10173 Philippine Data Privacy Act)
    if (body.privacyAgreed === false) {
      return NextResponse.json(
        {
          success: false,
          message: 'Data privacy consent is required in compliance with Philippine R.A. 10173.',
        },
        { status: 400 }
      );
    }

    // 5. Contact Input Sanitization & Validation
    const cleanFullName = sanitizeText(body.fullName, 100);
    const cleanMobile = sanitizeText(body.mobileNumber, 30);
    const cleanEmail = sanitizeText(body.email, 120);

    if (!cleanFullName || cleanFullName.length < 2) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    const digitsOnly = cleanMobile.replace(/\D/g, '');
    if (!digitsOnly || digitsOnly.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid mobile number with at least 10 digits (e.g. 0917-xxx-xxxx).' },
        { status: 400 }
      );
    }

    if (cleanEmail && !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 6. Project & Preference Sanitization with Formula Injection Shield
    const cleanProject = escapeFormulaInjection(sanitizeText(body.project || 'Manila', 60));
    const cleanType = escapeFormulaInjection(sanitizeText(body.type || 'Property Inquiry', 40));
    const cleanUnitOrDetails = escapeFormulaInjection(sanitizeText(body.unitOrDetails || 'Any Available Unit', 120));
    const cleanFinancing = escapeFormulaInjection(sanitizeText(body.financingScheme || 'Pag-IBIG Fund', 60));
    const cleanBuyerType = escapeFormulaInjection(sanitizeText(body.buyerType || 'Locally Employed', 60));
    const cleanPreferredContact = escapeFormulaInjection(sanitizeText(body.preferredContact || 'Viber', 30));
    const cleanNotes = escapeFormulaInjection(sanitizeText(body.notes || 'None provided', 600));
    const cleanSource = escapeFormulaInjection(sanitizeText(body.source || 'Website', 60));

    // 7. Format Timestamp in Philippine Time (PHT: UTC+8)
    const phtDateString = new Intl.DateTimeFormat('en-PH', {
      timeZone: 'Asia/Manila',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());

    const sanitizedLead: SanitizedLead = {
      timestamp: phtDateString,
      type: cleanType,
      project: cleanProject,
      fullName: escapeFormulaInjection(cleanFullName),
      mobileNumber: escapeFormulaInjection(cleanMobile),
      email: escapeFormulaInjection(cleanEmail || 'N/A'),
      preferredContact: cleanPreferredContact,
      unitOrDetails: cleanUnitOrDetails,
      financingScheme: cleanFinancing,
      buyerType: cleanBuyerType,
      notes: cleanNotes,
      source: cleanSource,
      status: 'New Lead',
    };

    // 8. Submit to Google Sheets (with automatic local file persistence)
    const result = await submitToGoogleSheet(sanitizedLead);

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (err: any) {
    console.error('[API /api/inquiries] Unexpected error:', err);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred while transmitting your inquiry. Please call our hotline.',
      },
      { status: 500 }
    );
  }
}

