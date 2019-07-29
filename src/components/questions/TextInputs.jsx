import React from 'react';
import PropTypes from 'prop-types';
import QuestionAnswerTextInput from '../answers/TextInput';

class QuestionTextInputs extends React.PureComponent {
  render() {
    const { activeId, questions, answers, handleChange } = this.props;
    // console.log(activeId);
    return (
      <div className="qas form">
        {questions.map(question => {
          const { id, type, label, placeholder } = question;
          const answer = answers[id];

          return (
            <QuestionAnswerTextInput
              key={`qa-${id}`}
              id={id}
              activeId={activeId}
              type={type}
              label={label}
              answer={answer}
              placeholder={placeholder}
              handleChange={handleChange}
              handleBlur={handleChange}
            />
          );
        })}
      </div>
    );
  }
}

QuestionTextInputs.propTypes = {
  activeId: PropTypes.string,
  questions: PropTypes.array,
  answers: PropTypes.object,
  handleChange: PropTypes.func,
};

export default QuestionTextInputs;
