import React from 'react';

import Header from './Header';
import TabModerateur from './TabModerateur';
import ListCalculCout from './ListCalculCout';
function CoutListH() {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
    <TabModerateur/>
      <div className='flex-1 flex flex-col overflow-hidden'>
   <Header/>
   <div className='flex-1 grap-12 w-full mt-2overflow-auto'> 
       <ListCalculCout/>
    </div>
    </div>
    </div>
  )
}

export default CoutListH