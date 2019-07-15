import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import API from '../../site/API';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import QuestionsAnswers from '../../questions/ExpansionList';
import Table from '../../site/forms/Table';

@reactn
class HRDObservations extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clusterData: [],
      activeId: null,
    };
  }

  componentDidMount() {
    const { dataPath, getActiveId, questionsRange } = this.props;

    API.get(dataPath).then(res => {
      const clusterData = res.data.stars.filter(datum => {
        return !!datum.is_member;
      });

      this.setState(prevState => ({
        ...prevState,
        clusterData,
      }));
    });

    const activeId = getActiveId(questionsRange);
    this.setActiveQuestion(activeId);
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
  }

  updateAnswer(id, data) {
    const { questions } = this.props;
    const activeIndex = this.indexFromId(id);
    const { answerAccessor } = questions[activeIndex];
    const { answers: prevAnswers } = this.global;
    const prevAnswer = { ...prevAnswers[id] };
    let content = data;

    if (
      data &&
      (answerAccessor === 'temperature' || answerAccessor === 'luminosity')
    ) {
      content = data[0][answerAccessor];
    } else if (answerAccessor === 'count') {
      content = data.length;
    }

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

  handleAnswer(data, id) {
    if (data && id) {
      this.updateAnswer(id, data);
    } else {
      this.clearAnswer(id);
    }
  }

  formatValue(number, decimalPlaces) {
    return Number.parseFloat(number).toFixed(decimalPlaces);
  }

  tableValues(answers) {
    const { questionsRange } = this.props;
    let tempRange = '';
    let giants = '';
    let dwarves = '';

    const q1 = questionsRange[0];
    const q2 = questionsRange[1];
    const q3 = questionsRange[2];
    const q4 = questionsRange[3];

    if (!isEmpty(answers[q1]) && !isEmpty(answers[q2])) {
      tempRange = `${this.formatValue(
        answers[q1].content,
        0
      )} K  -  ${this.formatValue(answers[q2].content, 0)} K`;
    }

    if (!isEmpty(answers[q3])) {
      giants = answers[q3].content;
    }

    if (!isEmpty(answers[q4])) {
      dwarves = answers[q4].content;
    }

    return [
      ['Main Sequence Temperature Range', tempRange],
      ['Total Giant Stars', giants],
      ['Total White Dwarf Stars', dwarves],
    ];
  }

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
    const { activeId } = this.state;
    this.handleAnswer(selectedData, activeId);
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
    const { questions, introduction, clusterName, id } = this.props;
    const { clusterData, activeId } = this.state;
    const { answers } = this.global;

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">Exploring Star {clusterName}</h2>
          <p>{introduction}</p>
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
          <hr className="divider-horizontal" />
          <Table
            colTitles={[`Star ${clusterName}`, 'Values']}
            rowTitles
            rows={this.tableValues(answers)}
          />
        </section>
        <div className="col-graph">
          <h2>H-R Diagram: Star {clusterName}</h2>
          <ScatterPlot
            id={id}
            activeId={activeId}
            data={clusterData}
            xValueAccessor="temperature"
            yValueAccessor="luminosity"
            xAxisLabel="Temperature (K)"
            yAxisLabel="Solar Luminosity"
            dataSelectionCallback={this.onGraphSelection}
            filterBy="is_member"
            useLasso
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
  getActiveId: PropTypes.func,
  dataPath: PropTypes.string,
  introduction: PropTypes.string,
  clusterName: PropTypes.string,
};

export default HRDObservations;
