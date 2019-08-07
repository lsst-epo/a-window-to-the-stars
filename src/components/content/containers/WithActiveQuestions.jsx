import React from 'reactn';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

export const WithActiveQuestions = ComposedComponent => {
  class WrappedComponent extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeId: null,
      };
    }

    componentDidMount() {
      const { questionsRange } = this.props;

      this.setActiveQuestion(this.getActiveId(questionsRange));
    }

    getActiveId = questionsRange => {
      const { answers } = this.global;
      let activeId = null;
      let i = 0;

      while (i < questionsRange.length) {
        const id = questionsRange[i];

        if (isEmpty(answers[id])) {
          activeId = id.toString();
          i = questionsRange.length;
        }

        i += 1;
      }

      return activeId;
    };

    setActiveQuestion = id => {
      this.setState(prevState => ({
        ...prevState,
        activeId: id,
      }));
    };

    advanceActiveQuestion = () => {
      const { questionsRange } = this.props;

      this.setActiveQuestion(this.getActiveId(questionsRange));
    };

    render() {
      const { activeId } = this.state;

      return (
        <ComposedComponent
          {...this.props}
          activeId={activeId}
          getActive={this.getActiveId}
          setActive={this.setActiveQuestion}
          advanceActive={this.advanceActiveQuestion}
        />
      );
    }
  }

  WrappedComponent.propTypes = {
    questionsRange: PropTypes.array,
  };

  return WrappedComponent;
};

export default WithActiveQuestions;
