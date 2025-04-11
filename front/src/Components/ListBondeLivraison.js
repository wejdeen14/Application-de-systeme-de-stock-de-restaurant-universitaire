import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { BiEdit } from "react-icons/bi";
import { BsCartX } from "react-icons/bs";
import { FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function ListBondeLivraison() {
    const [livraisoncommandes, setLivraisoncommandes] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8080/liv')
            .then((response) => {
                setLivraisoncommandes(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des bondes de livraison :', error);
            });
    }, []);
const AjoutLiv=(()=>{
    navigate("/AjoutLiv");
})
const Annuler = (id) => {
    Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Êtes-vous sûr de supprimer ce bonde recu?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimer", // Modifier le texte du bouton de confirmation
        cancelButtonText: "Annuler"
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`http://localhost:8080/liv/supp/${id}`)
                .then(() => {
                    // Filtrer le menu supprimé de la liste des menus affichés
                    setLivraisoncommandes(livraisoncommandes.filter(livraisoncommande => livraisoncommande.id_liv !== id));
                    Swal.fire({
                        title: "Suppression réussie !",
                        icon: "success",
                        timer: 1500
                    }).then(() => {
                        // Recharger la page
                        window.location.reload();
                    });
                })
                .catch((error) => {
                    console.error('Erreur lors de la suppression du bonde recu :', error);
                });
        }
    }).catch((error) => {
        console.error("Erreur lors de la confirmation :", error);
    });
};

    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 h-screen'>
            <strong className="text-gray-700 font-medium fw-bold"> les bondes Recu </strong>
            <div className='mt-3'>
            <MDBBtn style={{ color: 'white', background: '#4F86C6', marginBottom: '10px' }} onClick={AjoutLiv}>
            
                bonde Recu</MDBBtn>

                <table className='w-full bg-white border border-gray-200 divide-y divide-gray-200 m-0'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase  fw-bold tracking-wider" style={{ width: '5%',fontSize:"15px" }}>ID</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase  fw-bold tracking-wider" style={{ width: '15%,fontSize:"15px"' }}>Date Recu</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase  fw-bold  tracking-wider" style={{ width: '15%',fontSize:"15px" }}>Nom Fournisseur</th>

                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase  fw-bold  tracking-wider" style={{ width: '15%',fontSize:"15px" }}>prix Totale</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase  fw-bold  tracking-wider" style={{ width: '15%',fontSize:"15px" }}>Etat</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase  fw-bold  tracking-wider" style={{ width: '15%',fontSize:"15px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {livraisoncommandes.map((livraisoncommande) => (
    <tr key={livraisoncommande.id_liv}>
        <td className="px-1 py-2 whitespace-nowrap" style={{ width: '10%' }}>{livraisoncommande.id_liv}</td>
        <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>{livraisoncommande.date_liv}</td>

        <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>
        {livraisoncommande.livDetail && livraisoncommande.livDetail.length > 0 && (
                        <div>{livraisoncommande.livDetail[0].nom_for}</div>
                                    )}
        </td>
       
                                
                                <td className='px-1 py-2 whitespace-nowrap' style={{ width: '10%' }}>  {livraisoncommande.prix_totale} </td>


                                <td>
                                    {livraisoncommande && livraisoncommande.idFac ? (
                                        <div style={{ backgroundColor: 'blue', color: 'white', borderRadius: '5px', padding: '3px 6px', display: 'inline-block', fontSize: '14px' }}>
                                            Payé
                                        </div>
                                    ) : (
                                        <div style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px', padding: '3px 6px', display: 'inline-block', fontSize: '14px' }}>
                                            Non payé
                                        </div>
                                    )}
                                </td>
                               
                                <td className='flex mt' style={{ width: '10%' }}>
                                    <span style={{ marginRight: '10px' }}>
                                        <Link to={`/ShowBondeLiv/${livraisoncommande.id_liv}`}>
                                            <FaEye style={{ color: '#708a1e', cursor: 'pointer', fontSize: '24px' }}
                                            />
                                        </Link>
                                    </span>
                                    <span style={{ marginRight: '10px' }}>
                                        <BiEdit 
                                            style={{ color: 'blue', cursor: 'pointer', fontSize: '24px' }}
                                            onClick={() => Annuler(livraisoncommande.id_liv)}
                                        />
                                    </span>
                                    <span style={{ marginRight: '10px' }}>
                                        <BsCartX
                                            style={{ color: '#d33', cursor: 'pointer', fontSize: '28px' }}
                                            onClick={() => Annuler(livraisoncommande.id_liv)}
                                        />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListBondeLivraison;
