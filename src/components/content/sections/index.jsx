import React from 'react';
import reactn from 'reactn';
import { Switch, Route } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import range from 'lodash/range';
import API from '../../site/API';
import Introduction from './Introduction';
import ExploringStarClusters from './ExploringStarClusters';
import MakingHRD from './MakingHRD';
import ComparingHRD from './ComparingHRD';
import HRDObservations from './HRDObservations';
import ComparingHRDObservations from './ComparingHRDObservations';
import CombiningHRD from './CombiningHRD';
import EstimatingStellarTemperatures from './EstimatingStellarTemperatures';
import EstimatingStellarLuminosities from './EstimatingStellarLuminosities';
import EstimatingStellarRadii from './EstimatingStellarRadii';
import EstimatingStellarLifetimes from './EstimatingStellarLifetimes';
import EstimatingStellarMasses from './EstimatingStellarMasses';
import Results from './Results';
import clusterA from '../../../assets/images/ngc188_FINAL.jpg';
import clusterB from '../../../assets/images/ngc2168_FINAL.jpg';

@reactn
class Sections extends React.PureComponent {
  componentDidMount() {
    // if (isEmpty(this.global.questions)) {
    //   API.get('static-data/questions.json').then(res => {
    //     this.setGlobal(prevGlobal => ({
    //       ...prevGlobal,
    //       questions: res.data,
    //     }));
    //   });
    // }
    API.get('static-data/questions.json').then(res => {
      this.setGlobal(prevGlobal => ({
        ...prevGlobal,
        questions: res.data,
      }));
    });
  }

  onFinish = () => {
    this.dispatch.empty();
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

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={() => <Introduction id="0" next="1" scrollable={0} />}
        />
        <Route
          path="/1"
          render={() => (
            <ExploringStarClusters
              id="1"
              dataPath="static-data/NGC_2516_data.json"
              questionsRange={range(1, 10)}
              questions={this.getQuestions(range(1, 10))}
              answers={answers}
              scrollable={0}
              scatterXDomain={[10000, 3000]}
              scatterYDomain={[0.01, 1000]}
              previous="/"
            />
          )}
        />
        <Route
          path="/2"
          render={() => (
            <MakingHRD
              id="2"
              activeId={14}
              questionsRange={[14]}
              questions={this.getQuestions([14])}
              answer={answers[14]}
              dataPath="static-data/NGC_188_data.json"
              scrollable={0}
              clusterName="Cluster A"
              clusterImage={clusterA}
              clusterWidth={1200}
              clusterHeight={1185}
              clusterXDomain={[16.160474211844242, 9.616988842401822]}
              clusterYDomain={[84.99507547492594, 85.53437634262413]}
              scatterXDomain={[14000, 3000]}
              scatterYDomain={[0.01, 10000]}
              introduction="Locate the star cluster in this image. Not all the stars you see in the image are actually stars in the cluster—some are much closer to Earth than the stars in the cluster, and some are farther away. Because of their different distances, these stars can provide inaccurate information on an H-R Diagram if plotted with the stars in the cluster."
            />
          )}
        />
        <Route
          path="/3"
          render={() => (
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
              answer={answers[14]}
            />
          )}
        />
        <Route
          path="/4"
          render={() => (
            <HRDObservations
              id="4"
              dataPath="static-data/NGC_188_data.json"
              questionsRange={range(10, 14)}
              questions={this.getQuestions(range(10, 14))}
              answers={answers}
              scatterXDomain={[14000, 3000]}
              scatterYDomain={[0.01, 1000]}
              clusterName="Cluster A"
              introduction="Use the H-R Diagram to complete the table of observations"
              scrollable={0}
            />
          )}
        />
        <Route
          path="/5"
          render={() => (
            <MakingHRD
              id="5"
              activeId={19}
              answer={answers[19]}
              questionsRange={[19]}
              questions={this.getQuestions([19])}
              scrollable={0}
              clusterImage={clusterB}
              clusterWidth={1200}
              clusterHeight={1202}
              clusterXDomain={[92.65523303612241, 91.7350869784027]}
              clusterYDomain={[23.974853989692477, 24.809571724642513]}
              scatterXDomain={[15500, 3000]}
              scatterYDomain={[0.001, 10000]}
              dataPath="static-data/NGC_2168_data.json"
              clusterName="Cluster B"
              introduction="Try creating an H-R Diagram for a different Star Cluster. Locate the star cluster in this image. Not all the stars you see in the image are actually stars in the cluster—some are much closer to Earth than the stars in the cluster, and some are farther away. Because of their different distances, these stars can provide inaccurate information on an H-R Diagram if plotted with the stars in the cluster."
            />
          )}
        />
        <Route
          path="/6"
          render={() => (
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
              answer={answers[19]}
            />
          )}
        />
        <Route
          path="/7"
          render={() => (
            <HRDObservations
              id="7"
              scrollable={0}
              scatterXDomain={[10000, 3500]}
              scatterYDomain={[0.01, 10000]}
              dataPath="static-data/NGC_2168_data.json"
              questionsRange={range(15, 19)}
              questions={this.getQuestions(range(15, 19))}
              answers={answers}
              clusterName="Cluster B"
              introduction="Use the H-R Diagram to complete the table of observations"
            />
          )}
        />
        <Route
          path="/8"
          render={() => (
            <ComparingHRDObservations
              id="8"
              scrollable={0}
              clusters={[
                {
                  name: 'Cluster A',
                  key: 'clusterAData',
                  path: 'static-data/NGC_188_data.json',
                  xDomain: [14000, 3000],
                  yDomain: [0.01, 10000],
                },
                {
                  name: 'Cluster B',
                  key: 'clusterBData',
                  path: 'static-data/NGC_2168_data.json',
                  xDomain: [14000, 3000],
                  yDomain: [0.01, 10000],
                },
              ]}
              tableAnswersRanges={[range(10, 14), range(15, 19)]}
              questionsRange={range(20, 24)}
              questions={this.getQuestions(range(20, 24))}
              answers={answers}
            />
          )}
        />
        <Route
          path="/9"
          render={() => (
            <CombiningHRD
              id="9"
              scrollable={-1}
              clusters={[
                {
                  name: 'Cluster A',
                  key: 'clusterAData',
                  path: 'static-data/NGC_188_data.json',
                },
                {
                  name: 'Cluster B',
                  key: 'clusterBData',
                  path: 'static-data/NGC_2168_data.json',
                },
              ]}
              scatterXDomain={[14000, 3000]}
              scatterYDomain={[0.01, 10000]}
            />
          )}
        />
        <Route
          path="/10"
          render={() => (
            <EstimatingStellarTemperatures
              id="10"
              scrollable={0}
              histogramDomain={[3500, 10000]}
              histogramAccessor="temperature"
              histogramAxisLabel="Temperature (K)"
              scatterXDomain={[10000, 3500]}
              scatterYDomain={[0.01, 10000]}
              dataPath="static-data/NGC_2168_data.json"
              questionsRange={range(24, 28)}
              questions={this.getQuestions(range(24, 28))}
            />
          )}
        />
        <Route
          path="/11"
          render={() => (
            <EstimatingStellarLuminosities
              id="11"
              scrollable={0}
              histogramDomain={[-2, 4]}
              histogramAccessor="luminosity"
              histogramAxisLabel="Solar Luminosity"
              scatterXDomain={[10000, 3500]}
              scatterYDomain={[0.01, 10000]}
              dataPath="static-data/NGC_2168_data.json"
              questionsRange={range(28, 32)}
              questions={this.getQuestions(range(28, 32))}
            />
          )}
        />
        <Route
          path="/12"
          render={() => (
            <EstimatingStellarMasses
              id="12"
              scrollable={0}
              histogramAccessor="mass"
              histogramAxisLabel="Stellar Mass (Msun)"
              scatterXDomain={[10000, 3500]}
              scatterYDomain={[0.01, 10000]}
              dataPath="static-data/NGC_2168_data.json"
              questionsRange={range(49, 53).concat(range(32, 36))}
              questions={this.getQuestions(range(49, 53).concat(range(32, 36)))}
            />
          )}
        />
        <Route
          path="/13"
          render={() => (
            <EstimatingStellarLifetimes
              id="13"
              scrollable={0}
              histogramAccessor="lifetime"
              histogramAxisLabel="Lifetime (Gyr)"
              scatterXDomain={[10000, 3500]}
              scatterYDomain={[0.01, 10000]}
              dataPath="static-data/NGC_2168_data.json"
              questionsRange={range(42, 49)}
              questions={this.getQuestions(range(42, 49))}
            />
          )}
        />
        <Route
          path="/14"
          render={() => (
            <EstimatingStellarRadii
              id="14"
              scrollable={0}
              histogramAccessor="radius"
              histogramAxisLabel="Radius (Rsun)"
              scatterXDomain={[10000, 3500]}
              scatterYDomain={[0.01, 10000]}
              dataPath="static-data/NGC_2168_data.json"
              questionsRange={range(36, 42)}
              questions={this.getQuestions(range(36, 42))}
            />
          )}
        />
        <Route
          path="/15"
          render={() => (
            <Results
              id="15"
              questions={questions}
              answers={answers}
              handleFinish={this.onFinish}
              order={range(1, 10)
                .concat([14])
                .concat(range(10, 13))
                .concat([19])
                .concat(range(15, 19))
                .concat(range(20, 32))
                .concat(range(49, 53))
                .concat(range(32, 36))
                .concat(range(42, 49))
                .concat(range(36, 42))}
            />
          )}
        />
      </Switch>
    );
  }
}

export default Sections;
