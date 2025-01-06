import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CardDetail() {
  const [card, setCard] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`https://api.pokemontcg.io/v2/cards/${id}`, {
          headers: {
            'X-Api-Key': process.env.REACT_APP_API_KEY
          }
        });
        setCard(response.data.data);
      } catch (error) {
        console.error('Error fetching card details:', error);
      }
    };

    fetchCard();
  }, [id]);

  if (!card) return <div>Loading...</div>;

  return (
    <div className="card-detail">
      <h2>{card.name}</h2>
      <img src={card.images.large} alt={card.name} />
      <p>타입: {card.types ? card.types.join(', ') : 'Unknown'}</p>
      <p>HP: {card.hp}</p>
      <p>레어리티: {card.rarity}</p>
      {card.attacks && (
        <div>
          <h3>공격:</h3>
          <ul>
            {card.attacks.map((attack, index) => (
              <li key={index}>{attack.name} - 데미지: {attack.damage}, 비용: {attack.cost.join(', ')}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CardDetail;
