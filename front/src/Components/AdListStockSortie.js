import React from 'react'
import Header from './Header';
import Personnel from './Personnel';
import Tab from './Tab';
import ListStockSortie from './ListStockSortie';
function AdListStockSortie() {
  return (
        <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
        <Tab/>
          <div className='flex-1 flex flex-col overflow-hidden'>
       <Header/>
       <div className='flex-1 grap-12 w-full mt-2 overflow-auto'> 
           <ListStockSortie/>
        </div>
        </div>
        </div>
      );
    }

export default AdListStockSortie