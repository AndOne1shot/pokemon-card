import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 가져오기
import logo from '../img/logo.jpeg';
import ball from '../img/monsterball.png';

function Header({ searchTerm, setSearchTerm, handleSearch, selectedSeries, setSelectedSeries }) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 드롭다운 옵션 정의
  const seriesOptions = [
    { value: '', label: '모든 시리즈' },
    { value: 'Sword & Shield', label: 'Sword & Shield' },
    { value: 'Sun & Moon', label: 'Sun & Moon' },
    { value: 'XY', label: 'XY' },
  ];

  return (
    <div className="black-nav">
      {/* 로고 클릭 시 메인 페이지로 이동 */}
      <img 
        src={logo} 
        alt="logo" 
        onClick={() => navigate('/')} // navigate('/') 호출
        style={{ cursor: 'pointer', width: '150px', height: '100px', marginLeft: '320px' }}
      />
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
        
        {/* 시리즈 선택 드롭다운 */}
        <select
          value={selectedSeries}
          onChange={(e) => setSelectedSeries(e.target.value)}
          className="series-select"
        >
          {seriesOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {/* 검색 버튼 */}
        <button type="submit" className='search-button'>
          검색
        </button>
      </form>
    </div>
  );
}

export default Header;
