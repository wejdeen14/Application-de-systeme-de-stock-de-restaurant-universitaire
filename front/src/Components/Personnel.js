import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { BiEdit } from "react-icons/bi";
import { BsXCircle } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import PersonnelService from '../Service/PersonnelService';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEye } from 'react-icons/fa';
function Personnel() {
        const [users, setUsers] = useState([]); 
    const navigate=useNavigate();
   

    const deleteUser = (id) => {
        Swal.fire({
            title: "Êtes-vous sûr ?",
            text: "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
            icon: "warning",
            confirmButtonText: "Oui, supprimer",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api/${id}`)
                    .then(() => {
                        // Mise à jour de la liste d'utilisateurs après suppression
                        setUsers(users.filter((user) => user.id !== id));
                        Swal.fire({
                            title: "Suppression réussie !",
                            icon: "success",
                            timer: 1500
                        });
                    })
                    .catch((error) => {
                        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
                        Swal.fire({
                            title: "Erreur !",
                            text: "Une erreur s'est produite lors de la suppression de l'utilisateur.",
                            icon: "error",
                            timer: 1500
                        });
                    });
            }
        });
    };

    const createUser = () => {
       
  navigate('/Inscription');
};

        useEffect(() => {
            PersonnelService.getAllUsers()
                .then((response) => {
                    setUsers(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching users:', error);
                });
        }, []);
    
        return (


    
            <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 h-screen  '>
                <strong className="text-gray-700 font-medium fw-bold"> Liste des Personnel</strong>
                <div className=' border-x border-gray-200 rounded-sm mt-3'>           
        
                <MDBBtn  style={{ color:"white" , backgroundColor:'#4F86C6', marginBottom: '10px'}}  onClick={createUser} > Ajouter Personnel</MDBBtn>
   
                <table className='w-full bg-white  border border-gray-200 divide-y divide-gray-200'>
                    <thead  className='bg-gray-50'>
                        <tr>
                            <th  scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase  fw-bold tracking-wider" style={{fontSize:"15px"}}>ID</th>
                            <th  scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase  fw-bold tracking-wider" style={{fontSize:"15px"}}>image</th>
                            <th  scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase  fw-bold tracking-wider" style={{fontSize:"15px"}}>Identité</th>
                            <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase fw-bold  tracking-wider" style={{fontSize:"15px"}}>Nom</th>
                            <th  scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{fontSize:"15px"}} >Prenom</th>
                            <th  scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase  fw-bold tracking-wider" style={{fontSize:"15px"}}>Genre</th>
                            <th  scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase fw-bold fw-bold  tracking-wider" style={{fontSize:"15px"}}>E-mail</th>
                            <th  scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase0 fw-bold tracking-wider" style={{fontSize:"15px"}}>Téléphone</th>
                            <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase  fw-bold tracking-wider" style={{fontSize:"15px"}}>Role</th>
                            <th  scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase  fw-bold tracking-wider" style={{fontSize:"15px"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody  className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-2 py-3 whitespace-nowrap">{user.id}</td>
                                <td className="px-2 py-3 whitespace-nowrap"> <img src={user.imgUser}  alt="Profile" style={{ width: '50px', height: '50px' }} /></td>
                                <td className="px-2 py-3 whitespace-nowrap">{user.identite}</td>
                                <td className="px-2 py-3 whitespace-nowrap">{user.nom}</td>
                                <td className="px-2 py-3 whitespace-nowrap">{user.prenom}</td>
                                <td className="px-2 py-3 whitespace-nowrap">{user.genre}</td>
                                <td className="px-2 py-3 whitespace-nowrap">{user.mail}</td>
                                <td className="px-2 py-3 whitespace-nowrap">{user.tel}</td>
                               
                                <td className="px-2 py-3 whitespace-nowrap">{user.role}</td>
                              
                                <td className='flex text-center mt-3'>
                              
                                <span style={{ marginRight: '10px' }}> 

<Link to={`/Show/${user.id}`}> <FaEye style={{ color: '#708a1e', cursor: 'pointer', fontSize: '24px' }} />
</Link>  </span>
  <span style={{ marginRight: '10px' }}> 
<Link to={`/Inscription/${user.id}`}> <BiEdit style={{ color: 'blue', cursor: 'pointer' , fontSize: '24px'}} />
</Link>  </span>

<span style={{ marginRight: '10px' }}>
                                        <BsXCircle
                                            style={{ color: '#d33', cursor: 'pointer', fontSize: '24px' }}  onClick={() => deleteUser(user.id)}  />
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


export default Personnel;