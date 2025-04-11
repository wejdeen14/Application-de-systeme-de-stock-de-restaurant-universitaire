import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function ConsulterMenu() {
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

  
    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 h-screen'>
            <strong className="text-gray-700 font-medium fw-bold">Liste Menus</strong>
            <div className='mt-3'>
              
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
                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ConsulterMenu;
