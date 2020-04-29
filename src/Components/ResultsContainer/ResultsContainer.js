import React, { useState } from 'react';
import './ResultsContainer.scss';
import ResultCard from '../ResultCard/ResultCard';
import next from '../../icons/next.svg';
import leftArrow from '../../icons/left-arrow.svg';

const ResultsContainer = ({results}) => {
  const [ page, setPage ] = useState(1);

  const paginateResults = (resultData) => {
    const start = (page - 1) * 10;
    const end = start + 10;

    return resultData.slice(start, end);
  };

  const generatePaginationLinks = (data) => {
    let numPages = Math.floor(data.length / 10)
    if (data.length % 10 !== 0) {
      numPages++
    }
    let links = [];

    for (let i=0; i < numPages; i++) {
      let pageLink = <a key={'page-' + i} id={i + 1} onClick={setPage}>{i + 1}</a>
      links.push(pageLink);
    }
    return links
  };

  const resultCards = paginateResults(results).map(result => (
  <ResultCard key={result.id} id={result.it} result={result}/>))
  
  return ( 
    <section className="results-container-section">
      <div className='results-pagination-div'>
        <img src={leftArrow} alt="previous-results"/>
        <h2>{"Showing " + page + " of " + (Math.round(results.length / 10))}</h2>
        <img src={next} alt="more-results"/>
      </div>
        {resultCards}
    </section>
  );
}

export default ResultsContainer;