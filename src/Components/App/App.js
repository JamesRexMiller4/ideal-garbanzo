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
      let cleanedData = utilFunctions.cleanData(data)
      
      setAppState({
        ...appState, 
        data: cleanedData,
        results: cleanedData
      })
    })
    .catch(error => setAppState({...appState, error: error}))
  }, []); //eslint-disable-line

  const resetResults = (setFormState) => {
    setAppState({...appState, results: [...appState.data], page: 1})
    setFormState({
      query: '',
      selectedState: '',
      advancedSearch: false,
      checkedBoxes: []
    })
  };

  const setFilteredResults = (resultsData, query, selectedState, states, checkedBoxes) => {
    if (selectedState === "" && query === "" && checkedBoxes.length === 0) {
      return setAppState({...appState, results: [...appState.data]});
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
