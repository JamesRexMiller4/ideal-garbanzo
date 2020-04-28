import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from '../Header/Header';
import Form from '../Form/Form';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import Footer from '../Footer/Footer';
import { getData } from '../../apiCalls/apiCalls.js';

const App = () => {
  const [ data, setData ] = useState([]);
  const [ error, setError ] = useState('');
  
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
    })
    .catch(error => setError(error))
  }, []);

  
  const alphabatizeResults = (results=data) => {
    const newResults = [...results]
    return  newResults.sort((a, b) => a.name > b.name ? 1 : -1)
  };
  
  const [results, setResults ] = useState(alphabatizeResults());
  const [ clear, setClear ] = useState(false);

  const resetResults = () => {
    setResults(alphabatizeResults())
    setClear(false)
  };

  const setFilteredResults = ({results, selectedState, query}) => {

    const filterByState = () => {
      return results.filter(result => {
        if (selectedState) {
          return (result.state === selectedState);
        }
        return false;
      });
    };

    const filterByQuery = () => {
      const filterByGenre = () => {
        return results.filter(result => result.genres.includes(query));
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

      let results = [...filterByName([...filterByGenre(query)])];
      results = [...filterByCity(results)];
      return results;
    };

    if (selectedState) setResults(filterByState(selectedState));
    if (query) setResults([...filterByQuery()]);
    if (clear) resetResults()
    return;
  };

  return (
    <div className="App">
      <Header />
      <Form 
        data={data}
        results={results}
        setFilteredResults={setFilteredResults}/>
      { data ? <ResultsContainer results={results}/> 
        : <h2>{error}</h2> }
      <Footer />
    </div>
  );
}

export default App;
