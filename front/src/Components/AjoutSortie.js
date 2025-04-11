import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import React, { Fragment, useEffect, useState } from 'react';
import { IoAddCircleSharp } from "react-icons/io5";
import { PiNotepadLight } from "react-icons/pi";
function AjoutSortie() {
  const categories = [
    { name: 'Matières aromatiques', prd: [{ name: 'Produit 1' }, { name: 'Produit 2' }, { name: 'Produit 3' }] },
    { name: 'Huiles végétales', prd: [{ name: 'Produit 4' }, { name: 'Produit 5' }, { name: 'Produit 6' }] },
    { name: 'Pain', prd: [{ name: 'Produit 7' }, { name: 'Produit 8' }, { name: 'Produit 9' }] },
    {
      name: 'Légumes et fruits', prd: [{ name: 'pomme' }, { name: 'orange' }, { name: 'mandarine' }, { name: 'tomate' },
      { name: 'carotte' }, { name: 'laitue' }, { name: 'pomme de terre' }, { name: 'oignon' }, { name: 'abricot' }, { name: 'fraise' }]
    },
    { name: 'Les oeufs', prd: [{ name: 'Produit 13' }, { name: 'Produit 14' }, { name: 'Produit 15' }] },
    { name: 'Viande de poulet', prd: [{ name: 'Produit 16' }, { name: 'Produit 17' }, { name: 'Produit 18' }] },
    { name: 'Viande de dinde', prd: [{ name: 'Produit 19' }, { name: 'Produit 20' }, { name: 'Produit 21' }] },
    { name: 'Viande locale (boeuf et mouton)', prd: [{ name: 'Produit 22' }, { name: 'Produit 23' }, { name: 'Produit 24' }] },
    { name: 'Fruits de mer', prd: [{ name: 'Produit 10' }, { name: 'Produit 11' }, { name: 'Produit 12' }] },
    { name: 'Lait et ses dérivés', prd: [{ name: 'Produit 28' }, { name: 'Produit 29' }, { name: 'Produit 30' }] },
  ];

  //const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [produit, setProduit] = useState([]);
  const [ selectedProduit ,setSelectedProduit]= useState();
  const [nouveauxChamps, setNouveauxChamps] = useState([]); // État pour stocker les nouveaux champs
  //const [nouveauxChamps, setNouveauxChamps] = useState([{ categorie: categories[0], produit: categories[0].prd[0], quantite: '', unite: '' }]);
  const [successMessage, setSuccessMessage] = useState('');
  const [date_sortie, setDate_sortie] = useState('');
  const [unite, setUnite] = useState('');
  const [quantite, setQuantite] = useState('');
  const [motif, setMotif] = useState();
const [ qteProd ,setQteProd]= useState('');

const fetchQuantities = async () => {
  try {
    const quantites = {};
    // Pour chaque champ dans nouveauxChamps, effectuez une requête pour récupérer la quantité disponible
    for (const champ of nouveauxChamps) {
      const response = await axios.get(`http://localhost:8080/prodSortie/quantiteProduit/${champ.produit.name}`);
      // Stockez la quantité dans l'objet quantites avec le nom du produit comme clé
      quantites[champ.produit.name] = response.data;
    }
    setQteProd(quantites);
    console.log('Quantités des produits après récupération:', quantites);
  } catch (error) {
    console.error('Erreur lors de la récupération des quantités des produits:', error);
    setQteProd({});
  }
};

useEffect(() => {
  fetchQuantities();
}, [nouveauxChamps]);

const handleChangeQuantite = (value, index) => {
  const updatedChamps = [...nouveauxChamps];
  
  // Vérifier si la quantité saisie est un nombre positif
  if (parseInt(value) <= 0) {
    alert('La quantité doit être un nombre positif.');
    return;
  }

 
  const productName = updatedChamps[index].produit.name;
  const availableQuantity = qteProd[productName]; 
  if (parseInt(value) > availableQuantity) {
    alert(`La quantité saisie (${value}) dépasse la quantité disponible (${availableQuantity}).`);
    return;
  }

  updatedChamps[index].quantite = value;
  setNouveauxChamps(updatedChamps);
};

  const ajouterNouveauChamp = () => {
    setNouveauxChamps([...nouveauxChamps, { categorie: selectedCategory, produit: selectedCategory.prd[0], quantite: '', unite: '' }]);
  };

  

  const handleChangeProduitNouveauChamp = (selectedProduit, index) => {
    const updatedChamps = [...nouveauxChamps];
    updatedChamps[index].produit = selectedProduit;
    setNouveauxChamps(updatedChamps);
  };

  const handleChangeCategorie = (category, index) => {
    const updatedChamps = [...nouveauxChamps];
    updatedChamps[index].categorie = category;
    setNouveauxChamps(updatedChamps);
  };


  
  const handleChangeUnite = (value, index) => {
    const updatedChamps = [...nouveauxChamps];
    updatedChamps[index].unite = value;
    setNouveauxChamps(updatedChamps);
  };
  const AjoutBonde = () => {
    
  
    const data = {
      id_sortie: '', // Remplacez par l'ID de la commande approprié
      date_sortie: new Date().toISOString(), 
      sortie: [
        ...nouveauxChamps.map(champ => ({
          id_detail_sortie: '', 
          motif: motif,
          nomProd: champ.produit.name,
          qte: champ.quantite,
          unite: champ.unite,
          categorie: champ.categorie.name
          
        }))
      ]
    };
    
  
    axios.post("http://localhost:8080/prodSortie/addSortie", data)
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Produit sortie avec succès');
        setDate_sortie('');
        setMotif('');
        setNouveauxChamps([{ categorie: categories[0], produit: categories[0].prd[0], quantite: '', unite: '' }]);
      })
      .catch(error => {
        console.error(error);
        
      });
  };
  
  

  return (
    <div>
    <div style={{ marginTop: '20px' }}>
      <MDBContainer fluid className="d-flex justify-content-center align-items-center h-100">
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard className='mx-5 mb-5 p-5 shadow'>
              <MDBCardBody className='p-6 align-items-center mx-auto '>
                <h1 className=' flex  text-blue-900 text-center ml-8' style={{ fontFamily: 'poppins', marginTop: '-50px', marginBottom: '30px', letterSpacing: '2px', textAlign: 'center', textTransform: 'uppercase', fontSize: '25px', fontWeight: 'bold' }}>
                  <PiNotepadLight style={{ size: '24px', fontWeight: 'bold' }} />   Bon de sortie
                </h1>

                <form>
                <MDBRow className="mb-3">
  <Listbox value={motif} onChange={(selectedMotif) => setMotif(selectedMotif)}>
    <div className="relative mt-1">
      <Listbox.Button className="relative w-full cursor-default rounded-lg border border-neutral-950 bg-white py-2 pl-3 pr-10 text-left focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/100 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900 sm:text-sm">
        <span className="block truncate">{motif ? motif : 'Choisir un motif'}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options >
          {motif === '' && (
            <Listbox.Option
              key="default"
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-200 text-blue-900' : 'text-gray-900'}`
              }
              value=""
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                    Choisir un motif
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 blue-900">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          )}
          {[ 'Utilise', 'Corrompu', 'Autre' ].map((motifOption, index) => (
            <Listbox.Option
              key={index}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-200 text-blue-900' : 'text-gray-900'}`
              }
              value={motifOption}
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                    {motifOption}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 blue-900">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </div>
  </Listbox>
</MDBRow>

                 
                
                
                  { nouveauxChamps.map((champ, index) => (
<div key={index}>
  <MDBRow className="mb-3">
    <MDBCol className="mt-4">
      <Listbox value={champ.categorie} onChange={(category) => handleChangeCategorie(category, index)}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default border border-gray-300  rounded-lg bg-white py-2 pl-3 pr-10 text-left  focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/100 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900 sm:text-sm">
          <span className="block truncate">{selectedCategory ? selectedCategory.name : 'Choisir une catégorie'}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options>
              
              {categories.map((category, catIndex) => (

                
                <Listbox.Option
                  key={catIndex}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-200 text-blue-900' : 'text-gray-900'
                    }`
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {category.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-900">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </MDBCol>
  </MDBRow>
  <MDBRow className="mb-3">
    <Listbox value={champ.produit} onChange={(selectedProduit) => handleChangeProduitNouveauChamp(selectedProduit, index)}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg border border-neutral-950  bg-white py-2 pl-3 pr-10 text-left  focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/100 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900 sm:text-sm">
          <span className="block truncate">{champ.produit ? champ.produit.name : 'Choisir un produit'}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options >
            {champ.categorie.prd.map((prd, produitinx) => (
              <Listbox.Option
                key={produitinx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-200 text-blue-900' : 'text-gray-900'
                  }`
                }
                value={prd}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                        }`}
                    >
                      {prd.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 blue-900">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}


                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  </MDBRow>


<MDBRow className="mb-3">
<MDBCol size="6">
<MDBInput wrapperClass='mb-2' label='Quantité*' id='quantite' type='number' required value={champ.quantite} name='quantite' onChange={(e) => handleChangeQuantite(e.target.value, index)}
max={qteProd}
 />
</MDBCol>
<MDBCol size="6">
<MDBInput wrapperClass='mb-2' label='unité*' id='unite' type='text' required value={champ.unite} name='unite' onChange={(e) => handleChangeUnite(e.target.value, index)} />
</MDBCol>
</MDBRow>



                    </div>
                  ))}
                  <div className='flex mb-4'>
                    <div className='text-blue-900  flex' onClick={ajouterNouveauChamp}>
                      <IoAddCircleSharp size={24} />
                    </div>
                    <div className='ml-2'> Ajouter champ </div>
                  </div>

                  <div className="d-flex justify-content-center">
                    <MDBBtn className='mb-2 text-white bg-blue-900' size='lg' onClick={AjoutBonde}>Ajouter bon de sortie  </MDBBtn>
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
}


export default AjoutSortie