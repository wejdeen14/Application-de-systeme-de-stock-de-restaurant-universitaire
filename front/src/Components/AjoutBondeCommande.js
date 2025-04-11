import axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { IoAddCircleSharp } from 'react-icons/io5';
import { PiNotepadLight } from 'react-icons/pi';


const AjoutBondeCommande = () => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [selectedFournisseurId, setSelectedFournisseurId] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [nouveauxChamps, setNouveauxChamps] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Récupérer la liste des fournisseurs au chargement du composant
    axios.get('http://localhost:8080/four/fournisseurs')
      .then(response => {
        setFournisseurs(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des fournisseurs :', error);
      });
  }, []);

  const handleFournisseurChange = event => {
    const selectedId = event.target.value;
    setSelectedFournisseurId(selectedId);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (selectedFournisseurId) {
          const response = await axios.get(`http://localhost:8080/four/fournisseurs-categories`);
          const fournisseur = fournisseurs.find(f => f.id_for === parseInt(selectedFournisseurId));

          if (fournisseur) {
            // Filtrer les catégories pour le fournisseur sélectionné
            const filteredCategories = fournisseur.categories;
            setCategories(filteredCategories);

            // Associer chaque catégorie à une liste de produits (simulé)
            const productsByCategory = {
              'Matières aromatiques': [{ name: 'Produit 1' }, { name: 'Produit 2' }, { name: 'Produit 3' }],
              'Huiles végétales': [{ name: 'Produit 4' }, { name: 'Produit 5' }, { name: 'Produit 6' }],
              'Pain': [{ name: 'Produit 7' }, { name: 'Produit 8' }, { name: 'Produit 9' }],
              'Légumes et fruits': [{ name: 'pomme' }, { name: 'orange' }, { name: 'mandarine' }, { name: 'tomate' },
                { name: 'carotte' }, { name: 'laitue' }, { name: 'pomme de terre' }, { name: 'oignon' },
                { name: 'abricot' }, { name: 'fraise' }],
              'Les oeufs': [{ name: 'Produit 7333' }],
              'Viande de poulet': [{ name: 'Produit 711' }],
              'Viande de dinde': [{ name: 'Produit 799' }],
              'Viande locale (boeuf et mouton)': [{ name: 'Produit 777' }],
              'Fruits de mer': [{ name: 'Produit 7444' }],
              'Lait et ses dérivés': [{ name: 'Produit 788' }],
            };

            // Mettre à jour l'état des produits par catégorie
            setCategoryProducts(productsByCategory);
          }
        } else {
          // Réinitialiser les catégories et les produits si aucun fournisseur n'est sélectionné
          setCategories([]);
          setCategoryProducts({});
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
        setCategories([]);
        setCategoryProducts({});
      }
    };

    fetchCategories();
  }, [selectedFournisseurId, fournisseurs]);

  const ajouterNouveauChamp = () => {
    const nouvelChamp = {
      categorie: '',
      produit: '',
      datexp: '',
      unite: '',
      prix_unitaire: '',
      quantite: ''
    };
    setNouveauxChamps([...nouveauxChamps, nouvelChamp]);
  };

  const handleChange = (value, index, champKey) => {
    const updatedChamps = [...nouveauxChamps];
    updatedChamps[index][champKey] = value;
    setNouveauxChamps(updatedChamps);
  };

  const handleAjoutBonde = () => {
    const fournisseurSelectionne = fournisseurs.find(fournisseur => fournisseur.id_for === parseInt(selectedFournisseurId));
    const nomFor = fournisseurSelectionne ? fournisseurSelectionne.nom_for : '';

    const data = {
      idCmd: '', // Remplacez par l'ID de la commande approprié
      date_cmd: new Date().toISOString(),
      fournisseur: nomFor,
      detailcomds: nouveauxChamps.map(champ => ({
        id_detail: '', 
        nomProd: champ.produit,
        quantite: champ.quantite,
        unite: champ.unite,
        categorie: champ.categorie 
      }))
    };
   
    axios.post("http://localhost:8080/cmd/Ajoutcmd", data)
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Commande envoyée avec succès');
        setNouveauxChamps([]);
      })
      .catch(error => {
        console.error('Erreur lors de l\'envoi de la commande :', error);
        // Gérer les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
      });
  };

  return (
    <div>
      <MDBContainer fluid className="d-flex justify-content-center align-items-center h-100">
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard className='mx-5 mb-5 p-5 shadow'>
              <MDBCardBody className='p-6 align-items-center mx-auto'>
                <h1 className='flex text-blue-900 text-center ml-8' style={{ fontFamily: 'poppins', marginTop: '-50px', marginBottom: '30px', letterSpacing: '2px', textAlign: 'center', textTransform: 'uppercase', fontSize: '25px', fontWeight: 'bold' }}>
                  <PiNotepadLight style={{ size: '24px', fontWeight: 'bold' }} /> Ajouter Bon de Commande
                </h1>
                <form>
                  <MDBRow className="mb-3">
                    <MDBCol size="12">
                      <select onChange={handleFournisseurChange} className='form-select'>
                        <option value="">Sélectionner un fournisseur</option>
                        {fournisseurs.map(fournisseur => (
                          <option key={fournisseur.id_for} value={fournisseur.id_for}>
                            {fournisseur.nom_for}
                          </option>
                        ))}
                      </select>
                    </MDBCol>
                  </MDBRow>

                  {/* Section pour ajouter de nouveaux champs */}
                  {nouveauxChamps.map((champ, index) => (
                    <div key={index}>
                      <MDBRow className="mb-3">
                        <MDBCol size="6">
                          <select className='form-select' value={champ.categorie} onChange={e => handleChange(e.target.value, index, 'categorie')}>
                            <option value="">Sélectionner une catégorie</option>
                            {categories.map((categorie, idx) => (
                              <option key={idx} value={categorie}>
                                {categorie}
                              </option>
                            ))}
                          </select>
                        </MDBCol>
                        <MDBCol size="6">
                          <select className='form-select' value={champ.produit} onChange={e => handleChange(e.target.value, index, 'produit')}>
                            <option value="">Sélectionner un produit</option>
                            {categoryProducts[champ.categorie]?.map((product, idx) => (
                              <option key={idx} value={product.name}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="mb-3">
                        <MDBCol size="6">
                          <MDBInput wrapperClass='mb-2' label='Quantité*' id={`quantite_${index}`} type='number' required value={champ.quantite} onChange={e => handleChange(e.target.value, index, 'quantite')} />
                        </MDBCol>
                        <MDBCol size="6">
                          <MDBInput wrapperClass='mb-2' label='Unité*' id={`unite_${index}`} type='text' required value={champ.unite} onChange={e => handleChange(e.target.value, index, 'unite')} />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="mb-3">
                        <MDBCol size="6">
                          <MDBInput wrapperClass='mb-2' label='Prix unitaire*' id={`prix_unitaire_${index}`} type='number' required value={champ.prix_unitaire} onChange={e => handleChange(e.target.value, index, 'prix_unitaire')} />
                        </MDBCol>
                        <MDBCol size="6">
                          <MDBInput wrapperClass='mb-2' label='Date dexpiration*' id={`datexp_${index}`} type='date' required value={champ.datexp} onChange={e => handleChange(e.target.value, index, 'datexp')} />
                        </MDBCol>
                      </MDBRow>
                    </div>
                  ))}

                  <div className='flex mb-4' onClick={ajouterNouveauChamp}>
                    <IoAddCircleSharp size={24} />
                    <div className='ml-2'>Ajouter champ</div>
                  </div>

                  <div className="d-flex justify-content-center">
                  <MDBBtn className='mb-2 text-white bg-blue-900' size='lg' onClick={handleAjoutBonde}>Passer commande</MDBBtn>
                  </div>

                  {successMessage && (
                    <div className="text-success text-center mt-3">{successMessage}</div>
                  )}
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default AjoutBondeCommande;
