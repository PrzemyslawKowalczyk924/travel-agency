import React from 'react';
import { shallow } from 'enzyme';
import TripPrice from './TripPrice';

const mockProps = {
  icon: 'Lorem',
  cost: '$1,500.00',
  name: 'ipsum',
};
  
describe('Component TripPrice', () => {
  it('should render without crashing', () => {
    const component = shallow(<TripPrice  {...mockProps}></TripPrice>);
    expect(component).toBeTruthy;
    console.log(component.debug());
  });
  it('should render cost from props', () => {
    const component = shallow(<TripPrice {...mockProps}/>);
    console.log(component.debug());
    expect(component.text()).toContain(mockProps.cost);
  });  
});

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
  static now(){
    return (new Date(customDate)).getTime();
  }
};

const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct price at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}:59:59.135Z`);

    const component = shallow(<TripPrice {...mockProps}/>);
    expect(component.text()).toContain(expectedDescription);

    global.Date = trueDate;
    console.log(component.debug());
  });
};

describe('Component TripPrice with mocked Hour', () => {
  checkDescriptionAtTime('11', mockProps.cost);
  checkDescriptionAtTime('12', mockProps.cost);
  checkDescriptionAtTime('13', mockProps.cost);
});
    