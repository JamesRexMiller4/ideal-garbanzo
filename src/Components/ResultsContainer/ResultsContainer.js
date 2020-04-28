import React from 'react';
import './ResultsContainer.scss';
import ResultCard from '../ResultCard/ResultCard';

const ResultsContainer = ({results}) => {
  const resultCards = results.map(result => <ResultCard result={result}/>)
  return ( 
    <section>
      {resultCards}
    </section>
  );
}

export default ResultsContainer;