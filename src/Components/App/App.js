import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from '../Header/Header';
import Form from '../Form/Form';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import Footer from '../Footer/Footer';

// TODO: fetch data from API endpoint using useEffect, store in state

// TODO: add function that cleans data, omitting unused values

// TODO: add function that reformats genres to individual strings, and categorizes them


function App() {
  const [ data, setData ] = useState([])
  
  return (
    <div className="App">
      <Header />
      <Form />
      <ResultsContainer />
      <Footer />
    </div>
  );
}

export default App;
