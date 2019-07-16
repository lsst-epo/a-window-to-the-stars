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
import HRDObservations from './HRDObservations';
import ComparingHRDObservations from './ComparingHRDObservations';
import Results from './Results';
import clusterA from '../../../assets/images/ngc188_FINAL.jpg';
import clusterB from '../../../assets/images/ngc2168_FINAL.jpg';

@reactn
class Sections extends React.PureComponent {
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
    const { questions, answers } = this.global;
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
              getActiveId={this.getActiveId}
              previous="/"
              dataPath="static-data/NGC_188_data.json"
            />
            <MakingHRD
              id="2"
              scrollable={0}
              clusterName="Cluster A"
              clusterImage={clusterA}
              clusterWidth={1200}
              clusterHeight={1185}
              clusterXDomain={[16.160474211844242, 9.616988842401822]}
              clusterYDomain={[84.99507547492594, 85.53437634262413]}
              scatterXDomain={[14000, 3000]}
              scatterYDomain={[0.01, 10000]}
              dataPath="static-data/NGC_188_data.json"
              introduction="Locate the star cluster in this image. Not all the stars you see in the image are actually stars in the cluster—some are much closer to Earth than the stars in the cluster, and some are farther away. Because of their different distances, these stars can provide inaccurate information on an H-R Diagram if plotted with the stars in the cluster."
              activeId={14}
              questionsRange={[14]}
              questions={this.getQuestions([14])}
            />
            <ComparingHRD
              id="3"
              scrollable={-1}
              clusterName="Cluster A"
              clusterImage={clusterA}
              clusterWidth={1200}
              clusterHeight={1185}
              clusterXDomain={[16.160474211844242, 9.616988842401822]}
              clusterYDomain={[84.99507547492594, 85.53437634262413]}
              scatterXDomain={[14000, 3000]}
              scatterYDomain={[0.01, 10000]}
              dataPath="static-data/NGC_188_data.json"
              activeId={14}
            />
            <HRDObservations
              id="4"
              scrollable={0}
              scatterXDomain={[14000, 3000]}
              scatterYDomain={[0.001, 10000]}
              dataPath="static-data/NGC_188_data.json"
              questionsRange={range(10, 14)}
              questions={this.getQuestions(range(10, 14))}
              getActiveId={this.getActiveId}
              clusterName="Cluster A"
              introduction="Use the H-R Diagram to complete the table of observations"
            />
            <MakingHRD
              id="5"
              scrollable={0}
              clusterImage={clusterB}
              clusterWidth={1200}
              clusterHeight={1202}
              clusterXDomain={[92.65523303612241, 91.7350869784027]}
              clusterYDomain={[23.974853989692477, 24.809571724642513]}
              scatterXDomain={[15500, 3000]}
              scatterYDomain={[0.001, 10000]}
              dataPath="static-data/NGC_2168_data.json"
              activeId={19}
              questionsRange={[19]}
              questions={this.getQuestions([19])}
              clusterName="Cluster B"
              introduction="Try creating an H-R Diagram for a different Star Cluster. Locate the star cluster in this image. Not all the stars you see in the image are actually stars in the cluster—some are much closer to Earth than the stars in the cluster, and some are farther away. Because of their different distances, these stars can provide inaccurate information on an H-R Diagram if plotted with the stars in the cluster."
            />
            <ComparingHRD
              id="6"
              scrollable={-1}
              clusterName="Cluster B"
              clusterImage={clusterB}
              clusterWidth={1200}
              clusterHeight={1202}
              clusterXDomain={[92.65523303612241, 91.7350869784027]}
              clusterYDomain={[23.974853989692477, 24.809571724642513]}
              scatterXDomain={[15500, 3000]}
              scatterYDomain={[0.001, 10000]}
              dataPath="static-data/NGC_2168_data.json"
              activeId={19}
            />
            <HRDObservations
              id="7"
              scrollable={0}
              scatterXDomain={[15000, 3000]}
              scatterYDomain={[0.001, 10000]}
              dataPath="static-data/NGC_2168_data.json"
              questionsRange={range(15, 19)}
              questions={this.getQuestions(range(15, 19))}
              getActiveId={this.getActiveId}
              clusterName="Cluster B"
              introduction="Use the H-R Diagram to complete the table of observations"
            />
            <ComparingHRDObservations
              id="8"
              scrollable={0}
              clusters={[
                {
                  name: 'Cluster A',
                  key: 'clusterAData',
                  path: 'static-data/NGC_188_data.json',
                  xDomain: [14000, 3000],
                  yDomain: [0.001, 10000],
                },
                {
                  name: 'Cluster B',
                  key: 'clusterBData',
                  path: 'static-data/NGC_2168_data.json',
                  xDomain: [15000, 3000],
                  yDomain: [0.001, 10000],
                },
              ]}
              tableAnswersRanges={[range(10, 14), range(15, 19)]}
              questionsRange={range(20, 24)}
              questions={this.getQuestions(range(20, 24))}
              getActiveId={this.getActiveId}
            />
            <Results
              id="9"
              questions={questions}
              answers={answers}
              handleFinish={this.onFinish}
              order={range(1, 10)
                .concat([14])
                .concat(range(10, 13))
                .concat([19])
                .concat(range(15, 19))
                .concat(range(20, 24))}
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
