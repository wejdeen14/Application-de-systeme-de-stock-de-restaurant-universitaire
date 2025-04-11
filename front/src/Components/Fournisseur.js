import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { BiEdit } from "react-icons/bi";
import { BsXCircle } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import PersonnelService from '../Service/PersonnelService';
import Swal from 'sweetalert2';
import { FaEye } from 'react-icons/fa';
function Fournisseur() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const navigate=useNavigate();

  const deleteFournisseur = (id) => {
    Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Êtes-vous sûr de vouloir supprimer ce fournisseur ?",
        icon: "warning",
        confirmButtonText: "Oui, supprimer",
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`http://localhost:8080/four/delete/${id}`)
                .then(() => {
                    // Mettre à jour la liste des fournisseurs après la suppression
                    setFournisseurs(fournisseurs.filter((fournisseur) => fournisseur.id_for !== id));
                    Swal.fire({
                        title: "Suppression réussie !",
                        icon: "success",
                        timer: 1500
                    });
                })
                .catch((error) => {
                    console.error('Erreur lors de la suppression du fournisseur :', error);
                    Swal.fire({
                        title: "Erreur !",
                        text: "Une erreur s'est produite lors de la suppression du fournisseur.",
                        icon: "error",
                        timer: 1500
                    });
                });
        }
    });
};



  


 const Ajoutfournisseur = () =>{
    navigate('/Ajoutfournisseur');
 };

  useEffect(() => {
    PersonnelService.getFournisseursWithCategories()
      .then((Response) => {
        console.log(Response);
        setFournisseurs(Response.data);
      })
      .catch((error) => {
        console.error('Error fetching fournisseurs:', error);
      });
  }, []);

  return (
    <div className='bg-white px-6 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 h-screen  '>
    <strong className="text-gray-700 font-medium fw-bold">Fournisseur et ses categories </strong>
    <div className=' border-x border-gray-200 rounded-sm mt-3'>           

        <MDBBtn style={{ color: 'white', background: '#4F86C6', marginBottom: '10px' }} onClick={Ajoutfournisseur}>Ajouter Fournisseur</MDBBtn>
       
        <table className='w-full bg-white  border border-gray-200 divide-y divide-gray-200'>
          <thead  className='bg-gray-50'>
            <tr>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercasetracking-wider fw-bold " style={{fontSize:"15px"}}>ID </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase  tracking-wider fw-bold" style={{fontSize:"15px"}}>Nom fournisseurs</th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase  tracking-wider fw-bold" style={{fontSize:"15px"}}>Numéro téléphone</th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase  tracking-wider fw-bold" style={{fontSize:"15px"}}>Email</th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase  tracking-wider fw-bold" style={{fontSize:"15px"}}>categories</th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase  tracking-wider fw-bold" style={{fontSize:"15px"}}>Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200"c>
            {fournisseurs.map((fournisseur) => (
              <tr key={fournisseur.id}>
                <td className="px-2 py-3 whitespace-nowrap">{fournisseur.id_for}</td>
                <td className="px-2 py-3 whitespace-nowrap">{fournisseur.nom_for}</td>
                <td className="px-2 py-3 whitespace-nowrap">{fournisseur.tel_for}</td>
                <td className="px-2 py-3 whitespace-nowrap">{fournisseur.mail_for}</td>
                <td className="px-2 py-3 whitespace-nowrap">
      {fournisseur.categories.join(', ')}
    </td>

                <td className='flex text-center mt-3'>
                  <span style={{ marginRight: '10px' }}>
                    <Link to={ `/Showfournisseur/${fournisseur.id_for}`}>
                    <FaEye style={{ color: '#708a1e', cursor: 'pointer', fontSize: '24px' }} />
                    </Link>
                  </span>
                  <span style={{ marginRight: '10px' }}>
                    <Link to={`/Ajoutfournisseur/${ fournisseur.id_for}`}>
                      <BiEdit style={{ color: 'blue', cursor: 'pointer' , fontSize: '24px'}} />
                    </Link>
                  </span>
                  <span style={{ marginRight: '10px' }}>
                                        <BsXCircle
                                            style={{ color: '#d33', cursor: 'pointer', fontSize: '24px' }} onClick={() => deleteFournisseur(fournisseur.id_for)} />
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

export default Fournisseur;
