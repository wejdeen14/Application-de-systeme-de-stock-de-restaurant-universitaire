import React from 'react';
import Header from './Header';
import ListFacture from './ListFacture';
import Tab from './Tab';
function AdFacture() {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
    <Tab/>
      <div className='flex-1'>
   <Header/>
   <div className='flex-1 grap-12 w-full mt-2'> 
       <ListFacture/>
    </div>
    </div>
    </div>
  );
}

export default AdFacture;