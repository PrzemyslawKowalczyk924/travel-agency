import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('url should generate correct pathname', () => {
    const expectedId = 'abc';
    const expectedLink = '/trip/abc';
    const component = shallow(
      <TripSummary
        id={expectedId}
        image='image.jpg'
        name='name'
        cost='dolar'
        days={1}
      />
    ); 
    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });
  it('img have correct src & alt', () =>{
    const expectedSrc = 'image.jpg';
    const expectedAlt = 'emptiness!';
    const component = shallow(
      <TripSummary
        image={expectedSrc}
        name={expectedAlt}
      />  
    );
    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });
  it('name, cost & days should render withoud crashing', () => {
    const expectedName = 'name';
    const expectedCost = 'dolar';
    const expectedDays =1;
    const component = shallow(
      <TripSummary 
        name={expectedName}
        cost={expectedCost}
        days={expectedDays}
      />  
    );
    const renderedName = component.find('h3').text();
    expect(renderedName).toEqual(expectedName);
    expect(component.find('.details span').last().text()).toEqual(
      `from ${expectedCost}`
    );
    expect(component.find('.details span').first().text()).toBe(
      `${expectedDays} days`
    );
    console.log(component.debug());
  });
});