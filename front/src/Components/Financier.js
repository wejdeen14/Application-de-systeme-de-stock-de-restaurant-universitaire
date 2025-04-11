import React from 'react';
import DashFi from './Financier/DashFi';
import TabFi from './Financier/TabFi';
import Header from './Header';
function Financier() {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
    <TabFi/>
      <div className='flex-1'>
   <Header/>
   <div className='flex-1 grap-12 w-full mt-2'> 
       <DashFi/>
    </div>
    </div>
    </div>
  );
}

export default Financier;
