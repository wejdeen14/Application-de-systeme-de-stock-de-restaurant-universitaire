import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoReceiptOutline } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import TabMag from './DashMag/TabMag';
function MagShowSortie() {
    const [bondeSortie, setBondeSortie] = useState({});
    const { id_sortie } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/prodSortie/${id_sortie}`)
            .then((response) => {
                setBondeSortie(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération de la bonde de sortie :', error);
            });
    }, [id_sortie]);

    

    return (
        <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
        <TabMag/>
          <div className='flex-1'>
       <Header/>
       <div className='flex-1 grap-12 w-full mt-2'> 
      
                    <div className="container d-flex justify-content-center align-items-start" style={{ minHeight: "100vh" }}>
                        <div className="card w-50 mt-5">
                            <div className="card-header">
                                <h1 className='text-sky-700 fw-bold flex ' style={{ fontFamily: "Lucida Calligraphy" }}>
                                <IoReceiptOutline  className='mr-3 fw-bold ' size={24} /> Affichage de la Bonde de Sortie
                                </h1>
          
                            </div>
                            <div className="card-body">
                                <b className="text-muted">ID Sortie :</b>
                                <p>{bondeSortie.id_sortie}</p>
                                <b className="text-muted">Date :</b>
                                <p>{bondeSortie.date_sortie}</p>
                                <div>
                                    {bondeSortie.sortie && bondeSortie.sortie.map((detail, index) => (
                                        <div key={index}>
                                            <b className='text-muted'>Categorie : </b>
                                            <p>{detail.nom_categorie}</p>
                                            <b className='text-muted'>Nom Produit : </b>
                                            <p>{detail.nomProd}</p>
                                            <b className='text-muted'>Quantité : </b>
                                            <p>{detail.qte}</p>
                                            <b className='text-muted'>Motif : </b>
                                            <p>{detail.motif}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                        </div>
                    </div>
    );
}

export default MagShowSortie;
