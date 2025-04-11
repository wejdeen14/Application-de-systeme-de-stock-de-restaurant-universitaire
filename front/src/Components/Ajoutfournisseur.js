import axios from 'axios'; // Importez axios
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AjoutFournisseur() {
    const [nom_for, setNom_for] = useState('');
    const [tel_for, setTel_for] = useState('');
    const [mail_for, setMail_for] = useState('');
    const navigate = useNavigate();
    const { id_for } = useParams();
    const [fournisseurs,setFournisseurs]=useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errormsg, setErrormsg] = useState('');
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
        'Lait et ses dérivés',

    ];

    

    const liste_for = () => {
        navigate('/Fournisseur');
    }

    const addFournisseur = async () => {
        
        // Vérifier si tous les champs requis sont remplis
        if (!nom_for || !mail_for || !tel_for || nom_for.trim() === '' || mail_for.trim() === '' || tel_for.trim() === '') {
            setErrormsg('Tous les champs sont obligatoires');
            return; // Arrêter l'exécution de la fonction si un champ est vide
        }
    
        const data = {
            fournisseur: {
                nom_for: nom_for,
                mail_for: mail_for,
                tel_for: tel_for,
            },
            categories: selectedCategories
        };
        const fournisseur = {
                nom_for: nom_for,
                mail_for: mail_for,
                tel_for: tel_for,
            categories: selectedCategories
        };
       
    
        if (id_for) {
            try {
                const  response = await axios.put(`http://localhost:8080/four/update/${id_for}`, fournisseur);
                setFournisseurs(response.data);
                setSuccessMessage('Fournisseur mis à jour avec succès');
                console.log(response.data);
                 
    
            } catch (error) {
                console.error('Erreur lors de la mise à jour du fournisseur :', error);
            }
        } else {
            try {
                const response = await axios.post('http://localhost:8080/four/ajouter', data);
            
                setSuccessMessage('Fournisseur ajouté avec succès');
                // Réinitialiser les champs seulement lorsque vous ajoutez un nouveau fournisseur
                setNom_for('');
                setMail_for('');
                setTel_for('');
                setSelectedCategories([]);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    };
    
    useEffect(() => {
        // Si id_for existe, il s'agit d'une mise à jour, donc nous devons récupérer les informations du fournisseur
        if (id_for) {
            axios.get(`http://localhost:8080/four/${id_for}`)
                .then(response => {
                    console.log('Données du fournisseur récupérées avec succès :', response.data);
                    setNom_for(response.data.nom_for)
                    setTel_for(response.data.tel_for)
                    setMail_for(response.data.mail_for)
                    setSelectedCategories(response.data.categories)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération du fournisseur :', error);
                });
        }
    }, [id_for]);
    

    return (
        <div style={{ marginTop: '20px' }}>
            <MDBContainer fluid className="d-flex justify-content-center align-items-center h-100">
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>
                        <MDBCard className='mx-5 mb-5 p-5 shadow'>
                            <MDBCardBody className='p-6 align-items-center mx-auto'>
                                <h1 style={{ fontFamily: 'poppins', marginTop: '-60px', marginBottom: '30px', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '25px', fontWeight: 'bold' }}>
                                    {id_for ? 'Modifier un fournisseur' : 'Ajouter un fournisseur'}
                                </h1>
                                {successMessage && <p style={{ color: 'green', textAlign: 'center', fontSize: '14px' }}>{successMessage}</p>}
                                {errormsg && <p style={{ color: 'red', textAlign: 'center', fontSize: '14px' }}>{errormsg}</p>}
                                <form>
                                    <MDBRow>
                                        <MDBInput wrapperClass='mb-2' label='Nom Fournisseur*' id='nom_for' type='text' required value={nom_for} name='nom_for' onChange={(e) => setNom_for(e.target.value)} />
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBInput wrapperClass='mb-2' label='Adresse Email*' id='mail_for' type='email' required value={mail_for} name='mail_for' onChange={(e) => setMail_for(e.target.value)} />
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBInput wrapperClass='mb-2' label='Numéro Téléphone*' id='tel_for' type='number' required maxLength='8' value={tel_for} name='tel_for' onChange={(e) => setTel_for(e.target.value)} />
                                    </MDBRow>
                                    <MDBRow>
                                        <label style={{ fontSize: '18px', fontFamily: 'poppins' }}>Sélectionnez ses catégories : *</label>
                                    </MDBRow>
                                    <MDBRow>
                                        <ul style={{ padding: 0, listStyle: 'none', fontSize: '14px' }}>
                                            {categories.map((nom_categorie) => (
                                                <li key={nom_categorie} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontWeight: 'normal' }}>
                                                    <input
                                                        type="checkbox"
                                                        id={nom_categorie}
                                                        checked={selectedCategories.includes(nom_categorie)}
                                                        onChange={() => {
                                                            setSelectedCategories(prevSelectedCategories => {
                                                                if (prevSelectedCategories.includes(nom_categorie)) {
                                                                    // La catégorie est déjà sélectionnée, nous ne faisons rien car l'utilisateur est en train de décocher la case
                                                                    return prevSelectedCategories.filter(cat => cat !== nom_categorie);
                                                                } else {
                                                                    // La catégorie n'est pas encore sélectionnée, nous l'ajoutons à selectedCategories
                                                                    return [...prevSelectedCategories, nom_categorie];
                                                                }
                                                            });
                                                        }}
                                                        style={{ marginRight: '10px' }}
                                                    />
                                                    <label htmlFor={nom_categorie} style={{ fontSize: '14px', fontWeight: 'normal', fontFamily: 'poppins' }}>{nom_categorie}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    </MDBRow>
                                    <p> </p>
                                    <div className="text-center">
                                        <div className="d-flex justify-content-center">
                                            <MDBBtn className='mb-2' style={{ color: 'white', background: 'blue', fontFamily: 'poppins', letterSpacing: '2px' }} size='lg' onClick={addFournisseur}>Ajouter</MDBBtn>
                                            <p></p>
                                            <MDBBtn className='mb-2' style={{ color: 'white', background: 'green', fontFamily: 'poppins', fontSize: '14px', marginLeft: '40px' }} size='lg' onClick={liste_for}>Retour à la liste</MDBBtn>
                                        </div>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default AjoutFournisseur;
