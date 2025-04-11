import axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';


const AjoutFacture = () => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [livraisonCommandes, setLivraisonCommandes] = useState([]);
  const [selectedFournisseurId, setSelectedFournisseurId] = useState(null);
  const [selectedLivraisons, setSelectedLivraisons] = useState([]);
  const [prixFac,setPrixFac]=useState('');
  const[prixTVA,setPrixTVA]=useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/four/fournisseurs')
      .then(response => {
        setFournisseurs(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des fournisseurs :', error);
      });
  }, []);

  useEffect(() => {
    if (selectedFournisseurId) {
      axios.get(`http://localhost:8080/liv/livraisons-idFac-null`)
        .then(response => {
          const livraisonsFiltrees = response.data.filter(livraison => {
            return livraison.id_for === selectedFournisseurId;
          });
          setLivraisonCommandes(livraisonsFiltrees);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des livraisons :', error);
          setLivraisonCommandes([]);
        });
    } else {
      setLivraisonCommandes([]);
    }
  }, [selectedFournisseurId]);

  const handleFournisseurChange = (event) => {
    const selectedId = parseInt(event.target.value);
    setSelectedFournisseurId(selectedId);
  };

  const handleLivraisonToggle = (livraisonId) => {
    const isSelected = selectedLivraisons.includes(livraisonId);
    if (isSelected) {
      setSelectedLivraisons(selectedLivraisons.filter(id => id !== livraisonId));
      
    } else {
      setSelectedLivraisons([...selectedLivraisons, livraisonId]);
    }
  };

  const gererFacture = () => {
    const factureDTOList = selectedLivraisons.map(livraisonId => {
      const livraison = livraisonCommandes.find(liv => liv.id_liv === livraisonId);
      if (!livraison) {
        return null; 
      }
      return {
        idFac : '',
        dateFac: new Date().toISOString(), 
        prixFac: prixFac,
        prixTVA:prixTVA,
        liv: selectedLivraisons.map(id => ({
           idLiv: id }))
        
    };
    }).filter(factureDTO => factureDTO !== null);
    console.log('Contenu de liv:', factureDTOList.liv);

    axios.post('http://localhost:8080/factures/ajout', factureDTOList)
      .then(response => {
        console.log('Facture ajoutée avec succès :', response.data);
        setSelectedLivraisons([]);
        setPrixFac('');
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de la facture :', error);
      });
  };

  return (
    <div>
      <div style={{ marginTop: '20px' }}>
        <MDBContainer fluid className="d-flex justify-content-center align-items-center h-100">
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
              <MDBCard className='mx-5 mb-5 p-5 shadow'>
                <MDBCardBody className='p-6 align-items-center mx-auto'>
                  <h1 className='flex text-blue-900 text-center ml-8' style={{ fontFamily: 'poppins', marginTop: '-50px', marginBottom: '30px', letterSpacing: '2px', textAlign: 'center', textTransform: 'uppercase', fontSize: '25px', fontWeight: 'bold' }}>
                    Ajouter Facture
                  </h1>

                  <form>
                    <select onChange={handleFournisseurChange} className='form-select'>
                      <option value="" >Sélectionner un fournisseur</option>
                      {fournisseurs.map(fournisseur => (
                        <option key={fournisseur.id_for} value={fournisseur.id_for}>
                          {fournisseur.nom_for}
                        </option>
                      ))}
                    </select>

                    {selectedFournisseurId && (
                      <div>
                        <h1 className='mt-3 fw-bold mb-3' style={{ fontSize: '18px', fontFamily: 'poppins' }}>Bons de livraison non payés:</h1>
                        <ul style={{ padding: 0, listStyle: 'none', fontSize: '14px' }}>
                          {livraisonCommandes.map(livraison => (
                            <li key={livraison.id_liv} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontWeight: 'normal' }}>
                              <label>
                                <input
                                  type="checkbox"
                                  value={livraison.id_liv}
                                  checked={selectedLivraisons.includes(livraison.id_liv)}
                                  onChange={() => handleLivraisonToggle(livraison.id_liv)}
                                />
                                {' '}
                                ID de Livraison : {livraison.id_liv} prixTotale :{livraison.prix_totale}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <MDBRow className="text-center mb-3 mt-3">
                      <MDBCol size="12">
                        <MDBInput wrapperClass='mb-2' label='Montant *' id='prixFac' type='double' required value={prixFac} onChange={(e) => setPrixFac(e.target.value)} />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="text-center mb-3 mt-3">
                      <MDBCol size="12">
                        <MDBInput wrapperClass='mb-2' label='Montant avec TVA*' id='prixTVA' type='double' required value={prixTVA} onChange={(e) => setPrixTVA(e.target.value)} />
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-center mb-3 mt-3">
                      <MDBBtn className='mb-2 text-white bg-blue-900' size='lg' onClick={gererFacture}>
                        Ajouter facture
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
};

export default AjoutFacture;
