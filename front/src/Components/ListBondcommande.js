import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { BsCartX } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import de SweetAlert2
function ListBondcommande() {
    const navigate=useNavigate();
    const [bondecommandes, setBondecommandes] = useState([]);
    const Annuler = (id, id_liv) => {
        if (id_liv === null) {
            Swal.fire({
                title: "Êtes-vous sûr ?",
                text: "Êtes-vous sûr de vouloir annuler cette commande !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1e3a8a",
                cancelButtonColor: "#d33",
                confirmButtonText: "Oui, Annuler!"
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.get(`http://localhost:8080/cmd/sendMailAnnulation/${id}`)
                        .then((response) => {
                            Swal.fire({
                                title: "Commande annulée!",
                                text: "Votre commande a été annulée avec succès et un e-mail d'annulation a été envoyé au fournisseur.",
                                icon: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#1e3a8a",
                            });
                            // Mise à jour de l'état des commandes pour refléter les changements
                            setBondecommandes(bondecommandes.filter(commande => commande.id_cmd !== id));
                        })
                        .catch((error) => {
                            console.error('Erreur lors de l\'annulation de la commande :', error);
                        });
                }
            });
        } else {
            // Afficher un message d'erreur si id_liv n'est pas nul
            Swal.fire({
                title: "Erreur",
                text: "Vous ne pouvez pas annuler une commande avec une livraison confirmée.",
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#d33",
            });
        }
    };
    

   

    useEffect(() => {
        axios.get('http://localhost:8080/cmd')
            .then((response) => {
                setBondecommandes(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des bondes de commandes :', error);
            });
    }, []);
const bondeCommande=(()=>{
    navigate ("/AjoutBondeCommande");
})
    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 h-screen'>
            <strong className="text-gray-700 font-medium">Les commandes </strong>
            <div className='mt-3'>
                <MDBBtn style={{ color: 'white', marginBottom: '10px', backgroundColor: '#1e3a8a' }} onClick={bondeCommande}>
               les commande</MDBBtn>

                <table className='w-full bg-white border border-gray-200 divide-y divide-gray-200 m-0'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '5%' }}>id</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '15%' }}>Date BondeCommande</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '15%' }}>Nom Fournisseur</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '15%' }}>État</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '10%' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {bondecommandes.map((bondeCommande, index) => (
        <tr key={index}>
           
            <td className="px-1 py-2 whitespace-nowrap" style={{ width: '10%' }}>{bondeCommande.id_cmd}</td>
            <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>{bondeCommande.date_cmd}</td>
            {/* Extraire le nom du fournisseur du premier élément de detailcomds */}
            <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>
                {bondeCommande.detailcomds.length > 0 && (
                    <div>{bondeCommande.detailcomds[0].fournisseur}</div>
                )}

            </td>
            <td>
            {bondeCommande.id_liv ? (
                <div style={{ backgroundColor: 'green', color: 'white', borderRadius: '5px', padding: '3px 6px', display: 'inline-block', fontSize: '14px' }}>
                    livraison recu 
                </div>
            ) : (
                <div style={{ backgroundColor: 'gray', color: 'white', borderRadius: '5px', padding: '3px 6px', display: 'inline-block', fontSize: '14px' }}>
                    livraison non recu
                </div>
            )}
        </td>

 


                                <td className='flex mt' style={{ width: '10%' }}>
                                    <span style={{ marginRight: '10px' }}>
                                        <Link to={`/Showcmd/${bondeCommande.id_cmd}`}>
                                            <FaEye style={{ color: '#708a1e', cursor: 'pointer', fontSize: '24px' }}
                                            />
                                        </Link>
                                    </span>
                                    <span style={{ marginRight: '10px' }}>
                                        <BsCartX
                                            style={{ color: '#d33', cursor: 'pointer', fontSize: '28px' }}
                                            onClick={() => Annuler(bondeCommande.id_cmd,bondeCommande.id_liv)}
                                        />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListBondcommande;
