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

function Header({ setSearchTerm }) {
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedAttributes, setSelectedAttributes] = useState([]); // 선택된 속성 상태
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      alert('카드 이름을 입력해 주세요.');
      return;
    }

    setSearchTerm(inputValue);
    navigate('/search');
  };

  const openModal = () => setIsModalOpen(true); // 모달 열기
  const closeModal = () => setIsModalOpen(false); // 모달 닫기

  // 속성 선택/해제 핸들러
  const handleAttributeChange = (attribute) => {
    if (selectedAttributes.includes(attribute)) {
      // 이미 선택된 속성이면 제거
      setSelectedAttributes(selectedAttributes.filter((attr) => attr !== attribute));
    } else {
      // 선택되지 않은 속성이면 추가
      setSelectedAttributes([...selectedAttributes, attribute]);
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

          {/* Detail 버튼 */}
          <button onClick={openModal} className='detail-button' style={{ marginLeft: '10px' }}>
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
            width: '800px', // 모달 너비 설정
            textAlign: 'left',
            color: '#000',
            fontFamily: "'Arial', sans-serif",
          }}>
            <h2 style={{ marginBottom: '20px' }}>포켓몬 카드 상세 설정</h2>
            <h3>속성&nbsp;/&nbsp;타입</h3>

            {/* 속성 이미지 체크박스 - 가로 정렬 */}
            <div style={{
              display: 'flex', // 가로 정렬을 위한 flexbox
              flexWrap: 'wrap', // 줄바꿈 허용 (너무 길 경우)
              gap: '15px', // 항목 간 간격
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

            {/* 선택된 속성 표시 */}
            <div style={{ marginTop: '20px' }}>
              <strong>선택된 속성:</strong> {selectedAttributes.join(', ') || "없음"}
            </div>

            {/* 닫기 버튼 */}
            <button onClick={closeModal} style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: '#fff',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              float: 'right',
            }}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
