import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, AlertTriangle } from 'lucide-react';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerified: () => void;
  onDeclined: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({
  isOpen,
  onVerified,
  onDeclined,
}) => {
  const [error, setError] = useState('');

  const handleConfirmAge = () => {
    // Store verification in localStorage with expiration
    const verification = {
      verified: true,
      timestamp: Date.now(),
      expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };
    localStorage.setItem('vapeAgeVerification', JSON.stringify(verification));
    onVerified();
  };

  const handleDenyAge = () => {
    setError('Debes ser mayor de 18 años para acceder a productos de vapeo.');
    setTimeout(() => {
      onDeclined();
    }, 2000);
  };



  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
            <Shield className="h-8 w-8 text-orange-600" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            Verificación de Edad
          </DialogTitle>
          <DialogDescription className="text-base">
            Este sitio web contiene productos de vapeo y nicotina destinados únicamente para adultos.
          </DialogDescription>
        </DialogHeader>

        <Card className="border-orange-200">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2 text-orange-600">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">Solo para mayores de 18 años</span>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Confirmación de Edad
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Para acceder a productos de vapeo, debes confirmar que eres mayor de edad.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600 text-center">{error}</p>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  onClick={handleConfirmAge}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
                  size="lg"
                >
                  ✓ Sí, soy mayor de 18 años
                </Button>
                <Button
                  onClick={handleDenyAge}
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 py-6 text-lg"
                  size="lg"
                >
                  ✗ No, soy menor de 18 años
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center leading-relaxed bg-gray-50 p-3 rounded-md">
                Al confirmar tu edad, declaras que tienes al menos 18 años y que está
                legalmente autorizado para comprar productos de vapeo en tu jurisdicción.
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AgeVerificationModal;
