import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ball from './img/monsterball.png';

function PokemonCard({ card }) {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = -2/15 * x + 20;
        const rotateX = 1/15 * y - 20;

        setRotation({ x: rotateX, y: rotateY });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setRotation({ x: 0, y: 0 });
    }, []);

    return (
        <Link to={`/card/${card.id}`}>
            <div 
                className='container'
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `perspective(400px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transition: 'transform 0.1s'
                }}
            >
                <img src={card.images.small} alt={card.name} style={{ width: '100%' }} className='card' />
            </div>
        </Link>
    );
}

function PokemonCards() {
    const [cards, setCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    
    const pokemonTypes = ['', 'Grass', 'Fire', 'Water', 'Lightning', 'Psychic', 'Fighting', 'Darkness', 'Metal', 'Fairy', 'Dragon', 'Colorless'];
  
    const fetchCards = useCallback(async (name = '', type = '') => {
      try {
        const response = await axios.get('https://api.pokemontcg.io/v2/cards', {
          headers: {
            'X-Api-Key': process.env.REACT_APP_API_KEY
          },
          params: {
            pageSize: 8,
            q: `name:${name}* set.series:"Sword & Shield" ${type ? `types:${type}` : ''}`,
            orderBy: '-releaseDate'
          }
        });
        setCards(response.data.data);
      } catch (error) {
        console.error('Error fetching Pokemon cards:', error);
      }
    }, []);
  
    useEffect(() => {
      fetchCards(searchTerm, selectedType);
    }, [fetchCards, searchTerm, selectedType]);
  
    const handleSearch = (e) => {
      e.preventDefault();
      fetchCards(searchTerm, selectedType);
    };
  
    const handleTypeChange = (e) => {
      setSelectedType(e.target.value);
    };
  
    return (
      <>
        <form onSubmit={handleSearch} className='name-search'>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="포켓몬 이름 검색"
            className='pokename'
          />
          <select value={selectedType} onChange={handleTypeChange} className='type-select'>
            <option value="">모든 속성</option>
            {pokemonTypes.slice(1).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <button type="submit" className='search-button'>
            <img src={ball} alt="Search" style={{width: '50px', height: '50px'}}/>
          </button>
        </form>
        <div className="flex-container">
          {cards.map(card => (
            <PokemonCard key={card.id} card={card} />
          ))}
        </div>
      </>
    );
}

export default PokemonCards;
