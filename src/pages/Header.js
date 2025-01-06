import React from 'react';
import logo from '../img/logo.jpeg';

function Header({ navigate }) {
  return (
    <div className="black-nav">
      <img 
        src={logo} 
        alt="logo" 
        onClick={() => navigate('/')} 
        style={{ cursor: 'pointer', width: '200px', height: '150px' }}
      />
    </div>
  );
}

export default Header;
