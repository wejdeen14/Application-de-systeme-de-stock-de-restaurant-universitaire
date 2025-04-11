import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ListCalculCout() {
    const [couts, setCouts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/calcul")
            .then((response) => {
                setCouts(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des repas servis :', error);
            });
    }, []);

    const handleAjoutRepasServi = () => {
        navigate("/CalculRp");
    }

    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 h-screen'>
            <strong className="text-gray-700 font-medium fw-bold">Liste cout de repas</strong>
            <div className='mt-3'>
                <MDBBtn style={{ color: 'white', background: '#4F86C6', marginBottom: '10px' }} onClick={handleAjoutRepasServi}>
                    Ajout Repas servi
                </MDBBtn>
                <table className='w-full bg-white border border-gray-200 divide-y divide-gray-200 m-0'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '5%', fontSize: "15px" }}>ID</th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '15%', fontSize: "15px" }}>Date cout </th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '15%', fontSize: "15px" }}>montant sortie </th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '15%', fontSize: "15px" }}>nombre utilisateur </th>
                            <th scope="col" className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase fw-bold tracking-wider" style={{ width: '15%', fontSize: "15px" }}>cout de repas</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {couts.map((cout, index) => (
                            <tr key={index}>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '10%' }}>{cout.idcout}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>{cout.dateRepas}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}> {cout.montantjour}</td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}>
                                    {cout.user && cout.user.nombreuser}
                                </td>
                                <td className="px-1 py-2 whitespace-nowrap" style={{ width: '15%' }}> {cout.coutrepas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListCalculCout;
