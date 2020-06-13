import React from 'react';
import ReactDom from 'react-dom';

import App from './components/App.jsx';

const getId = () => {
  return window.location.pathname.substr(1);
};


ReactDom.render(<App id={getId()}/>, document.getElementById('sim-props'));