import React from 'reactn';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import GlobalStore from './GlobalStore.jsx';
import './assets/stylesheets/styles.scss';

const empty = {
  lastUpdated: Date.now().toString(),
  questions: null,
  answers: {},
  totalNumPages: 18,
  visitedPages: [],
  investigationProgress: 0,
  pageProgress: 0,
  activeId: null,
  activeGraphData: null,
  clusterA: [],
  clusterB: [],
};

const store = new GlobalStore(empty);

store.addCallbacks();
store.addReducers();

if (process.env.NODE_ENV !== 'production') {
  const Axe = require('react-axe'); // eslint-disable-line global-require
  Axe(React, ReactDOM, 1000);
}

ReactDOM.render(<App />, document.getElementById('app'));
