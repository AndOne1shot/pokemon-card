import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './pages/Header';
import MainPage from './pages/MainPage'; // MainPage는 자체적으로 초기 데이터를 관리
import PokemonCards from './pages/PokemonCards';
import CardDetail from './pages/CardDetail';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [isSearchTriggered, setIsSearchTriggered] = useState(false); // 검색 버튼 클릭 상태

  const handleSearch = () => {
    setIsSearchTriggered(true); // 검색 버튼 클릭 시 상태 변경
  };

  const resetSearch = () => {
    setSearchTerm('');
    setIsSearchTriggered(false);
  };

  return (
    <div className="App">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        handleSearch={handleSearch}
        resetSearch={resetSearch} 
      />
      
      <div>
        {/* Routes 설정 */}
        <Routes>
          <Route path="/" element={<MainPage />} /> {/* MainPage가 기본 경로 */}
          <Route 
            path="/search" 
            element={
              <PokemonCards 
                searchTerm={searchTerm} 
                isSearchTriggered={isSearchTriggered} 
                setIsSearchTriggered={setIsSearchTriggered}
              />
            } 
          />
          <Route path="/card/:id" element={<CardDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
