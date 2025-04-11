import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';
import { BiEdit } from "react-icons/bi";
import { BsXCircle } from "react-icons/bs";
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import de SweetAlert2
import { useNavigate } from 'react-router-dom';

function ListMenu() {
    const [menus, setMenus] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/menu")
            .then((response) => {
                setMenus(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des menus :', error);
            });
    }, []);

    const annuler = (id) => {
        Swal.fire({
            title: "Êtes-vous sûr ?",
            text: "Êtes-vous sûr de supprimer ce menu ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Oui, supprimer", // Modifier le texte du bouton de confirmation
            cancelButtonText: "Annuler"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/menu/delete/${id}`)
                    .then(() => {
                        // Filtrer le menu supprimé de la liste des menus affichés
                        setMenus(menus.filter(menu => menu.idMenu !== id));
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
                        console.error('Erreur lors de la suppression du menu :', error);
                    });
            }
        }).catch((error) => {
            console.error("Erreur lors de la confirmation :", error);
        });
    };

    const creerMenu = () => {
        navigate('/MoMenu');
    };

    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 h-screen'>
            <strong className="text-gray-700 font-medium fw-bold">Liste Menus</strong>
            <div className='mt-3'>
                <MDBBtn style={{ color: 'white', background: '#4F86C6', marginBottom: '10px' }} onClick={creerMenu}>
                    Créer Menu
                </MDBBtn>
                <table className='w-full bg-white border border-gray-200 divide-y divide-gray-200 m-0'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '5%', fontSize: "15px" }}>ID</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '15%', fontSize: "15px" }}>Date Création</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '10%', fontSize: "15px" }}>Menu</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '10%', fontSize: "15px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {menus.map((menu, index) => (
                            <tr key={index}>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '10%' }}>{menu.idMenu}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>{menu.dateCreation}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}> {menu.nomMenu}</td>
                                <td className='flex mt' style={{ width: '10%' }}>
                                    <span style={{ marginRight: '10px' }}>
                                        <Link to={`/ShowMenu/${menu.idMenu}`}>
                                            <FaEye style={{ color: '#708a1e', cursor: 'pointer', fontSize: '24px' }} />
                                        </Link>
                                    </span>
                                    <span style={{ marginRight: '10px' }}>
                                        <BiEdit
                                            style={{ color: 'blue', cursor: 'pointer', fontSize: '24px' }}
                                            onClick={() => annuler(menu.idMenu)}
                                        />
                                    </span>
                                    <span style={{ marginRight: '10px' }}>
                                        <BsXCircle
                                            style={{ color: '#d33', cursor: 'pointer', fontSize: '24px' }}
                                            onClick={() => annuler(menu.idMenu)}
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

export default ListMenu;
