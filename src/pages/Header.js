import React from 'react';
import logo from '../img/logo.jpeg';
import ball from '../img/monsterball.png';

function Header({ navigate, searchTerm, setSearchTerm, handleSearch }) {
  return (
    <div className="black-nav">
      <img 
        src={logo} 
        alt="logo" 
        onClick={() => navigate('/')} 
        style={{ cursor: 'pointer', width: '150px', height: '100px', marginLeft: '20px' }}
      />
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className='name-search'>
        <img src={ball} alt="Search" style={{width: '50px', height: '50px'}}/>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="포켓몬 이름 검색"
          className='pokename'
        />
        <button type="submit" className='search-button'>
          검색
        </button>
      </form>
    </div>
  );
}

export default Header;
