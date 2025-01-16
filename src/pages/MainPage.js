import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCards from './PokemonCards';

function MainPage() {
    const [initialCards, setInitialCards] = useState([]); // 초기 카드 데이터를 저장할 상태

    // 초기 카드 데이터를 가져오는 함수
    useEffect(() => {
        const fetchInitialCards = async () => {
            try {
                const types = ['Water', 'Grass', 'Fire']; // 가져올 카드 타입
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
                const responses = await Promise.all(promises); // 모든 요청을 병렬로 처리
                const cards = responses.flatMap(response => response.data.data); // 결과를 하나의 배열로 합치기
                setInitialCards(cards); // 상태에 저장
            } catch (error) {
                console.error('초기 포켓몬 카드 데이터를 가져오는 중 오류 발생:', error);
            }
        };

        fetchInitialCards();
    }, []);

    return (
        <div>
            {/* PokemonCards 컴포넌트에 초기 카드 데이터를 props로 전달 */}
            <PokemonCards initialCards={initialCards} />
        </div>
    );
}

export default MainPage;
