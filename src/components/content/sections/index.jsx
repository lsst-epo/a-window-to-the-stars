import React from 'react';
import reactn from 'reactn';
import { Switch, Route } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import range from 'lodash/range';
import API from '../../site/API';
import { capitalize } from '../../../lib/utilities';
import StellarUnit from '../../charts/shared/StellarUnit';
import NoMatch from '../../site/NoMatch';
import Introduction from './Introduction';
import ProgressCheckIn from './ProgressCheckIn';
import ExploringStarClusters from './ExploringStarClusters';
import MakingHRD from './MakingHRD';
import ComparingHRD from './ComparingHRD';
import HRDObservations from './HRDObservations';
import ComparingHRDObservations from './ComparingHRDObservations';
import CombiningHRD from './CombiningHRD';
import CombinedHRD from './CombinedHRD';
import EstimatingStellarTemperatures from './EstimatingStellarTemperatures';
import EstimatingStellarLuminosities from './EstimatingStellarLuminosities';
import EstimatingTempLumExtension from './EstimatingTempLumExtension';
import EstimatingStellarRadii from './EstimatingStellarRadii';
import EstimatingStellarLifetimes from './EstimatingStellarLifetimes';
import EstimatingStellarMasses from './EstimatingStellarMasses';
import DiscussReport from './DiscussReport';
import Results from './Results';
import NGC2516Image from '../../../assets/images/ngc2516.jpg';
import NGC2682Image from '../../../assets/images/ngc2682_FINAL.jpg';

@reactn
class Sections extends React.PureComponent {
  componentDidMount() {
    if (isEmpty(this.global.questions) || isEmpty(this.global.clusters)) {
      Promise.all([
        API.get('static-data/questions.json'),
        API.get('static-data/clusters.json'),
      ]).then(res => {
        this.setGlobal(prevGlobal => ({
          ...prevGlobal,
          questions: res[0].data,
          clusters: res[1].data,
        }));
      });
    }
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

  getLabel(type) {
    return (
      <tspan>
        {capitalize(type)} (<StellarUnit type={type} isSvg />)
      </tspan>
    );
  }

  visitedFarther(visitedPages, targetPage) {
    let i = visitedPages.length;
    let isFarther = false;

    while (i >= 0 && !isFarther) {
      isFarther = visitedPages[i] > targetPage;

      i -= 1;
    }

    return isFarther;
  }

  render() {
    const { visitedPages, questions, answers, clusters } = this.global;

    return (
      <React.Fragment>
        {questions && answers && clusters && (
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Introduction id="0" next="1" scrollable={0} />}
            />
            <Route path="/progress/:id" component={ProgressCheckIn} />
            <Route
              path="/1"
              render={() => (
                <ExploringStarClusters
                  id="1"
                  next="/progress/1"
                  questionsRange={range(1, 10)}
                  questions={this.getQuestions(range(1, 10))}
                  answers={answers}
                  scrollable={0}
                  dataPath={clusters.NGC2168.path}
                  scatterXDomain={clusters.NGC2168.hrd.domain.x}
                  scatterYDomain={clusters.NGC2168.hrd.domain.y}
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
                  scrollable={0}
                  dataPath={clusters.NGC2516.path}
                  scatterXDomain={clusters.NGC2516.starSelector.domain.x}
                  scatterYDomain={clusters.NGC2516.starSelector.domain.y}
                  clusterXDomain={clusters.NGC2516.image.domain.x}
                  clusterYDomain={clusters.NGC2516.image.domain.y}
                  clusterName={clusters.NGC2516.name}
                  clusterImage={NGC2516Image}
                  clusterWidth={clusters.NGC2516.image.width}
                  clusterHeight={clusters.NGC2516.image.height}
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
                  dataPath={clusters.NGC2516.path}
                  scatterXDomain={clusters.NGC2516.starSelector.domain.x}
                  scatterYDomain={clusters.NGC2516.starSelector.domain.y}
                  clusterXDomain={clusters.NGC2516.image.domain.x}
                  clusterYDomain={clusters.NGC2516.image.domain.y}
                  clusterName={clusters.NGC2516.name}
                  clusterImage={NGC2516Image}
                  clusterWidth={clusters.NGC2516.image.width}
                  clusterHeight={clusters.NGC2516.image.height}
                  answer={answers[14]}
                />
              )}
            />
            <Route
              path="/4"
              render={() => (
                <HRDObservations
                  id="4"
                  questionsRange={range(10, 14)}
                  questions={this.getQuestions(range(10, 14))}
                  answers={answers}
                  dataPath={clusters.NGC2516.path}
                  scatterXDomain={clusters.NGC2516.hrd.domain.x}
                  scatterYDomain={clusters.NGC2516.hrd.domain.y}
                  clusterName={clusters.NGC2516.name}
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
                  dataPath={clusters.NGC2682.path}
                  scatterXDomain={clusters.NGC2682.starSelector.domain.x}
                  scatterYDomain={clusters.NGC2682.starSelector.domain.y}
                  clusterXDomain={clusters.NGC2682.image.domain.x}
                  clusterYDomain={clusters.NGC2682.image.domain.y}
                  clusterName={clusters.NGC2682.name}
                  clusterImage={NGC2682Image}
                  clusterWidth={clusters.NGC2682.image.width}
                  clusterHeight={clusters.NGC2682.image.height}
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
                  dataPath={clusters.NGC2682.path}
                  scatterXDomain={clusters.NGC2682.starSelector.domain.x}
                  scatterYDomain={clusters.NGC2682.starSelector.domain.y}
                  clusterXDomain={clusters.NGC2682.image.domain.x}
                  clusterYDomain={clusters.NGC2682.image.domain.y}
                  clusterName={clusters.NGC2682.name}
                  clusterImage={NGC2682Image}
                  clusterWidth={clusters.NGC2682.image.width}
                  clusterHeight={clusters.NGC2682.image.height}
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
                  dataPath={clusters.NGC2682.path}
                  scatterXDomain={clusters.NGC2682.hrd.domain.x}
                  scatterYDomain={clusters.NGC2682.hrd.domain.y}
                  clusterName={clusters.NGC2682.name}
                  questionsRange={range(15, 19)}
                  questions={this.getQuestions(range(15, 19))}
                  answers={answers}
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
                      name: clusters.NGC2516.name,
                      key: 'clusterAData',
                      path: clusters.NGC2516.path,
                      xDomain: clusters.NGC2516.hrd.domain.x,
                      yDomain: clusters.NGC2516.hrd.domain.y,
                    },
                    {
                      name: clusters.NGC2682.name,
                      key: 'clusterBData',
                      path: clusters.NGC2682.path,
                      xDomain: clusters.NGC2516.hrd.domain.x,
                      yDomain: clusters.NGC2516.hrd.domain.y,
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
                <React.Fragment>
                  {this.visitedFarther(visitedPages, 9) ? (
                    <CombinedHRD
                      id="9"
                      next="/progress/9"
                      scrollable={0}
                      dataPath={[clusters.NGC2516.path, clusters.NGC2682.path]}
                      scatterXDomain={clusters.NGC2516.hrd.domain.x}
                      scatterYDomain={clusters.NGC2516.hrd.domain.y}
                      clusterNames={[
                        clusters.NGC2516.name,
                        clusters.NGC2682.name,
                      ]}
                    />
                  ) : (
                    <CombiningHRD
                      id="9"
                      next="/progress/9"
                      scrollable={-1}
                      clusters={[
                        {
                          name: clusters.NGC2516.name,
                          key: 'clusterAData',
                          path: clusters.NGC2516.path,
                          xDomain: clusters.NGC2516.hrd.domain.x,
                          yDomain: clusters.NGC2516.hrd.domain.y,
                        },
                        {
                          name: clusters.NGC2682.name,
                          key: 'clusterBData',
                          path: clusters.NGC2682.path,
                          xDomain: clusters.NGC2516.hrd.domain.x,
                          yDomain: clusters.NGC2516.hrd.domain.y,
                        },
                      ]}
                    />
                  )}
                </React.Fragment>
              )}
            />
            <Route
              path="/10"
              render={() => (
                <EstimatingStellarTemperatures
                  id="10"
                  scrollable={0}
                  histogramDomain={[3500, 9500]}
                  histogramAccessor="temperature"
                  histogramAxisLabel={this.getLabel('temperature')}
                  scatterXDomain={clusters.NGC2516.hrd.domain.x}
                  scatterYDomain={clusters.NGC2516.hrd.domain.y}
                  dataPath={[clusters.NGC2516.path, clusters.NGC2682.path]}
                  questionsRange={range(24, 28)}
                  questions={this.getQuestions(range(24, 28))}
                  tableRowTitles={[['Temperature']]}
                  tableHeaders={[
                    'Property',
                    'Minimum',
                    'Maximum',
                    'Midpoint',
                    'Sun',
                  ]}
                  tableAnswerIds={[range(24, 27)]}
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
                  histogramAxisLabel={this.getLabel('luminosity')}
                  scatterXDomain={clusters.NGC2516.hrd.domain.x}
                  scatterYDomain={clusters.NGC2516.hrd.domain.y}
                  dataPath={[clusters.NGC2516.path, clusters.NGC2682.path]}
                  questionsRange={range(28, 32)}
                  questions={this.getQuestions(range(28, 32))}
                  tableRowTitles={[['Luminosity']]}
                  tableHeaders={[
                    'Property',
                    'Minimum',
                    'Maximum',
                    'Midpoint',
                    'Sun',
                  ]}
                  tableAnswerIds={[range(28, 31)]}
                />
              )}
            />
            <Route
              path="/12"
              render={() => (
                <EstimatingTempLumExtension
                  id="12"
                  scrollable={0}
                  scatterXDomain={clusters.NGC2516.hrd.domain.x}
                  scatterYDomain={clusters.NGC2516.hrd.domain.y}
                  dataPath={[clusters.NGC2516.path, clusters.NGC2682.path]}
                  questionsRange={range(53, 69)}
                  questions={this.getQuestions(range(53, 69))}
                  tableRowTitles={[['Temperature'], ['Luminosity']]}
                  tableHeaders={[
                    'Property',
                    'Minimum',
                    'Maximum',
                    'Midpoint',
                    'Sun',
                  ]}
                  tableAnswerIds={[range(24, 27), range(28, 31)]}
                />
              )}
            />
            <Route
              path="/13"
              render={() => (
                <EstimatingStellarMasses
                  id="13"
                  scrollable={0}
                  histogramAccessor="mass"
                  histogramAxisLabel={this.getLabel('mass')}
                  scatterXDomain={clusters.NGC2516.hrd.domain.x}
                  scatterYDomain={clusters.NGC2516.hrd.domain.y}
                  dataPath={[clusters.NGC2516.path, clusters.NGC2682.path]}
                  questionsRange={range(49, 53).concat(range(32, 36))}
                  questions={this.getQuestions(
                    range(49, 53).concat(range(32, 36))
                  )}
                  tableRowTitles={[['Mass']]}
                  tableHeaders={[
                    'Property',
                    'Minimum',
                    'Maximum',
                    'Midpoint',
                    'Sun',
                  ]}
                  tableAnswerIds={[range(32, 35)]}
                />
              )}
            />
            <Route
              path="/14"
              render={() => (
                <EstimatingStellarLifetimes
                  id="14"
                  scrollable={0}
                  histogramAccessor="lifetime"
                  histogramAxisLabel={this.getLabel('lifetime')}
                  scatterXDomain={clusters.NGC2516.hrd.domain.x}
                  scatterYDomain={clusters.NGC2516.hrd.domain.y}
                  dataPath={[clusters.NGC2516.path, clusters.NGC2682.path]}
                  questionsRange={range(42, 49)}
                  questions={this.getQuestions(range(42, 49))}
                  tableRowTitles={[['Lifetime']]}
                  tableHeaders={[
                    'Property',
                    'Minimum',
                    'Maximum',
                    'Midpoint',
                    'Sun',
                  ]}
                  tableAnswerIds={[range(43, 46)]}
                />
              )}
            />
            <Route
              path="/15"
              render={() => (
                <EstimatingStellarRadii
                  id="15"
                  next="/progress/15"
                  scrollable={0}
                  histogramAccessor="radius"
                  histogramAxisLabel={this.getLabel('radius')}
                  scatterXDomain={clusters.NGC2516.hrd.domain.x}
                  scatterYDomain={clusters.NGC2516.hrd.domain.y}
                  dataPath={[clusters.NGC2516.path, clusters.NGC2682.path]}
                  questionsRange={range(36, 42)}
                  questions={this.getQuestions(range(36, 42))}
                  tableRowTitles={[['Radius']]}
                  tableHeaders={[
                    'Property',
                    'Minimum',
                    'Maximum',
                    'Midpoint',
                    'Sun',
                  ]}
                  tableAnswerIds={[range(36, 39)]}
                />
              )}
            />
            <Route
              path="/16"
              render={() => (
                <DiscussReport
                  id="16"
                  scrollable={0}
                  scatterXDomain={clusters.NGC2516.hrd.domain.x}
                  scatterYDomain={clusters.NGC2516.hrd.domain.y}
                  dataPath={[clusters.NGC2516.path, clusters.NGC2682.path]}
                  questionsRange={range(69, 76)}
                  questions={this.getQuestions(range(69, 76))}
                  tableRowTitles={[
                    ['Temperature'],
                    ['Luminosity'],
                    ['Mass'],
                    ['Lifetime'],
                    ['Radius'],
                  ]}
                  tableHeaders={[
                    'Property',
                    'Minimum',
                    'Maximum',
                    'Midpoint',
                    'Sun',
                  ]}
                  tableAnswerIds={[
                    range(24, 27),
                    range(28, 31),
                    range(32, 35),
                    range(43, 46),
                    range(36, 39),
                  ]}
                />
              )}
            />
            <Route
              path="/17"
              render={() => (
                <Results
                  id="17"
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
                    .concat(range(36, 42))
                    .concat(range(53, 69))
                    .concat(range(69, 76))}
                />
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        )}
      </React.Fragment>
    );
  }
}

export default Sections;
