import React from 'react';
import Header from './Header';
import ListBondeLivraison from './ListBondeLivraison';
import TabFi from './Financier/TabFi';
function FiBonLiv() {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <TabFi />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto mt-2">
          <ListBondeLivraison />
        </div>
      </div>
    </div>
  );
}

export default FiBonLiv;
