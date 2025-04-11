import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonnelService from '../Service/PersonnelService';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { AiOutlineEdit } from 'react-icons/ai';

export default function Reglageprofile() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [identite, setIdentite] = useState('');
  const [tel, setTel] = useState('');
  const [mail, setMail] = useState('');
  const [mot_de_passe, setMot_de_passe] = useState('');
  const [role, setRole] = useState('');
  const [genre, setGenre] = useState('');
  const [imgUser, setImgUser] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRsQp3QfMCj9fdrpDdMhuC_UQgbwA6o6dZ25_J1Lp4lg&s'); // URL par défaut de l'image
  const [confirmMotDePasse, setConfirmMotDePasse] = useState('');
  const navigate = useNavigate();
  const id = localStorage.getItem('id'); // Get the user ID from local storage

  const handleImageChange = (e) => {
    setImgUser(URL.createObjectURL(e.target.files[0])); // Use URL.createObjectURL to get the local URL of the selected image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mot_de_passe !== confirmMotDePasse) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    const user = { identite, nom, prenom, genre, mail, tel, mot_de_passe, role, imgUser };
    try {
      await PersonnelService.updateUser(id, user);
      alert("Informations mises à jour avec succès");
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    }
  };
  

  useEffect(() => {
    if (id) {
      PersonnelService.getUserById(id).then((response) => {
        setIdentite(response.data.identite);
        setNom(response.data.nom);
        setPrenom(response.data.prenom);
        setGenre(response.data.genre);
        setMail(response.data.mail);
        setTel(response.data.tel);
        setMot_de_passe(response.data.mot_de_passe);
        setRole(response.data.role);
        setImgUser(response.data.imgUser);
      }).catch((error) => {
        console.error('Error fetching user:', error);
      });
    }
  }, [id]);
   

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol lg="6">
            <MDBCard className="mb-8">
              <MDBCardBody className="text-center">
                <div className="position-relative d-inline-block mb-4">
                  <label htmlFor="profile-image" style={{ cursor: 'pointer' }}>
                    <MDBCardImage
                      src={imgUser}
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: '150px' }}
                      fluid
                    />
                   <input type="file" id="profile-image" style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} />

                    <AiOutlineEdit size={24} className="position-absolute bottom-0 end-0 translate-middle" style={{ cursor: 'pointer' }} />{/* Icône de crayon */}
                  </label>
                </div>
                <h1 className="text-center mb-4" style={{ fontFamily: 'poppins', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '25px', fontWeight: 'bold' }}>
                  Réglage de profil
                </h1>
                <p className="text-black-50 mb-5 ">Mettre à jour vos informations de compte</p>
                <form onSubmit={handleSubmit}>
                  <MDBRow className="mb-3">
                    <MDBCol sm="4" className="text-end">
                      <label htmlFor="nom" className="col-form-label">
                        Nom
                      </label>
                    </MDBCol>
                    <MDBCol sm="8">
                      <input type="text" className="form-control" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="mb-3">
                    <MDBCol sm="4" className="text-end">
                      <label htmlFor="prenom" className="col-form-label">
                        Prénom
                      </label>
                    </MDBCol>
                    <MDBCol sm="8">
                      <input type="text" className="form-control" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="mb-3">
                    <MDBCol sm="4" className="text-end">
                      <label htmlFor="identite" className="col-form-label">
                        Identité
                      </label>
                    </MDBCol>
                    <MDBCol sm="8">
                      <input type="text" className="form-control" id="identite" value={identite} onChange={(e) => setIdentite(e.target.value)} />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="mb-3">
                    <MDBCol sm="4" className="text-end">
                      <label htmlFor="tel" className="col-form-label">
                        Numéro Téléphone
                      </label>
                    </MDBCol>
                    <MDBCol sm="8">
                      <input type="text" className="form-control" id="tel" value={tel} onChange={(e) => setTel(e.target.value)} />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="mb-3">
                    <MDBCol sm="4" className="text-end">
                      <label htmlFor="mail" className="col-form-label">
                        Adresse e-mail
                      </label>
                    </MDBCol>
                    <MDBCol sm="8">
                      <input type="email" className="form-control" id="mail" value={mail} onChange={(e) => setMail(e.target.value)} />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="mb-3">
                    <MDBCol sm="4" className="text-end">
                      <label htmlFor="mot_de_passe" className="col-form-label">
                        Modifier mot de passe
                      </label>
                    </MDBCol>
                    <MDBCol sm="8">
                      <input type="password" className="form-control" id="mot_de_passe" value={mot_de_passe} onChange={(e) => setMot_de_passe(e.target.value)} />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="mb-3">
  <MDBCol sm="4" className="text-end">
    <label htmlFor="confirmMotDePasse" className="col-form-label">
      Confirmer mot de passe
    </label>
  </MDBCol>
  <MDBCol sm="8">
    <input type="password" className="form-control" id="confirmMotDePasse" value={confirmMotDePasse} onChange={(e) => setConfirmMotDePasse(e.target.value)} />
  </MDBCol>
</MDBRow>


                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn className='mb-4 ml-10' size='lg' style={{ color: "white", backgroundColor: '#1e3a8a' }}>Mise à jour</MDBBtn>
                    <MDBBtn className='mb-4 ml-10' size='lg' style={{ color: "white", backgroundColor: '#6789BA' }} onClick={() => navigate(-1)}>Annuler</MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
