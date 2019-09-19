import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import { getAnswerData } from '../../../lib/utilities';
import { WithData } from '../containers/WithData';
import { WithAnswerHandlers } from '../containers/WithAnswerHandlers';
import { WithActiveQuestions } from '../containers/WithActiveQuestions';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import QAs from '../../qas';
import ObservationsTable from '../../charts/shared/ObservationsTable';

@reactn
class ExploringStarClusters extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { answers: prevAnswers } = prevProps;
    const { answers, regionAnswers } = this.props;

    if (prevAnswers !== answers) {
      this.dispatch.updateUserDefinedRegions(regionAnswers);
    }
  }

  render() {
    const {
      questions,
      answers,
      clusterData,
      scatterXDomain,
      scatterYDomain,
      answerHandler,
      setActive,
      advanceActive,
      activeId,
      tableCells,
      tableRowTitles,
      tableHeaders,
      regions,
      children,
      sectionTitle,
    } = this.props;

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">{sectionTitle}</h2>
          {children}
          <hr className="divider-horizontal" />
          {questions && (
            <QAs
              questions={questions}
              answers={answers}
              activeId={activeId}
              answerHandler={answerHandler}
              advanceActive={advanceActive}
              setActive={setActive}
            />
          )}
          <hr className="divider-horizontal" />
          <ObservationsTable
            answers={answers}
            cells={tableCells}
            rowTitles={tableRowTitles}
            colTitles={tableHeaders}
          />
        </section>
        <div className="inner-column">
          <h2 className="space-bottom">H-R Diagram</h2>
          <ScatterPlot
            data={clusterData}
            activeId={activeId}
            activeData={getAnswerData(answers, activeId)}
            xValueAccessor="temperature"
            yValueAccessor="luminosity"
            xAxisLabel="Temperature (K)"
            yAxisLabel="Solar Luminosity"
            xDomain={scatterXDomain}
            yDomain={scatterYDomain}
            dataSelectionCallback={answerHandler}
            showColorLegend
            regions={regions}
          />
        </div>
      </Section>
    );
  }
}

ExploringStarClusters.propTypes = {
  clusterData: PropTypes.array,
  activeId: PropTypes.string,
  setActive: PropTypes.func,
  advanceActive: PropTypes.func,
  questions: PropTypes.array,
  answers: PropTypes.object,
  answerHandler: PropTypes.func,
  scatterXDomain: PropTypes.array,
  scatterYDomain: PropTypes.array,
  tableCells: PropTypes.array,
  tableHeaders: PropTypes.array,
  tableRowTitles: PropTypes.array,
  regionAmswers: PropTypes.array,
  regionAnswers: PropTypes.array,
  regions: PropTypes.array,
  children: PropTypes.node,
  sectionTitle: PropTypes.string,
};

export default WithAnswerHandlers(
  WithActiveQuestions(WithData(ExploringStarClusters, 'is_member'))
);
