import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from '../Header/Header';
import Form from '../Form/Form';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import Footer from '../Footer/Footer';
import { getData } from '../../apiCalls/apiCalls.js';

const App = () => {
  const [ data, setData ] = useState([])
  const [ error, setError ] = useState('')

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
        })

        cleanedData.forEach(rest => {
          rest["genre"] = rest["genre"].split(',');
          rest["tags"] = rest["tags"].split(',');
        })

        setData(cleanedData)
      })
      .catch(error => setError(error))
  }, [])

  return (
    <div className="App">
      <Header />
      <Form restaurantData={data}/>
      {
        data ? <ResultsContainer data={data}/>
        : <h2>{error}</h2>
      }
      <Footer />
    </div>
  );
}

export default App;
