import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

function PokemonCards({ searchTerm, selectedAttributes }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    // API 호출 함수
    const fetchCards = useCallback(async () => {
        setLoading(true);

        try {
            // 쿼리 생성
            let query = "";
            if (searchTerm) {
                query += `name:${searchTerm}*`; // 이름 검색
            }
            if (selectedAttributes && selectedAttributes.length > 0) {
                const typesQuery = selectedAttributes.map(attr => `types:${attr}`).join(" OR ");
                query += (query ? " AND " : "") + `(${typesQuery})`; // 속성 필터 추가
            }

            console.log("API 요청 쿼리:", query);

            // API 요청
            const response = await axios.get("https://api.pokemontcg.io/v2/cards", {
                headers: {
                    "X-Api-Key": process.env.REACT_APP_API_KEY,
                },
                params: {
                    pageSize: 12,
                    q: query,
                    orderBy: "-releaseDate",
                },
            });

            setCards(response.data.data || []);
        } catch (error) {
            console.error("Error fetching cards:", error);
            setCards([]);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, selectedAttributes]);

    // 검색어 또는 속성이 변경될 때마다 API 호출
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
