import React from 'react';
import PropTypes from 'prop-types';
import AnswerTextInput from '../answers/TextInput';

class QuestionTextInput extends React.PureComponent {
  render() {
    const { label, id, placeholder } = this.props;

    return <AnswerTextInput id={id} label={label} placeholder={placeholder} />;
  }
}

QuestionTextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default QuestionTextInput;
