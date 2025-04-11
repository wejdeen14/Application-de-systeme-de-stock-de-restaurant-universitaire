import React from 'react';

import TabMag from './DashMag/TabMag';
import Header from './Header';
import DashMag from './DashMag/DashMag';
function Magasinier() {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
    <TabMag/>
      <div className='flex-1'>
   <Header/>
   <div className='flex-1 grap-12 w-full mt-2'> 
       <DashMag/>
    </div>
    </div>
    </div>
  );
}

export default Magasinier;
