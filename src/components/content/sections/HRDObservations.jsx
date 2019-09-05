import React from 'react';
import PropTypes from 'prop-types';
import { getAnswerData } from '../../../lib/utilities.js';
import { WithData } from '../containers/WithData';
import { WithAnswerHandlers } from '../containers/WithAnswerHandlers';
import { WithActiveQuestions } from '../containers/WithActiveQuestions';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import QAs from '../../qas';
import ObservationsTable from '../../charts/shared/ObservationsTable';

class HRDObservations extends React.PureComponent {
  render() {
    const {
      clusterData,
      questions,
      answers,
      introduction,
      clusterName,
      id,
      scatterXDomain,
      scatterYDomain,
      answerHandler,
      setActive,
      advanceActive,
      activeId,
      tableCells,
      tableRowTitles,
      tableHeaders,
    } = this.props;

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">
            Exploring Star Cluster {clusterName}
          </h2>
          <p>{introduction}</p>
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
        <div>
          <h2 className="space-bottom">H-R Diagram: Star {clusterName}</h2>
          <ScatterPlot
            id={id}
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
            useLasso
            showColorLegend
          />
        </div>
      </Section>
    );
  }
}

HRDObservations.propTypes = {
  id: PropTypes.number,
  activeId: PropTypes.string,
  setActive: PropTypes.func,
  advanceActive: PropTypes.func,
  clusterData: PropTypes.array,
  questionsRange: PropTypes.array,
  questions: PropTypes.array,
  answers: PropTypes.object,
  answerHandler: PropTypes.func,
  introduction: PropTypes.string,
  clusterName: PropTypes.string,
  scatterXDomain: PropTypes.array,
  scatterYDomain: PropTypes.array,
  tableCells: PropTypes.array,
  tableHeaders: PropTypes.array,
  tableRowTitles: PropTypes.array,
};

export default WithAnswerHandlers(
  WithActiveQuestions(WithData(HRDObservations, 'is_member'))
);
