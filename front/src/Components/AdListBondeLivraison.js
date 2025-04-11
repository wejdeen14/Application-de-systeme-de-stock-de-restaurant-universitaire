import React from 'react';
import Header from './Header';
import ListBondeLivraison from './ListBondeLivraison';
import Tab from './Tab';
function AdListBondeLivraison() {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
    <Tab/>
      <div className='flex-1 flex flex-col overflow-hidden'>
   <Header/>
   <div className='flex-1 grap-12 w-full mt-2 overflow-auto'> 
       <ListBondeLivraison/>
    </div>
    </div>
    </div>
  )
}

export default AdListBondeLivraison