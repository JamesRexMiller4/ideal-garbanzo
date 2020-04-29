import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from '../Header/Header';
import Form from '../Form/Form';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import Footer from '../Footer/Footer';
import { getData } from '../../apiCalls/apiCalls.js';
import { alphabatizeResults } from '../../utils/utilFunctions.js';
import stateAbbreviations from '../../data/stateAbbreviations.js';

const App = () => {
  const [ data, setData ] = useState([]);
  const [ error, setError ] = useState('');  
  const [ results, setResults ] = useState([]);
  
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
          tags: [...new Set(restaurant["tags"])],
          website: restaurant["website"],
          genre: restaurant["genre"],
          hours: restaurant["hours"],
          attire: restaurant["attire"]
        }
      });
      
      setData(cleanedData)
      setResults(alphabatizeResults(data))
    })
    .catch(error => setError(error))
  }, []);

  const resetResults = (setQuery) => {
    setResults(alphabatizeResults(data));
    setQuery('');
  };

  const setFilteredResults = (resultsData, selectedState, query) => {

    const filterByState = (selectedState, states=stateAbbreviations) => {
      console.log(selectedState)
      
      const selectedAbbrv = states[selectedState]
      console.log(selectedAbbrv)
      const stateData = resultsData.filter(result => result.state === selectedAbbrv && result);
      console.log(stateData);
      return stateData
    };

    const filterByQuery = () => {
      const filterByGenre = () => {
        return resultsData.filter(result => result.genres.includes(query));
      };

      const filterByName = (filteredResults => {
        return filteredResults.filter(result => {
          let name = results.name.toLowerCase();
          let string = query.toLowerCase();
          return name.includes(string);
        });
      });

      const filterByCity = (filteredResults=> {
        return filteredResults.filter(result => {
          let city = result.city.toLowerCase();
          let string = query.toLowerCase();
          return city.includes(string);
        });
      });

      let newResults = [...filterByName([...filterByGenre(query)])];
      newResults = [...filterByCity(newResults)];
      return newResults;
    };

    if (selectedState) setResults(filterByState(selectedState));
    if (query) setResults([...filterByQuery()]);
    return;
  };

  return (
    <div className="App">
      <Header />
      <Form 
        data={data}
        results={results}
        resetResults={resetResults}
        setFilteredResults={setFilteredResults}/>
      { data ? <ResultsContainer results={results}/> 
        : <h2>{error}</h2> }
      <Footer />
    </div>
  );
}

export default App;
