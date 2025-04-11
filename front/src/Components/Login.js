import axios from 'axios';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow
} from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [mail, setMail] = useState('');
  const [mot_de_passe, setMot_de_passe] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const connexion = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
        mail,
        mot_de_passe
      });

      if (response.status === 200) {
        const { token, id, nom, prenom, imgUser, role } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('id', id.toString());
        localStorage.setItem('nomdata', nom);
        localStorage.setItem('prenomdata', prenom);
        localStorage.setItem('image', imgUser);
        localStorage.setItem('role', role);
        switch (role) {
          case 'admin':
            navigate('/Dashbord');
            break;
          case 'moderateur':
            navigate('/ModerateurMenu');
            break;
          case 'financier':
            navigate('/Financier');
            break;
          case 'magasinier':
            navigate('/Magasinier');
            break;
          default:
            setErrorMessage("Unexpected role: " + role);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid Credentials');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };


 
  return (
    <div className='background'>
      <MDBContainer fluid className="d-flex justify-content-center align-items-center h-100">
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard className='mx-5 mb-5 p-5 shadow' style={{ background: 'hsla(0, 0%, 100%, 0.5)', borderRadius: '2rem', maxHeight: '800px', marginTop: '10px', maxWidth: '800px', backdropFilter: 'blur(30px)' }}>
              <MDBCardBody className='p-5 align-items-center mx-auto w-100'>
                <h1 className="fw-bold mb-2 text-uppercase text-center" style={{ color: "#1e3a8a", fontSize: "24px" }}>Connexion</h1>
                <p className="text-black-50 mb-5" style={{ marginLeft: "50px" }}>Entrez votre adresse mail et mot de passe !</p>
                <form className="text-left" onSubmit={(e) => e.preventDefault()}>
                  <MDBInput wrapperClass='mb-4 mx-1 w-100 text-left'
                    label='Adresse e-mail' type='email' size="lg" id='mail'
                    value={mail} onChange={(e) => setMail(e.target.value)} required>
                  </MDBInput>
                  <MDBInput wrapperClass='mb-4 mx-1 w-100' label='Mot de passe' size="lg" style={{ marginRight: "50px" }}
                    type='password'
                    id='mot_de_passe'   
                    value={mot_de_passe} onChange={(e) => setMot_de_passe(e.target.value)} required>
                  </MDBInput>
                 
                  <br></br>
                  <hr></hr>
                  <MDBBtn className='mb-4 mx-1 w-100 link' size='lg' onClick={connexion} style={{ color: "white", backgroundColor: ' #1e3a8a' }}>
                    Connexion
                  </MDBBtn>
                  <span className="mb-4 text-center">
                  <Link 
                     to="/SecurityCodePage"
                      state={{ mail }} 
                      style={{ color: '#646e5c', fontWeight: "bold", marginLeft: "100px" }}
                    >
                      Mot de passe oublié ?
                    </Link>
                  </span>
                  {errorMessage && <p className="text-danger">{errorMessage}</p>}
                  {message && <p>{message}</p>}
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Login;
