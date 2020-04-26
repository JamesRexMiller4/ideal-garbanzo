import React from 'react';
import './App.scss';
import Header from '../Header/Header';
import Form from '../Form/Form';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import Footer from '../Footer/Footer';


function App() {
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
