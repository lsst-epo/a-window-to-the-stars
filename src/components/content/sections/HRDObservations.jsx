import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import API from '../../site/API';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import QuestionsAnswers from '../../questions/ExpansionList';

@reactn
class HRDObservations extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clearGraphSelection: false,
      clusterData: [],
    };
  }

  componentDidMount() {
    API.get('static-data/stars.json').then(res => {
      this.setState(prevState => ({
        ...prevState,
        clusterData: res.data,
      }));
    });
  }

  componentDidUpdate() {
    const { questions } = this.props;
    const { answers, activeId } = this.global;

    if (questions && !activeId && !answers[questions[0].id]) {
      this.setGlobal(prevGlobal => ({
        ...prevGlobal,
        activeId: questions[0].id,
      }));
    }
  }

  indexFromId(id) {
    const { questionsRange } = this.props;
    return questionsRange.indexOf(parseInt(id, 10));
  }

  clearAnswer(id) {
    const { answers: prevAnswers } = this.global;

    this.setGlobal(prevGlobal => ({
      ...prevGlobal,
      answers: {
        ...prevAnswers,
        [id]: {},
      },
    }));

    this.setState(prevState => ({
      ...prevState,
      clearGraphSelection: true,
    }));
  }

  updateAnswer(id, data) {
    const { questions } = this.props;
    const activeIndex = this.indexFromId(id);
    const { answerAccessor } = questions[activeIndex];
    const { answers: prevAnswers } = this.global;
    const prevAnswer = { ...prevAnswers[id] };
    const content = answerAccessor ? data[answerAccessor] : data;
    console.log('globaling', this);
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
  }

  setActiveQuestion(id) {
    this.setGlobal(prevGlobal => ({
      ...prevGlobal,
      activeId: id,
    }));
  }

  advanceActiveQuestion(id) {
    const { questionsRange } = this.props;
    const lastIndex = questionsRange.length - 1;
    const currentIndex = this.indexFromId(id);
    const nextIndex = currentIndex + 1;
    let nextId = null;

    if (nextIndex <= lastIndex) {
      nextId = questionsRange[nextIndex].toString();
    }

    this.setActiveQuestion(nextId);
  }

  onGraphSelection = selectedData => {
    const { activeId } = this.props;

    if (selectedData) {
      this.updateAnswer(activeId, selectedData);
    } else {
      this.clearAnswer(activeId);
    }
  };

  onQAToggle = () => {
    return null;
  };

  onAnswerCancel = id => {
    this.clearAnswer(id);
  };

  onAnswerSave = id => {
    this.advanceActiveQuestion(id);
  };

  onEdit = id => {
    this.setActiveQuestion(id);
  };

  render() {
    const { questions, activeId } = this.props;
    const { clusterData } = this.state;
    const { answers } = this.global;
    const activeAnswer = answers[activeId] || {};

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">Exploring Star Cluster 1</h2>
          <p>Use the H-R Diagram to complete </p>
          <hr className="divider-horizontal" />
          {questions && (
            <QuestionsAnswers
              questions={questions}
              answers={answers}
              activeId={activeId}
              toggleHandler={this.onQAToggle}
              cancelHandler={this.onAnswerCancel}
              saveHandler={this.onAnswerSave}
              editHandler={this.onEdit}
            />
          )}
        </section>
        <div className="col-graph">
          <h2>H-R Diagram: Star Cluster 1</h2>
          <ScatterPlot
            data={clusterData}
            xValueAccessor="temperature"
            yValueAccessor="luminosity"
            xAxisLabel="Temperature (K)"
            yAxisLabel="Solar Luminosity"
            dataSelectionCallback={this.onGraphSelection}
            clearOnChange={isEmpty(activeAnswer)}
          />
        </div>
      </Section>
    );
  }
}

HRDObservations.propTypes = {
  id: PropTypes.number,
  layout: PropTypes.string,
  dividers: PropTypes.bool,
  paginationLocation: PropTypes.number,
  questionsRange: PropTypes.array,
  questions: PropTypes.array,
  activeId: PropTypes.string,
};

export default HRDObservations;
