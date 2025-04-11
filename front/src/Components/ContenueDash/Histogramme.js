import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: '1jr', Entrees: 150, Sorties: 100 },
    { name: '7jr', Entrees: 150, Sorties: 100 },
    { name: '2semaine', Entrees: 200, Sorties: 120 },
    { name: '3semaine', Entrees: 180, Sorties: 90 },
    { name: '4semaine', Entrees: 220, Sorties: 150 },
];

export default function Histogramme() {
    return (
        <div className="h-[30rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium fw-bold">Mouvements de stock</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Entrees" stroke="#0ea5e9" />
                        <Line type="monotone" dataKey="Sorties" stroke="#0c4a6e" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
