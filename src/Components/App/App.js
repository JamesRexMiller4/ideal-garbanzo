import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from '../Header/Header';
import Form from '../Form/Form';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import Footer from '../Footer/Footer';
import { getData } from '../../apiCalls/apiCalls.js';
import * as utilFunctions from '../../utils/utilFunctions.js';

const App = () => {
  const [ appState, setAppState ] = useState({
    data: [],
    error: '',
    results: [],
    page: 1
  }); 
  
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
      
        setAppState({
          ...appState, 
          data: cleanedData,
          results: utilFunctions.alphabatizeResults(cleanedData)
        })
    })
    .catch(error => setAppState({...appState, error: error}))
  }, []);

  const resetResults = (setQuery, setSelectedState, setCheckedBoxes) => {
    setAppState({...appState, results: utilFunctions.alphabatizeResults(appState.data), page: 1})

    setQuery('');
    setSelectedState('');
    setCheckedBoxes([]);
  };

  const setFilteredResults = (resultsData, query, selectedState, states, checkedBoxes) => {
    if (selectedState === "" && query === "" && checkedBoxes.length === 0) {
      return setAppState({...appState, results: utilFunctions.alphabatizeResults(resultsData)});
    }

    let filteredResults = utilFunctions.filterByState(resultsData, selectedState, states);
    filteredResults = utilFunctions.filterByQuery(filteredResults, query);
    filteredResults = utilFunctions.filterByCheckboxes(filteredResults, checkedBoxes);
    
    setAppState({...appState, results: filteredResults, page: 1});
  };

  return (
    <div className="App">
      <Header />
      <Form 
        data={appState.data}
        resetResults={resetResults}
        setFilteredResults={setFilteredResults}/>
      { appState.data ? <ResultsContainer state={appState} setState={setAppState} results={appState.results}/> 
        : <h2>{appState.error}</h2> }
      <Footer />
    </div>
  );
}

export default App;
