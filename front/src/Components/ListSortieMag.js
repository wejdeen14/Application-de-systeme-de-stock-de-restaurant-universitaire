import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { BiEdit } from "react-icons/bi";
import { BsXCircle } from "react-icons/bs";
import { FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import de SweetAlert2
function ListStockSortie() {
    const navigate=useNavigate();
    const [bondeSorties, setBondeSorties] = useState([]);
    const Annuler = (id) => {
        Swal.fire({
            title: "Êtes-vous sûr ?",
            text: "Êtes-vous sûr de vouloir annuler la sortie ?",
            icon: "warning",
            confirmButtonText: "Oui, annuler",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/prodSortie/annulationSortie/${id}`)
                    .then(() => {
                        // Filtrer la sortie supprimée de la liste des sorties affichées
                        const updatedSorties = bondeSorties.filter(sortie => sortie.id_sortie !== id);
                        setBondeSorties(updatedSorties); // Mettre à jour l'état avec la nouvelle liste filtrée
                        Swal.fire({
                            title: "Suppression réussie !",
                            icon: "success",
                            timer: 1500
                        });
                    })
                    .catch((error) => {
                        console.error('Erreur lors de la suppression de la sortie :', error);
                        Swal.fire({
                            title: "Erreur !",
                            text: "Une erreur s'est produite lors de la suppression de la sortie.",
                            icon: "error",
                            timer: 1500
                        });
                    });
            }
        });
    };
    
    
    useEffect(() => {
        axios.get("http://localhost:8080/prodSortie")
            .then((response) => {
                // Assurez-vous que la structure de la réponse correspond à ce que vous attendez
                setBondeSorties(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des bondes de livraison :', error);
            });
    }, []);
const AjoutSortie =(()=>{
    navigate("/AjoutSortie");
})
    return (

        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 h-screen'>
            <strong className="text-gray-700 font-medium fw-bold">Les commandes</strong>
            <div className='mt-3'>
                 <MDBBtn style={{ color: 'white', background: '#4F86C6', marginBottom: '10px' }} onClick={AjoutSortie}>
                  
                    Ajouter Produit </MDBBtn>
                 
                <table className='w-full bg-white border border-gray-200 divide-y divide-gray-200 m-0'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '5%',fontSize:"15px" }} >ID</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '15%',fontSize:"15px" }}>Date Sortie</th>

                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '15%',fontSize:"15px" }}>Produit</th>

                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '10%' ,fontSize:"15px"}}>Motif </th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '10%',fontSize:"15px" }}>Action </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {bondeSorties.map((bondeSortie, index) => (
                            <tr key={index}>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '10%' }}>{bondeSortie.id_sortie}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>{bondeSortie.date_sortie}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>
                                
                                {bondeSortie.sortie.map((detail, idx) => (
                                        <div key={idx}>
                                           
                                            <div>{detail.nomProd}</div>
                                           
                                        
                                        </div>
                                    ))}
                                </td>

                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>
    {bondeSortie.sortie.map((detail, idx) => (
        <div key={idx}>
            {detail.motif === "Utilise" && (
                <div style={{ backgroundColor: '#3a8a1e', color: 'white', borderRadius: '5px', padding: '3px 6px', display: 'inline-block', fontSize: '14px' }}>
                    {detail.motif}
                </div>
            )}
            {detail.motif === "Corrompu" && (
                <div style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px', padding: '3px 6px', display: 'inline-block', fontSize: '14px' }}>
                    {detail.motif}
                </div>
            )}
            {detail.motif !== "Utilise" && detail.motif !== "Corrompu" && (
                <div style={{ backgroundColor: 'yellow', color: 'black', borderRadius: '5px', padding: '3px 6px', display: 'inline-block', fontSize: '14px' }}>
                    {detail.motif}
                </div>
            )}
        </div>
    ))}
</td>

                               
                                <td className='flex mt' style={{ width: '10%' }}>
                                   <span style={{ marginRight: '10px' }}>
                                        <Link to={`/MagShowSortie/${bondeSortie.id_sortie}`}>
                                            <FaEye style={{ color: '#708a1e', cursor: 'pointer', fontSize: '24px' }} />
                                        </Link>
                                    </span>
                    
                                    <span style={{ marginRight: '10px' }}>
                                        <BiEdit 
                                            style={{ color: 'blue', cursor: 'pointer', fontSize: '24px' }}
                                            onClick={() => Annuler(bondeSortie.id_sortie)}
                                        />
                                    </span>

                                   <span style={{ marginRight: '10px' }}>
                                        <BsXCircle 
                                            style={{ color: '#d33', cursor: 'pointer', fontSize: '24px' }}
                                            onClick={() => Annuler(bondeSortie.id_sortie)}
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

export default ListStockSortie;
