import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./pages/Header";
import MainPage from "./pages/MainPage";
import PokemonCards from "./pages/PokemonCards";
import CardDetail from "./pages/CardDetail";
import Footer from "./pages/Footer";

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [selectedAttributes, setSelectedAttributes] = useState([]); // 선택된 속성 상태
  const [selectedSeries, setSelectedSeries] = useState(""); // 선택된 시리즈 상태

  return (
    <BrowserRouter>
      <div className="App">
        {/* Header 컴포넌트 */}
        <Header 
          setSearchTerm={setSearchTerm} 
          setSelectedAttributes={setSelectedAttributes} 
          setSelectedSeries={setSelectedSeries}
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
                selectedSeries={selectedSeries}
              />
            } 
          />
          <Route path="/card/:id" element={<CardDetail />} />
        </Routes>

        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
