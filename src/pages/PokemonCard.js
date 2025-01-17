import React, { useState, useCallback } from 'react';
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

export default PokemonCard;
