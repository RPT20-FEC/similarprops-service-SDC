import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import { shallow, mount } from 'enzyme';
import Properties from '../client/src/components/Properties.jsx';

configure({ adapter: new Adapter() });

describe('Properties Component', () => {
  xit('renders', () => {
    const wrapper = shallow(<Properties/>);
    expect(wrapper.exists()).toBe(true);
  });
});