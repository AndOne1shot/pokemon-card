import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./pages/Header";
import MainPage from "./pages/MainPage";
import PokemonCards from "./pages/PokemonCards";
import CardDetail from "./pages/CardDetail";

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [selectedAttributes, setSelectedAttributes] = useState([]); // 선택된 속성 상태

  return (
    <BrowserRouter>
      <div className="App">
        {/* Header 컴포넌트 */}
        <Header 
          setSearchTerm={setSearchTerm} 
          setSelectedAttributes={setSelectedAttributes} 
        />
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route 
            path="/search" 
            element={
              <PokemonCards 
                searchTerm={searchTerm} 
                selectedAttributes={selectedAttributes} 
              />
            } 
          />
          <Route path="/card/:id" element={<CardDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
