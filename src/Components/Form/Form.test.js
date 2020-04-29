import React from 'react';
import {mount} from 'enzyme';
import Form from './Form';
import utilData from '../../data/utilData.js';
import mockData from '../../data/mockData.js';
import { alphabatizeResults } from '../../utils/utilFunctions.js';

describe('Form', () => {
  let wrapper, mockSetFilteredResults, mockResetResults;
  beforeEach(() => {
    mockSetFilteredResults = jest.fn();
    mockResetResults = jest.fn();

    wrapper = mount(<Form
      data={mockData}
      resetResults={mockResetResults}
      setFilteredResults={mockSetFilteredResults}
      />);
  });

  it('should render the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handleClick: should render a different snapshot if advancedSearch is true', () => {
    wrapper.find("#advanced-search-btn").simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('handleChange: should update state if query is typed', () => {
    const mockEvent: Object = {target: {value: "Old"}};
    wrapper.find('#search-bar').simulate('change', mockEvent);
    expect(wrapper.find('#search-bar').getDOMNode().value).toEqual("Old");
  });
});