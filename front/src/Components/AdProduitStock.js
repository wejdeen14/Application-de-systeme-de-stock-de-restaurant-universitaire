import React from 'react';
import Header from './Header';
import Tab from './Tab';
import ProduitStosk from './ProduitStosk';

function AdProduitStock() {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <Tab />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto mt-2">
          <ProduitStosk />
        </div>
      </div>
    </div>
  );
}

export default AdProduitStock;
