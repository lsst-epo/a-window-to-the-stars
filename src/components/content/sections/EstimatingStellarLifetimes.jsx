import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import {
  histogram as d3Histogram,
  thresholdScott as d3ThresholdScott,
} from 'd3-array';
// threshholdFreedmanDiaconis as d3ThresholdFreedmanDiaconis,
// thresholdSturges as d3ThresholdSturges,
// thresholdScott as d3ThresholdScott,
import { capitalize } from '../../../lib/utilities';
import { withData } from '../containers/WithData';
import { withAnswerHandlers } from '../containers/WithAnswerHandlers';
import Section from './Section';
import Select from '../../site/forms/Select';
import ScatterPlot from '../../scatter-plot';
import Histogram from '../../histogram';
import QASelections from '../../questions/ExpansionList';
import QASelect from '../../questions/Select';
import QATextInputs from '../../questions/TextInputs';

@reactn
class EstimatingStellarLifetimes extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeGraph: 0,
      activeId: null,
      selectedHistogramData: null,
      selectedScatterplotData: null,
    };
  }

  componentDidMount() {
    const { getActiveId, questionsRange } = this.props;

    if (getActiveId) {
      const activeId = getActiveId(questionsRange);
      this.setActiveQuestion(activeId);
    }
  }

  componentDidUpdate() {
    // const { getActiveId, questionsRange } = this.props;
    // if (getActiveId) {
    //   const activeId = getActiveId(questionsRange);
    //   this.setActiveQuestion(activeId);
    // }
    // console.log('component did update.  active id: ' + this.state.activeId);
  }

  selectItems(clusters) {
    return clusters.map((cluster, i) => {
      return { label: cluster.name, value: i };
    });
  }

  onGraphSelect = e => {
    const { value } = e.target;

    this.setState(prevState => ({
      ...prevState,
      activeGraph: parseInt(value, 10),
    }));
  };

  updateAnswer = (id, value, type) => {
    const { answers: prevAnswers } = this.global;
    const prevAnswer = { ...prevAnswers[id] };
    const content = value || '';

    if (type === 'blur') {
      this.setGlobal(prevGlobal => ({
        ...prevGlobal,
        answers: {
          ...prevAnswers,
          [id]: {
            ...prevAnswer,
            id,
            content,
          },
        },
      }));
    }

    if (type === 'change') {
      this.setGlobal(prevGlobal => ({
        ...prevGlobal,
        answers: {
          ...prevAnswers,
          [id]: {
            ...prevAnswer,
            id,
            content,
          },
        },
      }));

      this.advanceActiveQuestion();
    }
  };

  setActiveQuestion(id) {
    this.setState(prevState => ({
      ...prevState,
      activeId: id,
    }));
  }

  advanceActiveQuestion() {
    const { getActiveId, questionsRange } = this.props;
    const nextId = getActiveId(questionsRange);
    this.setActiveQuestion(nextId);
  }

  onGraphSelection = selectedData => {
    const { answerHandler } = this.props;
    const { activeId } = this.state;

    answerHandler(activeId, selectedData);
  };

  onQAToggle = () => {
    return null;
  };

  onAnswerCancel = id => {
    const { answerHandler } = this.props;

    answerHandler(id);
  };

  onAnswerSave = id => {
    this.advanceActiveQuestion(id);
  };

  onEdit = id => {
    this.setActiveQuestion(id);
  };

  histogramData(data, valueAccessor, domain) {
    if (valueAccessor === 'luminosity') {
      return d3Histogram()
        .value(d => {
          return Math.log10(d[valueAccessor]); // eslint-disable-line dot-notation
        })
        .thresholds(d3ThresholdScott)(data);
    }

    if (valueAccessor === 'radius') {
      return d3Histogram()
        .value(d => {
          return d[valueAccessor]; // eslint-disable-line dot-notation
        })
        .thresholds(d3ThresholdScott)(data);
    }

    if (domain) {
      return d3Histogram()
        .value(d => {
          return d[valueAccessor]; // eslint-disable-line dot-notation
        })
        .domain(domain)(data);
    }

    return d3Histogram().value(d => {
      return d[valueAccessor]; // eslint-disable-line dot-notation
    })(data);
  }

  render() {
    const {
      clusterData,
      questions,
      scatterXDomain,
      scatterYDomain,
      histogramAccessor,
      histogramDomain,
      histogramAxisLabel,
    } = this.props;
    const { activeGraph, activeId } = this.state;
    const { answers } = this.global;
    const activeAnswer = answers[activeId];
    const activeData = activeAnswer ? activeAnswer.data : null;
    const histogramData = this.histogramData(
      clusterData,
      histogramAccessor,
      histogramDomain
    );

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">Estimating Stellar Lifetimes</h2>
          <p>
            Stars spend about 90% of their lifetimes as main sequence stars. The
            main sequence mass of a star is used to calculate its main sequence
            lifetime. This lifetime is not the age of the star in years, it is a
            predicted time for how long the star will exist as a stable main
            sequence star with balanced forces.
          </p>
          <p>
            The lifetime of a star depends on two factors: how much hydrogen is
            available for nuclear fusion, and the rate at which fusion is
            proceeding. The cores of high mass stars experience a much greater
            gravitational force than the cores of low mass stars. As a result,
            temperature and fusion rates are much higher in the cores of high
            mass stars.
          </p>
          <p>
            The main sequence lifetime of a star can be estimated by this
            relationship:
          </p>
          <div className="equation-container">
            <b className="equation">
              <div className="container-flex centered">
                <span>
                  <span>
                    T<sub>ms</sub>
                  </span>
                  <span>&nbsp;&asymp;&nbsp;</span>
                  <span>
                    10<sup>10</sup>&nbsp;x&nbsp;
                  </span>
                </span>
                <span>
                  <span className="parenthetical">
                    <span className="fraction">
                      <span className="numerator">
                        m<sub>Sun</sub>
                      </span>
                      <span className="denominator">
                        m<sub>star</sub>
                      </span>
                    </span>
                  </span>
                  <sup>&nbsp;3</sup>
                </span>
              </div>
            </b>
          </div>
          <p>
            <span>
              m<sub>Sun</sub>
            </span>
            &nbsp;and&nbsp;
            <span>
              m<sub>star</sub>
            </span>
            &nbsp;represent the respective masses of the Sun and the other star,
            and T<sub>ms</sub> is the star’s main sequence lifetime in years.
          </p>
          <p className="copy-secondary">
            Note: The Sun <span>SUN ICON</span> has been added to your H-R
            Diagram.
          </p>
          <hr className="divider-horizontal" />
          {questions && (
            <React.Fragment>
              <QASelect
                question={questions[0]}
                answer={answers[questions[0].id]}
                handleAnswerSelect={this.updateAnswer}
                activeId={activeId}
              />
              <QASelections
                questions={questions.slice(1, 4)}
                answers={answers}
                activeId={activeId}
                toggleHandler={this.onQAToggle}
                cancelHandler={this.onAnswerCancel}
                saveHandler={this.onAnswerSave}
                editHandler={this.onEdit}
              />
              <QASelect
                question={questions[4]}
                answer={answers[questions[4].id]}
                handleAnswerSelect={this.updateAnswer}
                activeId={activeId}
              />
              <QATextInputs
                questions={questions.slice(5, 6)}
                answers={answers}
                handleChange={this.updateAnswer}
                activeId={activeId}
              />
              <QASelect
                question={questions[6]}
                answer={answers[questions[6].id]}
                handleAnswerSelect={this.updateAnswer}
                activeId={activeId}
              />
            </React.Fragment>
          )}
        </section>
        <div className="container-flex direction-column">
          <Select
            className="graph-selector"
            options={[
              { label: 'H-R Diagram', value: 0 },
              { label: `${capitalize(histogramAccessor)} Histogram`, value: 1 },
            ]}
            label="Graph Selector"
            name="Graph Selector"
            handleChange={this.onGraphSelect}
          />
          <div className="container-graphs">
            {activeGraph === 0 && (
              <ScatterPlot
                data={clusterData}
                xDomain={scatterXDomain}
                yDomain={scatterYDomain}
                xValueAccessor="temperature"
                yValueAccessor="luminosity"
                xAxisLabel="Temperature (K)"
                yAxisLabel="Solar Luminosity"
                dataSelectionCallback={this.onGraphSelection}
                tooltipAccessors={['lifetime']}
              />
            )}
            {activeGraph === 1 && (
              <Histogram
                data={histogramData}
                selectedData={activeData}
                valueAccessor={histogramAccessor}
                xAxisLabel={histogramAxisLabel}
                dataSelectionCallback={this.onGraphSelection}
                tooltipAccessors={['lifetime']}
              />
            )}
          </div>
        </div>
      </Section>
    );
  }
}

EstimatingStellarLifetimes.propTypes = {
  clusterData: PropTypes.array,
  questionsRange: PropTypes.array,
  questions: PropTypes.array,
  answerHandler: PropTypes.func,
  getActiveId: PropTypes.func,
  scatterXDomain: PropTypes.array,
  scatterYDomain: PropTypes.array,
  histogramAccessor: PropTypes.string,
  histogramDomain: PropTypes.array,
  histogramAxisLabel: PropTypes.string,
};

export default withAnswerHandlers(
  withData(EstimatingStellarLifetimes, 'is_member')
);
