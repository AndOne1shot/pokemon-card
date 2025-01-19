import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.jpeg';
import ball from '../img/monsterball.png';

// 속성 이미지 데이터
const attributeImages = {
  불: require('../img/fire.webp'),
  물: require('../img/water.webp'),
  풀: require('../img/grass.webp'),
  전기: require('../img/electric.webp'),
  에스퍼: require('../img/psychic.webp'),
  강철: require('../img/steel.webp'),
  악: require('../img/ghost.webp'),
  드래곤: require('../img/dragon.webp'),
  격투: require('../img/fight.webp'),
  노말: require('../img/nomal.webp'),
};

// 속성명 매핑 (한글 -> 영어)
const attributeMapping = {
  불: "Fire",
  물: "Water",
  풀: "Grass",
  전기: "Lightning",
  에스퍼: "Psychic",
  강철: "Metal",
  악: "Darkness",
  드래곤: "Dragon",
  격투: "Fighting",
  노말: "Colorless"
};

// 시리즈 데이터
const seriesList = [
  "Base",
  "EX",
  "Diamond & Pearl",
  "HeartGold & SoulSilver",
  "Black & White",
  "XY",
  "Sun & Moon",
  "Sword & Shield",
  "Scarlet & Violet"
];

function Header({ setSearchTerm, setSelectedAttributes, setSelectedSeries }) {
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAttributes, setLocalSelectedAttributes] = useState([]);
  const [selectedSeries, setLocalSelectedSeries] = useState(''); // 선택된 시리즈 상태
  const navigate = useNavigate();

  // 검색 버튼 클릭 시 부모로 검색어와 변환된 속성 전달
  const handleSearch = (e) => {
    e.preventDefault();

    // 한글 속성을 영어 속성으로 변환
    const mappedAttributes = selectedAttributes.map(attr => attributeMapping[attr]);

    console.log("검색어:", inputValue.trim());
    console.log("선택된 속성(영어):", mappedAttributes);
    console.log("선택된 시리즈:", selectedSeries);

    // 부모 컴포넌트로 검색어와 선택된 속성 및 시리즈 전달
    setSearchTerm(inputValue.trim());
    setSelectedAttributes(mappedAttributes);
    setSelectedSeries(selectedSeries);

    // 검색 결과 페이지로 이동
    navigate('/search');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAttributeChange = (attribute) => {
    if (selectedAttributes.includes(attribute)) {
      setLocalSelectedAttributes(selectedAttributes.filter(attr => attr !== attribute));
    } else {
      setLocalSelectedAttributes([...selectedAttributes, attribute]);
    }
  };

  return (
    <div className="black-nav">
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '1280px', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* 로고 */}
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer', width: '150px', height: '100px' }}
        />

        {/* 검색 폼 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <form onSubmit={handleSearch} className="name-search">
            <img src={ball} alt="Search" style={{ width: '50px', height: '50px' }} />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="포켓몬 이름 검색"
              className="pokename"
            />
            <button type="submit" className="search-button">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                search
              </span>
            </button>
          </form>

          {/* Detail 버튼 */}
          <button onClick={openModal} className="detail-button" style={{ marginLeft: '10px' }}>
            Detail
          </button>
        </div>
      </div>

      {/* 모달 창 */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            width: '800px',
            textAlign: 'left',
            color: '#000',
            fontFamily: "'Arial', sans-serif",
          }}>
            <h2 style={{ marginBottom: '20px' }}>포켓몬 카드 상세 설정</h2>

            {/* 속성 체크박스 */}
            <h3>속성 / 타입</h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '15px',
              justifyContent: 'center',
            }}>
              {Object.keys(attributeImages).map((attribute) => (
                <label key={attribute} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}>
                  <input
                    type="checkbox"
                    value={attribute}
                    checked={selectedAttributes.includes(attribute)}
                    onChange={() => handleAttributeChange(attribute)}
                    style={{ marginBottom: '5px' }}
                  />
                  <img 
                    src={attributeImages[attribute]} 
                    alt={attribute} 
                    style={{ width: '50px', height: '50px' }} 
                  />
                  {attribute}
                </label>
              ))}
            </div>

            {/* 시리즈 선택 */}
            <h3>시리즈</h3>
            <select 
              value={selectedSeries} 
              onChange={(e) => setLocalSelectedSeries(e.target.value)} 
              style={{
                width:'100%',
                padding:'10px'
              }}
            >
              <option value="">모든 시리즈</option>
              {seriesList.map(series => (
                <option key={series} value={series}>{series}</option>
              ))}
            </select>

            {/* 닫기 버튼 */}
            <button onClick={closeModal} style={{
              marginTop:'20px',
              padding:'10px',
              backgroundColor:'#007BFF',
              color:'#fff',
              borderRadius:'5px',
              border:'none',
              cursor:'pointer'
}}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
