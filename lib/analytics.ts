// Google Analytics 4 Event Tracking

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
  }
}

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_title: title,
      page_location: url,
    })
  }
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track conversions
export const trackConversion = (conversionId: string, value?: number, currency = 'EUR') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
      currency: currency,
    })
  }
}

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean = true) => {
  trackEvent(success ? 'form_submit_success' : 'form_submit_error', 'engagement', formName)
}

// Track quote requests
export const trackQuoteRequest = (route: string, aircraft?: string) => {
  trackEvent('quote_request', 'conversion', `${route}_${aircraft}`)
}

// Track booking attempts
export const trackBookingAttempt = (offerId: string, amount: number) => {
  trackEvent('booking_attempt', 'conversion', offerId, amount)
}

// Track phone clicks
export const trackPhoneClick = () => {
  trackEvent('phone_click', 'engagement', 'header_phone')
}

// Track WhatsApp clicks
export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', 'engagement', 'floating_button')
}
