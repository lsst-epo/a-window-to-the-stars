import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import TextField from 'react-md/lib/TextFields/TextField';

class AnswerTextInput extends React.PureComponent {
  changeHandler = value => {
    const { id, handleChange } = this.props;
    handleChange(id, value);
  };

  render() {
    const { id, type, label, placeholder } = this.props;

    return (
      <React.Fragment>
        {type === 'text' && (
          <TextField
            id={`text-input-${id}`}
            type="text"
            label={label}
            lineDirection="center"
            placeholder={placeholder}
            onChange={debounce(this.changeHandler, 800)}
          />
        )}
        {type === 'textArea' && (
          <TextField
            id={`text-area-${id}`}
            type="text"
            label={label}
            lineDirection="center"
            placeholder={placeholder}
            rows={2}
            maxRows={8}
            onChange={debounce(this.changeHandler, 800)}
          />
        )}
      </React.Fragment>
    );
  }
}

AnswerTextInput.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
};

export default AnswerTextInput;
