import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

function PokemonCards({ searchTerm }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    // API 호출 함수
    const fetchCards = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.pokemontcg.io/v2/cards', {
                headers: {
                    'X-Api-Key': process.env.REACT_APP_API_KEY,
                },
                params: {
                    pageSize: 12,
                    q: searchTerm ? `name:${searchTerm}*` : '',
                    orderBy: '-releaseDate',
                },
            });
            setCards(response.data.data || []);
        } catch (error) {
            console.error('Error fetching cards:', error);
            setCards([]);
        } finally {
            setLoading(false);
        }
    }, [searchTerm]);

    // 검색어가 변경될 때마다 API 호출
    useEffect(() => {
        fetchCards();
    }, [fetchCards]);

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
