import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import Adfournisseur from './Components/Adfournisseur';
import Adpersonnel from './Components/Adpersonnel';
import AjoutBondeCommande from './Components/AjoutBondeCommande';

import AdListBondeLivraison from './Components/AdListBondeLivraison';
import AdListStockSortie from './Components/AdListStockSortie';
import AdProduitStock from './Components/AdProduitStock';
import AjoutLiv from './Components/AjoutLiv';
import AjoutSortie from './Components/AjoutSortie';
import Ajoutfournisseur from './Components/Ajoutfournisseur';
import Calcul from './Components/ContenueDash/Calcul';
import CercleStatique from './Components/ContenueDash/CercleStatique';
import Histogramme from './Components/ContenueDash/Histogramme';
import IncluDash from './Components/ContenueDash/IncluDash';
import StateBloc from './Components/ContenueDash/StateBloc';

import TabMag from './Components/DashMag/TabMag';
import Dashbord from './Components/Dashbord';
import DashbordMod from './Components/DashbordMod';
import Financier from './Components/Financier';
import Fournisseur from './Components/Fournisseur';
import Header from './Components/Header';

import Inscription from './Components/Inscription';
import ListBondcommande from './Components/ListBondcommande';
import ListBondeLivraison from './Components/ListBondeLivraison';
import ListForMag from './Components/ListForMag';
import ListMenu from './Components/ListMenu';
import ListSortieMag from './Components/ListSortieMag';
import ListStockSortie from './Components/ListStockSortie';
import Login from './Components/Login';
import MagFor from './Components/MagFor';
import MagListBondeCommande from './Components/MagListBondeCommande';
import MagListBondeLivraison from './Components/MagListBondeLivraison';
import MagListStockSortie from './Components/MagListStockSortie';
import MagProduitStock from './Components/MagProduitStock';
import MagShowFor from './Components/MagShowFor';
import MagShowSortie from './Components/MagShowSortie';
import Magasinier from './Components/Magasinier';
import Menu from './Components/Menu';
import MoMenu from './Components/MoMenu';
import ModProduitStock from './Components/ModProduitStock';
import ModerateurMenu from './Components/ModerateurMenu';
import Personnel from './Components/Personnel';
import ProduitStosk from './Components/ProduitStosk';
import Show from './Components/Show';
import ShowBondeLiv from './Components/ShowBondeLiv';
import ShowMenu from './Components/ShowMenu';
import ShowSortie from './Components/ShowSortie';
import Showcmd from './Components/Showcmd';
import Showfournisseur from './Components/Showfournisseur';
import Admin from './Components/Tab';
import TabModerateur from './Components/TabModerateur';

import AjoutFacture from './Components/AjoutFacture';
import ListFacture from './Components/ListFacture';
import ShowFacture from './Components/ShowFacture';

import AdFacture from './Components/AdFacture';
import AdListMenu from './Components/AdListMenu';
import ConsulterFacture from './Components/ConsulterFacture';
import ConsulterMenu from './Components/ConsulterMenu';
import ConsulterProduit from './Components/ConsulterProduit';
import MagConsulterFacture from './Components/MagConsulterFacture';
import MagConsulterMenu from './Components/MagConsulterMenu';
import MoListMenu from './Components/MoListMenu';


import FiListFacture from './Components/Financier/FiListFacture';

import TabFi from './Components/Financier/TabFi';
import Footer from './Components/Footer';

import AjoutProd from './Components/AjoutProd';
import AjoutRepasServi from './Components/AjoutRepasServi';
import CercleMod from './Components/ContenueDash/CercleMod';
import CalculRp from './Components/DashMag/CalculRp';
import DashMag from './Components/DashMag/DashMag';
import StateMag from './Components/DashMag/StateMag';
import CercleFacture from './Components/Financier/CercleFacture';
import DashFi from './Components/Financier/DashFi';
import StateFi from './Components/Financier/StateFi';
import ListCalculCout from './Components/ListCalculCout';
import ListRepaServi from './Components/ListRepaServi';
import Reglageprofile from './Components/Reglageprofile';

import CoutListH from './Components/CoutListH';
import LougOut from './Components/LougOut';
import RepasListH from './Components/RepasListH';
import SecurityCodePage from './Components/SecurityCodePage';
import NouveauMDP from './Components/NouveauMDP';

import MagRepas from './Components/MagRepas';
import MagCout from './Components/MagCout';

import Fiboncmd from './Components/Fiboncmd';
import FiBonLiv from './Components/FiBonLiv';
import FiFor from './Components/FiFor';

function App() {
  return (
    <div>
     <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Inscription" element={<Inscription />} />
          <Route path="/Inscription/:id" element={<Inscription />} />
          <Route path="/Personnel" element={<Personnel />} /> 
          <Route path="/Show/:id" element={<Show />} /> 
          <Route path="/Admin" element={<Admin />} /> 
          <Route path="/ModerateurMenu" element={<ModerateurMenu />} /> 
          <Route path="/Magasinier" element={<Magasinier />} /> 
          <Route path="/Financier" element={<Financier />} /> 
          <Route path="/Fournisseur" element={<Fournisseur/>}/>
          <Route path="/Ajoutfournisseur" element={<Ajoutfournisseur/>}/> 
          <Route path="/Ajoutfournisseur/:id_for" element={<Ajoutfournisseur />} />
          <Route path="/Showfournisseur/:id_for" element={<Showfournisseur/>}/> 
          <Route path="/ProduitStock" element={<ProduitStosk/>}/> 
       
          <Route path="/Menu" element={<Menu/>}/>  
          <Route path="Adpersonnel" element={<Adpersonnel/>}/>  
          <Route path="/Header" element={<Header/>}/>  
          <Route path="Dashbord" element={<Dashbord/> }/>
          <Route path="Adfournisseur" element={<Adfournisseur/> }/>
          <Route path="AjoutBondeCommande" element={<AjoutBondeCommande/> }/>
         
          <Route path="ListBondcommande" element={ <ListBondcommande/>} />
          <Route path="ListBondeLivraison" element={ <ListBondeLivraison/>} />
          <Route path="Showcmd/:idCmd" element={<Showcmd/> }/>
          <Route path="ShowBondeLiv/:id_liv" element={<ShowBondeLiv/> }/>
          <Route path="ListStockSortie" element={<ListStockSortie/>} />
          <Route path="ShowSortie/:id_sortie" element={<ShowSortie/>}/>
          <Route path="AjoutSortie" element={<AjoutSortie/>}/>
          <Route path="StateBloc" element={<StateBloc/>}/>
          <Route path="CercleStatique" element={ <CercleStatique/>}/>
          <Route path="Histogramme" element ={<Histogramme/>}/>
          <Route path="Calcul" element ={<Calcul/>}/>
          <Route path="IncluDash" element ={<IncluDash/>}/>
          <Route path="AdListBondeLivraison" element ={<AdListBondeLivraison/>}/>
          <Route path="AdListStockSortie" element ={<AdListStockSortie/>}/>
          <Route path="AdProduitStock" element ={<AdProduitStock/>}/>
          <Route path="TabModerateur" element ={<TabModerateur/>}/>
         
          <Route path="MoMenu" element ={<MoMenu/>}/>
          <Route path="DashbordMod" element ={<DashbordMod/>}/>
          <Route path="ModProduitStock" element ={<ModProduitStock/>}/>
          <Route path="TabMag" element ={<TabMag/>}/>
          
          <Route path="MagProduitStock" element ={<MagProduitStock/>}/>
          <Route path="MagListStockSortie" element ={<MagListStockSortie/>}/>
          <Route path="MagListBondeLivraison" element ={<MagListBondeLivraison/>}/>
          <Route path="MagFor" element ={<MagFor/>}/>
          <Route path="MagListBondeCommande" element ={<MagListBondeCommande/>}/>
          <Route path="MagShowFor/:id_for" element ={<MagShowFor/>}/>
          <Route path="ListForMag" element ={<ListForMag/>}/>
          <Route path="MagShowSortie/:id_sortie" element ={<MagShowSortie/>}/>
          <Route path="ListSortieMag" element ={<ListSortieMag/>}/>
          <Route path="ListMenu" element ={<ListMenu/>}/>
          <Route path="ShowMenu/:idMenu" element ={<ShowMenu/>}/>
          <Route path="AjoutLiv" element ={<AjoutLiv/>}/>

          <Route path="ListFacture" element ={<ListFacture/>}/>
          <Route path="ShowFacture/:idFac" element ={<ShowFacture/>}/>
          <Route path="AjoutFacture" element ={<AjoutFacture/>}/>

          <Route path="AdFacture" element ={<AdFacture/>}/>
          <Route path="AdListMenu" element ={<AdListMenu/>}/>

          <Route path="MagConsulterMenu" element ={<MagConsulterMenu/>}/>
          <Route path="ConsulterMenu" element ={<ConsulterMenu/>}/>

          <Route path="ConsulterFacture" element ={<ConsulterFacture/>}/>
          <Route path="MagConsulterFacture" element ={<MagConsulterFacture/>}/>
          <Route path="ConsulterProduit" element ={<ConsulterProduit/>}/>
          <Route path="MoListMenu" element ={<MoListMenu/>}/>

          <Route path="TabFi" element ={<TabFi/>}/>
         
      
          <Route path="FiListFacture" element ={<FiListFacture/>}/>

          <Route path="Footer" element ={<Footer/>}/>
          <Route path="StateFi" element ={<StateFi/>}/>
      
      <Route path="CercleFacture" element ={<CercleFacture/>}/>

      <Route path="DashFi" element ={<DashFi/>}/>
      <Route path="StateMag" element ={<StateMag/>}/>
      <Route path="DashMag" element ={<DashMag/>}/>
      <Route path="CalculRp" element ={<CalculRp/>}/>
      <Route path="CalculRp/:idcout" element ={<CalculRp/>}/>
      <Route path="AjoutRepasServi" element ={<AjoutRepasServi/>}/>
      <Route path="AjoutRepasServi/:idrepas" element ={<AjoutRepasServi/>}/>
      <Route path="ListRepaServi" element ={<ListRepaServi/>}/>
      <Route path="ListCalculCout" element ={<ListCalculCout/>}/>
      <Route path="Reglageprofile" element ={<Reglageprofile/>}/>
      <Route path="AjoutProd" element={<AjoutProd/>}/>
      <Route path="CercleMod" element={<CercleMod/>}/>

      <Route path="RepasListH" element={<RepasListH/>}/>
      <Route path="CoutListH" element={<CoutListH/>}/>
      <Route path="LougOut" element={<LougOut/>}/>
      <Route path="SecurityCodePage" element={<SecurityCodePage/>}/>
      <Route path="NouveauMDP" element={<NouveauMDP/>}/>
      <Route path="MagRepas" element={<MagRepas/>}/>
      <Route path="MagCout" element={<MagCout/>}/>

      <Route path="FiBonLiv" element={<FiBonLiv/>}/>
      <Route path="Fiboncmd" element={<Fiboncmd/>}/>

      <Route path="FiFor" element={<FiFor/>}/>
        </Routes> 
      </Router>
  </div>
  )
}

export default App;
