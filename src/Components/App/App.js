import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from '../Header/Header';
import Form from '../Form/Form';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import Footer from '../Footer/Footer';
import { getData } from '../../apiCalls/apiCalls.js';
import * as utilFunctions from '../../utils/utilFunctions.js';
// import stateAbbreviations from '../../data/stateAbbreviations.js';

const App = () => {
  const [ data, setData ] = useState([]);
  const [ error, setError ] = useState('');  
  const [ results, setResults ] = useState([]);
  const [ page, setPage ] = useState(1);
  
  useEffect(() => {
    getData().then(data => {
      let cleanedData = data.map(restaurant => {
        return {
          id: restaurant["id"],
          name: restaurant["name"],
          address1: restaurant["address1"],
          city: restaurant["city"],
          state: restaurant["state"],
          zip: restaurant["zip"],
          telephone: restaurant["telephone"],
          tags: restaurant["tags"],
          website: restaurant["website"],
          genre: restaurant["genre"],
          hours: restaurant["hours"],
          attire: restaurant["attire"]
        }
      });
      
      setData(cleanedData)
      const results = utilFunctions.alphabatizeResults(data)
      setResults(results)
    })
    .catch(error => setError(error))
  }, []);

  const resetResults = (setQuery, setSelectedState) => {
    setResults(utilFunctions.alphabatizeResults(data));
    setQuery('');
    setSelectedState('');
  };

  const setFilteredResults = (resultsData, query, selectedState, states) => {
    console.log(resultsData)
    
    if (selectedState !== "" && query !== "") {
      let filteredResults = utilFunctions.filterByState(resultsData, selectedState, states)
      filteredResults = utilFunctions.filterByQuery(filteredResults, query)
        setResults([...filteredResults])
    };

    if (query !== "")  {
        const results = utilFunctions.filterByQuery(resultsData, query)
        setResults([...results])
    };
  
    if (selectedState !== "") {
        const results = utilFunctions.filterByState(resultsData, selectedState, states)
        console.log(results)
        setResults([...results]);
    }
    if (selectedState === "" && query === "") {
        const results = utilFunctions.alphabatizeResults(resultsData)
        setResults([...results]);
    };
  };

  return (
    <div className="App">
      <Header />
      <Form 
        data={data}
        resetResults={resetResults}
        setFilteredResults={setFilteredResults}/>
      { data ? <ResultsContainer page={page} setPage={setPage} results={results}/> 
        : <h2>{error}</h2> }
      <Footer />
    </div>
  );
}

export default App;
