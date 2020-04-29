import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from '../Header/Header';
import Form from '../Form/Form';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import Footer from '../Footer/Footer';
import { getData } from '../../apiCalls/apiCalls.js';
import * as utilFunctions from '../../utils/utilFunctions.js';

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
      setResults(utilFunctions.alphabatizeResults(data))
    })
    .catch(error => setError(error))
  }, []);

  const resetResults = (setQuery, setSelectedState, setCheckedBoxes) => {
    setResults(utilFunctions.alphabatizeResults(data));
    setQuery('');
    setSelectedState('');
    setCheckedBoxes([]);
  };

  const setFilteredResults = (resultsData, query, selectedState, states, checkedBoxes) => {
    if (selectedState === "" && query === "" && checkedBoxes.length === 0) setResults(utilFunctions.alphabatizeResults(resultsData));

    let filteredResults = utilFunctions.filterByState(resultsData, selectedState, states);
    filteredResults = utilFunctions.filterByQuery(filteredResults, query);
    filteredResults = utilFunctions.filterByCheckboxes(filteredResults, checkedBoxes);
    
    setResults(filteredResults);
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
