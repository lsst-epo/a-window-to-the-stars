import React from 'react';
import reactn from 'reactn';
// import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import range from 'lodash/range';
import API from '../../site/API';
import Introduction from './Introduction';
import ExploringStarClusters from './ExploringStarClusters';
import MakingHRD from './MakingHRD';
import Results from './Results';

@reactn
class Sections extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    if (isEmpty(this.global.questions)) {
      API.get('static-data/questions.json').then(res => {
        this.setGlobal(prevGlobal => ({
          ...prevGlobal,
          questions: res.data,
        }));
      });
    }
  }

  onFinish = () => {
    this.dispatch.empty();
  };

  // onSectionChange = () => {
  //   this.dispatch.updateLS();
  // };

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
    const { activeId, questions, answers } = this.global;
    const loading = isEmpty(questions);

    return (
      <React.Fragment>
        {!loading ? (
          <React.Fragment>
            <Introduction next="1" />
            <ExploringStarClusters
              id="1"
              questionsRange={range(1, 7)}
              questions={this.getQuestions(range(1, 7))}
              activeId={activeId}
              next="100"
              scrollable={0}
            />
            <MakingHRD id="2" />
            <Results
              id="100"
              questions={questions}
              answers={answers}
              handleFinish={this.onFinish}
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
