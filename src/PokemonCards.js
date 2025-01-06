import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


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
                <Link key={card.id} to={`/card/${card.id}`} className="detail">
                    <div>
                        <img src={card.images.small} alt={card.name} style={{ width: '100%' }} />
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default PokemonCards;
