import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';

describe('Component OrderOption', () => {
  it('component should render', () => {
      const component = shallow(
      <OrderOption name='Johne Doe' type='type' />
    );
    expect(component).toBeTruthy();
  });
  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });
  it('should render proper prop name', () => {
    const expectedName = 'John Doe';
    const expectedType = 'dropdown';
    const component = shallow(
      <OrderOption name={expectedName} type={expectedType} /> 
    );
    expect(component.find('.title').text()).toEqual(expectedName);
    console.log(component.debug());
  });
  const optionTypes = {
    dropdown: 'OrderOptionDropdown',
    icons: 'OrderOptionIcons',
    checkboxes: 'OrderOptionCheckboxes',
    number: 'OrderOptionNumber',
    text: 'OrderOptionText',
    date: 'OrderOptionDate',
  };
  
  const mockProps = {
    id: 'abc',
    name: 'Lorem',
    values: [
      {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
      {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
    ],
    required: false,
    currentValue: 'aaa',
    price: '50%',
    limits: {
      min: 0,
      max: 6,
    },
  };
  
  const mockPropsForType = {
    dropdown: {},
    icons: {},
    checkboxes: {currentValue: [mockProps.currentValue]},
    number: {currentValue: 1},
    text: {},
    date: {},
  };
  
  const testValue = mockProps.values[1].id;
  const testValueNumber = 3;

  for(let type in optionTypes){
    describe(`Component OrderOption with type=${type}`, () => {
      /* test setup */
      let component;
      let subcomponent;
      let renderedSubcomponent;
      let mockSetOrderOption;

      beforeEach(() => {
        mockSetOrderOption = jest.fn();
        component = shallow(
          <OrderOption
            type={type}
            setOrderOption={mockSetOrderOption}
            {...mockProps}
            {...mockPropsForType[type]}
          />
        );
        subcomponent = component.find(optionTypes[type]);
        renderedSubcomponent = subcomponent.dive();
      });
      /* common tests */
      it(`renders ${optionTypes[type]}`, () => {
        expect(subcomponent).toBeTruthy();
        expect(subcomponent.length).toBe(1);
        console.log(subcomponent.debug());
      });
  
      /* type-specific tests */
      switch (type) {
        case 'dropdown': {
          /* tests for dropdown */
          it('contains select and options', () => {
            const select = renderedSubcomponent.find('select');
            expect(select.length).toBe(1);
          
            const emptyOption = select.find('option[value=""]').length;
            expect(emptyOption).toBe(1);
          
            const options = select.find('option').not('[value=""]');
            expect(options.length).toBe(mockProps.values.length);
            expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
          });
          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
        case 'icons': {
          it('contains div with icons', () => {
            const div = renderedSubcomponent.find('.icon').not('[value=""]');
            expect(div.length).toBe(mockProps.values.length);
            const activeDiv = renderedSubcomponent.find('.iconActive');
            expect(activeDiv.length).toBe(1);
          });
          it('run setOrderOption on click', () => {
            renderedSubcomponent.find('.icon').at(2).simulate('click', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
        case 'checkboxes': {
          it('contains div with labels', () => {
            const div = renderedSubcomponent.find('.checkboxes');
            expect(div.hasClass('checkboxes')).toBe(true);
            expect(div.length).toBe(1); 
          });
          it('should run setOrderOption on change', () => {
            renderedSubcomponent
              .find(`input[value="${testValue}"]`)
              .simulate('change', {currentTarget: {checked: true}})
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
          });
        }
        case 'number': {
          it('should contains input', () => {
            const div = renderedSubcomponent.find('div');
            expect(div.length).toBe(1);
            const input = div.find('input');
            expect(input).toBeTruthy();
          });
          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('.inputSmall').simulate('change', {
              currentTarget: {value: testValueNumber},});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
          });
          break;
        }
        case 'text': {
          it('contains input type text', () => {
            const input = renderedSubcomponent.find('.component').not('[value=""]');
            expect(input.length).toBe(1);
          });
          break;
        }
        /* case 'date': {
          it('', () => {

          });
        } */
      }
    });
  }
});