import React from 'react';
import PokemonCard from './PokemonCard'; // 개별 카드 컴포넌트
import pikachu from '../img/pikachu.png'

function CardList({ cards }) {
    return (
        <div className="flex-container">
            {cards.length > 0 ? (
                cards.map(card => (
                    <PokemonCard key={card.id} card={card} />
                ))
            ) : (
                <div style={{display: 'flex', margin: 'auto' ,maxWidth: '1280px', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                    <img src={pikachu} alt='로딩' style={{width: '300px', height: '300px'}}/>
                    <p style={{fontSize: '32px'}}>Loading...</p>
                </div>
            )}
        </div>
    );
}

export default CardList;
