import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import logo from '../img/logo.jpeg';
import ball from '../img/monsterball.png';

function Header({ searchTerm, setSearchTerm, handleSearch, resetSearch }) {
  const navigate = useNavigate();

  return (
    <div className="black-nav">
      <div style={{display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '1280px', alignItems: 'center', justifyContent: 'space-between'}}>
        <img 
          src={logo} 
          alt="logo" 
          onClick={() => {
            resetSearch();
            navigate('/');
          }} 
          style={{ cursor: 'pointer', width: '150px', height: '100px'}}
        />

        <div style={{display: 'flex'}}>
          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              navigate('/search');
              handleSearch();
            }} 
            className='name-search'
          >
            <img src={ball} alt="Search" style={{ width: '50px', height: '50px' }} />
            
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
      </div>
    </div>
  );
}

export default Header;
