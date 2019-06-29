import React from 'react';
import PropTypes from 'prop-types';
import QuestionsAnswers from 'react-md/lib//ExpansionPanels/ExpansionList';
import QuestionAnswer from './ExpansionPanel';

class QuestionExpansionList extends React.PureComponent {
  render() {
    const {
      questions,
      answers,
      activeId,
      toggleHandler,
      cancelHandler,
      saveHandler,
      editHandler,
    } = this.props;

    return (
      <QuestionsAnswers className="qas unstyled">
        {questions.map(question => {
          const { id } = question;
          const answer = answers[id];

          return (
            <QuestionAnswer
              {...this.props}
              key={`${question.type}-qa-${id}`}
              question={question}
              answer={answer}
              active={activeId === id}
              toggleHandler={toggleHandler}
              cancelHandler={cancelHandler}
              saveHandler={saveHandler}
              editHandler={editHandler}
            />
          );
        })}
      </QuestionsAnswers>
    );
  }
}

QuestionExpansionList.propTypes = {
  questions: PropTypes.array,
  answers: PropTypes.object,
  activeId: PropTypes.object,
  toggleHandler: PropTypes.func,
  cancelHandler: PropTypes.func,
  saveHandler: PropTypes.func,
  editHandler: PropTypes.func,
};

export default QuestionExpansionList;
