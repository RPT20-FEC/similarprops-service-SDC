import React from 'react';
import { shallow, mount } from 'enzyme';
import $ from 'jquery';

import App from '../../client/src/components/App';
import Properties from '../../client/src/components/Properties';

describe('when App component renders...', () => {

  it('calls componentDidMount', () => {
    const spy = jest.spyOn(App.prototype, 'componentDidMount');
    const wrapper = mount(<App id='1006'/>);
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });

  it('posts metadata to the local database on componentDidMount', () => {
    const spy = jest.spyOn(App.prototype, 'postListingsMeta');
    const wrapper = mount(<App id='1006'/>);
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();

  });

  it('gets metadata from the local database and sets state', async () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const wrapper = mount(<App id='1006'/>);
    const postDone = await wrapper.instance().postListingsMeta();

    wrapper.instance().fetchListingsMeta('1006');
    expect(wrapper.state().similarProperties).toBeTruthy();
  });

  it('renders the Properties carousel onto the DOM', () => {
    const wrapper = mount(<App id='1006'/>);
    expect(wrapper.containsMatchingElement(<Properties/>));
  });
});