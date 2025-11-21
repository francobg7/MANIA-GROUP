import React from 'react';
import { AlertTriangle } from 'lucide-react';

const VapeDisclaimer: React.FC = () => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-8">
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="space-y-2 text-sm text-red-800">
          <p className="font-semibold">
            ADVERTENCIA SANITARIA - PRODUCTOS DE VAPEO
          </p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Este producto contiene nicotina, una sustancia altamente adictiva</li>
            <li>Solo para uso de adultos mayores de 18 años</li>
            <li>No debe ser usado por mujeres embarazadas o en período de lactancia</li>
            <li>No debe ser usado por personas con problemas cardíacos</li>
            <li>Mantener fuera del alcance de niños y mascotas</li>
            <li>Los productos de vapeo no son un método para dejar de fumar</li>
          </ul>
          <p className="text-xs mt-2 opacity-80">
            El vapeo puede causar daños graves a la salud. Consulte a su médico antes de usar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VapeDisclaimer;
