import React, { useState } from 'react';
import './Form.scss';
import utilData from '../../data/utilData.js';

const Form = ({ data, results, resetResults, setFilteredResults }) => {
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
      return <option key={state} id={index} value={index}>{state}</option>
    });
  };

  const advancedSearchFilters = () => {
    const makeACheckbox = (val, legend) => {
      return (
        <div key={val + '-div'} className='checkbox-div'>
          <input key={val} id={val} type="checkbox" name={legend} value={val} />
          <label key={val + "-label"} htmlFor={val}>{val}</label>
        </div>)
    };
    
    const makeCheckboxes = (arr, legend) => {
      return arr.map((value) => makeACheckbox(value, legend));
    };

    const makeFieldsets = (parent, legend) => {
      return (
        <div key={legend + "-fieldset-div"} className='fieldset-form-div'>
          <fieldset>
            <legend>{legend}</legend>
            <div className='checkboxes-div'>
              {makeCheckboxes(parent[legend], legend)}
            </div>
          </fieldset>
        </div>
      )
    };

    const recursivelyGenerateFieldsets = (parent, objKeyValue) => { 
      if (typeof parent[objKeyValue] === 'string') {
        return makeACheckbox(parent[objKeyValue], parent)
      }
      if (Array.isArray(parent[objKeyValue]) && objKeyValue !== 'states') {
        return makeFieldsets(parent, objKeyValue)
      }

      const newParent = parent[objKeyValue]
      const keys = Object.keys(newParent)
      return keys.forEach(key => recursivelyGenerateFieldsets(newParent, key))
    };


    const legends = Object.keys(utilData);

    return legends.map(key => recursivelyGenerateFieldsets(utilData, key))
  };

  return (
      <form className='main-form'>
        <section className='regular-search-section'>
            <div className='select-state-div'>
              <label htmlFor='select-state'>Filter by State</label>
              <select id='select-state' name='select' 
                onChange={(e) => setFilteredResults(results, 
                  e.target.value, query)}>
                  {generateStateOptions()}
              </select>
            </div>
          <div className='search-bar-div'>
            <input id='search-bar' type='text' value={query} 
            placeholder="Search Bar" onChange={handleChange}/>
            <button type='button' onClick={() => resetResults(setQuery)}>X</button>
            <button type='button' onClick={setFilteredResults({
              results: results,
              selectedState: null, 
              query: query})}>Search</button>
          </div>
          <div className='advanced-search-div'>
            <h3>Advanced Search</h3>
            <button id='advanced-search-btn' type='button' 
            onClick={handleClick}>{advancedSearch ? "-" : "+" }</button>
          </div>
        </section>
        <section className='advanced-search-section'>
          <div className={advancedSearch ? 'filters-fieldsets-div exposed' : 'filters-fieldsets-div'}>
            {advancedSearch && advancedSearchFilters()}
          </div>
        </section>
      </form> 
  );
}

export default Form;