import React, { useState } from 'react';
import './ResultsContainer.scss';
import ResultCard from '../ResultCard/ResultCard';
import next from '../../icons/next.svg';
import leftArrow from '../../icons/left-arrow.svg';

const ResultsContainer = ({results}) => {
  const [ page, setPage ] = useState(1);
  const TOTALRESULTSLENGTH = Math.round(results.length / 10);

  const paginateResults = (resultData) => {
    const start = (page - 1) * 10;
    const end = start + 10;

    return resultData.slice(start, end);
  };

  const updateCurrentPage = (currentPage, incrementor) => {
    if (incrementor < 0) {
      currentPage === 1 ? setPage(1) : setPage(page - 1);
    }
    if (incrementor > 0) {
      currentPage === TOTALRESULTSLENGTH ? setPage(TOTALRESULTSLENGTH)
      : setPage(page + 1);
    }
  };

  const resultCards = paginateResults(results).map(result => (
  <ResultCard key={result.id} id={result.it} result={result}/>))
  
  return ( 
    <section className="results-container-section">
      <div className='results-pagination-div'>
        <img id="left-arrow" onClick={() => updateCurrentPage(page, -1)} src={leftArrow} alt="previous-results"/>
        <h2>{"Showing " + page + " of " + (Math.round(results.length / 10))}</h2>
        <img id="right-arrow" onClick={() => updateCurrentPage(page, 1)} src={next} alt="more-results"/>
      </div>
        {resultCards}
    </section>
  );
}

export default ResultsContainer;