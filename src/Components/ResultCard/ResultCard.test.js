import React from 'react';
import {shallow} from 'enzyme';
import ResultCard from './ResultCard';
import mockData from '../../data/mockData';
 
describe('ResultCard', () => {
  let wrapper;
 
  beforeEach(() => {
    wrapper = shallow(<ResultCard result={mockData[0]}/>)
  });
 
  it('should render the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render differently when ResultCard is clicked', () => {
    wrapper.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});