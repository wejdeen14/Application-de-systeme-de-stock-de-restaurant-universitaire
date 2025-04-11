import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const CercleStatique = () => {
    const [countPaye, setCountPaye] = useState(0);
    const [countNonPaye, setCountNonPaye] = useState(0);

    useEffect(() => {
        // Récupérer le nombre de détails de livraison payés et non payés
        fetch('http://localhost:8080/liv/paye')
            .then((response) => response.json())
            .then((data) => {
                // data est une liste contenant deux éléments : [totalPaye, totalNonPaye]
                if (data && data.length === 2) {
                    setCountPaye(data[0]); // Premier élément : totalPaye
                    setCountNonPaye(data[1]); // Deuxième élément : totalNonPaye
                }
            })
            .catch((error) => {
                console.error('Error fetching livraisons count:', error);
            });
    }, []);

    const data = [
        { name: 'Bons de commande payés', value: countPaye },
        { name: 'Bons de commande non payés', value: countNonPaye },
    ];

    const COLORS = ['blue', 'red'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="w-[20rem] h-[30rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
            <strong className="text-gray-700 font-medium fw-bold">Cercle de Répartition de paymant bonde commande</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={105}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
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

export default CercleStatique;
