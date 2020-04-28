import React from 'react';
import './ResultsContainer.scss';
import ResultCard from '../ResultCard/ResultCard';

const ResultsContainer = ({results}) => {
  const resultCards = results.map(result => (
  <ResultCard key={result.id} id={result.it} result={result}/>))
  
  return ( 
    <section className="results-container-section">
      {resultCards}
    </section>
  );
}

export default ResultsContainer;