import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import TabModerateur from './TabModerateur'   ;

function ShowMenu() {
    const [menu, setMenu] = useState({});
    const { idMenu } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/menu/${idMenu}`)
            .then((response) => {
                setMenu(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération du menu :', error);
            });
    }, [idMenu]);

    return (
        <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
            <TabModerateur />
            <div className='flex-1'>
                <Header />
                <div className='flex-1 grap-12 w-full mt-2'>
                    <div className="container d-flex justify-content-center align-items-start" style={{ minHeight: "100vh" }}>
                        <div className="card w-50 mt-5">
                            <div className="card-header">
                                <h1 className='text-sky-700 fw-bold flex ' style={{ fontFamily: "Lucida Calligraphy" }}>
                                    <MdOutlineRestaurantMenu  className='mr-3 fw-bold ' size={24} /> Affichage de Menu
                                </h1>
                            </div>
                            <div className="card-body">
                                <b className="text-muted">ID Menu :</b>
                                <p>{menu.idMenu}</p>
                                <b className="text-muted"> Menu :</b>
                                <p>{menu.nomMenu}</p>
                                <b className="text-muted">Date Création:</b>
                                <p>{menu.dateCreation}</p>
                                <div>
                                    {menu.plats && menu.plats.map((plat, index) => (
                                        <div key={index}>
                                            <b className='text-muted'>Principale : </b>
                                            <p>{plat.principale}</p>
                                            <b className='text-muted'>Entrée  : </b>
                                            <p>{plat.entre}</p>
                                            <b className='text-muted'>Desserts : </b>
                                            {plat.desserts && plat.desserts.map((dessert, idx) => (
                                                <p key={idx}>{dessert.nomDessert}</p>
                                            ))}
                                            <b className='text-muted'>Supplémentaires : </b>
                                            {plat.supplimentaires && plat.supplimentaires.map((supp, idx) => (
                                                <p key={idx}>{supp.nomSupp}</p>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowMenu;
