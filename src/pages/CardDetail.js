import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import pikachu from '../img/pikachu.png';

// 속성 이미지 데이터 가져오기
const attributeImages = {
  Fire: require('../img/fire.webp'),
  Water: require('../img/water.webp'),
  Grass: require('../img/grass.webp'),
  Lightning: require('../img/electric.webp'),
  Psychic: require('../img/psychic.webp'),
  Metal: require('../img/steel.webp'),
  Darkness: require('../img/ghost.webp'),
  Dragon: require('../img/dragon.webp'),
  Fighting: require('../img/fight.webp'),
  Colorless: require('../img/nomal.webp'),
};

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

  if (!card || !set) return (
    <div style={{
      display: 'flex',
      margin: 'auto',
      marginTop: '100px',
      maxWidth: '1280px',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <img src={pikachu} alt='로딩' style={{ width: '300px', height: '300px' }} />
      <p style={{ fontSize: '32px' }}>Loading...</p>
    </div>
  );

  return (
    <div className="card-detail">
      <div>
        <img src={card.images.large} alt={card.name} style={{ width: '400px', height: '600px' }} />
      </div>
      <div className='card-explain'>
        <h2>이름 : {card.name}</h2>
        <p>타입 : {card.types ? card.types.join(', ') : 'Unknown'}</p>
        <p>HP : {card.hp}</p>
        <p>레어리티 : {card.rarity}</p>

        {card.abilities && (
          <div>
            <h3>능력:</h3>
            <ul>
              {card.abilities.map((ability, index) => (
                <li key={index}>
                  <b>{ability.name}</b> : {ability.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        {card.attacks && (
          <div>
            <h3>공격:</h3>
            <ul style={{height: '200px'}}>
              {card.attacks.map((attack, index) => (
                <li key={index} style={{listStyleType: 'none'}}>
                  <div  className='attack_detail'>
                

                  <div style={{display: 'flex', alignItems: 'center'}}>
                      {/* attack.cost 배열을 이미지로 변환 */}
                  {attack.cost.map((cost, costIndex) => (
                    <img
                      key={costIndex}
                      src={attributeImages[cost]} // 속성 이름에 해당하는 이미지 가져오기
                      alt={cost}
                      style={{ width: '20px', height: '20px'}}
                    /> 
                  ))}
                  <b style={{fontSize: '18px', marginLeft: '10px'}}>{attack.name}</b>&nbsp;&nbsp;- 데미지: {attack.damage}
                  <br />
                  
                 
                  </div>

                  <div>
                  {attack.text}
                  </div>

                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <h3>세트 정보:</h3>
        <p>{set.name} ({set.series})</p>
        <img src={set.images.logo} alt={`${set.name} logo`} style={{ width: '100px' }} />
      </div>
    </div>
  );
}

export default CardDetail;
