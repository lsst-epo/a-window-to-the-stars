import React from 'react';
import reactn from 'reactn';
import { Switch, Route } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import range from 'lodash/range';
import API from '../../site/API';

import NoMatch from '../../site/NoMatch';
import ProgressCheckIn from './ProgressCheckIn';
import CopyWithHero from './CopyWithHero';
import StellarProperty from './StellarProperty';

import ExploringStarClusters from './ExploringStarClusters';
import MakingHRD from './MakingHRD';
import ComparingHRD from './ComparingHRD';
import HRDObservations from './HRDObservations';
import ComparingHRDObservations from './ComparingHRDObservations';
import CombiningHRD from './CombiningHRD';
import CombinedHRD from './CombinedHRD';
import EstimatingTempLumExtension from './EstimatingTempLumExtension';

import DiscussReport from './DiscussReport';
import Results from './Results';

import IntroCopy from './copy/Intro';
import MakingIntroCopy from './copy/MakingIntro';
import RadiiCopy from './copy/Radii';
import LifetimesCopy from './copy/Lifetimes';
import MassesCopy from './copy/Masses';

import NGC2516Image from '../../../assets/images/ngc2516.jpg';
import NGC2682Image from '../../../assets/images/ngc2682_FINAL.jpg';
import introHero from '../../../assets/images/ngc2632_FINAL.jpg';
import makingHero from '../../../assets/images/ngc2168_FINAL.jpg';

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
              render={() => (
                <CopyWithHero
                  key="intro"
                  id="0"
                  next="1"
                  scrollable={0}
                  sectionTitle="Introduction"
                  heroImage={introHero}
                  heroAltText="star field"
                >
                  <IntroCopy />
                </CopyWithHero>
              )}
            />
            <Route path="/progress/:id" component={ProgressCheckIn} />
            <Route
              path="/1"
              render={() => (
                <ExploringStarClusters
                  id="1"
                  next="/progress/1"
                  previous="/"
                  questionsRange={range(1, 10)}
                  questions={this.getQuestions(range(1, 10))}
                  answers={answers}
                  scrollable={0}
                  dataPath={clusters.NGC2168.path}
                  scatterXDomain={clusters.NGC2168.hrd.domain.x}
                  scatterYDomain={clusters.NGC2168.hrd.domain.y}
                  tableRowTitles={[
                    ['Main Sequence Stars'],
                    ['Main Sequence Stars'],
                    ['Main Sequence Stars'],
                    ['Dimmest Giant Star'],
                    ['Brightest White Dwarf Star'],
                    ['Coldest White Dwarf Star'],
                  ]}
                  tableHeaders={['Region', 'Temperature', 'Luminosity']}
                  tableCells={[
                    ['~3000 K', { accessor: 'luminosity', ids: [1, 2] }],
                    ['~6000 K', { accessor: 'luminosity', ids: [3, 4] }],
                    ['~10000 K', { accessor: 'luminosity', ids: [5, 6] }],
                    ['', { accessor: 'luminosity', ids: 7 }],
                    ['', { accessor: 'luminosity', ids: 8 }],
                    [{ accessor: 'temperature', ids: 9 }, ''],
                  ]}
                />
              )}
            />
            <Route
              path="/2"
              render={() => (
                <CopyWithHero
                  key="making-intro"
                  id="2"
                  scrollable={0}
                  sectionTitle="Making & Comparing H-R Diagrams"
                  heroImage={makingHero}
                  heroAltText="star field"
                >
                  <MakingIntroCopy />
                </CopyWithHero>
              )}
            />
            <Route
              path="/3"
              render={() => (
                <MakingHRD
                  key={`${clusters.NGC2516.name}-make`}
                  id="3"
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
              path="/4"
              render={() => (
                <ComparingHRD
                  key={`${clusters.NGC2516.name}-hrd-comparison`}
                  id="4"
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
              path="/5"
              render={() => (
                <HRDObservations
                  key={`${clusters.NGC2516.name}-observations`}
                  id="5"
                  questionsRange={range(10, 14)}
                  questions={this.getQuestions(range(10, 14))}
                  answers={answers}
                  dataPath={clusters.NGC2516.path}
                  scatterXDomain={clusters.NGC2516.hrd.domain.x}
                  scatterYDomain={clusters.NGC2516.hrd.domain.y}
                  clusterName={clusters.NGC2516.name}
                  introduction="Use the H-R Diagram to complete the table of observations"
                  scrollable={0}
                  tableRowTitles={[
                    ['Main Sequence Range'],
                    ['Total Giant Stars'],
                    ['Total White Dwarf Stars'],
                  ]}
                  tableHeaders={[clusters.NGC2516.name, 'Values']}
                  tableCells={[
                    [{ accessor: 'temperature', ids: [10, 11] }],
                    [{ accessor: 'count', ids: 12 }],
                    [{ accessor: 'count', ids: 13 }],
                  ]}
                />
              )}
            />
            <Route
              path="/6"
              render={() => (
                <MakingHRD
                  key={`${clusters.NGC2682.name}-make`}
                  id="6"
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
              path="/7"
              render={() => (
                <ComparingHRD
                  key={`${clusters.NGC2682.name}-hrd-comparison`}
                  id="7"
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
              path="/8"
              render={() => (
                <HRDObservations
                  key={`${clusters.NGC2682.name}-observations`}
                  id="8"
                  scrollable={0}
                  dataPath={clusters.NGC2682.path}
                  scatterXDomain={clusters.NGC2682.hrd.domain.x}
                  scatterYDomain={clusters.NGC2682.hrd.domain.y}
                  clusterName={clusters.NGC2682.name}
                  questionsRange={range(15, 19)}
                  questions={this.getQuestions(range(15, 19))}
                  answers={answers}
                  introduction="Use the H-R Diagram to complete the table of observations"
                  tableRowTitles={[
                    ['Main Sequence Range'],
                    ['Total Giant Stars'],
                    ['Total White Dwarf Stars'],
                  ]}
                  tableHeaders={[clusters.NGC2682.name, 'Values']}
                  tableCells={[
                    [{ accessor: 'temperature', ids: [15, 16] }],
                    [{ accessor: 'count', ids: 17 }],
                    [{ accessor: 'count', ids: 18 }],
                  ]}
                />
              )}
            />
            <Route
              path="/9"
              render={() => (
                <ComparingHRDObservations
                  id="9"
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
                  tableRowTitles={[
                    ['Main Sequence Range'],
                    ['Total Giant Stars'],
                    ['Total White Dwarf Stars'],
                  ]}
                  tableHeaders={[
                    '',
                    clusters.NGC2516.name,
                    clusters.NGC2682.name,
                  ]}
                  tableCells={[
                    [
                      { accessor: 'temperature', ids: [10, 11] },
                      { accessor: 'temperature', ids: [15, 16] },
                    ],
                    [
                      { accessor: 'count', ids: 12 },
                      { accessor: 'count', ids: 17 },
                    ],
                    [
                      { accessor: 'count', ids: 13 },
                      { accessor: 'count', ids: 18 },
                    ],
                  ]}
                  questionsRange={range(20, 24)}
                  questions={this.getQuestions(range(20, 23))}
                  answers={answers}
                />
              )}
            />
            <Route
              path="/10"
              render={() => (
                <React.Fragment>
                  {this.visitedFarther(visitedPages, 9) ? (
                    <CombinedHRD
                      id="10"
                      next="/progress/10"
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
                      id="10"
                      next="/progress/10"
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
              path="/11"
              render={() => (
                <StellarProperty
                  key="estimating-temperature"
                  id="11"
                  scrollable={0}
                  histogramDomain={[3500, 9500]}
                  histogramAccessor="temperature"
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
                  sectionTitle="Comparing Star Temperature"
                />
              )}
            />
            <Route
              path="/12"
              render={() => (
                <StellarProperty
                  key="estimating-luminosity"
                  id="12"
                  scrollable={0}
                  histogramDomain={[-2, 4]}
                  histogramAccessor="luminosity"
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
                  sectionTitle="Comparing Star Luminosity"
                />
              )}
            />
            <Route
              path="/13"
              render={() => (
                <EstimatingTempLumExtension
                  id="13"
                  next="/progress/13"
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
              path="/14"
              render={() => (
                <StellarProperty
                  key="estimating-mass"
                  id="14"
                  scrollable={0}
                  histogramAccessor="mass"
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
                  sectionTitle="Estimating Stellar Masses"
                >
                  <MassesCopy />
                </StellarProperty>
              )}
            />
            <Route
              path="/15"
              render={() => (
                <StellarProperty
                  key="estimating-lifetime"
                  id="15"
                  scrollable={0}
                  histogramAccessor="lifetime"
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
                  sectionTitle="Estimating Stellar Lifetimes"
                >
                  <LifetimesCopy />
                </StellarProperty>
              )}
            />
            <Route
              path="/16"
              render={() => (
                <StellarProperty
                  key="estimating-radius"
                  id="16"
                  next="/progress/16"
                  scrollable={0}
                  histogramAccessor="radius"
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
                  sectionTitle="Estimating Stellar Radii"
                >
                  <RadiiCopy />
                </StellarProperty>
              )}
            />
            <Route
              path="/17"
              render={() => (
                <DiscussReport
                  id="17"
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
              path="/18"
              render={() => (
                <Results
                  id="18"
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
