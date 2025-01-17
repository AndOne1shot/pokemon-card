import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardList from './CardList'; // 새로운 CardList 컴포넌트 사용

function MainPage() {
    const [initialCards, setInitialCards] = useState([]);

    useEffect(() => {
        const fetchStarterPokemon = async () => {
            try {
                // 불, 풀, 물 타입 스타팅 포켓몬 이름 배열
                const fireStarters = ['Charmander', 'Cyndaquil', 'Torchic', 'Chimchar'];
                const grassStarters = ['Bulbasaur', 'Chikorita', 'Treecko', 'Turtwig'];
                const waterStarters = ['Squirtle', 'Totodile', 'Mudkip', 'Piplup'];

                // 불 타입 포켓몬 요청
                const firePromises = fireStarters.map(name =>
                    axios.get('https://api.pokemontcg.io/v2/cards', {
                        headers: {
                            'X-Api-Key': process.env.REACT_APP_API_KEY,
                        },
                        params: {
                            pageSize: 1,
                            q: `name:${name}`,
                        },
                    })
                );

                // 풀 타입 포켓몬 요청
                const grassPromises = grassStarters.map(name =>
                    axios.get('https://api.pokemontcg.io/v2/cards', {
                        headers: {
                            'X-Api-Key': process.env.REACT_APP_API_KEY,
                        },
                        params: {
                            pageSize: 1,
                            q: `name:${name}`,
                        },
                    })
                );

                // 물 타입 포켓몬 요청
                const waterPromises = waterStarters.map(name =>
                    axios.get('https://api.pokemontcg.io/v2/cards', {
                        headers: {
                            'X-Api-Key': process.env.REACT_APP_API_KEY,
                        },
                        params: {
                            pageSize: 1,
                            q: `name:${name}`,
                        },
                    })
                );

                // 모든 요청 실행
                const [fireResponses, grassResponses, waterResponses] = await Promise.all([
                    Promise.all(firePromises),
                    Promise.all(grassPromises),
                    Promise.all(waterPromises),
                ]);

                // 응답 데이터에서 카드 정보 추출
                const fireCards = fireResponses.flatMap(response => response.data.data);
                const grassCards = grassResponses.flatMap(response => response.data.data);
                const waterCards = waterResponses.flatMap(response => response.data.data);

                // 불, 풀, 물 순서로 카드 배열 합치기
                const starterCards = [...fireCards, ...grassCards, ...waterCards];
                
                setInitialCards(starterCards); // 초기 카드 상태 업데이트
            } catch (error) {
                console.error('스타팅 포켓몬 데이터를 가져오는 중 오류 발생:', error);
            }
        };

        fetchStarterPokemon();
    }, []);

    return (
        <div>
            <CardList cards={initialCards} /> {/* CardList로 초기 카드 렌더링 */}
        </div>
    );
}

export default MainPage;
