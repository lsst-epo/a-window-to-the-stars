import React from 'react';
import PropTypes from 'prop-types';
import Prompt from './Prompt';

class Prompts extends React.PureComponent {
  render() {
    const { questions } = this.props;

    return (
      <React.Fragment>
        {questions.map(question => {
          const { id, label } = question;

          return <Prompt key={`question-prompt-${id}`} label={label} />;
        })}
      </React.Fragment>
    );
  }
}

Prompts.propTypes = {
  questions: PropTypes.array,
};

export default Prompts;
