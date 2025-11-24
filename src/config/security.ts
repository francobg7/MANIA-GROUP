import DOMPurify from 'dompurify';

// Security configuration constants
export const SECURITY_CONFIG = {
  // Content Security Policy
  CSP_DIRECTIVES: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'", // Required for Vite dev mode
      'https://fonts.googleapis.com',
      'https://www.google-analytics.com',
      'https://*.googletagmanager.com'
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for CSS-in-JS
      'https://fonts.googleapis.com'
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'blob:'
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com'
    ],
    'connect-src': [
      "'self'",
      'https://*.googleapis.com',
      'https://*.google-analytics.com'
    ],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"]
  },
  
  // Rate limiting configuration
  RATE_LIMITS: {
    SEARCH: { max: 10, window: 60000 }, // 10 requests per minute
    FORM_SUBMIT: { max: 5, window: 300000 }, // 5 submissions per 5 minutes
    API_CALLS: { max: 100, window: 60000 } // 100 API calls per minute
  },
  
  // Input validation patterns
  VALIDATION_PATTERNS: {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^[+]?[1-9][\d]{0,15}$/,
    NAME: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{2,50}$/,
    SEARCH_QUERY: /^[a-zA-Z0-9\s_áéíóúñÑ-]{1,100}$/,
    PRODUCT_ID: /^[a-zA-Z0-9_-]{1,50}$/,
    QUANTITY: /^[1-9]\d{0,2}$/ // 1-999
  }
};

// DOMPurify configuration
export const SANITIZE_CONFIG = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'span'],
  ALLOWED_ATTR: ['class'],
  KEEP_CONTENT: true,
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
};

// Sanitization functions
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input.trim(), SANITIZE_CONFIG);
};

export const sanitizeHTML = (html: string): string => {
  if (typeof html !== 'string') return '';
  return DOMPurify.sanitize(html, SANITIZE_CONFIG);
};

// Input validation functions
export const validateInput = (input: string, type: keyof typeof SECURITY_CONFIG.VALIDATION_PATTERNS): boolean => {
  if (!input || typeof input !== 'string') return false;
  const pattern = SECURITY_CONFIG.VALIDATION_PATTERNS[type];
  return pattern.test(input.trim());
};

export const validateAndSanitize = (input: string, type: keyof typeof SECURITY_CONFIG.VALIDATION_PATTERNS): string | null => {
  const sanitized = sanitizeInput(input);
  if (!validateInput(sanitized, type)) {
    return null;
  }
  return sanitized;
};

// Rate limiting implementation (client-side)
class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  isAllowed(key: string, limit: { max: number; window: number }): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < limit.window);
    
    if (validRequests.length >= limit.max) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }

  reset(key: string): void {
    this.requests.delete(key);
  }
}

export const rateLimiter = new RateLimiter();

// Security headers for deployment
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Content-Security-Policy': Object.entries(SECURITY_CONFIG.CSP_DIRECTIVES)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ')
};

// Bot detection patterns
export const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python/i,
  /java/i,
  /go-http-client/i
];

export const detectBot = (userAgent: string): boolean => {
  if (!userAgent) return true; // No user agent = suspicious
  return BOT_PATTERNS.some(pattern => pattern.test(userAgent));
};

// URL validation and sanitization
export const validateURL = (url: string): boolean => {
  try {
    const urlObj = new URL(url, window.location.origin);
    // Only allow same origin or specific allowed domains
    const allowedDomains = ['maniagroup.com.py', 'www.maniagroup.com.py'];
    return allowedDomains.includes(urlObj.hostname) || urlObj.hostname === window.location.hostname;
  } catch {
    return false;
  }
};

export const sanitizeURL = (url: string): string => {
  if (!validateURL(url)) {
    return '/'; // Redirect to home if invalid
  }
  return url;
};
