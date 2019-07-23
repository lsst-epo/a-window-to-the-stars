import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { formatValue } from '../../../lib/utilities.js';
import { withData } from '../containers/WithData';
import { withAnswerHandlers } from '../containers/WithAnswerHandlers';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import QuestionsAnswers from '../../questions/ExpansionList';
import Table from '../../site/forms/Table';

class HRDObservations extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeId: null,
    };
  }

  componentDidMount() {
    const { getActiveId, questionsRange } = this.props;

    const activeId = getActiveId(questionsRange);
    this.setActiveQuestion(activeId);
  }

  tableValues() {
    const cells = [
      ['Main Sequence Temperature Range'],
      ['Total Giant Stars'],
      ['Total White Dwarf Stars'],
    ];

    const { questionsRange, answers } = this.props;
    const a1 = questionsRange[0];
    const a2 = questionsRange[1];
    const a3 = questionsRange[2];
    const a4 = questionsRange[3];

    if (!isEmpty(answers[a1]) && !isEmpty(answers[a2])) {
      cells[0].push(
        `${formatValue(answers[a1].content, 0)} K  -  ${formatValue(
          answers[a2].content,
          0
        )} K`
      );
    } else {
      cells[0].push('');
    }

    if (!isEmpty(answers[a3])) {
      cells[1].push(answers[a3].content);
    } else {
      cells[1].push('');
    }

    if (!isEmpty(answers[a4])) {
      cells[2].push(answers[a4].content);
    } else {
      cells[2].push('');
    }

    return cells;
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
    const {
      clusterData,
      questions,
      answers,
      introduction,
      clusterName,
      id,
    } = this.props;
    const { activeId } = this.state;

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
            rows={this.tableValues()}
          />
        </section>
        <div>
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
            useLasso
          />
        </div>
      </Section>
    );
  }
}

HRDObservations.propTypes = {
  id: PropTypes.number,
  clusterData: PropTypes.array,
  questionsRange: PropTypes.array,
  questions: PropTypes.array,
  answers: PropTypes.object,
  answerHandler: PropTypes.func,
  getActiveId: PropTypes.func,
  layout: PropTypes.string,
  dividers: PropTypes.bool,
  paginationLocation: PropTypes.number,
  introduction: PropTypes.string,
  clusterName: PropTypes.string,
};

export default withAnswerHandlers(withData(HRDObservations, 'is_member'));
