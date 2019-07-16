import React from 'react';
import PropTypes from 'prop-types';
import QuestionAnswerTextInput from '../answers/TextInput';

class QuestionTextInputs extends React.PureComponent {
  render() {
    const { questions, answers, handleChange } = this.props;

    return (
      <div className="qas form">
        {questions.map(question => {
          const { id, type, label, placeholder } = question;
          const answer = answers[id];

          return (
            <QuestionAnswerTextInput
              key={`qa-${id}`}
              id={id}
              type={type}
              label={label}
              answer={answer}
              placeholder={placeholder}
              handleChange={handleChange}
            />
          );
        })}
      </div>
    );
  }
}

QuestionTextInputs.propTypes = {
  questions: PropTypes.array,
  answers: PropTypes.object,
  handleChange: PropTypes.func,
};

export default QuestionTextInputs;
