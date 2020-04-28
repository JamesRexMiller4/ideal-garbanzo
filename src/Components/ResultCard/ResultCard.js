import React, { useState } from 'react';
import './ResultCard.scss';

const ResultCard = ({result}) => {
  const [ active, setActive ] = useState(false)
  console.log(result.genre)

  const generateGenreTags = (genres) => {
    let splitUpGenres = genres.split(',');
    return splitUpGenres.map(genre => <button>{genre}</button>)
  }


  return ( 
    <article>
      <div>
        <h3>{result.name}</h3>
        <div>
          <h3>{result.city}</h3>
          <h3>{result.state}</h3>
        </div>
        <h3>{result.phone}</h3>
      </div>
      <h3>{result.genre}</h3>
      {generateGenreTags(result.genre)}
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