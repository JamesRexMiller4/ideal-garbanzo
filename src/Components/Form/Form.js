import React, { useState, useEffect } from 'react';
import './Form.scss';
import utilData from '../../data/utilData.js';
import close from '../../icons/close.svg';
import search from '../../icons/search.svg';
import downArrow from '../../icons/downArrow.svg';
import upArrow from '../../icons/upArrow.svg';
import stateAbbreviations from '../../data/stateAbbreviations.js';

const Form = ({ data, resetResults, setFilteredResults }) => {
  const [ formState, setFormState ] = useState({
    query: '',
    selectedState: '',
    advancedSearch: false,
    checkedBoxes: []
  })

  useEffect(() => {
    if (formState.advancedSearch) {
      let boxes = Array.from(document.querySelectorAll('.checkbox'))
      
      boxes.forEach(box => {
        if (formState.checkedBoxes.includes(box.value)) {
          box.checked = true
        }
      })
    }
  }, [formState.advancedSearch, formState.checkedBoxes])

  const handleChange = (e) => {
    setFormState({...formState, query: e.target.value});
  };

  const handleClick = (e) => {
    setFormState({...formState, advancedSearch: !formState.advancedSearch});
  };

  const handleCheckBoxClick = (e) => {
    if (formState.checkedBoxes.includes(e.target.value)) {
      e.target.checked = false
      const filteredResults = formState.checkedBoxes.filter(val => val !== e.target.value)
      setFormState({...formState, checkedBoxes: filteredResults})
    } else setFormState({...formState, checkedBoxes: [...formState.checkedBoxes, e.target.value]})
  }

  const handleStateSelection = (e) => {
    setFilteredResults(data, formState.query, e.target.value, stateAbbreviations, formState.checkedBoxes)
    setFormState({...formState, selectedState: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilteredResults(data,
      formState.query,
      formState.selectedState,
      stateAbbreviations,
      formState.checkedBoxes);
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
          <input className="checkbox" key={val} id={val} onClick={(e) => handleCheckBoxClick(e)} 
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
          <select id='select-state' name='select' value={formState.selectedState}
            onChange={(e) => handleStateSelection(e)}>
              {generateStateOptions()}
          </select>
        </div>
        <div className='search-bar-div'>
          <input id='search-bar' type='text' value={formState.query} 
          placeholder="Search Bar" onChange={handleChange}/>
          <img className="clear-icon" src={close} alt="clear" onClick={() => resetResults(setFormState)} />
          <img className="search-icon" src={search} alt="search" 
          onClick={() => setFilteredResults(data, formState.query,
           formState.selectedState, stateAbbreviations, formState.checkedBoxes)} />
        </div>
        <div className='advanced-search-div'>
          <h3>Advanced Search</h3>
          <img id='advanced-search-btn' src={formState.advancedSearch ? upArrow : downArrow } 
          alt={formState.advancedSearch ? "collapse" : "expand" }
          onClick={handleClick} />
        </div>
      </section>
      <section className='advanced-search-section'>
        <div className={formState.advancedSearch ?
          'filters-fieldsets-div exposed'
          : 'filters-fieldsets-div'}>
          {formState.advancedSearch && advancedSearchFilters()}
        </div>
      </section>
    </form> 
  );
};

export default Form;