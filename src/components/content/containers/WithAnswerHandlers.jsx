import React from 'reactn';
import PropTypes from 'prop-types';
// import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
// import { extentFromSet } from '../../../lib/utilities.js';

export const withAnswerHandlers = ComposedComponent => {
  class WrappedComponent extends React.PureComponent {
    clearAnswer(id) {
      const { answers: prevAnswers } = this.global;

      this.setGlobal(prevGlobal => ({
        ...prevGlobal,
        answers: {
          ...prevAnswers,
          [id]: {},
        },
      }));
    }

    updateAnswer(id, data) {
      const { questions, questionsRange } = this.props;
      const activeIndex = questionsRange.indexOf(parseInt(id, 10));
      const { answerAccessor } = questions[activeIndex];
      const { answers: prevAnswers } = this.global;
      const prevAnswer = { ...prevAnswers[id] };
      let content = data;

      if (answerAccessor === 'select' || !answerAccessor) {
        content = data;
      } else if (answerAccessor === 'count') {
        content = data.length;
      } else if (!includes(answerAccessor, 'range')) {
        content = data[0] ? data[0][answerAccessor] : 'None Selected';
      }

      this.setGlobal(prevGlobal => ({
        ...prevGlobal,
        answers: {
          ...prevAnswers,
          [id]: {
            ...prevAnswer,
            id,
            content,
            data,
          },
        },
      }));
    }

    answerHandler = (id, data) => {
      if (id && data) {
        this.updateAnswer(id, data);
      } else {
        this.clearAnswer(id);
      }
    };

    render() {
      return (
        <ComposedComponent {...this.props} answerHandler={this.answerHandler} />
      );
    }
  }

  WrappedComponent.propTypes = {
    questionsRange: PropTypes.array,
    questions: PropTypes.array,
  };

  return WrappedComponent;
};

export default withAnswerHandlers;
