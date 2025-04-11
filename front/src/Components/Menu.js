import React, { useState } from 'react';
import axios from 'axios';
import { Box, Tab, Tabs } from '@mui/material';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBRow } from 'mdb-react-ui-kit';

function MenuSelector() {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [entre, setEntre] = useState('');
  const [principale, setPrincipale] = useState('');
  const [desserts, setDesserts] = useState([
    { idDessert: '', nomDessert: '' },
    { idDessert: '', nomDessert: '' },
    { idDessert: '', nomDessert: '' }
  ]);
  const [supplimentaires, setSupplimentaires] = useState([
    { idSupp: '', nomSupp: '' },
    { idSupp: '', nomSupp: '' },
    { idSupp: '', nomSupp: '' }
  ]);

  const handleChange = (event, newValue) => {
    setSelectedMenu(newValue);
  };

  const AjoutMenu = () => {
    const nomMenu = selectedMenu === 0 ? 'MATIN' : selectedMenu === 1 ? 'MIDI' : 'SOIR';
    const data = {
      idMenu: '',
      dateCreation: new Date().toISOString(),
      nomMenu: nomMenu,
      plats: [
        {
          id_plat: '',
          entre: entre,
          principale: principale,
          desserts: desserts,
          supplimentaires: supplimentaires
        }
      ]
    };
    

    axios.post("http://localhost:8080/menu/AjoutMenu", data)
      .then((response) => {
        console.log(response.data);
        // Affichez un message de succès ou effectuez une autre action appropriée

        setEntre('');
        setPrincipale('');
        setDesserts([
          { idDessert: '', nomDessert: '' },
          { idDessert: '', nomDessert: '' },
          { idDessert: '', nomDessert: '' }
        ]);
        setSupplimentaires([
          { idSupp: '', nomSupp: '' },
          { idSupp: '', nomSupp: '' },
          { idSupp: '', nomSupp: '' }
        ]);
      })
      .catch((error) => {
        console.error(error);
        // Affichez un message d'erreur ou effectuez une autre action appropriée
      });
  };


  return (
    <div>
      <Tabs value={selectedMenu} onChange={handleChange} aria-label="basic tabs example" centered>
        <Tab label="MATIN" />
        <Tab label="MIDI" />
        <Tab label="SOIR" />
      </Tabs>
      <TabPanel value={selectedMenu} index={0}>
  <MatinMenu
    selectedMenu={selectedMenu}
    desserts={desserts}
    setDesserts={setDesserts}// Passer la fonction en tant que prop
  />
      </TabPanel>
      <TabPanel value={selectedMenu} index={1}>
        <Menu
          selectedMenu="MIDI"
          entre={entre}
          setEntre={setEntre}
          principale={principale}
          setPrincipale={setPrincipale}
          desserts={desserts}
          setDesserts={setDesserts}
          supplimentaires={supplimentaires}
          setSupplimentaires={setSupplimentaires}
          AjoutMenu={AjoutMenu}
        />
      </TabPanel>
      <TabPanel value={selectedMenu} index={2}>
        <Menu
          selectedMenu="SOIR"
          entre={entre}
          setEntre={setEntre}
          principale={principale}
          setPrincipale={setPrincipale}
          desserts={desserts}
          setDesserts={setDesserts}
          supplimentaires={supplimentaires}
          setSupplimentaires={setSupplimentaires}
          AjoutMenu={AjoutMenu}
        />
      </TabPanel>
    </div>
  );
}

function Menu({ selectedMenu, entre, setEntre, principale, setPrincipale, desserts, setDesserts, supplimentaires, setSupplimentaires, AjoutMenu }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    AjoutMenu();
  };

  const handleSupplimentaireChange = (e, index) => {
    const newSupplimentaires = [...supplimentaires];
    newSupplimentaires[index] = { idSupp: '', nomSupp: e.target.value };
    setSupplimentaires(newSupplimentaires);
  };

  const handleDessertChange = (e, index) => {
    const newDesserts = [...desserts];
    newDesserts[index] = { ...newDesserts[index], nomDessert: e.target.value };
    setDesserts(newDesserts);
  };

  return (
    <div className="d-flex justify-content-center">
      <MDBCard style={{ width: '30rem' }}>
        <MDBCardBody>
          <div style={{ marginTop: '20px' }}>
            <h1 style={{ fontFamily: 'Poppins', marginTop: '-60px', marginBottom: '30px', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '25px', fontWeight: 'bold', textAlign: 'center', marginTop: "10px" }}> Menu {selectedMenu}</h1>
            <form onSubmit={handleSubmit}>
              <MDBRow className='mb-3'>
                <MDBCol size='auto' className="text-muted mb-4 fw-bold">Plat d'entrée :</MDBCol>
                <MDBCol>
                  <select id='plat_entree' className="form-select" required value={entre} onChange={(e) => setEntre(e.target.value)}>
                    <option value="" disabled>Sélectionner un plat</option>
                    <option value='salade'>Salade</option>
                    <option value='salade-omek-houria'>Salade Omek Houria</option>
                    <option value='salade-mechwiya'>Salade Mechwiya</option>
                    <option value='salade-mfawra'>Salade Mfawra</option>
                  </select>
                </MDBCol>
              </MDBRow>
              <MDBRow className='mb-3'>
                <MDBCol size='auto' className="text-muted mb-4 fw-bold">Plat principal :</MDBCol>
                <MDBCol>
                  <select id='plat_principal' className="form-select" required value={principale} onChange={(e) => setPrincipale(e.target.value)}>
                    <option value="" disabled>Sélectionner un plat principal</option>
                    <option value='koskous'>Koskous</option>
                    <option value='loubya'>Loubya</option>
                    <option value='rize'>Rize</option>
                    <option value='ma9rouna'>Ma9rouna</option>
                    <option value='kamouniya'>Kamouniya</option>
                  </select>
                </MDBCol>
              </MDBRow>
              {supplimentaires.map((supplementaire, index) => (
                <MDBRow key={index} className='mb-3'>
                  <MDBCol size='auto' className="text-muted mb-4 fw-bold">Supplémentaire ({index + 1}) :</MDBCol>
                  <MDBCol>
                    <select
                      id={`supplementaire_${index + 1}`}
                      className="form-select"
                      required
                      value={supplementaire.nomSupp}
                      onChange={(e) => handleSupplimentaireChange(e, index)}
                    >
                      <option value="" disabled>Sélectionner un supplémentaire</option>
                      <option value='parquette'>Parquette</option>
                      <option value='poulet-grille'>Poulet grillé</option>
                      <option value='viande-grille'>Viande grillé</option>
                      <option value='tajin'>Tajin</option>
                      <option value='pizza'>Pizza</option>
                      <option value='oeuf'>Oeuf</option>
                      <option value='fromage'>Fromage</option>
                    </select>
                  </MDBCol>
                </MDBRow>
              ))}
             {[...Array(2)].map((_, index) => (
                <MDBRow key={index} className='mb-3'>
                  <MDBCol size='auto' className="text-muted mb-4 fw-bold">Dessert {index + 1} :</MDBCol>
                  <MDBCol>
                    <select id={`dessert_${index + 1}`} className="form-select" required value={desserts[index].nomDessert} onChange={(e) => handleDessertChange(e, index)}>
                      <option value="" disabled>Sélectionner un dessert</option>
                      <option value='pomme'>Pomme</option>
                      <option value='orange'>Orange</option>
                      <option value='mandaline'>Mandaline</option>
                      <option value='poire'>Poire</option>
                      <option value='yaourt'>Yaourt</option>
                      <option value='jue'>Jue</option>
                      <option value='boisson-gazeuse'>Boison gazeuse</option>
                      <option value='kake'>Kake</option>
                    </select>
                  </MDBCol>
                </MDBRow>
              ))}
              <div className="text-center">
                <MDBBtn className="mb-4 mt-4" style={{ color: 'white', backgroundColor: ' #1e3a8a', fontFamily: 'Poppins', letterSpacing: '2px' }} size='lg' type="submit">Envoyer</MDBBtn>
              </div>
            </form>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
const MatinMenu = ({ selectedMenu, desserts, setDesserts }) => {
  const handleDessertChange = (e, index) => {
    const newDesserts = [...desserts];
    newDesserts[index] = { ...newDesserts[index], nomDessert: e.target.value };
    setDesserts(newDesserts);
  };
  const AjoutMatin = () => {
    const nomMenu = 'MATIN'; // Assurez-vous de définir correctement la valeur de nomMenu
    const data = {
      idMenu: '',
      dateCreation: new Date().toISOString(),
      nomMenu: nomMenu,
      plats: [
        {
          id_plat: '',
          desserts: desserts // Inclure les desserts du matin dans les données à envoyer
        }
      ]
    };
  
    axios.post("http://localhost:8080/menu/AjoutMenu", data)
      .then((response) => {
        console.log(response.data);
        // Affichez un message de succès ou effectuez une autre action appropriée
  
        // Réinitialiser les desserts du matin après l'envoi réussi
        setDesserts([
          { idDessert: '', nomDessert: '' },
          { idDessert: '', nomDessert: '' },
          { idDessert: '', nomDessert: '' }
        ]);
      })
      .catch((error) => {
        console.error(error);
        // Affichez un message d'erreur ou effectuez une autre action appropriée
      });
  };
  
  return (
    <div className="d-flex justify-content-center">
      <MDBCard style={{ width: '30rem' }}>
        <MDBCardBody>
          <div style={{ marginTop: '20px' }}>
            <h1 style={{ fontFamily: 'Poppins', marginTop: '-60px', marginBottom: '30px', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '25px', fontWeight: 'bold', textAlign: 'center', marginTop: "10px" }}>Menu Matin</h1>
            <form>
            {[...Array(3)].map((_, index) => (
  <MDBRow key={index} className='mb-3'>
    <MDBCol size='auto' className="text-muted mb-4 fw-bold">Dessert {index + 1} :</MDBCol>
    <MDBCol>
      <select id={`dessert_${index + 1}`} className="form-select" required value={desserts[index].nomDessert} onChange={(e) => handleDessertChange(e, index)}>
        <option value="" disabled>Sélectionner un dessert</option>
        <option value='pomme'>Pomme</option>
        <option value='orange'>Orange</option>
        <option value='mandaline'>Mandaline</option>
        <option value='poire'>Poire</option>
        <option value='yaourt'>Yaourt</option>
        <option value='jue'>Jue</option>
        <option value='boisson-gazeuse'>Boisson gazeuse</option>
        <option value='kake'>Kake</option>
      </select>
    </MDBCol>
  </MDBRow>
))}

              <div className="text-center">
                <MDBBtn className="mb-4 mt-4" style={{ color: 'white', backgroundColor: ' #1e3a8a', fontFamily: 'Poppins', letterSpacing: '2px' }} size='lg' type="submit" onClick={AjoutMatin}>Envoyer</MDBBtn>
              </div>
            </form>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <div>
      <MenuSelector />
    </div>
  );
}
