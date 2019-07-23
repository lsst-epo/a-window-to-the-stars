import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Select from '../site/forms/Select';

class QuestionSelect extends React.PureComponent {
  onChange = e => {
    const { question, handleAnswerSelect } = this.props;
    const { value } = e.target;

    handleAnswerSelect(question.id, value);
  };

  render() {
    const { question, activeId, answer } = this.props;
    const { id, label, options, placeholder } = question;
    const active = activeId === id;
    const answered = !isEmpty(answer);
    const classes = classnames('qa qa-select', {
      active,
      answered,
    });

    return (
      <div className={classes}>
        <Select
          id={`qa-${id}`}
          className="answer-select"
          options={options}
          label={label}
          name={label}
          handleChange={this.onChange}
          placeholder={placeholder}
          disabled={!active && !answered}
          showLabel
        />
      </div>
    );
  }
}

QuestionSelect.propTypes = {
  handleAnswerSelect: PropTypes.func,
  question: PropTypes.object,
  answer: PropTypes.object,
  activeId: PropTypes.string,
};

export default QuestionSelect;
