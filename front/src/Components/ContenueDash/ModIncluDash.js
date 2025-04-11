import React from 'react';
import CercleMod from './CercleMod';
import StateMod from './StateMod';
import Histogramme from './Histogramme';
export default function ModIncluDash() {
    const handleCreateMenu = () => {
        // Logique pour créer le menu du jour
        console.log('Créer le menu du jour...');
    };

    return (
        <div className="flex flex-col gap-4">
        <StateMod />
        <div className="flex flex-row gap-4 w-full">
            <Histogramme />
            <CercleMod />
        </div>
        
    </div>
    );
}
