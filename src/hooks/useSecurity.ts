import { useEffect, useState, useCallback } from 'react';
import { rateLimiter, SECURITY_CONFIG, detectBot, validateAndSanitize } from '@/config/security';

// Hook for bot detection and blocking
export const useBotProtection = () => {
  const [isBot, setIsBot] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const botDetected = detectBot(userAgent);
    
    if (botDetected) {
      setIsBot(true);
      // Log suspicious activity
      console.warn('Potential bot detected:', userAgent);
      
      // Block after multiple bot-like behaviors
      const botKey = `bot_${userAgent.slice(0, 20)}`;
      if (!rateLimiter.isAllowed(botKey, { max: 3, window: 300000 })) {
        setIsBlocked(true);
      }
    }
  }, []);

  return { isBot, isBlocked };
};

// Hook for rate limiting
export const useRateLimit = (key: string, limitType: keyof typeof SECURITY_CONFIG.RATE_LIMITS) => {
  const [isLimited, setIsLimited] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState(0);

  const checkLimit = useCallback(() => {
    const limit = SECURITY_CONFIG.RATE_LIMITS[limitType];
    const allowed = rateLimiter.isAllowed(key, limit);
    
    if (!allowed) {
      setIsLimited(true);
      setRemainingRequests(0);
      return false;
    }
    
    setIsLimited(false);
    // This is a simplified calculation
    setRemainingRequests(limit.max - 1);
    return true;
  }, [key, limitType]);

  const resetLimit = useCallback(() => {
    rateLimiter.reset(key);
    setIsLimited(false);
  }, [key]);

  return { isLimited, remainingRequests, checkLimit, resetLimit };
};

// Hook for input validation and sanitization
export const useSecureInput = () => {
  const sanitizeAndValidate = useCallback((
    input: string, 
    type: keyof typeof SECURITY_CONFIG.VALIDATION_PATTERNS
  ): { isValid: boolean; sanitized: string | null; error?: string } => {
    if (!input || typeof input !== 'string') {
      return { isValid: false, sanitized: null, error: 'Input is required' };
    }

    const result = validateAndSanitize(input, type);
    
    if (result === null) {
      return { 
        isValid: false, 
        sanitized: null, 
        error: `Invalid ${type.toLowerCase()} format` 
      };
    }

    return { isValid: true, sanitized: result };
  }, []);

  const sanitizeQuantity = useCallback((value: string): number => {
    const sanitized = validateAndSanitize(value, 'QUANTITY');
    if (!sanitized) return 1;
    
    const num = parseInt(sanitized, 10);
    return Math.min(Math.max(num, 1), 999); // Clamp between 1-999
  }, []);

  return { sanitizeAndValidate, sanitizeQuantity };
};

// Hook for secure navigation
export const useSecureNavigation = () => {
  const navigate = useCallback((url: string) => {
    // Validate URL before navigation
    try {
      const urlObj = new URL(url, window.location.origin);
      
      // Check if it's a safe internal navigation
      if (urlObj.origin === window.location.origin) {
        window.location.href = url;
        return true;
      }
      
      // For external links, open in new tab with security
      window.open(url, '_blank', 'noopener,noreferrer');
      return true;
    } catch {
      console.warn('Invalid navigation URL:', url);
      return false;
    }
  }, []);

  return { navigate };
};

// Security context and monitoring
export const useSecurityMonitoring = () => {
  const [securityEvents, setSecurityEvents] = useState<string[]>([]);

  const logSecurityEvent = useCallback((event: string) => {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp}: ${event}`;
    
    setSecurityEvents(prev => [...prev.slice(-9), logEntry]); // Keep last 10 events
    console.warn('Security Event:', logEntry);
  }, []);

  const clearSecurityLogs = useCallback(() => {
    setSecurityEvents([]);
  }, []);

  return { securityEvents, logSecurityEvent, clearSecurityLogs };
};
