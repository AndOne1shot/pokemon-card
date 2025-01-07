import React from 'react';
import logo from '../img/logo.jpeg';

function Header({ navigate }) {
  return (
    <div className="black-nav">
      <img 
        src={logo} 
        alt="logo" 
        onClick={() => navigate('/')} 
        style={{ cursor: 'pointer', width: '150px', height: '100px', marginLeft: '20px' }}
      />
    </div>
  );
}

export default Header;
