import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CardDetail() {
  const [card, setCard] = useState(null);
  const [set, setSet] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCardAndSet = async () => {
      try {
        const cardResponse = await axios.get(`https://api.pokemontcg.io/v2/cards/${id}`, {
          headers: {
            'X-Api-Key': process.env.REACT_APP_API_KEY
          }
        });
        setCard(cardResponse.data.data);

        const setResponse = await axios.get(`https://api.pokemontcg.io/v2/sets/${cardResponse.data.data.set.id}`, {
          headers: {
            'X-Api-Key': process.env.REACT_APP_API_KEY
          }
        });
        setSet(setResponse.data.data);
      } catch (error) {
        console.error('Error fetching card details:', error);
      }
    };

    fetchCardAndSet();
  }, [id]);

  if (!card || !set) return <div>Loading...</div>;

  return (
    <div className="card-detail">
      <div>
        <img src={card.images.large} alt={card.name} style={{width: '400px', height: '600px'}}/>
      </div>
      <div className='card-explain'>
      <h2>이름 : {card.name}</h2>
      <p>타입 : {card.types ? card.types.join(', ') : 'Unknown'}</p>
      <p>HP : {card.hp}</p>
      <p>레어리티 : {card.rarity}</p>
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
      
        <h3>세트 정보:</h3>
        <p>{set.name} ({set.series})</p>
        <img src={set.images.logo} alt={`${set.name} logo`} style={{width: '100px'}} />
      
      </div>
    </div>
  );
}

export default CardDetail;
