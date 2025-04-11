import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { BiEdit } from "react-icons/bi";
import { BsXCircle } from "react-icons/bs";
import { FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ListFacture() {
    const navigate = useNavigate();
    const [factures, setFactures] = useState([]);

    
      
    useEffect(() => {
        axios.get('http://localhost:8080/factures')
            .then((response) => {
                setFactures(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des factures :', error);
            });
    }, []);
    const Annuler = (id) => {
        Swal.fire({
            title: "Êtes-vous sûr ?",
            text: "Êtes-vous sûr de vouloir supprimer cette facture ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Oui, supprimer",
            cancelButtonText: "Annuler"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/factures/delete/${id}`)
                    .then(() => {
                        // Mettre à jour la liste des factures après la suppression réussie
                        setFactures(factures.filter(facture => facture.idFac !== id));
                        Swal.fire({
                            title: "Suppression réussie !",
                            icon: "success",
                            timer: 1500
                        });
                    })
                    .catch((error) => {
                        console.error('Erreur lors de la suppression de la facture :', error);
                        Swal.fire({
                            title: "Erreur !",
                            text: "Une erreur s'est produite lors de la suppression de la facture.",
                            icon: "error",
                            timer: 1500
                        });
                    });
            }
        });
    };

    
    const ajout = () => {
        navigate('/AjoutFacture');
    };

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 h-screen">
            <strong className="text-gray-700 font-medium">Les Factures</strong>
            <div className="mt-3">
                <MDBBtn style={{ color: 'white', marginBottom: '10px', backgroundColor: '#1e3a8a' }} onClick={ajout}>
                    Ajout factures
                </MDBBtn>

                <table className="w-full bg-white border border-gray-200 divide-y divide-gray-200 m-0">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '5%' }}>id</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '15%' }}>Date creation</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '15%' }}>Montant sas TVA </th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '15%' }}>Montant totale  </th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '15%' }}>Nom Fournisseur</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '10%' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {factures.map((facture, index) => (
                            <tr key={index}>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '10%' }}>{facture.idFac}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>{facture.dateFac}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>{facture.prixFac}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>{facture.prixTVA}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>
                                  
                                     {facture.liv && facture.liv.length > 0 && (
                        <div>{facture.liv[0].nomFor}</div>
                                    )}
                                </td>
                               
                                <td className="flex mt" style={{ width: '10%' }}>
                                    <span style={{ marginRight: '10px' }}>
                                        <Link to={`/ShowFacture/${facture.idFac}`}>
                                            <FaEye style={{ color: '#708a1e', cursor: 'pointer', fontSize: '24px' }} />
                                        </Link>
                                    </span>
                                    <span style={{ marginRight: '10px' }}>
                                        <BiEdit
                                            style={{ color: 'blue', cursor: 'pointer', fontSize: '24px' }}
                                            
                                        />
                                    </span>
                                    <span style={{ marginRight: '10px' }}>
                                    <BsXCircle
                                            style={{ color: '#d33', cursor: 'pointer', fontSize: '24px' }} onClick={() => Annuler(facture.idFac)} />
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

export default ListFacture;
