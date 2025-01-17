import React from 'react';
import PokemonCard from './PokemonCard'; // 개별 카드 컴포넌트

function CardList({ cards }) {
    return (
        <div className="flex-container">
            {cards.length > 0 ? (
                cards.map(card => (
                    <PokemonCard key={card.id} card={card} />
                ))
            ) : (
                <p>Loading.</p>
            )}
        </div>
    );
}

export default CardList;
