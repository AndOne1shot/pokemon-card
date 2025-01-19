import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#f8f9fa',
      padding: '20px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#6c757d',
      marginTop: '100px'
    }}>
      <p>
        이 웹사이트는 <strong>Pokémon TCG API</strong>를 사용하여 데이터를 제공합니다. 
        해당 API는 <a href="https://pokemontcg.io" target="_blank" rel="noopener noreferrer">Pokémon TCG API</a>에서 제공되며, 
        이 웹사이트는 Pokémon Company International 또는 Nintendo와 관련이 없으며, 공식적으로 승인되거나 지원받지 않습니다.
      </p>
      <p>
        Pokémon 및 Pokémon 관련 콘텐츠는 <strong>Pokémon Company International</strong>, Nintendo, Creatures Inc., 및 Game Freak Inc.의 독점적 저작권 및 상표입니다.
      </p>
      <p>
        이 웹사이트는 비상업적 목적으로 제작되었으며, Pokémon의 저작권과 상표를 존중합니다. 
        모든 콘텐츠는 교육적 또는 개인적 용도로만 사용됩니다.
      </p>
      <p style={{ marginTop: '10px' }}>
        © 2025 Pokémon Company International. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
