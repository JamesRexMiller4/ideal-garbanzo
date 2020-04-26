import React, { useState } from 'react';
import './Form.scss';

const Form = () => {
  const [ formState, setFormState ] = useState({})

  return (
    <section>
      <form>
        <input type='text' placeHolder="Search Bar" />
        <button type='button'>Search</button>
      </form>
      <div>
        <h3>Advanced Search</h3>
        <button>Open</button>
        <section>
          <fieldset>
            <legend>Region/Country/Continent</legend>
            <input type='checkbox' />
            <label></label>
          </fieldset>
        </section>
      </div>
    </section> 
  );
}

export default Form;