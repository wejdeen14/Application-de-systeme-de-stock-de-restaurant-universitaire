import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import TabMag from './DashMag/TabMag';

function MagShowFor() {
    const [fournisseur, setFournisseur] = useState({});
    const { id_for } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/four/${id_for}`)
            .then((response) => {
                setFournisseur(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération du fournisseur :', error);
            });
    }, [id_for]);

    return (
        <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
        <TabMag/>
          <div className='flex-1'>
       <Header/>
       <div className='flex-1 grap-12 w-full mt-2'> 
    
                    <div className="container d-flex justify-content-center align-items-start" style={{ minHeight: "100vh" }}>
                        <div className="card w-50 mt-5">
                            <div className="card-header">
                                <h1 className="text-sky-700 fw-bold flex  " style={{ fontFamily: "Lucida Calligraphy" }}>
                                    <FaUserTie className="mr-3" /> Détails du Fournisseur
                                </h1>
                            </div>
                            <div className="card-body">
                                <b className="text-muted mb-4">Nom: {fournisseur.nom_for}</b>
                                <p></p>
                                <b className="text-muted mb-4">Email: {fournisseur.mail_for}</b>
                                <p></p>
                                <b className="text-muted mb-4">Identité: {fournisseur.identite}</b>
                                <p></p>
                                <b className="text-muted mb-4">Téléphone: {fournisseur.tel_for}</b>
                                <p></p>
                                <b className="text-muted mb-4">Catégories:</b>
                                <ul>
                                    {fournisseur.categories && fournisseur.categories.map((categorie, index) => (
                                        <li key={index}>{categorie}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    </div>
                        </div>
                    </div>
              
    );
}

export default MagShowFor;
