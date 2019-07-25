import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import {
  histogram as d3Histogram,
  thresholdScott as d3ThresholdScott,
} from 'd3-array';
// thresholdSturges as d3ThresholdSturges,
// thresholdScott as d3ThresholdScott,
// threshholdFreedmanDiaconis as d3ThresholdFreedmanDiaconis,
import { capitalize } from '../../../lib/utilities';
import { withData } from '../containers/WithData';
import { withAnswerHandlers } from '../containers/WithAnswerHandlers';
import Section from './Section';
import Select from '../../site/forms/Select';
import ScatterPlot from '../../scatter-plot';
import Histogram from '../../histogram';
import QuestionsAnswerSelections from '../../questions/ExpansionList';
import QuestionAnswerSelect from '../../questions/Select';

@reactn
class StarPropertiesObservations extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeGraph: 0,
      activeId: null,
      selectedHistogramData: null,
      selectedScatterplotData: null,
    };
  }

  componentDidMount() {
    const { getActiveId, questionsRange } = this.props;

    const activeId = getActiveId(questionsRange);
    this.setActiveQuestion(activeId);
  }

  selectItems(clusters) {
    return clusters.map((cluster, i) => {
      return { label: cluster.name, value: i };
    });
  }

  onGraphSelect = e => {
    const { value } = e.target;

    this.setState(prevState => ({
      ...prevState,
      activeGraph: parseInt(value, 10),
    }));
  };

  updateAnswer = (id, value) => {
    const { answers: prevAnswers } = this.global;
    const prevAnswer = { ...prevAnswers[id] };
    const content = value || '';

    this.setGlobal(prevGlobal => ({
      ...prevGlobal,
      answers: {
        ...prevAnswers,
        [id]: {
          ...prevAnswer,
          id,
          content,
        },
      },
    }));
  };

  setActiveQuestion(id) {
    this.setState(prevState => ({
      ...prevState,
      activeId: id,
    }));
  }

  advanceActiveQuestion() {
    const { getActiveId, questionsRange } = this.props;
    const nextId = getActiveId(questionsRange);
    this.setActiveQuestion(nextId);
  }

  onGraphSelection = selectedData => {
    const { answerHandler } = this.props;
    const { activeId } = this.state;

    answerHandler(activeId, selectedData);
  };

  onQAToggle = () => {
    return null;
  };

  onAnswerCancel = id => {
    const { answerHandler } = this.props;

    answerHandler(id);
  };

  onAnswerSave = id => {
    this.advanceActiveQuestion(id);
  };

  onEdit = id => {
    this.setActiveQuestion(id);
  };

  histogramData(data, valueAccessor, domain) {
    if (valueAccessor === 'luminosity') {
      return d3Histogram()
        .value(d => {
          return Math.log10(d[valueAccessor]); // eslint-disable-line dot-notation
        })
        .thresholds(d3ThresholdScott)(data);
    }

    return d3Histogram()
      .value(d => {
        return d[valueAccessor]; // eslint-disable-line dot-notation
      })
      .domain(domain)(data);
  }

  render() {
    const {
      clusterData,
      questions,
      scatterXDomain,
      scatterYDomain,
      histogramAccessor,
      histogramDomain,
      histogramAxisLabel,
    } = this.props;
    const { activeGraph, activeId } = this.state;
    const { answers } = this.global;
    const activeAnswer = answers[activeId];
    const activeData = activeAnswer ? activeAnswer.data : null;
    const histogramData = this.histogramData(
      clusterData,
      histogramAccessor,
      histogramDomain
    );

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">{`Comparing Star ${capitalize(
            histogramAccessor
          )}`}</h2>
          <p>
            Use the tabs above the graph to switch between your H-R Diagram and
            the {capitalize(histogramAccessor)} Histogram.{' '}
            <span className="copy-secondary">
              Note: The Sun <span>SUN ICON</span> has been added to your H-R
              Diagram.
            </span>
          </p>
          <hr className="divider-horizontal" />
          {questions && (
            <QuestionsAnswerSelections
              questions={questions.slice(0, 3)}
              answers={answers}
              activeId={activeId}
              toggleHandler={this.onQAToggle}
              cancelHandler={this.onAnswerCancel}
              saveHandler={this.onAnswerSave}
              editHandler={this.onEdit}
            />
          )}
          {questions && (
            <QuestionAnswerSelect
              question={questions[3]}
              answer={answers[questions[3].id]}
              handleAnswerSelect={this.updateAnswer}
              activeId={activeId}
            />
          )}
        </section>
        <div className="container-flex direction-column">
          <Select
            className="graph-selector"
            options={[
              { label: 'H-R Diagram', value: 0 },
              { label: `${capitalize(histogramAccessor)} Histogram`, value: 1 },
            ]}
            label="Graph Selector"
            name="Graph Selector"
            handleChange={this.onGraphSelect}
          />
          <div className="container-graphs">
            {activeGraph === 0 && (
              <ScatterPlot
                data={clusterData}
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
                data={histogramData}
                selectedData={activeData}
                valueAccessor={histogramAccessor}
                xAxisLabel={histogramAxisLabel}
                dataSelectionCallback={this.onGraphSelection}
              />
            )}
          </div>
        </div>
      </Section>
    );
  }
}

StarPropertiesObservations.propTypes = {
  clusterData: PropTypes.array,
  questionsRange: PropTypes.array,
  questions: PropTypes.array,
  answerHandler: PropTypes.func,
  getActiveId: PropTypes.func,
  scatterXDomain: PropTypes.array,
  scatterYDomain: PropTypes.array,
  histogramAccessor: PropTypes.string,
  histogramDomain: PropTypes.array,
  histogramAxisLabel: PropTypes.string,
};

export default withAnswerHandlers(
  withData(StarPropertiesObservations, 'is_member')
);
