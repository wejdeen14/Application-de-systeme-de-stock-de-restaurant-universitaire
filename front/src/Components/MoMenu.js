import React from 'react';
import Header from './Header';
import Menu from './Menu';
import TabModerateur from './TabModerateur';
function MoMenu () {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
    <TabModerateur/>
      <div className='flex-1 flex flex-col overflow-hidden'>
   <Header/>
   <div className='flex-1 grap-12 w-full mt-2 overflow-auto'> 
       <Menu/>
    </div>
    </div>
    </div>
  );
}

export default MoMenu;