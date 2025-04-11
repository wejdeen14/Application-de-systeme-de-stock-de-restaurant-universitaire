import React, { useState } from 'react';
import axios from 'axios';
import {  MDBBtn, } from 'mdb-react-ui-kit';
const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/auth/password/reset/${email}`,
        { password }
      );
      console.log(response.data);
      // Réinitialisation des champs après la mise à jour du mot de passe
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrorMessage('');
      alert('Mot de passe réinitialisé avec succès.');
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du mot de passe :", error);
      setErrorMessage("Une erreur s'est produite lors de la réinitialisation du mot de passe.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Réinitialiser le mot de passe</h2>
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Nouveau mot de passe:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <MDBBtn className='mb-4 ml-10' size='lg' style={{ color: "white", backgroundColor: '#1e3a8a' }}>Réinitialiser le mot de passe</MDBBtn>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
