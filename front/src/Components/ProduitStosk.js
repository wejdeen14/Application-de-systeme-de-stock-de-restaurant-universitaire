import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { FaFilter } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProduitStosk() {
    const [produitStosks, setProduitStocks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/prod')
            .then((response) => {
                setProduitStocks(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des produits en stock:', error);
            });
    }, []);

    const AjoutProduit = () => {
        navigate("/AjoutProd");
    };

    const AjoutSortie = () => {
        navigate("/AjoutSortie");
    };

    const handleKeyDown = (event) => {
        if (event.key === "ArrowUp") {
            window.scrollBy(0, -window.innerHeight); // Défilement d'une ligne vers le haut
        } else if (event.key === "ArrowDown") {
            window.scrollBy(0, window.innerHeight); // Défilement d'une ligne vers le bas
        }
    };

    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 h-screen' onKeyDown={handleKeyDown} tabIndex={0}>

            <strong className="text-gray-700 font-medium fw-bold">Liste des produits en stock</strong>
            <div className='mt-3'>
                <div>
                    <MDBBtn style={{ color: 'white', background: '#4F86C6', marginBottom: '10px' }} onClick={AjoutProduit}>
                        Ajouter Produit</MDBBtn>
                    <MDBBtn className='bg-blue-900' style={{ color: 'white', marginBottom: '10px', marginLeft: "10px" }} onClick={AjoutSortie} >

                        Sortie Produit</MDBBtn>
                </div>
               

            </div>

            <table className='w-full bg-white border border-gray-200 divide-y divide-gray-200 m-0'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '5%', fontSize: "15px" }} >ID</th>
                        <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '5%', fontSize: "15px" }} >Nom produit</th>
                        <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '5%', fontSize: "15px" }} >Catégorie</th>
                        <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '5%', fontSize: "15px" }} >Date d'expiration </th>
                        <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '5%', fontSize: "15px" }} >Quantite</th>
                        <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '5%', fontSize: "15px" }} >Unite</th>
                        <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '5%', fontSize: "15px" }} >prix Unitaire</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {produitStosks.map((produitStosk) => (
                        <tr key={produitStosk.id_prod}>
                            <td className="px-1 py-2 whitespace-nowrap" style={{ width: '10%' }}>{produitStosk.id_prod}</td>
                            <td className="px-1 py-2 whitespace-nowrap" style={{ width: '10%' }}>{produitStosk.nom_prod}</td>
                            <td className="px-1 py-2 whitespace-nowrap" style={{ width: '10%' }}>{produitStosk.nom_categorie}</td>
                            <td className="px-1 py-2 whitespace-nowrap" style={{ width: '10%' }}>{produitStosk.date_peremption}</td>
                            <td className="px-1 py-2 whitespace-nowrap" style={{ width: '10%' }}>{produitStosk.qte}</td>
                            <td className="px-1 py-2 whitespace-nowrap" style={{ width: '10%' }}>{produitStosk.unite}</td>
                            <td className="px-1 py-2 whitespace-nowrap" style={{ width: '10%' }}>{produitStosk.prix_unitaire}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProduitStosk;
