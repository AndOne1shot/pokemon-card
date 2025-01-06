import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import './App.css';
import { useState } from 'react';
import Header from './pages/Header';
import PokemonCards from './PokemonCards';
import CardDetail from './pages/CardDetail';

function App() {
  let [스타팅, 스타팅변경] = useState(['파이리', '꼬부기', '이상해씨']);
  let [따봉, 따봉변경] = useState(0);

  return (
    <BrowserRouter>
      <AppContent 스타팅={스타팅} 스타팅변경={스타팅변경} 따봉={따봉} 따봉변경={따봉변경} />
    </BrowserRouter>
  );
}

function AppContent({ 스타팅, 따봉, 따봉변경 }) {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Header navigate={navigate} />

     
    <div style={{maxWidth: '1280px', margin: 'auto', marginTop: '100px'}}>
      <Routes>
      <Route path="/" element={<PokemonCards />} />
      <Route path="/card/:id" element={<CardDetail />} />
      </Routes>
      </div>
    </div>
  );
}

function Modal() {
  return (
    <div className="modal">
      <h4>이름</h4>
      <p>타입</p>
      <p>상세내용</p>
    </div>
  );
}

export default App;
