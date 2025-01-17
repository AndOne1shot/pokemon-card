import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import logo from '../img/logo.jpeg';
import ball from '../img/monsterball.png';

function Header({ setSearchTerm }) {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue); // 검색어 상태 업데이트
    navigate('/search'); // 검색 결과 페이지로 이동
  };

  return (
    <div className="black-nav">
      <div style={{display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '1280px', alignItems: 'center', justifyContent: 'space-between'}}>
        {/* 로고 */}
        <img 
          src={logo} 
          alt="logo" 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer', width: '150px', height: '100px'}}
        />

        {/* 검색 폼 */}
        <div style={{display: 'flex'}}>
          <form onSubmit={handleSearch} className='name-search'>
            <img src={ball} alt="Search" style={{ width: '50px', height: '50px' }} />
            
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
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
