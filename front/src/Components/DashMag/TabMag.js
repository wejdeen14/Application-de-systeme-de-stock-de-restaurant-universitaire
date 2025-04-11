import classNames from 'classnames';
import React, { useState } from 'react';
import { FaAlignJustify, FaUsers } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { HiUsers } from "react-icons/hi2";
import { IoBagCheck, IoBagHandle, IoBagRemove } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineHelpOutline, MdOutlineRestaurantMenu } from "react-icons/md";
import * as RiIcons from 'react-icons/ri';
import { RiProductHuntLine } from "react-icons/ri";
import { BiDuplicate } from "react-icons/bi";
import { Link, useLocation } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { BiFoodMenu } from "react-icons/bi";
import { FaCalculator } from "react-icons/fa6";
function TabMag() {
  const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sn text-base';
  const { pathname } = useLocation();
  const [isOpenMap, setIsOpenMap] = useState({});

  const toggleDropdown = (key) => {
    setIsOpenMap(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const linkdash = [
    {
      key: 'Dashbord',
      label: 'Tableau de bord',
      path: '/Magasinier',
      icon: <FaAlignJustify />
    },
   
    {
      key: 'Fournisseur',
      label: 'Fournisseur',
      path: '/MagFor',
      icon: <HiUsers />
    },
    {
      key: 'ProduitStosk',
      label: 'ProduitStosk',
      path: '/MagProduitStock',
      icon: <RiProductHuntLine />
    },
    {
      key: 'suivi',
      label: 'Mouvement Stock',
      path: '',
      icon: <IoBagHandle />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
        {
          key: 'commande',
          label: 'Bonde commande ',
          path: '/MagListBondeCommande',
          icon: <BiDuplicate />
        },
        {
          key: 'entre',
          label: 'Produits Entrées',
          path: '/MagListBondeLivraison',
          icon: <IoBagCheck />
        },
        {
          key: 'sortie',
          label: 'Produits Sorties',
          path: '/MagListStockSortie',
          icon: <IoBagRemove />
        }
      ]
    },
    {
      key: 'Facture',
      label: 'Facture',
      path: '/MagConsulterFacture',
      icon: <GrNotes />
    },

    {
      key: 'Nombre repas ',
      label: 'Nombre repas',
      path: '/MagRepas',
      icon: <BiFoodMenu />
    },
    {
      key: 'cout repas',
      label: 'Cout repas',
      path: '/MagCout',
      icon: <FaCalculator />
    },
    
    {
      key: 'menu',
      label: 'Menu',
      path: '/MagConsulterMenu',
      icon: <MdOutlineRestaurantMenu />
    }
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

  const LinkBoard = ({ item }) => {
    const isOpen = isOpenMap[item.key] || false;

    return (
      <>
        <Link
          to={item.path}
          className={classNames(
            pathname === item.path ? 'bg-neutral-700 text-neutral-50' : 'text-neutral-400',
            linkClasses
          )}
          onClick={() => toggleDropdown(item.key)}
        >
          <span className='text-xl'>{item.icon}</span>
          {item.label}
          {item.subNav && (isOpen ? item.iconOpened : item.iconClosed)}
        </Link>
        {isOpen && item.subNav && (
          <>
            {item.subNav.map((subItem) => (
              <Link
                key={subItem.key}
                to={subItem.path}
                className={linkClasses}
              >
                <span className='text-xl'>{subItem.icon}</span>
                {subItem.label}
              </Link>
            ))}
          </>
        )}
      </>
    );
  };

  const LinkButton = ({ item }) => (
    <Link
      to={item.path}
      className={classNames(pathname === item.path ? 'bg-neutral-700 ' : 'text-neutral-400', linkClasses)}
    >
      <span className='text-xl'>{item.icon}</span>
      {item.label}
    </Link>
  );

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

export default TabMag;
