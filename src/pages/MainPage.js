import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardList from './CardList'; // 새로운 CardList 컴포넌트 사용

function MainPage() {
    const [initialCards, setInitialCards] = useState([]);

    useEffect(() => {
        const fetchInitialCards = async () => {
            try {
                const types = ['Water', 'Grass', 'Fire'];
                const promises = types.map(type =>
                    axios.get('https://api.pokemontcg.io/v2/cards', {
                        headers: {
                            'X-Api-Key': process.env.REACT_APP_API_KEY
                        },
                        params: {
                            pageSize: 4,
                            q: `types:${type} set.series:"Sword & Shield"`,
                            orderBy: '-releaseDate'
                        }
                    })
                );
                const responses = await Promise.all(promises);
                const cards = responses.flatMap(response => response.data.data);
                setInitialCards(cards);
            } catch (error) {
                console.error('초기 포켓몬 카드 데이터를 가져오는 중 오류 발생:', error);
            }
        };

        fetchInitialCards();
    }, []);

    return (
        <div>
            <CardList cards={initialCards} /> {/* CardList로 초기 카드 렌더링 */}
        </div>
    );
}

export default MainPage;
