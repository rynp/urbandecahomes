/**
 * Urban Deca Homes - Official Google Sheet Lead Ingestion Webhook
 * Spreadsheet: https://docs.google.com/spreadsheets/d/153fJoO96C1jlFwU6-IGo1U2DFTlfzvB8JNL6CdV5ODM/edit
 *
 * HOW TO INSTALL IN YOUR GOOGLE SHEET:
 * 1. Open your Google Sheet in your browser.
 * 2. Click "Extensions" > "Apps Script".
 * 3. Delete any default code in Code.gs and replace it with this entire script.
 * 4. Click the blue "Deploy" button (top right) > "New deployment".
 * 5. Click the gear icon next to "Select type" and select "Web app".
 * 6. Set:
 *    - Description: "Deca Homes Lead Ingestion Webhook"
 *    - Execute as: "Me (your-email@gmail.com)"
 *    - Who has access: "Anyone"
 * 7. Click "Deploy" and authorize access when prompted.
 * 8. Copy the generated "Web app URL" (starts with https://script.google.com/macros/s/...)
 * 9. Paste that URL into your decahomes/.env.local as GOOGLE_SHEET_WEBHOOK_URL.
 */

// Shared secret key matching GOOGLE_SHEET_SECRET_TOKEN in .env.local
const SECRET_TOKEN = "decahomes-secure-leads-2026";
const SHEET_NAME = "Inquiries & Site Tours";
const SPREADSHEET_ID = "153fJoO96C1jlFwU6-IGo1U2DFTlfzvB8JNL6CdV5ODM";

function getSpreadsheet() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss && ss.getId()) return ss;
  } catch (err) {
    // If running as standalone script, fallback to openById
  }
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var lock = LockService.getScriptLock();
  // Acquire write lock to prevent race condition row overwrites
  try {
    lock.waitLock(15000);
  } catch (err) {
    return jsonResponse({ status: "error", message: "Server busy, please retry" }, 429);
  }

  try {
    if (!e) {
      return jsonResponse({ status: "error", message: "Empty request payload" }, 400);
    }

    var payload = {};

    if (e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        payload = e.parameter || {};
      }
    } else if (e.parameter) {
      payload = e.parameter;
    }

    // Security Verification: Secret token validation
    var token = payload.token || (e.parameter && e.parameter.token);
    if (token !== SECRET_TOKEN) {
      return jsonResponse({ status: "unauthorized", message: "Invalid security token" }, 401);
    }

    var lead = payload.lead || payload;
    if (!lead || (!lead.fullName && !lead.mobileNumber)) {
      return jsonResponse({ status: "error", message: "Missing required contact details" }, 400);
    }

    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // If the tab doesn't exist, create it with styled headers
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      initializeHeaders(sheet);
    } else if (sheet.getLastRow() === 0) {
      initializeHeaders(sheet);
    }

    // Anti-Formula Injection sanitizer for spreadsheet cells
    function sanitizeCell(val) {
      if (val === null || val === undefined) return "";
      var str = String(val).trim();
      // If starts with =, +, -, @, or tab, prepend a single quote to prevent execution
      if (/^[=+\-@\t\r]/.test(str)) {
        return "'" + str;
      }
      return str;
    }

    var timestamp = Utilities.formatDate(new Date(), "Asia/Manila", "yyyy-MM-dd HH:mm:ss");

    var row = [
      sanitizeCell(lead.timestamp || timestamp),              // Column A: Date & Time (PHT)
      sanitizeCell(lead.type || "Property Inquiry"),          // Column B: Inquiry Type
      sanitizeCell(lead.project || "General"),                // Column C: Project
      sanitizeCell(lead.fullName || ""),                      // Column D: Customer Name
      sanitizeCell(lead.mobileNumber || ""),                  // Column E: Phone Number
      sanitizeCell(lead.email || "N/A"),                      // Column F: Email Address
      sanitizeCell(lead.preferredContact || "Viber"),         // Column G: Preferred Channel
      sanitizeCell(lead.unitOrDetails || "Any Available"),    // Column H: Unit Type / Tour Date
      sanitizeCell(lead.financingScheme || "Pag-IBIG"),       // Column I: Financing Scheme
      sanitizeCell(lead.buyerType || "Locally Employed"),     // Column J: Buyer Classification
      sanitizeCell(lead.notes || "None"),                     // Column K: Inquiries / Notes
      sanitizeCell(lead.source || "Website"),                 // Column L: Source Page
      sanitizeCell(lead.status || "New Lead")                 // Column M: CRM Status
    ];

    sheet.appendRow(row);

    // Highlight newest row status cell with soft green badge
    var newRowIndex = sheet.getLastRow();
    var statusCell = sheet.getRange(newRowIndex, 13);
    statusCell.setBackground("#E8F5E9")
              .setFontColor("#1B5E20")
              .setFontWeight("bold")
              .setHorizontalAlignment("center");

    return jsonResponse({
      status: "success",
      message: "Lead recorded in Google Sheet",
      row: newRowIndex
    }, 200);

  } catch (error) {
    return jsonResponse({
      status: "error",
      message: error.toString()
    }, 500);
  } finally {
    lock.releaseLock();
  }
}

function initializeHeaders(sheet) {
  var headers = [
    "Timestamp (PHT)",
    "Lead Type",
    "Project",
    "Full Name",
    "Contact Number",
    "Email Address",
    "Preferred Channel",
    "Unit / Tour Details",
    "Target Financing",
    "Buyer Profile",
    "Notes & Special Requests",
    "Lead Source",
    "Lead Status"
  ];

  sheet.appendRow(headers);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#3E1C15"); // Urban Deca Burgundy
  headerRange.setFontColor("#FAF0C8");  // Warm Champagne Gold
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);

  // Set readable column widths
  sheet.setColumnWidth(1, 155); // Timestamp
  sheet.setColumnWidth(2, 130); // Lead Type
  sheet.setColumnWidth(3, 150); // Project
  sheet.setColumnWidth(4, 180); // Full Name
  sheet.setColumnWidth(5, 140); // Phone Number
  sheet.setColumnWidth(6, 190); // Email
  sheet.setColumnWidth(7, 130); // Preferred Channel
  sheet.setColumnWidth(8, 210); // Unit / Tour Details
  sheet.setColumnWidth(9, 150); // Target Financing
  sheet.setColumnWidth(10, 160); // Buyer Profile
  sheet.setColumnWidth(11, 280); // Notes & Special Requests
  sheet.setColumnWidth(12, 150); // Lead Source
  sheet.setColumnWidth(13, 120); // Lead Status
}

function jsonResponse(obj, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

