import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { formatValue, getAnswerData } from '../../../lib/utilities.js';
import { withData } from '../containers/WithData';
import { withAnswerHandlers } from '../containers/WithAnswerHandlers';
import { withActiveQuestions } from '../containers/withActiveQuestions';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import QuestionsAnswers from '../../questions/ExpansionList';
import Table from '../../site/forms/Table';

class HRDObservations extends React.PureComponent {
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

  onGraphSelection = selectedData => {
    const { answerHandler, activeId } = this.props;

    answerHandler(activeId, selectedData);
  };

  render() {
    const {
      clusterData,
      questions,
      answers,
      introduction,
      clusterName,
      id,
      scatterXDomain,
      scatterYDomain,
      answerHandler,
      setActive,
      advanceActive,
      activeId,
    } = this.props;

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
              cancelHandler={answerHandler}
              saveHandler={advanceActive}
              editHandler={setActive}
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
          <h2 className="space-bottom">H-R Diagram: Star {clusterName}</h2>
          <ScatterPlot
            id={id}
            data={clusterData}
            activeData={getAnswerData(answers, activeId)}
            xValueAccessor="temperature"
            yValueAccessor="luminosity"
            xAxisLabel="Temperature (K)"
            yAxisLabel="Solar Luminosity"
            xDomain={scatterXDomain}
            yDomain={scatterYDomain}
            dataSelectionCallback={this.onGraphSelection}
            useLasso
            showColorLegend
          />
        </div>
      </Section>
    );
  }
}

HRDObservations.propTypes = {
  id: PropTypes.number,
  activeId: PropTypes.string,
  setActive: PropTypes.func,
  advanceActive: PropTypes.func,
  clusterData: PropTypes.array,
  questionsRange: PropTypes.array,
  questions: PropTypes.array,
  answers: PropTypes.object,
  answerHandler: PropTypes.func,
  layout: PropTypes.string,
  dividers: PropTypes.bool,
  paginationLocation: PropTypes.number,
  introduction: PropTypes.string,
  clusterName: PropTypes.string,
  scatterXDomain: PropTypes.array,
  scatterYDomain: PropTypes.array,
};

export default withAnswerHandlers(
  withActiveQuestions(withData(HRDObservations, 'is_member'))
);
