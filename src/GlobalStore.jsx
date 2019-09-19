import { addCallback, addReducer, setGlobal } from 'reactn';
import ls from 'local-storage';
import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import sortBy from 'lodash/sortBy';

class GlobalStore {
  constructor() {
    this.emptyState = {
      lastUpdated: Date.now().toString(),
      questions: null,
      answers: {},
      totalNumPages: 20,
      visitedPages: [],
      investigationProgress: 0,
      pageProgress: 0,
      activeId: null,
      activeGraphData: null,
      clusterA: [],
      clusterB: [],
      userDefinedRegions: [],
      // astroDefinedRegions: [],
    };

    const existingState = this.emptyState;
    // const existingState = ls('hrd') || this.emptyState;

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

    addReducer(
      'updateUserDefinedRegions',
      (prevGlobal, dispatch, regionAnswers) => {
        const { answers } = prevGlobal;
        const userDefinedRegions = [];

        regionAnswers.forEach(region => {
          const { type, ids } = region;
          const newRegion = { type, points: [] };

          ids.forEach(id => {
            if (!isEmpty(answers[id])) {
              newRegion.points.push(answers[id].data[0]);
            }
          });

          // if (newRegion.points.length === ids.length) {
          //   newRegion.type = `${type} complete`;
          // }
          userDefinedRegions.push(newRegion);
        });

        return {
          ...prevGlobal,
          userDefinedRegions,
        };
      }
    );
  }
}

export default GlobalStore;
