import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import logo from '../img/logo.jpeg';
import ball from '../img/monsterball.png';

function Header({ setSearchTerm }) {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    // 입력값이 없는 경우 alert 표시
    if (!inputValue.trim()) {
      alert('카드 이름을 입력해 주세요.');
      return;
    }

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
            <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                search
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Header;
