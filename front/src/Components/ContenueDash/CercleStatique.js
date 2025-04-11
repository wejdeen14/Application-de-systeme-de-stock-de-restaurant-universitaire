import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const CercleStatique = () => {
    const [countprod, setCountprod] = useState(0);
const [countCor ,setCountCor]=useState(0);
const [countutilise ,setCountutilise]=useState(0);
    useEffect(() => {
        fetch('http://localhost:8080/prod/count')
            .then((response) => response.json())
            .then((data) => {
                setCountprod(data);
            })
            .catch((error) => {
                console.error('Error fetching product count:', error);
            });
    }, []);
	useEffect(() => {
        fetch('http://localhost:8080/prodSortie/utilise')
            .then((response) => response.json())
            .then((data) => {
                setCountutilise(data);
            })
            .catch((error) => {
                console.error('Error fetching product count:', error);
            });
    }, []);
	useEffect(() => {
        fetch('http://localhost:8080/prodSortie/Corrompu')
            .then((response) => response.json())
            .then((data) => {
                setCountCor(data);
            })
            .catch((error) => {
                console.error('Error fetching product count:', error);
            });
    }, []);


    const data = [
        { name: 'Stock disponible', value: countprod },
        { name: 'Sorties utilisées', value: countutilise },
        { name: 'Produits corrompus', value:  countCor },
    ];

    const RADIAN = Math.PI / 180;
    const COLORS = ['#0ea5e9', '#ef4444', '#333333'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="w-[20rem] h-[30rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
            <strong className="text-gray-700 font-medium fw-bold">Cercle de Répartition du Stock</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={300}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="45%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={105}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CercleStatique ;
