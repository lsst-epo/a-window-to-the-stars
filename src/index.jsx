import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import ls from 'local-storage';
import App from './App.jsx';
import './assets/stylesheets/styles.scss';

// Set an Initial global state
const emptyState = {
  lastUpdated: Date.now().toString(),
  questions: null,
  answers: {},
  activeId: null,
  activeGraphData: null,
};

const existingState = ls('hrd') || emptyState;
setGlobal(existingState);

if (process.env.NODE_ENV !== 'production') {
  const Axe = require('react-axe'); // eslint-disable-line global-require
  Axe(React, ReactDOM, 1000);
}

ReactDOM.render(<App />, document.getElementById('app'));
