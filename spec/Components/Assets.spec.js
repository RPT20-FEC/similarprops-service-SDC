import React from 'react';
import { shallow, mount } from 'enzyme';

import Assets from '../../client/src/components/Assets.jsx';
const sampleData = require('../sampleData.js');


describe('When the Assets Component renders...', () => {

  const wrapper = mount(<Assets assets ={sampleData[0].assets}/>);

  it('renders to the DOM', () => {
    expect(wrapper.exists()).toBe(true);
  });

});