import classNames from 'classnames';
import React from 'react';
import { FaAlignJustify, FaHistory } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineHelpOutline, MdOutlineRestaurantMenu } from "react-icons/md";
import { RiProductHuntLine } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { BiFoodMenu } from "react-icons/bi";
import { FaCalculator } from "react-icons/fa6";
function TabModerateur() {
    const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sn text-base';
   
    const { pathname } = useLocation();
    
      const linkdash = [
        {
          key: 'Dashbord',
          label: 'Tableau de bord',
          path: '/DashbordMod',
          icon: <FaAlignJustify />
        },
        {
          key: 'Nombre repas ',
          label: 'Nombre repas',
          path: '/RepasListH',
          icon: <BiFoodMenu />
        },
        {
          key: 'cout repas',
          label: 'cout repas',
          path: '/CoutListH',
          icon: <FaCalculator />
        },
       
        {
          key: 'Menu',
          label: 'Menu',
          path: '/MoMenu',
          icon:<MdOutlineRestaurantMenu />,
        },{
          
              key: 'Historique Menu',
              label: 'Historique Menu',
              path: '/MoListMenu',
              icon:<FaHistory />
            },
         
        {
          key: 'Produit',
          label: 'Produit Stock',
          path: '/ModProduitStock',
          icon: <RiProductHuntLine />
        },
    
        
       
      ];
    
      const linkbuttom = [
        {
          key: 'info',
          label: 'Aide & Info ',
          path: '/',
          icon:<MdOutlineHelpOutline />
        },
        {
          key: 'Déconnexion',
          label: 'Déconnexion',
          path: '/',
          icon: <LuLogOut />
        }
      ];
    
     
      const LinkButton = ({ item }) => (
        <Link
          to={item.path}
          className={classNames(pathname === item.path ? 'bg-neutral-700 ' : 'text-neutral-400', linkClasses)}
        >
          <span className='text-xl'>{item.icon}</span>
          {item.label}
        </Link>
      );
      const LinkBoard = ({ item }) => (
        <Link to={item.path} className={classNames(pathname === item.path ? 'bg-neutral-700 text-neutral-50' : 'text-neutral-400', linkClasses)}>
          <span className='text-xl'>{item.icon}</span>
          {item.label}
          
        </Link>
      )
      return (
        <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white h-screen ">
          <div className='flex items-center'>
            <span className='text-neutral-400 text-lg'> </span>
          </div>
         
          <div className='bloc' style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
    <h1 className='fw-bold' style={{ fontFamily: 'eater', color: '#e52165', fontSize: '25px', marginBottom: '-18px' }}>Resto</h1>
    <p className="ml-5 fw-bold" style={{ fontFamily: 'eater', color: '#039fbe', fontSize: '20px' }}>Universitaire</p> 
    {/* Logo à droite */}
    <img src="/blue.png" alt="Logo Droite" style={{ position: 'absolute', top: 0, right: 0, width: '90px', height: 'auto', marginRight: "-100px",marginTop:"-20px" }} />
</div>

  <div>
  </div>
</div>

        
          <div className='flex-1 py-8 flex flex-col gap-0.5'>
            {linkdash.map((item) => (
              <LinkBoard key={item.key} item={item} />
            ))}
          </div>
          <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
            {linkbuttom.map((item) => (
              <LinkButton key={item.key} item={item} />
            ))}
          </div>
        </div>
      );
    }

export default TabModerateur