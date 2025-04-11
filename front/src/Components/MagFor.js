import React from 'react';
import Fournisseur from './Fournisseur';
import Header from './Header';
import TabMag from './DashMag/TabMag';
import ListForMag from './ListForMag';
function MagFor() {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
    <TabMag/>
      <div className='flex-1 flex flex-col overflow-hidden '>
   <Header/>
   <div className='flex-1 grap-12 w-full mt-2 overflow-auto'> 
       <ListForMag/>
    </div>
    </div>
    </div>
  );
}

export default MagFor;