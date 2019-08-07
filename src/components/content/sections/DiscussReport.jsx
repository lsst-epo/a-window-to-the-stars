import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { getAnswerData } from '../../../lib/utilities';
import { WithData } from '../containers/WithData';
import { WithAnswerHandlers } from '../containers/WithAnswerHandlers';
import { WithActiveQuestions } from '../containers/WithActiveQuestions';
import Section from './Section';
import Table from '../../site/forms/Table';
import Select from '../../site/forms/Select';
import ScatterPlot from '../../scatter-plot';
import Histogram from '../../histogram';
import QAs from '../../qas';
import StellarValue from '../../charts/shared/StellarValue';
import StellarValueRange from '../../charts/shared/StellarValueRange';

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

  getSunValue(accessor) {
    if (accessor === 'luminosity') {
      return <StellarValue value={1} type={accessor} />;
    }

    if (accessor === 'radius') {
      return <StellarValue value={1} type={accessor} />;
    }

    if (accessor === 'mass') {
      return <StellarValue value={1} type={accessor} />;
    }

    if (accessor === 'lifetime') {
      return <StellarValue value={10000000000} type={accessor} />;
    }

    if (accessor === 'temperature') {
      return <StellarValue value={5778} type={accessor} />;
    }

    return null;
  }

  tableValues(answers, tableHeaders, tableAnswersIds) {
    const cells = [
      ['Temperature'],
      ['Luminosity'],
      ['Mass'],
      ['Lifetime'],
      ['Radius'],
    ];

    let idIndex = 0;
    const mod = 3;

    cells.forEach(cell => {
      const accessor = cell[0].toLowerCase();

      for (let i = 0; i < mod; i += 1) {
        const answer = answers[tableAnswersIds[idIndex]];

        if (isEmpty(answer)) {
          cell.push('');
        } else if (Array.isArray(answer.content)) {
          cell.push(
            <StellarValueRange data={answer.content} type={accessor} />
          );
        } else {
          cell.push(<StellarValue value={answer.content} type={accessor} />);
        }

        idIndex += 1;
      }

      cell.push(this.getSunValue(accessor));
    });

    return cells;
  }

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
      tableAnswersIds,
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
              Note: The Sun <span>SUN ICON</span> has been added to your H-R
              Diagram.
            </span>
          </p>
          <hr className="divider-horizontal" />
          <Table
            className="stellar-properties"
            colTitles={tableHeaders}
            rowTitles
            rows={this.tableValues(answers, tableHeaders, tableAnswersIds)}
          />
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
              />
            )}
            {activeGraph === 1 && (
              <Histogram
                data={clusterData}
                activeData={activeData}
                valueAccessor="temperature"
                domain={[3500, 10000]}
                xAxisLabel="Temperature (K)"
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
                xAxisLabel="Temperature (K)"
                dataSelectionCallback={this.onGraphSelection}
                tooltipAccessors={['luminosity']}
              />
            )}
            {activeGraph === 3 && (
              <Histogram
                data={clusterData}
                activeData={activeData}
                valueAccessor="mass"
                xAxisLabel="Stellar Mass (Msun)"
                dataSelectionCallback={this.onGraphSelection}
                tooltipAccessors={['mass']}
              />
            )}
            {activeGraph === 4 && (
              <Histogram
                data={clusterData}
                activeData={activeData}
                valueAccessor="lifetime"
                xAxisLabel="Lifetime (Gyr)"
                dataSelectionCallback={this.onGraphSelection}
                tooltipAccessors={['lifetime']}
              />
            )}
            {activeGraph === 5 && (
              <Histogram
                data={clusterData}
                activeData={activeData}
                valueAccessor="radius"
                xAxisLabel="Radius (Rsun)"
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
  tableAnswersIds: PropTypes.array,
  tableHeaders: PropTypes.array,
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
