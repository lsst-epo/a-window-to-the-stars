import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Question from 'react-md/lib//ExpansionPanels/ExpansionPanel';
import Answer from '../answers/ExpansionPanel';

class QuestionExpansionPanel extends React.PureComponent {
  render() {
    const {
      question,
      answer,
      active,
      columnWidths,
      focused,
      toggleHandler,
      cancelHandler,
      saveHandler,
      editHandler,
    } = this.props;
    const { answerPre, answerAccessor, id: qId } = question;

    const answered = !isEmpty(answer);
    const isExpanded = active || answered;
    const showFooter = !answered || (!active && answered) ? null : undefined;

    const questionClasses = classnames('qa no-pointer', {
      active,
      answered,
      unstyled: !active,
    });

    return (
      <Question
        columnWidths={columnWidths}
        focused={focused}
        label={question.label}
        className={questionClasses}
        contentClassName="answer"
        expanded={isExpanded}
        onExpandToggle={() => toggleHandler(qId)}
        onCancel={() => cancelHandler(qId)}
        onSave={() => saveHandler(qId)}
        closeOnCancel={false}
        saveSecondary
        footer={showFooter}
      >
        {answered && (
          <Answer
            id={answer.id}
            pre={answerPre}
            content={answer.content}
            accessor={answerAccessor}
            showEditButton={!active && answered}
            editHandler={editHandler}
          />
        )}
      </Question>
    );
  }
}

QuestionExpansionPanel.propTypes = {
  answer: PropTypes.object,
  question: PropTypes.object,
  active: PropTypes.bool,
  columnWidths: PropTypes.array,
  focused: PropTypes.bool,
  toggleHandler: PropTypes.func,
  cancelHandler: PropTypes.func,
  saveHandler: PropTypes.func,
  editHandler: PropTypes.func,
};

export default QuestionExpansionPanel;
