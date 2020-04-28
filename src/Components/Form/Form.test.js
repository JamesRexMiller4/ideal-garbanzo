import React from 'react';
import {mount} from 'enzyme';
import Form from './Form';
import utilData from '../../data/utilData.js';
import mockData from '../../data/mockData.js';

const alphabatizeResults = (results=mockData) => {
  const newResults = [...results]
  return  newResults.sort((a, b) => a.name > b.name ? 1 : -1)
}

describe('Form', () => {
  let wrapper, mockSetFilteredResults;
  beforeEach(() => {
    mockSetFilteredResults = jest.fn()
    wrapper = mount(<Form
      data={mockData}
      results={alphabatizeResults()}
      setFilteredResults={mockSetFilteredResults}
      />) 
  });

  it('should render the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a different snapshot if advancedSearch is true', () => {
    wrapper.find("#advanced-search-btn").simulate('click')
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state if query is typed', () => {
    const mockEvent: Object = {target: {value: "Old"}}
    wrapper.find('#search-bar').simulate('change', mockEvent)
    expect(wrapper.find('#search-bar').getDOMNode().value).toEqual("Old");
  })
});