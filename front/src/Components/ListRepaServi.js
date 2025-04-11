import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { BiEdit } from "react-icons/bi";
import { BsXCircle } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import de SweetAlert2
function ListRepaServi() {
    const [repass, setRepass] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/repas/list")
            .then((response) => {
                setRepass(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des repas servi :', error);
            });
    }, []);

    const annuler = (id) => {
        Swal.fire({
            title: "Êtes-vous sûr ?",
            text: "Êtes-vous sûr de supprimer ce repas servi ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Oui, supprimer", // Modifier le texte du bouton de confirmation
            cancelButtonText: "Annuler"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/repas/delete/${id}`)
                    .then(() => {
                        // Filtrer le menu supprimé de la liste des menus affichés
                        setRepass(repass.filter(repas => repas.idrepas !== id));
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
                        console.error('Erreur lors de la suppression du repas servi :', error);
                    });
            }
        }).catch((error) => {
            console.error("Erreur lors de la confirmation :", error);
        });
    };

    const AjoutRepasServi =() => {
        navigate("/AjoutRepasServi")
    }

    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 h-screen'>
            <strong className="text-gray-700 font-medium fw-bold">Liste des repas servi </strong>
            <div className='mt-3'>
                <MDBBtn style={{ color: 'white', background: '#4F86C6', marginBottom: '10px' }} onClick={AjoutRepasServi}>
                     Calcul cout de repas
                </MDBBtn>
                <table className='w-full bg-white border border-gray-200 divide-y divide-gray-200 m-0'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '5%', fontSize: "15px" }}>ID</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '15%', fontSize: "15px" }}>Date servi</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '15%', fontSize: "15px" }}>ouvries </th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '15%', fontSize: "15px" }}>Etudient </th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '15%', fontSize: "15px" }}>Agent</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '10%', fontSize: "15px" }}>nombre repas servi</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '10%', fontSize: "15px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {repass.map((repas, index) => (
                            <tr key={index}>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '10%' }}>{repas.idrepas}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>{repas.dateServi}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}> {repas.nbouvrier}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>{repas.nbEtudient}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}> {repas.nbAgent}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}> {repas.repaservi}</td>
                                <td className='flex mt' style={{ width: '10%' }}>
                                    
                                        
                                 
                                       
                                  
                                    <span style={{ marginRight: '10px' }}>
                                    <Link to={`/AjoutRepasServi/${repas.idrepas}`}>
                                        <BiEdit
                                            style={{ color: 'blue', cursor: 'pointer', fontSize: '24px' }}
                                        />
                                           </Link>
                                    </span>
                                    <span style={{ marginRight: '10px' }}>
                                        <BsXCircle
                                            style={{ color: '#d33', cursor: 'pointer', fontSize: '24px' }}
                                            onClick={() => annuler(repas.idrepas)}
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

export default ListRepaServi