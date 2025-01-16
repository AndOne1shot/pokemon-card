import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 가져오기
import logo from '../img/logo.jpeg';
import ball from '../img/monsterball.png';

function Header({ searchTerm, setSearchTerm, handleSearch, resetSearch }) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  return (
    <div className="black-nav">
    <div style={{display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '1280px', alignItems: 'center', justifyContent: 'space-between'}}>
      <img 
        src={logo} 
        alt="logo" 
        onClick={() => {
          resetSearch(); // 검색 상태 초기화
          navigate('/'); // 메인 페이지로 이동
        }} 
        style={{ cursor: 'pointer', width: '150px', height: '100px'}}
      />

      <div style={{display: 'flex'}}>
      <form 
        onSubmit={(e) => { 
          e.preventDefault(); 
          handleSearch(); // 부모 컴포넌트로 검색 요청 전달
        }} 
        className='name-search'
      >
        <img src={ball} alt="Search" style={{ width: '50px', height: '50px' }} />
        
        {/* 이름 검색 입력창 */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="포켓몬 이름 검색"
          className='pokename'
        />
        
        {/* 검색 버튼 */}
        <button type="submit" className='search-button'>
          검색
        </button>
      </form>
      <button>
        detail
      </button>
      </div>
    </div>
    </div>
  );
}

export default Header;
