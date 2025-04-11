import React, { useEffect, useState } from 'react';
import { BiSolidCategory } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { IoBagHandle, IoPeople } from 'react-icons/io5';
export default function StateMod() {

	const [fournisseurs, setFournisseurs] = useState(0);
	const [livCount ,setLivCount]=useState(0);
	const [cout,setCout]=useState(0);
    useEffect(() => {
        fetch('http://localhost:8080/four/count')
            .then((response) => response.json())
            .then((data) => {
               
                setFournisseurs(data); 
            })
            .catch((error) => {
                console.error('Error fetching personnel count:', error);
            });
    }, []); 
	useEffect(() => {
        fetch('http://localhost:8080/liv/count')
            .then((response) => response.json())
            .then((data) => {
               
                setLivCount(data); 
            })
            .catch((error) => {
                console.error('Error fetching commande recu count:', error);
            });
    }, []); 
	useEffect(() => {
        fetch('http://localhost:8080/calcul/coutRepasActuel')
            .then((response) => response.json())
            .then((data) => {
               
                setCout(data); 
            })
            .catch((error) => {
                console.error('Error fetching commande recu count:', error);
            });
    }, []); 

	return (
		<div className="flex gap-4 " style={{marginLeft:"60px"}} >
			<BoxWrapper className="bg-sky-500 rounded-sm p-4 border border-gray-200 flex items-center" style={{ width: '250px', height: '150px'}}>
				<div >
					<IoPeople className="text-2xl text-white"size={30} style={{marginTop:"-50px"}} />
				</div>
				<div className="pl-4">
					<span className="text-sm text-zinc-50 font-light"style={{fontSize:'20px'}}> Fournisseur</span>
					<div className="flex items-center">
						<strong className="text-xl text-zinc-50 font-semibold"style={{fontSize:'30px'}}> {fournisseurs} </strong>

					</div>
				</div>
			</BoxWrapper>

			<BoxWrapper className=" rounded-sm p-4 border border-gray-200 flex items-center" style={{ width: '250px', height: '150px',backgroundColor:"#4FB0C6" }}>
				<div >
					<IoBagHandle className="text-2xl text-white" size={30} style={{marginTop:"-50px"}} />
				</div>
				<div className="pl-4">
					<span className="text-sm text-zinc-50 font-light"style={{fontSize:'20px'}}>Produit Entrés</span>
					<div className="flex items-center">
						<strong className="text-xl text-zinc-50 font-semibold"style={{fontSize:'30px'}}>{livCount}</strong>
						<span className="text-sm text-green-500 pl-2 fw-bold"></span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper className="bg-sky-800 rounded-sm p-4 border border-gray-200 flex items-center" style={{ width: '250px', height: '150px',backgroundColor:"#379392" }}>
                <div className="flex items-ce&²nter">
                    <div className='mr-4 '>
                        <BiSolidCategory className="text-2xl text-white" size={30} style={{marginTop:"-20px"}} />
                    </div>
                    <div>
                        <span className="text-sm text-zinc-50 font-light  text-center"style={{fontSize:'20px'}} >Categories</span>
                        <div className="flex items-center">
                            <strong className="text-xl text-zinc-50 font-semibold "style={{fontSize:'30px'}} >10</strong>
                        </div>
                    </div>
                </div>
            </BoxWrapper>

			<BoxWrapper className="bg-neutral-700 rounded-sm p-4 border border-gray-200 flex items-center" style={{ width: '250px', height: '150px' }}>
				<div >
					<BsCurrencyDollar  className="text-2xl text-white"  size={30} style={{marginTop:"-50px"}}/>
				</div>
				<div className="pl-4">
					<span className="text-sm text-zinc-50 font-light " style={{fontSize:'20px'}}> Coût repas</span>
					<div className="flex items-center">
                    <div className="d-flex flex-column">
    <strong className="text-xl text-zinc-50 font-semibold mb-2" style={{fontSize:'25px'}}>
        {cout.coutRepas}
    </strong>
    <span className="text-muted text-neutral-500" style={{ fontSize: '18px' }}>
        De {cout.dateRepas}
    </span>
</div>

					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper className="bg-red-500 rounded-sm p-4 border border-gray-200 flex items-center" style={{ width: '250px', height: '150px' }}>
				<div >
					<HiOutlineBellAlert className="text-2xl text-white"  size={30} style={{marginTop:"-50px"}}/>
				</div>
				<div className="pl-4">
					<span className="text-sm text-zinc-50 font-light" style={{fontSize:'20px'}}>Notification </span>
					<div className="flex items-center">
						<strong className="text-xl text-zinc-50 font-semibold"style={{fontSize:'30px'}}>0</strong>
						
					</div>
				</div>
			</BoxWrapper>
		</div>
	)
}

function BoxWrapper({ children, ...props }) {
	return (
		<div {...props}>
			{children}
		</div>
	);
}
