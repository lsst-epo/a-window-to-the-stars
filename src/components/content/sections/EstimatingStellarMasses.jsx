import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { capitalize } from '../../../lib/utilities';
import { withData } from '../containers/WithData';
import { withAnswerHandlers } from '../containers/WithAnswerHandlers';
import Section from './Section';
import Select from '../../site/forms/Select';
import ScatterPlot from '../../scatter-plot';
import Histogram from '../../histogram';
import QASelections from '../../questions/ExpansionList';
import QASelect from '../../questions/Select';
import QACompoundSelect from '../../questions/CompoundSelect';

@reactn
class EstimatingStellarMasses extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeGraph: 0,
      activeId: null,
    };
  }

  componentDidMount() {
    const { getActiveId, questionsRange } = this.props;

    if (getActiveId) {
      const activeId = getActiveId(questionsRange);
      this.setActiveQuestion(activeId);
    }
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

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">Estimating Stellar Masses</h2>
          <p>
            The mass of a main sequence star establishes its rate of fusion.
            More massive stars have stronger gravity, and therefore require
            higher rates of fusion to avoid collapse. The hot gas pressure from
            fusion reactions in turn determines other factors, such as the
            star’s size, luminosity, and surface temperature.
          </p>
          <p>
            Although we cannot directly measure the mass of most stars,
            astronomers have derived equations that relate the luminosity of a
            star to its mass. In the equation below, the symbols L
            <sub>&#8857;</sub> and M<sub>&#8857;</sub> are the symbols for the
            luminosity and mass of the Sun.
          </p>
          <p>
            <b>Important note</b>: These equations can only predict the masses
            of stars on the main sequence.
          </p>
          <div className="equation-flex">
            <div className="equation-container padded">
              <b className="equation">
                <div className="container-flex centered">
                  <span className="fraction">
                    <span className="numerator">L</span>
                    <span className="denominator">
                      L<sub>&#8857;</sub>
                    </span>
                  </span>
                  <span>&nbsp;&asymp;&nbsp;</span>
                  <span>0.23&nbsp;</span>
                  <span>
                    <span className="parenthetical">
                      <span className="fraction">
                        <span className="numerator">M</span>
                        <span className="denominator">
                          M<sub>&#8857;</sub>
                        </span>
                      </span>
                    </span>
                    <sup>&nbsp;2.3</sup>
                  </span>
                </div>
              </b>
            </div>
            <div className="equation-container padded">
              <b className="equation">
                (M &lt; 0.43M<sub>&#8857;</sub>)
              </b>
            </div>
          </div>
          <div className="equation-flex">
            <div className="equation-container padded">
              <b className="equation">
                <div className="container-flex centered">
                  <span className="fraction">
                    <span className="numerator">L</span>
                    <span className="denominator">
                      L<sub>&#8857;</sub>
                    </span>
                  </span>
                  <span>&nbsp;=&nbsp;</span>
                  <span>
                    <span className="parenthetical">
                      <span className="fraction">
                        <span className="numerator">M</span>
                        <span className="denominator">
                          M<sub>&#8857;</sub>
                        </span>
                      </span>
                    </span>
                    <sup>&nbsp;4</sup>
                  </span>
                </div>
              </b>
            </div>
            <div className="equation-container padded">
              <b className="equation">
                (0.43M<sub>&#8857;</sub> &lt; M &lt; 2M<sub>&#8857;</sub>)
              </b>
            </div>
          </div>
          <div className="equation-flex">
            <div className="equation-container padded">
              <b className="equation">
                <div className="container-flex centered">
                  <span className="fraction">
                    <span className="numerator">L</span>
                    <span className="denominator">
                      L<sub>&#8857;</sub>
                    </span>
                  </span>
                  <span>&nbsp;&asymp;&nbsp;</span>
                  <span>1.5&nbsp;</span>
                  <span>
                    <span className="parenthetical">
                      <span className="fraction">
                        <span className="numerator">M</span>
                        <span className="denominator">
                          M<sub>&#8857;</sub>
                        </span>
                      </span>
                    </span>
                    <sup>&nbsp;3.5</sup>
                  </span>
                </div>
              </b>
            </div>
            <div className="equation-container padded">
              <b className="equation">
                (2M<sub>&#8857;</sub> &lt; M &lt; 20M<sub>&#8857;</sub>;)
              </b>
            </div>
          </div>
          <div className="equation-flex">
            <div className="equation-container padded">
              <b className="equation">
                <div className="container-flex centered">
                  <span className="fraction">
                    <span className="numerator">L</span>
                    <span className="denominator">
                      L<sub>&#8857;</sub>
                    </span>
                  </span>
                  <span>&nbsp;&asymp;&nbsp;</span>
                  <span>3200&nbsp;</span>
                  <span className="fraction">
                    <span className="numerator">M</span>
                    <span className="denominator">
                      M<sub>&#8857;</sub>
                    </span>
                  </span>
                </div>
              </b>
            </div>
            <div className="equation-container padded">
              <b className="equation">
                (M &gt; 20M<sub>&#8857;</sub>)
              </b>
            </div>
          </div>
          <p className="copy-secondary">
            Note: The Sun <span>SUN ICON</span> has been added to your H-R
            Diagram.
          </p>
          <hr className="divider-horizontal" />
          {questions && (
            <React.Fragment>
              <QACompoundSelect
                questions={[questions[0], questions[1]]}
                answers={answers}
                handleAnswerSelect={this.updateAnswer}
                activeId={activeId}
              />
              <QASelections
                questions={questions.slice(2, 5)}
                answers={answers}
                activeId={activeId}
                toggleHandler={this.onQAToggle}
                cancelHandler={this.onAnswerCancel}
                saveHandler={this.onAnswerSave}
                editHandler={this.onEdit}
              />
              <QASelect
                question={questions[5]}
                answer={answers[questions[5].id]}
                handleAnswerSelect={this.updateAnswer}
                activeId={activeId}
              />
            </React.Fragment>
          )}
        </section>
        <div className="container-flex direction-column">
          <Select
            className="graph-selector"
            value={activeGraph}
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
                activeData={
                  !isEmpty(answers[activeId]) ? answers[activeId].data : null
                }
                xDomain={scatterXDomain}
                yDomain={scatterYDomain}
                xValueAccessor="temperature"
                yValueAccessor="luminosity"
                xAxisLabel="Temperature (K)"
                yAxisLabel="Solar Luminosity"
                dataSelectionCallback={this.onGraphSelection}
                tooltipAccessors={['mass']}
              />
            )}
            {activeGraph === 1 && (
              <Histogram
                data={clusterData}
                selectedData={activeData}
                valueAccessor={histogramAccessor}
                domain={histogramDomain}
                xAxisLabel={histogramAxisLabel}
                dataSelectionCallback={this.onGraphSelection}
                tooltipAccessors={['mass']}
              />
            )}
          </div>
        </div>
      </Section>
    );
  }
}

EstimatingStellarMasses.propTypes = {
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
  withData(EstimatingStellarMasses, 'is_member')
);
