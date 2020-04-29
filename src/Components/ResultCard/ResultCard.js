import React, { useState } from 'react';
import './ResultCard.scss';

const ResultCard = ({result}) => {
  const [ active, setActive ] = useState(false);

  const generateGenreTags = (genres) => {
    let splitUpGenres = genres.split(',');
    return splitUpGenres.map((genre, idx) => <button key={idx} className='genre-tag-btn'>{genre}</button>);
  };

  const generateHoursOfOperation = (hours) => {
    let splitUpHours = hours.split(';');
    return splitUpHours.map((hour, idx) => <h5 key={idx}>{hour}</h5>)
  }


  return ( 
    <article onClick={() => setActive(!active)}>
      <section className='result-card-section'>
        <div>
          <h3 className='result-card-h3'>{result.name}</h3>
          <h4>{result.city + ', ' + result.state}</h4>
          <h3>{result.phone}</h3>
        </div>
        <div>
          {generateGenreTags(result.genre)}
        </div>
      </section>
      { active && (
        <div className='additional-info-div'>
          <h3>Additional Info</h3>
          <section>
            <div>
              <h4>Address:</h4>
              <h5>{result.address1}</h5>
              <h5>{result.city + ", " + result.state}</h5>
              <h5>{result.zip}</h5>
            </div>
            <div>
              <h4>Phone:</h4>
              <h5>{result.telephone}</h5>
            </div>
            <div className='hours-div'>
              <h4>Hours of Operation:</h4>
              {generateHoursOfOperation(result.hours)}
            </div>
            <div className='attire-div'>
              <h4>Attire:</h4>
              <h5>{result.attire}</h5>
            </div>
            <div className='tags-container-div'>
              <h4>Tags:</h4>
              {generateGenreTags(result.tags)}
            </div>
          </section>
        </div>
        )}
    </article>
  );
}

export default ResultCard;