import React, { ReactNode, useEffect, useCallback, useRef } from 'react';
import { useBotProtection, useSecurityMonitoring } from '@/hooks/useSecurity';

interface SecurityWrapperProps {
  children: ReactNode;
}

const SecurityWrapper: React.FC<SecurityWrapperProps> = ({ children }) => {
  const { isBot, isBlocked } = useBotProtection();
  const { logSecurityEvent } = useSecurityMonitoring();
  const initialized = useRef(false);

  // Memoized event handlers to prevent unnecessary re-renders
  const preventRightClick = useCallback((e: MouseEvent) => {
    if (isBot) {
      e.preventDefault();
      // Only log in development mode to reduce noise
      if (process.env.NODE_ENV === 'development') {
        logSecurityEvent('Right-click blocked for suspicious user');
      }
    }
  }, [isBot, logSecurityEvent]);

  const preventKeyboardShortcuts = useCallback((e: KeyboardEvent) => {
    // Block common developer tools shortcuts for bots
    if (isBot && (
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
      e.key === 'F12'
    )) {
      e.preventDefault();
      // Only log in development mode to reduce noise
      if (process.env.NODE_ENV === 'development') {
        logSecurityEvent('Developer tools access blocked for suspicious user');
      }
    }
  }, [isBot, logSecurityEvent]);

  useEffect(() => {
    // Initialize security only once
    if (!initialized.current) {
      initialized.current = true;
      
      // Log security initialization only in development
      if (process.env.NODE_ENV === 'development') {
        logSecurityEvent('Security system initialized');
      }
    }

    // Add event listeners only for detected bots
    if (isBot) {
      document.addEventListener('contextmenu', preventRightClick, { passive: false });
      document.addEventListener('keydown', preventKeyboardShortcuts, { passive: false });
    }

    return () => {
      if (isBot) {
        document.removeEventListener('contextmenu', preventRightClick);
        document.removeEventListener('keydown', preventKeyboardShortcuts);
      }
    };
  }, [isBot, preventRightClick, preventKeyboardShortcuts, logSecurityEvent]);

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
            If you believe this is an error, please contact support..
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SecurityWrapper;
