import React from 'react';
import IncluDash from './ContenueDash/IncluDash';
import Footer from './Footer';
import Header from './Header';
import Tab from './Tab';
function Dashbord() {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
    <Tab/>
      <div className='flex-1'>
   <Header/>
   <div className='flex-1 grap-12 w-full mt-2'> 
       <IncluDash/>
   
   
    </div>
    </div>
    </div>
  );
}

export default Dashbord;
