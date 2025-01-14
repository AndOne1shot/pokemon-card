import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './pages/Header';
import PokemonCards from './PokemonCards';
import CardDetail from './pages/CardDetail';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [searchTerm, setSearchTerm] = useState(''); // 이름 검색 상태
  const [selectedSeries, setSelectedSeries] = useState(''); // 시리즈 선택 상태
  const [isSearchTriggered, setIsSearchTriggered] = useState(false); // 검색 버튼 클릭 여부

  const handleSearch = () => {
    setIsSearchTriggered(true); // 검색 버튼 클릭 시 상태 변경
  };

  return (
    <div className="App">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        handleSearch={handleSearch}
        selectedSeries={selectedSeries}
        setSelectedSeries={setSelectedSeries}
      />
      
      <div style={{ maxWidth: '1280px', margin: 'auto', marginTop: '100px', display: 'flex', alignItems:'center', justifyContent:'center' }}>
        {/* Routes와 Route를 사용하여 라우팅 설정 */}
        <Routes>
          <Route 
            path="/" 
            element={
              <PokemonCards 
                searchTerm={searchTerm} 
                selectedSeries={selectedSeries} 
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
