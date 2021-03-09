import React from 'react';
import { shallow } from 'enzyme';
import HappyHourAd from './HappyHourAd';

const mockProps = {
  title: 'Happy Hours!',
  promoDescription: 'Take your chanse, and grab promotion!',  
};

const select = {
  title: '.title',
  promoDescription: '.promoDescription',
};

describe('Component HappyHourAd', () => {
  it('component should render', () => {
    const component = shallow(
      <HappyHourAd />
    );
    expect(component).toBeTruthy();      
  });
  it('should render heading & description', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);    
    expect(component.exists(select.promoDescription)).toEqual(true);
  });
  it('check if header have proper props', () => {
    const component = shallow(<HappyHourAd {...mockProps} />);
    expect(component.find(select.title).text()).toEqual(mockProps.title);
  });
});