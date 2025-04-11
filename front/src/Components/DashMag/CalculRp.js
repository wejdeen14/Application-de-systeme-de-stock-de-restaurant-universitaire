import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CalculRepas = () => {
    const [repasservis, setRepasservis] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [repaservi, setRepaservi] = useState('');
    const [montantjour, setMontantjour] = useState('');
    const [coutrepas,setCoutrepas]=useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const fetchRepasservis = async () => {
        try {
            const response = await axios.get('http://localhost:8080/repas/dates');
            const repasData = response.data.map((date, index) => ({ id: index, date: date }));
            setRepasservis(repasData);
        } catch (error) {
            console.error('Erreur lors de la récupération des dates de repas :', error);
        }
    };

    const handleDateChange = async (id) => {
        const selectedRepas = repasservis.find(repas => repas.id === id);
        if (selectedRepas) {
            const date = selectedRepas.date;
            setSelectedDate(date);
            try {
                const repasResponse = await axios.get(`http://localhost:8080/repas/details/${date}`);
                const montantResponse = await axios.get(`http://localhost:8080/calcul/MontantTotalParJour/${date}`);
                setRepaservi(repasResponse.data); 
                setMontantjour(montantResponse.data); 
                console.log(repasResponse.data);
            } catch (error) {
                console.error('Erreur lors de la récupération du repaservi :', error);
            }
        }
    };

    useEffect(() => {
        fetchRepasservis();
    }, []);
    const handleSubmit = async () => {
        const totalRepas = (montantjour/repaservi);
        setCoutrepas(totalRepas);
        console.log(totalRepas);
     
        const data = [{
            dateRepas: selectedDate,
            montantjour: montantjour,
            coutrepas: totalRepas.toFixed(2),
            user: {
                nombreuser: repaservi
            }
        }];

        try {
            const response = await axios.post('http://localhost:8080/calcul/ajoutcalcul', data);
            console.log('Réponse de l\'API :', response.data);
            fetchRepasservis();
            setSuccessMessage('La requête a été envoyée avec succès.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données :', error);
        }
       
    };
    
    
    
    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">Calcul Coût Repas</h1>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateRepas">
                        Sélectionner une date de repas :
                    </label>
                    <select
                        id="dateRepas"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        value={selectedDate !== null ? selectedDate : ''}
                        onChange={(e) => {
                            const id = parseInt(e.target.value);
                            handleDateChange(id);
                        }}
                    >
                        <option value="">Sélectionner une date</option>
                        {repasservis.map((repas) => (
                            <option key={repas.id} value={repas.id}>{repas.date}</option>
                        ))}
                    </select>
                </div>

                {selectedDate ? (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repaservi">
                                Repaservi pour la date sélectionnée :
                            </label>
                            <input
                                id="repaservi"
                                type="text"
                                value={repaservi}
                                readOnly
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="montantjour">
                                Montant dejour sortie pour la date sélectionnée :
                            </label>
                            <input
                                id="montantjour"
                                type="text"
                                value={montantjour}
                                readOnly
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>
                     
                    </>
                ) : null}

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Calcul 
                </button>
                {coutrepas > 0 && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                           Cout de repas servi par jour :
                        </label>
                        <span className="text-lg font-bold text-blue-900">{coutrepas}</span>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CalculRepas;
