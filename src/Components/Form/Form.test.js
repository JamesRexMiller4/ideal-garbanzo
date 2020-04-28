import React from 'react';
import {shallow} from 'enzyme';
import Form from './Form';

describe('Form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Form/>)
  });

  it.skip('should render the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

    describe('Search Bar', () => {
      it.skip('should be able to search for a restaurant', () => {
    
      });
    
      it.skip('should be able to search by name, city, or genre, ')
      });

    describe('Fieldset/Filters', () => {
      it.skip('should be able to filter by state', () => {

      });

      it.skip('should be able to filter by name', () => {

      });

      it.skip('should be able to filter by genre', () => {
        
      });

      it.skip('should be able to filter by city')
    });


});