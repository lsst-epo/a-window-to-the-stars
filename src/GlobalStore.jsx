import { addCallback, addReducer, setGlobal } from 'reactn';
import ls from 'local-storage';
import includes from 'lodash/includes';
import sortBy from 'lodash/sortBy';

class GlobalStore {
  constructor() {
    this.emptyState = {
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

    // const existingState = this.emptyState;
    const existingState = ls('hrd') || this.emptyState;

    setGlobal(existingState);
  }

  addCallbacks() {
    addCallback(global => {
      ls('hrd', global);
      return null;
    });
  }

  addReducers() {
    addReducer('empty', prevGlobal => {
      const global = {
        ...prevGlobal,
        lastUpdated: Date.now().toString(),
        answers: {},
        activeId: null,
        activeGraphData: null,
        visitedPages: [],
        investigationProgress: 0,
        pageProgress: 0,
      };

      ls('hrd', global);

      return global;
    });

    addReducer('updateProgress', (prevGlobal, dispatch, currentProgress) => {
      const { visitedPages: prevVisitedPages, totalNumPages } = prevGlobal;
      const pageProgress = Math.ceil(
        (currentProgress / (totalNumPages - 1)) * 100
      );
      const global = {
        ...prevGlobal,
        pageProgress,
      };

      if (!includes(prevVisitedPages, currentProgress)) {
        const visitedPages = !prevVisitedPages
          ? [currentProgress]
          : sortBy(prevVisitedPages.concat([currentProgress]));
        const investigationProgress = Math.ceil(
          (visitedPages.length / totalNumPages) * 100
        );

        global.visitedPages = visitedPages;
        global.investigationProgress = investigationProgress;
      }

      return global;
    });
  }
}

export default GlobalStore;
