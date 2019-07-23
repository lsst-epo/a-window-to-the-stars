import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import { withData } from '../containers/WithData';
import { withAnswerHandlers } from '../containers/WithAnswerHandlers';
import Section from './Section';
import Select from '../../site/forms/Select';
import ScatterPlot from '../../scatter-plot';
import Histogram from '../../histogram';
import QuestionsAnswerSelections from '../../questions/ExpansionList';
import QuestionsAnswerTextInputs from '../../questions/TextInputs';

@reactn
class ComparingStarProperties extends React.PureComponent {
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

  render() {
    const { clusterData, questions, xDomain, yDomain } = this.props;
    const { activeGraph, activeId } = this.state;
    const { answers } = this.global;
    const activeAnswer = answers[activeId];
    const activeData = activeAnswer ? activeAnswer.data : null;

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">Comparing Star Temperatures</h2>
          <p>
            Use the tabs above the graph to switch between your H-R Diagram and
            the Temperature Histogram.{' '}
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
            <QuestionsAnswerTextInputs
              questions={questions.slice(3, 5)}
              answers={answers}
              handleChange={this.updateAnswer}
            />
          )}
        </section>
        <div className="container-flex direction-column">
          <Select
            className="graph-selector"
            options={[
              { label: 'H-R Diagram', value: 0 },
              { label: 'Temperature Histogram', value: 1 },
            ]}
            label="Graph Selector"
            name="Graph Selector"
            handleChange={this.onGraphSelect}
          />
          <div className="container-graphs">
            {activeGraph === 0 && (
              <ScatterPlot
                data={clusterData}
                xDomain={xDomain}
                yDomain={yDomain}
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
                selectedData={activeData}
                valueAccessor="temperature"
                xAxisLabel="Temperature (K)"
                dataSelectionCallback={this.onGraphSelection}
              />
            )}
          </div>
        </div>
      </Section>
    );
  }
}

ComparingStarProperties.propTypes = {
  clusterData: PropTypes.array,
  questionsRange: PropTypes.array,
  questions: PropTypes.array,
  answerHandler: PropTypes.func,
  getActiveId: PropTypes.func,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
};

export default withAnswerHandlers(
  withData(ComparingStarProperties, 'is_member')
);
