import React, { ReactNode, useEffect } from 'react';
import { useBotProtection, useSecurityMonitoring } from '@/hooks/useSecurity';
import { SECURITY_HEADERS } from '@/config/security';

interface SecurityWrapperProps {
  children: ReactNode;
}

const SecurityWrapper: React.FC<SecurityWrapperProps> = ({ children }) => {
  const { isBot, isBlocked } = useBotProtection();
  const { logSecurityEvent } = useSecurityMonitoring();

  useEffect(() => {
    // Set security headers (for client-side, mainly for documentation)
    // Note: Real security headers should be set by the server
    if (typeof document !== 'undefined') {
      // Add CSP meta tag if not already present
      const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      if (!existingCSP) {
        const cspMeta = document.createElement('meta');
        cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
        cspMeta.setAttribute('content', SECURITY_HEADERS['Content-Security-Policy']);
        document.head.appendChild(cspMeta);
      }
    }

    // Log security initialization
    logSecurityEvent('Security system initialized');

    // Detect and prevent common attacks
    const preventRightClick = (e: MouseEvent) => {
      if (isBot) {
        e.preventDefault();
        logSecurityEvent('Right-click blocked for suspicious user');
      }
    };

    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      // Block common developer tools shortcuts for bots
      if (isBot && (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
        e.key === 'F12'
      )) {
        e.preventDefault();
        logSecurityEvent('Developer tools access blocked for suspicious user');
      }
    };

    if (isBot) {
      document.addEventListener('contextmenu', preventRightClick);
      document.addEventListener('keydown', preventKeyboardShortcuts);
    }

    return () => {
      document.removeEventListener('contextmenu', preventRightClick);
      document.removeEventListener('keydown', preventKeyboardShortcuts);
    };
  }, [isBot, logSecurityEvent]);

  // Block access for detected malicious bots
  if (isBlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">
            Your request has been blocked for security reasons.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SecurityWrapper;
