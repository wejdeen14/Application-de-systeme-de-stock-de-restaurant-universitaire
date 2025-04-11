import React from 'react';
import Header from './Header';
import Fournisseur from './Fournisseur';
import TabFi from './Financier/TabFi';

function FiFor() {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <TabFi />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto mt-2">
          <Fournisseur />
        </div>
      </div>
    </div>
  );
}

export default FiFor;
