import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
// import isEmpty from 'lodash/isEmpty';
import { capitalize, getAnswerData } from '../../../lib/utilities';
import { withData } from '../containers/WithData';
import { withAnswerHandlers } from '../containers/WithAnswerHandlers';
import Section from './Section';
import Select from '../../site/forms/Select';
import ScatterPlot from '../../scatter-plot';
import Histogram from '../../histogram';
import QuestionsAnswerSelections from '../../questions/ExpansionList';
import QuestionAnswerSelect from '../../questions/Select';

@reactn
class EstimatingStellarTemperatures extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeGraph: 0,
      activeId: null,
    };
  }

  componentDidMount() {
    const { getActiveId, questionsRange } = this.props;

    const activeId = getActiveId(questionsRange);
    this.setActiveQuestion(activeId);
  }

  componentDidUpdate() {
    const { activeId } = this.state;
    console.log(activeId);
  }
  //   const { getActiveId, questionsRange } = this.props;

  //   if (prevState.activeId !== activeId || !activeId) {
  //     const newActiveId = getActiveId(questionsRange);
  //     this.setActiveQuestion(newActiveId);
  //   }
  // }

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

  // updateAnswer = (id, value) => {
  //   const { answers: prevAnswers } = this.global;
  //   const prevAnswer = { ...prevAnswers[id] };
  //   const content = value || '';

  //   this.setGlobal(prevGlobal => ({
  //     ...prevGlobal,
  //     answers: {
  //       ...prevAnswers,
  //       [id]: {
  //         ...prevAnswer,
  //         id,
  //         content,
  //       },
  //     },
  //   }));
  // };

  setActiveQuestion = id => {
    this.setState(prevState => ({
      ...prevState,
      activeId: id,
    }));
  };

  advanceActiveQuestion = () => {
    const { getActiveId, questionsRange } = this.props;
    const nextId = getActiveId(questionsRange);
    this.setActiveQuestion(nextId);
  };

  onGraphSelection = selectedData => {
    const { answerHandler } = this.props;
    const { activeId } = this.state;

    answerHandler(activeId, selectedData);
  };

  onQAToggle = () => {
    return null;
  };

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
    } = this.props;
    const { activeGraph, activeId } = this.state;
    const { answers } = this.global;
    const activeData = getAnswerData(answers, activeId);

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
              cancelHandler={answerHandler}
              saveHandler={this.advanceActiveQuestion}
              editHandler={this.setActiveQuestion}
            />
          )}
          {questions && (
            <QuestionAnswerSelect
              question={questions[3]}
              answer={answers[questions[3].id]}
              handleAnswerSelect={answerHandler}
              activeId={activeId}
            />
          )}
        </section>
        <div className="container-flex direction-column">
          <Select
            className="graph-selector"
            value={activeGraph}
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
                valueAccessor={histogramAccessor}
                domain={histogramDomain}
                xAxisLabel={histogramAxisLabel}
                dataSelectionCallback={this.onGraphSelection}
                tooltipAccessors={[histogramAccessor]}
              />
            )}
          </div>
        </div>
      </Section>
    );
  }
}

EstimatingStellarTemperatures.propTypes = {
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
  withData(EstimatingStellarTemperatures, 'is_member')
);
