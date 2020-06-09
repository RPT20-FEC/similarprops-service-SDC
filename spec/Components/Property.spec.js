import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';


import Property from '../../client/src/components/Property.jsx';
import {ImageContainer} from '../../client/src/components/Property.jsx';
import Assets from '../../client/src/components/Property.jsx';
import Favorite from '../../client/src/components/Property.jsx';

const sampleData = require('../sampleData.js');

configure({ adapter: new Adapter() });

describe('When the Property Component renders...', () => {

  const wrapper = mount(<Property  property={sampleData[0]}/>);

  it('renders a property to a slide deck of the outer carousel to the DOM', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the Assets carousel', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.containsMatchingElement(<Assets/>));
  });

  it('renders the Favorite component for each property slide', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.containsMatchingElement(<Favorite/>));
  });

  it('renders the Favorite component only on mouseEnter event', () => {
    beforeEach(() => {
      const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
      };

      props = {
        setIsShown: jest.fn().mockResolvedValue(true)
      };

      mockUseEffect();
      expect(props.setIsShown).toHaveBeenCalled();

    });

  });

});

