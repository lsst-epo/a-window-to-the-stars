import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import { getAnswerData } from '../../../lib/utilities';
import { WithData } from '../containers/WithData';
import { WithAnswerHandlers } from '../containers/WithAnswerHandlers';
import { WithActiveQuestions } from '../containers/WithActiveQuestions';
import Section from './Section';
import Select from '../../site/forms/Select';
import ScatterPlot from '../../scatter-plot';
import Histogram from '../../histogram';
import QAs from '../../qas';
import StellarTable from '../../charts/shared/StellarTable';
import SunIcon from '../../site/icons/Sun';

@reactn
class DiscussReport extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeGraph: 0,
    };
  }

  onGraphSelect = e => {
    const { value } = e.target;

    this.setState(prevState => ({
      ...prevState,
      activeGraph: parseInt(value, 10),
    }));
  };

  onGraphSelection = selectedData => {
    const { answerHandler, activeId } = this.props;

    answerHandler(activeId, selectedData);
  };

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
      tableHeaders,
      tableRowTitles,
      tableAnswerIds,
    } = this.props;
    const { activeGraph } = this.state;
    const { answers } = this.global;
    const activeData = getAnswerData(answers, activeId);

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">Discuss &amp; Report</h2>
          <p>
            Take a few minutes with your partner or small group to discuss the
            following questions.
          </p>
          <p>
            Use the dropdown above the graph to switch between your H-R Diagram
            and the Stellar Property Histograms.{' '}
            <span className="copy-secondary">
              Note: The Sun <SunIcon className="sun-icon" /> has been added to
              your H-R Diagram.
            </span>
          </p>
          <hr className="divider-horizontal" />
          <StellarTable
            answers={answers}
            answerIds={tableAnswerIds}
            colTitles={tableHeaders}
            rowTitles={tableRowTitles}
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
        <div className="container-flex direction-column">
          <Select
            className="graph-selector"
            value={activeGraph}
            options={[
              { label: 'H-R Diagram', value: 0 },
              { label: `Temperature Histogram`, value: 1 },
              { label: `Luminosity Histogram`, value: 2 },
              { label: `Mass Histogram`, value: 3 },
              { label: `Lifetime Histogram`, value: 4 },
              { label: `Radius Histogram`, value: 5 },
            ]}
            label="Graph Selector"
            name="Graph Selector"
            handleChange={this.onGraphSelect}
          />
          <div className="container-graphs">
            {activeGraph === 0 && (
              <ScatterPlot
                data={clusterData}
                activeData={activeData}
                xDomain={scatterXDomain}
                yDomain={scatterYDomain}
                xValueAccessor="temperature"
                yValueAccessor="luminosity"
                xAxisLabel="Temperature (K)"
                yAxisLabel="Solar Luminosity"
                dataSelectionCallback={this.onGraphSelection}
                includeSun
              />
            )}
            {activeGraph === 1 && (
              <Histogram
                data={clusterData}
                activeData={activeData}
                valueAccessor="temperature"
                domain={[3500, 10000]}
                dataSelectionCallback={this.onGraphSelection}
                tooltipAccessors={['temperature']}
              />
            )}
            {activeGraph === 2 && (
              <Histogram
                data={clusterData}
                activeData={activeData}
                valueAccessor="luminosity"
                domain={[-2, 4]}
                dataSelectionCallback={this.onGraphSelection}
                tooltipAccessors={['luminosity']}
              />
            )}
            {activeGraph === 3 && (
              <Histogram
                data={clusterData}
                activeData={activeData}
                valueAccessor="mass"
                dataSelectionCallback={this.onGraphSelection}
                tooltipAccessors={['mass']}
              />
            )}
            {activeGraph === 4 && (
              <Histogram
                data={clusterData}
                activeData={activeData}
                valueAccessor="lifetime"
                dataSelectionCallback={this.onGraphSelection}
                tooltipAccessors={['lifetime']}
              />
            )}
            {activeGraph === 5 && (
              <Histogram
                data={clusterData}
                activeData={activeData}
                valueAccessor="radius"
                dataSelectionCallback={this.onGraphSelection}
                tooltipAccessors={['radius']}
              />
            )}
          </div>
        </div>
      </Section>
    );
  }
}

DiscussReport.propTypes = {
  clusterData: PropTypes.array,
  activeId: PropTypes.string,
  setActive: PropTypes.func,
  advanceActive: PropTypes.func,
  questions: PropTypes.array,
  tableAnswerIds: PropTypes.array,
  tableHeaders: PropTypes.array,
  tableRowTitles: PropTypes.array,
  answerHandler: PropTypes.func,
  scatterXDomain: PropTypes.array,
  scatterYDomain: PropTypes.array,
  histogramAccessor: PropTypes.string,
  histogramDomain: PropTypes.array,
  histogramAxisLabel: PropTypes.string,
};

export default WithAnswerHandlers(
  WithActiveQuestions(WithData(DiscussReport, 'is_member'))
);