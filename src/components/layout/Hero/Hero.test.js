import React from 'react';
import { shallow } from 'enzyme';
import Hero from './Hero';

describe('Component Hero', () => {
  it('should render without crasing', () => {
    const component = shallow(<Hero titleTet='Lorem ipsum' />);
    expect(component).toBeTruthy();
  });
});