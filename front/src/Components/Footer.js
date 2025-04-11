import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
     
      
      <p>&copy; {new Date().getFullYear()} Restaurant universitaire05 Septembre 1934 moknine </p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#FFFFFF',
  color: '#212529',
  textAlign: 'center',
  padding: '2rem',
  position: 'fixed',
 Buttom:"100px",
  width: '100%',
};

export default Footer;
