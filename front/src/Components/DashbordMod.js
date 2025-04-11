import React from 'react';
import IncluDash from './ContenueDash/IncluDash';
import Header from './Header';
import TabModerateur from './TabModerateur';
function DashbordMod() {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
    <TabModerateur/>
      <div className='flex-1'>
   <Header/>
   <div className='flex-1 grap-12 w-full mt-2'> 
       <IncluDash/>
    </div>
    </div>
    </div>
  );
}

export default DashbordMod;
