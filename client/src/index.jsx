import React from 'react';
import ReactDom from 'react-dom';

import App from './components/App.jsx';

const getId = () => {
  let url = window.location.pathname;
  if (url[url.length - 1] === '/') {
    var id = '1';
  } else {
    var id = url.slice(-1);
  }
  console.log(`Selected id is: ${id}`);
  return id;
};

ReactDom.render(<App id={getId()}/>, document.getElementById('sim-props'));