import React from 'react';
import Header from '../Header';
import ListFacture from '../ListFacture';
import TabFi from './TabFi';

function FiListFacture() {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <TabFi />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto mt-2">
          <ListFacture />
        </div>
      </div>
    </div>
  );
}

export default FiListFacture;
