import React from 'react';
import { mount } from 'enzyme';
import App from './App';


describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />)
  })
  it('should render the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });
});