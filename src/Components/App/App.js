import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from '../Header/Header';
import Form from '../Form/Form';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import Footer from '../Footer/Footer';

const App = () => {
  const [ data, setData ] = useState([])

  useEffect(() => {
    fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Api-Key q3MNxtfep8Gt"
      }
    })
    .then(res => res.json())
    .then(data => {
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
  }, [])

  return (
    <div className="App">
      <Header />
      <Form />
      <ResultsContainer data={data}/>
      <Footer />
    </div>
  );
}

export default App;
