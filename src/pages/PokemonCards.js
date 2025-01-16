import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PokemonCard({ card }) {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = -2 / 15 * x + 20;
        const rotateX = 1 / 15 * y - 20;

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

function PokemonCards({ searchTerm, searchResults = [], handleSearch, initialCards = [] }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCards = useCallback(async (name) => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.pokemontcg.io/v2/cards', {
                headers: {
                    'X-Api-Key': process.env.REACT_APP_API_KEY,
                },
                params: {
                    pageSize: 12,
                    q: name ? `name:${name}*` : '',
                    orderBy: '-releaseDate',
                },
            });
            const newCards = response.data.data || [];
            setCards(newCards);
            handleSearch(newCards);
        } catch (error) {
            console.error('Error fetching cards:', error);
            setCards([]);
        } finally {
            setLoading(false);
        }
    }, [handleSearch]);

    useEffect(() => {
        if (searchTerm) {
            fetchCards(searchTerm);
        } else if (initialCards.length > 0) {
            setCards(initialCards);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [fetchCards, searchTerm, initialCards]);

    if (loading) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className="flex-container">
            {cards.length > 0 ? (
                cards.map(card => (
                    <PokemonCard key={card.id} card={card} />
                ))
            ) : (
                <p>검색 결과가 없습니다.</p>
            )}
        </div>
    );
}



export default PokemonCards;
