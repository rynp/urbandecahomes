type AnalyticsEvent =
  | { name: 'project_view'; params: { project_slug: string; project_name: string } }
  | { name: 'inquiry_cta_click'; params: { location_source: string; project_preference?: string } }
  | { name: 'phone_click'; params: { phone_number: string; location_source: string } }
  | { name: 'messaging_click'; params: { channel: 'viber' | 'whatsapp'; location_source: string } }
  | { name: 'viewing_request_start'; params: { project_slug?: string } }
  | { name: 'viewing_request_success'; params: { project_slug: string } }
  | { name: 'inquiry_submit_success'; params: { project: string; financing_preference: string } }
  | { name: 'inquiry_submit_error'; params: { error_field?: string } }
  | { name: 'calculator_use'; params: { tcp: number; term_years: number } }
  | { name: 'unit_comparison_filter'; params: { category: string } };

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  try {
    // 1. Google Analytics 4 (if configured)
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', event.name, event.params);
    }

    // 2. Dispatch custom event for extensible client listeners
    const customEvent = new CustomEvent('udh_analytics', {
      detail: event,
    });
    window.dispatchEvent(customEvent);

    // Development logging without sensitive data
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics Event: ${event.name}]`, event.params);
    }
  } catch (err) {
    // Silent catch so analytics never interrupts user experience
  }
}
