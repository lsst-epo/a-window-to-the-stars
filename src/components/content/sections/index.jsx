import React from 'react';
import reactn from 'reactn';
// import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import range from 'lodash/range';
import API from '../../site/API';
import Introduction from './Introduction';
import ExploringStarClusters from './ExploringStarClusters';

@reactn
class Sections extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    API.get('static-data/questions.json').then(res => {
      this.setGlobal(
        prevGlobal => ({
          ...prevGlobal,
          questions: res.data,
        }),
        this.setState({
          loading: false,
        })
      );
    });
  }

  getQuestion(id) {
    if (!isEmpty(this.global.questions)) {
      return this.global.questions[id];
    }

    return null;
  }

  getQuestions(questionsRange) {
    const { questions } = this.global;
    if (!isEmpty(questions)) {
      return questionsRange.map(questionId => {
        return questions[questionId.toString()];
      });
    }

    return null;
  }

  render() {
    const { activeId } = this.global;
    const { loading } = this.state;

    return (
      <React.Fragment>
        {!loading ? (
          <React.Fragment>
            <Introduction />
            <ExploringStarClusters
              id={1}
              questionsRange={range(1, 7)}
              questions={this.getQuestions(range(1, 7))}
              activeId={activeId}
            />
          </React.Fragment>
        ) : (
          <div>loading data</div>
        )}
      </React.Fragment>
    );
  }
}

// Sections.propTypes = {
//   dataPath: PropTypes.string,
// };

export default Sections;
