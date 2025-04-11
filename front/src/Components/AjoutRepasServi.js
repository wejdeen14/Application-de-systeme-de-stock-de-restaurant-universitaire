import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AjoutRepasServi() {
    const [nbEtudient, setNbEtudient] = useState('');
    const [nbAgent, setNbAgent] = useState('');
    const [nbouvrier, setNbouvrier] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const {idrepas}=useParams();
    const [repas,setRepas]=useState('');
    const [totalRepasServis, setTotalRepasServis] = useState(0); // Nouvel état pour le total de repas servis
    const [dateServi,setdateServi]=useState('');
    const Ajoutrepas = () => {
        // Calcul du nombre total de repas servis
        const totalRepas = parseInt(nbAgent) + parseInt(nbouvrier) + parseInt(nbEtudient);
        setTotalRepasServis(totalRepas); // Mettre à jour le total de repas servis

        const formattedDate = new Date(dateServi).toISOString().split('T')[0];
        const data = {
            dateServi: formattedDate,
            nbEtudient: nbEtudient,
            nbAgent: nbAgent,
            nbouvrier: nbouvrier,
            repaservi: totalRepas,
        };
        
        if (idrepas) {
            // Si l'ID existe, cela signifie que vous effectuez une mise à jour
            axios.put(`http://localhost:8080/repas/updaterepas/${idrepas}`, data)
                .then(response => {
                    console.log(response.data);
                    setRepas(response.data);
                    setNbEtudient('');
                    setNbAgent('');
                    setNbouvrier('');
                    
                    setSuccessMessage('Les données du repas ont été mises à jour avec succès.');
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 3000);
                })
                .catch(error => {
                    console.error('Erreur lors de la mise à jour des données du repas :', error);
                });
        } else {
            axios.post("http://localhost:8080/repas/Ajoutrepas", data)
                .then(response => {
                    console.log(response.data);
                    // Réinitialisation des champs après l'envoi
                    setNbEtudient('');
                    setNbAgent('');
                    setNbouvrier('');
                    // Afficher le message de succès
                    setSuccessMessage('La requête a été envoyée avec succès.');
                    // Effacer le message après quelques secondes
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 3000);
                })
                .catch(error => {
                    console.error(error);
                    alert('Une erreur s\'est produite lors de l\'enregistrement des données. Veuillez réessayer.');
                });
        }
    };
    const handleDate = (e) => {
        const selectedDate = e.target.value; 
        setdateServi(selectedDate); 
        axios.get(`http://localhost:8080/repas/verifyDate/${selectedDate}`)
            .then(response => {
                if (response.data.exists) {
                    
                    alert("Une entrée avec cette date existe déjà. Veuillez choisir une autre date.");
                }
            })
            .catch(error => {
                console.error('Erreur lors de la vérification de la date :', error);
            });
    };
    
    useEffect(() => {
        axios.get(`http://localhost:8080/repas/${idrepas}`)
            .then(response => {
                setNbAgent(response.data.nbAgent);
                setNbEtudient(response.data.nbEtudient);
                setNbouvrier(response.data.nbouvrier);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données du repas :', error);
            });
    }, [idrepas]);

    return (
        <div style={{ marginTop: '20px' }}>
            <form className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
                <h1 className="text-blue-900 text-center ml-8" style={{ fontFamily: 'poppins', marginTop: '-100', marginBottom: '30px', letterSpacing: '2px', textAlign: 'center', textTransform: 'uppercase', fontSize: '25px', fontWeight: 'bold' }}>
                    Repas servi par jour 
                </h1>
                <div className="mb-4">
                    <label htmlFor="daterepas" className="block text-sm font-medium text-gray-700">
                       date de repas servi
                    </label>
                    <input
                        type="date"
                        id="dateServi"
                        value={dateServi}
                     
                        onChange={handleDate}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="nbEtudient" className="block text-sm font-medium text-gray-700">
                        Nombre étudiants
                    </label>
                    <input
                        type="number"
                        id="nbEtudient"
                        value={nbEtudient}
                        onChange={(e) => setNbEtudient(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="nbAgent" className="block text-sm font-medium text-gray-700">
                        Nombre agents
                    </label>
                    <input
                        type="number"
                        id="nbAgent"
                        value={nbAgent}
                        onChange={(e) => setNbAgent(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="nbouvrier" className="block text-sm font-medium text-gray-700">
                        Nombre ouvriers
                    </label>
                    <input
                        type="number"
                        id="nbouvrier"
                        value={nbouvrier}
                        onChange={(e) => setNbouvrier(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>
                {successMessage && (
                    <div className="text-green-700">{successMessage}</div>
                )}

                <button
                    onClick={Ajoutrepas}
                    className="w-full py-3 bg-blue-900 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Calcul 
                </button>

                {/* Affichage du nombre total de repas servis */}
                {totalRepasServis > 0 && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre total de repas servis :
                        </label>
                        <span className="text-lg font-bold text-blue-900">{totalRepasServis}</span>
                    </div>
                )}
            </form>
        </div>
    );
};

export default AjoutRepasServi;
