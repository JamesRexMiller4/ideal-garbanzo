import React, { useState } from 'react';
import './ResultCard.scss';

const ResultCard = (props) => {
  const [ active, setActive ] = useState(false)

  return ( 
    <article>
      <h3>Restuarant name</h3>
      <h3>Resaurant city</h3>
      <h3>Restaurant state</h3>
      <h3>Restaurant phone</h3>
      <h3>Restaurant Genres</h3>
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