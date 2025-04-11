import axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PersonnelService from '../Service/PersonnelService'; // Assurez-vous d'importer votre service
import './Inscription.css';

function Inscription() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [identite, setIdentite] = useState('');
  const [tel, setTel] = useState('');
  const [mail, setMail] = useState('');
  const [mot_de_passe, setMot_de_passe] = useState('');
  const [role, setRole] = useState('');
  const [genre, setGenre] = useState('');
  const imgUser = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRsQp3QfMCj9fdrpDdMhuC_UQgbwA6o6dZ25_J1Lp4lg&s';
  const navigate = useNavigate();
  const { id } = useParams();
  const [succMessage, setSuccMessage] = useState('');

  const handleGenderChange = (e) => {
    setGenre(e.target.value);
  };

  const handleCancel = () => {
    setNom('');
    setPrenom('');
    setIdentite('');
    setTel('');
    setMail('');
    setMot_de_passe('');
    setRole('');
    setGenre('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { identite, nom, prenom, genre, mail, tel, mot_de_passe, role, imgUser };
    try {
      if (id) {
        const response = await PersonnelService.updateUser(id, user);
        console.log(response.data);
        navigate('/Personnel');
      } else {
        const response = await axios.post('http://localhost:8080/api/v1/auth/createAccount', {
          username: mail,
          password: mot_de_passe,
          identite,
          nom,
          prenom,
          genre,
          tel,
          imgUser,
          role,
        });
        console.log(response.data);
        setSuccMessage("Inscription avec succès !");
        navigate('/Adpersonnel');
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (id) {
      PersonnelService.getUserBy(id).then((response) => {
        setIdentite(response.data.identite);
        setNom(response.data.nom);
        setPrenom(response.data.prenom);
        setGenre(response.data.genre);
        setMail(response.data.mail);
        setTel(response.data.tel);
        setMot_de_passe(response.data.mot_de_passe);
        setRole(response.data.role);
      }).catch((error) => {
        console.error('Error fetching user:', error);
      });
    }
  }, [id]);

  const title = () => {
    return (
      <h1 className='flex text-center ml-8' style={{ fontFamily: 'poppins', marginTop: '-50px', marginBottom: '30px', letterSpacing: '2px', textAlign: 'center', textTransform: 'uppercase', fontSize: '25px', fontWeight: 'bold' }}>
        {id ? 'Modifier les données' : 'Inscrire Maintenant'}
      </h1>
    );
  };

  return (
    <div>
      <MDBContainer fluid>
        <div className="rectangle"></div>
        <MDBContainer fluid className="d-flex justify-content-center align-items-center h-100">
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
              <MDBCard className='mx-5 mb-5 p-5 shadow' style={{ marginTop: '-200px', background: 'hsla(0, 0%, 100%, 0.8)', borderRadius: '2rem', marginBottom: '250px', maxHeight: '1200px', maxWidth: '1000px', backdropFilter: 'blur(30px)' }}>
                <MDBCardBody className='p-5 align-items-center mx-auto'>
                  {title()}
                  <p> </p>
                  <MDBRow className='mb-2'>
                    <MDBCol col='4'>
                      <MDBInput wrapperClass='mb-4' label='Nom*' id='nom' type='text' required value={nom} name='nom' onChange={(e) => setNom(e.target.value)} />
                    </MDBCol>
                    <MDBCol col='4'>
                      <MDBInput wrapperClass='mb-4' label='Prénom*' id='prenom' type='text' required value={prenom} name='prenom' onChange={(e) => setPrenom(e.target.value)} />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-2">
                    <MDBCol col='4'>
                      <MDBInput wrapperClass='mb-4' label='Carte identité*' maxLength={8} id='identite' type='text' required value={identite} name='identite' onChange={(e) => setIdentite(e.target.value)} />
                    </MDBCol>
                    <MDBCol col='4'>
                      <MDBInput wrapperClass='mb-4' label='Numéro téléphone *' maxLength={8} id='tel' type='tel' required value={tel} name='tel' onChange={(e) => setTel(e.target.value)} />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol col='4'>
                      <label>Selectionnez votre rôle : *</label>
                    </MDBCol>
                    <MDBCol col='4'>
                      <select id="role" className="form-select" required value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Sélectionner un rôle</option>
                        <option value="magasinier">Magasinier</option>
                        <option value="moderateur">Modérateur</option>
                        <option value="financier">Financier</option>
                      </select>
                    </MDBCol>
                  </MDBRow>
                  <p> </p>
                  <MDBRow className='text-center mb-3'>
                    <MDBCol col='4'>
                      <label> Genre: *</label>
                    </MDBCol>
                    <MDBCol col='4'>
                      <input type="radio" id="femme" name="genre" value="femme" className="form-check-input" checked={genre === 'femme'} onChange={handleGenderChange} />
                      <label htmlFor="femme" className="form-check-label">Femme</label>
                    </MDBCol>
                    <MDBCol col='4'>
                      <input type="radio" id="homme" name="genre" value="homme" className="form-check-input" checked={genre === 'homme'} onChange={handleGenderChange} />
                      <label htmlFor="homme" className="form-check-label">Homme</label>
                    </MDBCol>
                  </MDBRow>
                  <p> </p>
                  <MDBRow className="mb-2">
                    <MDBInput wrapperClass='mb-4' label='Adresse Email*' id='mail' type='email' required value={mail} onChange={(e) => setMail(e.target.value)} name='mail' />
                  </MDBRow>
                  <MDBRow className="mb-2">
                    <MDBInput wrapperClass='mb-4' label='Mot de passe*' id='mot_de_passe' type='password' required value={mot_de_passe} onChange={(e) => setMot_de_passe(e.target.value)} name='mot_de_passe' />
                  </MDBRow>
                  <MDBBtn className='w-100 mb-4' size='lg' style={{ color: "white", backgroundColor: '#1e3a8a' }} onClick={handleSubmit}>Inscrire</MDBBtn>
                  <MDBBtn className='w-100 mb-4' size='lg' style={{ color: "white", backgroundColor: '#6789BA' }} onClick={handleCancel}>Annuler</MDBBtn>
                  <div className="text-center"></div>
                  {succMessage && <p style={{ color: "green" }}>{succMessage}</p>}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </div>
  );
}

export default Inscription;
