import React from 'react';
import {shallow} from 'enzyme';
import Form from './Form';
import utilData from './utilData.js';


describe('Form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Form/>) 
  });

  it.skip('should render the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});