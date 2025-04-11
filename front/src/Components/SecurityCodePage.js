import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SecurityCodePage = () => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { mail } = location.state;
  const [emailCode, setEmailCode] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const sendCode = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/sendCode',
        mail,
        { headers: { 'Content-Type': 'text/plain' } }
      );
      const responseData = response.data;
      const generatedCode = responseData;
      setEmailCode(generatedCode);
      setEmailSent(true);
      console.log(response.data);
      setErrorMessage(generatedCode);
    } catch (error) {
      setErrorMessage(`Une erreur s'est produite lors de l'envoi du code : ${error.response ? error.response.data : error.message}`);
      console.error("Error details:", error);
    }
  };

 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedCode = code.trim();
    console.log('Entered Code:', trimmedCode);
    console.log('Stored Email Code:', emailCode);
    if (trimmedCode === emailCode) {
      navigate('/NouveauMDP', { state: { mail } });
    } else {
      setErrorMessage('Code incorrect. Veuillez réessayer.');
    }
  };
 

  const styles = {
    securityCodePage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
    },
    securityCodeContainer: {
      width: '100%',
      maxWidth: '400px',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#fff',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
      marginBottom: '10px',
    },
    paragraph: {
      margin: '10px 0',
      color: '#666',
    },
    strong: {
      display: 'block',
      marginTop: '5px',
      color: '#000',
    },
    form: {
      marginTop: '20px',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '20px',
      border: '1px solid #ddd',
      borderRadius: '3px',
      fontSize: '16px',
      boxSizing: 'border-box',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '3px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    buttonLink: {
      backgroundColor: 'transparent',
      color: '#007bff',
      textDecoration: 'underline',
    },
    buttonSubmit: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
  };

  return (
    <div style={styles.securityCodePage}>
      <div style={styles.securityCodeContainer}>
        <h2 style={styles.title}>Entrez le code de sécurité</h2>
        <p style={styles.paragraph}>
          Merci de vérifier dans vos e-mails que vous avez reçu un message avec votre code. Celui-ci est composé de 6 chiffres.
        </p>
        <p style={styles.paragraph}>
          Nous avons envoyé votre code à :<br />
          <strong style={styles.strong}>{mail}</strong>
        </p>
        <form style={styles.form}>
          <input
            type="text"
            placeholder="Entrez le code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength="6"
            style={styles.input}
          />
          <div style={styles.buttons}>
            <button
              type="button"
              onClick={sendCode}
              style={{ ...styles.button, ...styles.buttonLink }}
            >
              Code non reçu ?
            </button>
            <button type="submit" onClick={handleSubmit} style={{ ...styles.button, ...styles.buttonSubmit }}>
              Continuer
            </button>
          </div>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default SecurityCodePage;
