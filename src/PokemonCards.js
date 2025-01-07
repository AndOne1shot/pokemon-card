import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get('https://api.pokemontcg.io/v2/cards', {
                    headers: {
                        'X-Api-Key': process.env.REACT_APP_API_KEY
                    },
                    params: {
                        pageSize: 8,
                        q: 'set.series:"Sword & Shield"',
                        orderBy: '-releaseDate'
                    }
                });
                setCards(response.data.data);
            } catch (error) {
                console.error('Error fetching Pokemon cards:', error);
            }
        };

        fetchCards();
    }, []);

    return (
        <div className="flex-container">
            {cards.map(card => (
                <PokemonCard key={card.id} card={card} />
            ))}
        </div>
    );
}

export default PokemonCards;
