import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import { shallow, mount } from 'enzyme';
import Property from '../client/src/components/Property.jsx';

configure({ adapter: new Adapter() });

describe('Property Component', () => {
  xit('renders', () => {
    const wrapper = shallow(<Property/>);
    expect(wrapper.exists()).toBe(true);
  });
});