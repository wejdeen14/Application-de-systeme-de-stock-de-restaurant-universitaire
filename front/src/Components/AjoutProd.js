import React, { useState } from 'react';
import axios from 'axios';
import { MDBBtn, MDBInput ,MDBCol, MDBRow} from 'mdb-react-ui-kit';

function AjoutProd() {
  
  const [categorie, setCategorie] = useState('');
  const [unite, setUnite] = useState('');
  const [prixUnitaire, setPrixUnitaire] = useState('');
  const [nomProd, setNomProd] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Définir les données du produit
      const product = {
        nomProd: nomProd,
        unite: unite,
        prixUnitaire: prixUnitaire,
        categorie: categorie,
        qte: 0
      };
      
      const response = await axios.post('http://localhost:8080/prod/add', product);
      console.log('Product added:', response.data);
      
      // Réinitialiser le formulaire après l'ajout réussi
      setNomProd('');
      setUnite('');
      setPrixUnitaire('');
      setCategorie('');
      
      // Afficher un message de succès à l'utilisateur
      setSuccessMessage('Le produit a été ajouté avec succès.');
    } catch (error) {
      console.error('Error adding product:', error);
      // Afficher une notification d'erreur à l'utilisateur
    }
  };
    
  const categories = [
    'Matières aromatiques',
    'Huiles végétales',
    'Pain',
    'Légumes et fruits',
    'Les oeufs',
    'Viande de poulet',
    'Viande de dinde',
    'Viande locale (boeuf et mouton)',
    'Fruits de mer',
    'Lait et ses dérivés'
  ];
  const handleProd = (e) => {
 
    setNomProd( e.target.value); 
    axios.get(`http://localhost:8080/prod/verifyProduit/${nomProd}`)
        .then(response => {
            if (response.data.exists) {
                
                alert("Une entrée avec cette produit existe déjà. Veuillez creer un autre produit .");
            }
        })
        .catch(error => {
            console.error('Erreur lors de la vérification de la produit :', error);
        });
};

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-blue-900 text-center mb-8 font-bold text-2xl">Ajouter Nouveau produit</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <select className="form-select" name="categorie" value={categorie} onChange={(e) => setCategorie(e.target.value)}>
            <option value="">Sélectionner une catégorie</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <MDBInput label="Nom du produit" name="nomProd" size='lg' value={nomProd}    onChange={handleProd}  />
        </div>
        <MDBRow className="mb-3">
          <MDBCol  size="6">
            <MDBInput wrapperClass="mb-3" label="Unité*" name="unite" type="text" size='lg' required value={unite} onChange={(e) => setUnite(e.target.value)}   />
          </MDBCol>
          <MDBCol  size="6">
            <MDBInput wrapperClass="mb-3" label="Prix unitaire*" name="prixUnitaire" size='lg' type="number" required value={prixUnitaire}onChange={(e) => setPrixUnitaire(e.target.value)} />
          </MDBCol>
        </MDBRow>
        <div className="d-flex justify-content-center">
          <MDBBtn className='mb-2 text-white bg-blue-900' size='lg' >Ajouter un nouveau produit </MDBBtn>
        </div>
      </form>
    </div>
  );
}

export default AjoutProd;
