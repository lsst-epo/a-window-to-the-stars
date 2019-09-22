import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import { getAnswerData } from '../../../lib/utilities';
import { WithData } from '../containers/WithData';
import { WithAnswerHandlers } from '../containers/WithAnswerHandlers';
import { WithQuestions } from '../containers/WithQuestions';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import QAs from '../../qas';
import ObservationsTable from '../../charts/shared/ObservationsTable';
import SunIcon from '../../site/icons/Sun';

@reactn
class EstimatingTempLumExtension extends React.PureComponent {
  render() {
    const {
      clusterData,
      questions,
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
    } = this.props;
    const { answers } = this.global;
    const activeData = getAnswerData(answers, activeId);

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">Steller Temperature & Luminosity</h2>
          <p>
            As you can see, the real power of using an H-R Diagram is to compare
            and to reveal properties of stars. In this section you will consider
            what can be learned from using the H-R Diagram to categorize groups
            of stars by their temperatures and luminosities, and to use those
            properties to infer additional information about the stars. Scroll
            over the H-R Diagram to zoom in and make finer selections.
          </p>
          <span className="copy-secondary">
            Note: The Sun <SunIcon className="sun-icon" /> has been added to
            your H-R Diagram.
          </span>
          <hr className="divider-horizontal" />
          <ObservationsTable
            answers={answers}
            cells={tableCells}
            rowTitles={tableRowTitles}
            colTitles={tableHeaders}
          />
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
        </section>
        <div className="inner-column">
          <h2 className="space-bottom">H-R Diagram</h2>
          <ScatterPlot
            data={clusterData}
            activeId={activeId}
            activeData={activeData}
            xDomain={scatterXDomain}
            yDomain={scatterYDomain}
            xValueAccessor="temperature"
            yValueAccessor="luminosity"
            xAxisLabel="Temperature (K)"
            yAxisLabel="Solar Luminosity"
            dataSelectionCallback={answerHandler}
            includeSun
            regions={regions}
          />
        </div>
      </Section>
    );
  }
}

EstimatingTempLumExtension.propTypes = {
  clusterData: PropTypes.array,
  activeId: PropTypes.string,
  setActive: PropTypes.func,
  advanceActive: PropTypes.func,
  questions: PropTypes.array,
  answerHandler: PropTypes.func,
  scatterXDomain: PropTypes.array,
  scatterYDomain: PropTypes.array,
  histogramAccessor: PropTypes.string,
  histogramDomain: PropTypes.array,
  histogramAxisLabel: PropTypes.string,
  tableCells: PropTypes.array,
  tableHeaders: PropTypes.array,
  tableRowTitles: PropTypes.array,
  regions: PropTypes.array,
};

export default WithQuestions(
  WithAnswerHandlers(WithData(EstimatingTempLumExtension, 'is_member'))
);
