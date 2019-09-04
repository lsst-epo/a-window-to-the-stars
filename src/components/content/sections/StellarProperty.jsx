import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import { capitalize, getAnswerData } from '../../../lib/utilities';
import { WithData } from '../containers/WithData';
import { WithAnswerHandlers } from '../containers/WithAnswerHandlers';
import { WithActiveQuestions } from '../containers/WithActiveQuestions';
import { WithGraphToggler } from '../containers/WithGraphToggler';
import Section from './Section';
import Select from '../../site/forms/Select';
import ScatterPlot from '../../scatter-plot';
import Histogram from '../../histogram';
import QAs from '../../qas';
import StellarTable from '../../charts/shared/StellarTable';
import SunIcon from '../../site/icons/Sun';

@reactn
class StellarProperty extends React.Component {
  render() {
    const {
      clusterData,
      questions,
      scatterXDomain,
      scatterYDomain,
      histogramAccessor,
      histogramDomain,
      histogramAxisLabel,
      answerHandler,
      setActive,
      advanceActive,
      activeId,
      tableAnswerIds,
      tableHeaders,
      tableRowTitles,
      graphSelectHandler,
      activeGraph,
      sectionCopy,
      sectionTitle,
    } = this.props;

    const { answers } = this.global;
    const activeData = getAnswerData(answers, activeId);

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">{sectionTitle}</h2>
          {sectionCopy}
          <p>
            Use the dropdown above the graph to switch between your H-R Diagram
            and the {capitalize(histogramAccessor)} Histogram.{' '}
          </p>
          <p className="copy-secondary">
            Note: The Sun <SunIcon className="sun-icon" /> has been added to
            your H-R Diagram.
          </p>
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
          <StellarTable
            answers={answers}
            answerIds={tableAnswerIds}
            colTitles={tableHeaders}
            rowTitles={tableRowTitles}
          />
        </section>
        <div className="container-flex direction-column">
          <Select
            className="graph-selector"
            value={activeGraph}
            options={[
              { label: 'H-R Diagram', value: 0 },
              {
                label: `${capitalize(histogramAccessor)} Histogram`,
                value: 1,
              },
            ]}
            label="Graph Selector"
            name="Graph Selector"
            handleChange={graphSelectHandler}
          />
          <div className="container-graphs">
            {activeGraph === 0 && (
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
                tooltipAccessors={['radius']}
                includeSun
              />
            )}
            {activeGraph === 1 && (
              <Histogram
                data={clusterData}
                activeId={activeId}
                activeData={activeData}
                valueAccessor={histogramAccessor}
                domain={histogramDomain}
                xAxisLabel={histogramAxisLabel}
                dataSelectionCallback={answerHandler}
                tooltipAccessors={['radius']}
              />
            )}
          </div>
        </div>
      </Section>
    );
  }
}

StellarProperty.propTypes = {
  id: PropTypes.string,
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
  tableAnswerIds: PropTypes.array,
  tableHeaders: PropTypes.array,
  tableRowTitles: PropTypes.array,
  activeGraph: PropTypes.number,
  graphSelectHandler: PropTypes.func,
  sectionCopy: PropTypes.node,
  sectionTitle: PropTypes.string,
};

export default WithGraphToggler(
  WithAnswerHandlers(
    WithActiveQuestions(WithData(StellarProperty, 'is_member'))
  )
);
