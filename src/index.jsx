import React, { addCallback, addReducer, setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import ls from 'local-storage';
import includes from 'lodash/includes';
import sortBy from 'lodash/sortBy';
import App from './App.jsx';
import './assets/stylesheets/styles.scss';

// Set an Initial global state
const emptyState = {
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

// const existingState = emptyState;
const existingState = ls('hrd') || emptyState;

setGlobal(existingState);

// Maybe a bit heavy handed?  Better to tie this LocalStorage Update to the route/section changes...?
addCallback(global => {
  ls('hrd', global);
  return null;
});

// addReducer('updateLS', global => {
//   ls('hrd', global);
// });

addReducer('empty', prevGlobal => {
  const global = {
    ...prevGlobal,
    answers: {},
    activeId: null,
    activeGraphData: null,
  };

  ls('hrd', global);

  return global;
});

addReducer('updateProgress', (prevGlobal, dispatch, currentProgress) => {
  const { visitedPages: prevVisitedPages, totalNumPages } = prevGlobal;
  const pageProgress = Math.ceil((currentProgress / (totalNumPages - 1)) * 100);

  const global = {
    ...prevGlobal,
    pageProgress,
  };

  if (!includes(prevVisitedPages, currentProgress)) {
    const visitedPages = sortBy(prevVisitedPages.concat([currentProgress]));
    const investigationProgress = Math.ceil(
      (visitedPages.length / totalNumPages) * 100
    );

    global.visitedPages = visitedPages;
    global.investigationProgress = investigationProgress;
  }

  return global;
});

if (process.env.NODE_ENV !== 'production') {
  const Axe = require('react-axe'); // eslint-disable-line global-require
  Axe(React, ReactDOM, 1000);
}

ReactDOM.render(<App />, document.getElementById('app'));
