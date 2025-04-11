import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supprime les éléments du localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('nomdata');
    localStorage.removeItem('prenomdata');
    localStorage.removeItem('image');
    localStorage.removeItem('role');

    // Redirige vers la page de connexion
    navigate("/");
  }, [navigate]);

  return null; // Ce composant ne rend rien
};

export default Logout;
