import React from 'react';
import {shallow} from 'enzyme';
import ResultsContainer from './ResultsContainer';
import mockData from '../../data/mockData';
 
describe('ResultsContainer', () => {
  let wrapper, largerMockData, mockSetPage;
 
  beforeEach(() => {
    largerMockData = [...mockData, ...mockData, ...mockData];
    mockSetPage = jest.fn();
    wrapper = shallow(<ResultsContainer 
      state={1}
      setState={mockSetPage}
      results={largerMockData}/>)
  })
 
  it('should render the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
 
  it('should update the snapshot when an arrow is clicked', () => {
    wrapper.find("#right-arrow").simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});