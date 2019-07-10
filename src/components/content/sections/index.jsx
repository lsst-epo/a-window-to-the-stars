import React from 'react';
import reactn from 'reactn';
// import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import range from 'lodash/range';
import API from '../../site/API';
import Introduction from './Introduction';
import ExploringStarClusters from './ExploringStarClusters';
import MakingHRD from './MakingHRD';
import ComparingHRD from './ComparingHRD';
// import HRDObservations from './HRDObservations';
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
              scrollable={0}
              questionsRange={range(1, 10)}
              questions={this.getQuestions(range(1, 10))}
              activeId={activeId}
              back="1"
            />
            <MakingHRD id="2" scrollable={0} />
            <ComparingHRD id="3" scrollable={-1} />
            {/*            <HRDObservations
              id="4"
              scrollable={0}
              questionsRange={range(10, 14)}
              questions={this.getQuestions(range(10, 14))}
              activeId={activeId}
            /> */}
            <Results
              id="5"
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
