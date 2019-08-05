import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import TextField from 'react-md/lib/TextFields/TextField';

class TextInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: undefined,
    };
  }

  handleChange = value => {
    const { question, handleChange } = this.props;
    const { id } = question;
    const { value: oldValue } = this.state;

    if (!oldValue) {
      handleChange(id, value, 'change');
    }

    this.setState({ value });
  };

  handleBlur = () => {
    const { question, handleChange } = this.props;
    const { id } = question;
    const { value } = this.state;

    handleChange(id, value, 'blur');
  };

  render() {
    const { question, answer, activeId } = this.props;
    const { id, type, label, placeholder } = question;
    const active = activeId === id;
    const answered = !isEmpty(answer);
    const classes = classnames('qa-text-input', {
      active,
      answered,
      unanswered: !answered,
    });

    return (
      <React.Fragment>
        {type === 'text' && (
          <TextField
            id={`text-input-${id}`}
            className={classes}
            type="text"
            label={label}
            lineDirection="center"
            placeholder={placeholder}
            defaultValue={answered ? answer.content : ''}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            disabled={!active && !answered}
          />
        )}
        {type === 'textArea' && (
          <TextField
            id={`text-area-${id}`}
            className={classes}
            type="text"
            label={label}
            lineDirection="center"
            placeholder={placeholder}
            rows={1}
            maxRows={8}
            defaultValue={answered ? answer.content : ''}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            disabled={!active && !answered}
          />
        )}
      </React.Fragment>
    );
  }
}

TextInput.propTypes = {
  activeId: PropTypes.bool,
  question: PropTypes.object,
  handleChange: PropTypes.func,
  answer: PropTypes.object,
};

export default TextInput;
