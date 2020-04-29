import React, { useState } from 'react';
import './Form.scss';
import utilData from '../../data/utilData.js';
import close from '../../icons/close.svg';
import search from '../../icons/search.svg';
import downArrow from '../../icons/downArrow.svg';
import upArrow from '../../icons/upArrow.svg';
import stateAbbreviations from '../../data/stateAbbreviations.js';

const Form = ({ data, resetResults, setFilteredResults }) => {
  const [ query, setQuery ] = useState('');
  const [ selectedState, setSelectedState ] = useState('');
  const [ advancedSearch, setAdvancedSearch ] = useState(false);
  const [ checkedBoxes, setCheckedBoxes ] = useState([]);


  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClick = (e) => {
    setAdvancedSearch(!advancedSearch);
  };

  const handleCheckBoxClick = (e) => {
    setCheckedBoxes([...checkedBoxes, e.target.value])
  }

  const handleStateSelection = (e) => {
    setFilteredResults(data, query, e.target.value, stateAbbreviations)
    setSelectedState(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilteredResults(data, query, selectedState, stateAbbreviations);
  }

  const generateStateOptions = () => {
    return utilData["states"].map((state, index) => {
      return <option key={state} id={state} value={state}>{state}</option>
    });
  };

  const advancedSearchFilters = () => {
    const makeACheckbox = (val, legend) => {
      return (
        <div key={val + '-div'} className='checkbox-div'>
          <input key={val} id={val} onClick={(e) => handleCheckBoxClick(e)} 
          type="checkbox" name={legend} value={val} />
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
      if (typeof parent[objKeyValue] === 'string') return makeACheckbox(parent[objKeyValue], parent);
      if (Array.isArray(parent[objKeyValue]) && objKeyValue !== 'states') {
        return makeFieldsets(parent, objKeyValue);
      }

      const newParent = parent[objKeyValue];
      const keys = Object.keys(newParent);
      return keys.forEach(key => recursivelyGenerateFieldsets(newParent, key));
    };

    const legends = Object.keys(utilData);
    return legends.map(key => recursivelyGenerateFieldsets(utilData, key));
  };

  return (
    <form className='main-form' onSubmit={(e) => handleSubmit(e)}>
      <section className='regular-search-section'>
        <div className='select-state-div'>
          <label htmlFor='select-state'>Filter by State</label>
          <select id='select-state' name='select' value={selectedState}
            onChange={(e) => handleStateSelection(e)}>
              {generateStateOptions()}
          </select>
        </div>
        <div className='search-bar-div'>
          <input id='search-bar' type='text' value={query} 
          placeholder="Search Bar" onChange={handleChange}/>
          <img className="clear-icon" src={close} alt="clear" onClick={() => resetResults(setQuery, setSelectedState)} />
          <img className="search-icon"src={search} alt="search" 
          onClick={() => setFilteredResults(data, query, selectedState, stateAbbreviations)} />
        </div>
        <div className='advanced-search-div'>
          <h3>Advanced Search</h3>
          <img id='advanced-search-btn' src={advancedSearch ? upArrow : downArrow } 
          alt={advancedSearch ? "collapse" : "expand" }
          onClick={handleClick} />
        </div>
      </section>
      <section className='advanced-search-section'>
        <div className={advancedSearch ? 'filters-fieldsets-div exposed' : 'filters-fieldsets-div'}>
          {advancedSearch && advancedSearchFilters()}
        </div>
      </section>
    </form> 
  );
};

export default Form;