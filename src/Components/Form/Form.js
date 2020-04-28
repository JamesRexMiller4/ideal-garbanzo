import React, { useState } from 'react';
import './Form.scss';
import utilData from './utilData.js';

const Form = ({ data, results, setFilteredResults }) => {
  const [ query, setQuery ] = useState('');
  const [ advancedSearch, setAdvancedSearch ] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value)
  };

  const handleClick = (e) => {
    setAdvancedSearch(!advancedSearch)
  }

  const generateStateOptions = () => {
    return utilData["states"].map((state, index) => {
      return <option key={index} id={index} value={index}>{state}</option>
    });
  };

  const advancedSearchFilters = () => {
  };

  return (
      <form className='main-form'>
        <section className='regular-search-section'>
            <div className='select-state-div'>
              <label for='select-state'>Filter by State</label>
              <select id='select-state' name='select' 
                onChange={(e) => setFilteredResults(results, 
                  e.target.value, query)}>
                  {generateStateOptions()}
              </select>
            </div>
          <div className='search-bar-div'>
            <input id='#search-bar' type='text' value={query} 
            placeholder="Search Bar" onChange={handleChange}/>
            <button type='button' onSubmit={setFilteredResults({
              results: results,
              selectedState: null, 
              query: query})}>Search</button>
          </div>
        </section>
        <section className='advanced-search-section'>
          <div className='advanced-search-div'>
            <h3>Advanced Search</h3>
            <button type='button' onClick={handleClick}>{advancedSearch ? "-" : "+" }</button>
          </div>
          <div className='filters-fieldsets-div'>
            {advancedSearchFilters()}
          </div>
        </section>
      </form> 
  );
}

export default Form;