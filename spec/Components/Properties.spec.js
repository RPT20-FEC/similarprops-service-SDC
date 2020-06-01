import React from 'react';
import { shallow, mount } from 'enzyme';

import Properties from '../../client/src/components/Properties.jsx';
import Property from '../../client/src/components/Property.jsx';

const sampleData = require('../sampleData.js');



describe('When the Properties Component renders...', () => {

  const wrapper = mount(<Properties properties ={sampleData}/>);

  it('renders to the DOM', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders 12 property slides to the DOM', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.containsMatchingElement(<Property/>));
  });

});