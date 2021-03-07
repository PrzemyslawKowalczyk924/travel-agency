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
  });
  it('is there error when is lack of props?', () => {
    expect(() => shallow(<TripSummary />)).toThrow;
  });
  it('it should find tags at proper position', () => {
    const expectedTags = ['one', 'two', 'three'];
    const component = shallow(
      <TripSummary 
        tags={expectedTags}
      />
    );
    expect(component.find('.tags span').at(0).text()).toEqual(expectedTags[0]);
    expect(component.find('.tags span').at(1).text()).toEqual(expectedTags[1]);
    expect(component.find('.tags span').at(2).text()).toEqual(expectedTags[2]);
  });
  it('if tags is null, undef or error it shouldnt render', () =>{
    const component = shallow(<TripSummary/>);
    expect(component.hasClass('tags')).toBe(false);  
  });
});