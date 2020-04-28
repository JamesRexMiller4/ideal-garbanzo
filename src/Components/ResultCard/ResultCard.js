import React, { useState } from 'react';
import './ResultCard.scss';

const ResultCard = ({result}) => {
  const [ active, setActive ] = useState(false)

  return ( 
    <article>
      <h3>{result.name}</h3>
      <h3>{result.city}</h3>
      <h3>{result.state}</h3>
      <h3>{result.phone}</h3>
      <h3>{result.genres}</h3>
      <ul>
        <li>Genre 1</li>
        <li>Genre 2</li>
        <li>Genre 13</li>
      </ul>
      { active && (
        <div>
          <h4>Additional Info</h4>
        </div>
        )
      }
    </article>
  );
}

export default ResultCard;