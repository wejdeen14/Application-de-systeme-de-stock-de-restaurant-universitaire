import React, { useEffect, useState } from 'react';
import { FaUserCheck } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import PersonnelService from '../Service/PersonnelService';
import Header from './Header';
import Tab from './Tab';
function Show() {
    const [id, setId] = useState(useParams().id);
    const [user, setUser] = useState({name:'', prenom:''});
    const navigate = useNavigate();
    
    useEffect(() => {
        PersonnelService.getUserById(id)
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

  

    return (
        <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
            <Tab />
            <div className='flex-1'>
                <Header />
                <div className='flex-1 grap-12 w-full mt-2'> 
                    <div className="container d-flex justify-content-center align-items-start" style={{ minHeight: "100vh" }}>
                        <div className="card w-50 mt-5">
                            <div className="card-header">
                 <h1 className='text-sky-700 fw-bold flex  ' style={{fontFamily:"Lucida Calligraphy"}}> <FaUserCheck className='mr-3' />   Donnée Personnel</h1>
                            </div>
                            <div className="card-body">
                                <b className="text-muted mb-4">Nom: {user.nom}</b>
                                <p></p>
                                <b className="text-muted mb-4">Prenom: {user.prenom}</b>
                                <p></p>
                                <b className="text-muted mb-4">Identite: {user.identite}</b>
                                <p></p>
                                <b className="text-muted mb-4">Genre: {user.genre}</b>
                                <p></p>
                                <b className="text-muted mb-4">Votre Role: {user.role}</b>
                                <p></p>
                                <b className="text-muted mb-4">Numéro Téléphone: {user.tel}</b>
                                <p></p>
                                <b className="text-muted mb-4">Adresse mail: {user.mail}</b>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Show;
