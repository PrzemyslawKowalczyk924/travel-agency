import React from 'react';
import { mount } from 'enzyme';
import Trip from './Trip';
import ListItem from '../../common/ListItem/ListItem';

const mockProps = {
  error: 'err',
  name: 'Lorem ipsum',
  image: 'Picture',
  cost: '1000',
  days: 10,
  description: 'Litwo ojczyzno moja ty jesteś jak zdrowie',
  country: {
    Japan: {
      capital: 'Tokyo',
      region: 'Asia',
      subregion: 'East Asia',
      population: 100000000,
      currencies: [
        {
          symbol: '$',
          name: 'dolars',
        },
        {
          symbol: 'eur',
          name: 'euro',
        },
      ],
      alpha3Code: 'eer84',
    },
  },
  intro: 'Intro',
  source: 'image',
};

describe('Component Trip', () => {
  it('renders without crashing', () =>{
    const component = mount(<Trip {...mockProps}><ListItem id='price_promo'/></Trip>);
    expect(component.exists()).toBe(true);
    // console.log(component);
  });
});