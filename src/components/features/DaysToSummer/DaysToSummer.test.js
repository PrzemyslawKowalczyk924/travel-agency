import React from 'react';
import { shallow } from 'enzyme';
import DaysToSummer from './DaysToSummer';

const select = {
  description: '.description',
};

beforeAll(() => {
  const utilsModule = jest.requireActual('../../../utils/formatTime.js');
  utilsModule.formatTime = jest.fn(seconds => seconds);
});

describe('Component DaysToSummer', () => {
  it('component should render', () => {
    const component = shallow(
      <DaysToSummer />
    );
    expect(component).toBeTruthy();      
  });
  it('should render title with description', () => {
    const component = shallow(<DaysToSummer />);
    expect(component.exists(select.description)).toEqual(true);    
  });
});

/* czy komponent potrafi ustalić na samym początku, ile czasu pozostało do rozpoczęcia promocji */
const trueDate = Date;
const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length){
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now() {
    return (new Date(customDate)).getTime();
  }
};

const checkDescriptionAtDay = (day, expectedDescription) => {
  it(`should show correct at ${day}`, () => {
    global.Date = mockDate(`${day}T00:00:00.135Z`);

    const component = shallow(<DaysToSummer />);
    const renderedDday = component.find(select.description).text();
    expect(renderedDday).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};
describe('Component DaysToSummer with mocked Date', () => {
  checkDescriptionAtDay('2021-06-21', '');
  checkDescriptionAtDay('2021-07-22', '');
  checkDescriptionAtDay('2021-08-24', '');  
});
describe('Component DaysToSummer with mocked Date', () => {
  checkDescriptionAtDay('2021-06-20', '1 day to Summer!');
  checkDescriptionAtDay('2021-09-24', '270 days to Summer!');
  checkDescriptionAtDay('2021-06-01', '20 days to Summer!');
});