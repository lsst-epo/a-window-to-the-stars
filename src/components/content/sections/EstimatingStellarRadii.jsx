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
import QATextInputs from '../../questions/TextInputs';

@reactn
class EstimatingStellarRadii extends React.PureComponent {
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
          <h2 className="section-title">Estimating Stellar Radii</h2>
          <p>
            The Stefan-Boltzmann equation predicts the size of a star from its
            luminosity and temperature. If we use solar luminosity units (the
            Sun’s luminosity = 1), the equation is:
          </p>
          <div className="equation-container">
            <b className="equation">
              L = R<sup>2</sup>T<sup>4</sup>
            </b>
          </div>
          <p>
            <b>L</b> is the luminosity of the star, <b>R</b> is the radius of
            the star, and <b>T</b> is the temperature of the star, all relative
            to the Sun. For example, a star with a temperature three times the
            temperature of the Sun has a temperature: <b>T = 3</b>.
          </p>
          <p>
            The H-R Diagram records both temperature and luminosity, so we can
            rearrange this equation to determine the size of the star:
          </p>
          <div className="equation-container">
            <b className="equation">
              R = &radic;(L/T<sup>4</sup>)
            </b>
          </div>
          <p>
            To explore how this works, consider a star with the same luminosity
            as the Sun (<b>L=1</b>) and a surface temperature that is twice as
            hot as the Sun (<b>T=2</b>). Substituting these values into the
            equation above:
          </p>
          <div className="equation-container">
            <div className="container-flex direction-column wrap">
              <b className="equation">
                R = &radic;(1/2<sup>4</sup>)
              </b>
              <b className="equation">R = &radic;(1/16)</b>
              <b className="equation">R = &frac14;</b>
            </div>
          </div>
          <p>
            The star is considerably smaller, having a radius of only &frac14;
            (or 25% of) the Sun’s radius.
          </p>
          <p>
            Unlike the previous relationships, this equation applies to all
            stars, not just those on the main sequence. Select stars in
            different areas of the H-R Diagram to estimate their sizes.
          </p>
          <p className="copy-secondary">
            Note: The Sun <span>SUN ICON</span> has been added to your H-R
            Diagram.
          </p>
          <hr className="divider-horizontal" />
          {questions && (
            <QASelections
              questions={questions.slice(0, 3)}
              answers={answers}
              activeId={activeId}
              toggleHandler={this.onQAToggle}
              cancelHandler={this.onAnswerCancel}
              saveHandler={this.onAnswerSave}
              editHandler={this.onEdit}
            />
          )}
          {questions && (
            <QASelect
              question={questions[3]}
              answer={answers[questions[3].id]}
              handleAnswerSelect={this.updateAnswer}
              activeId={activeId}
            />
          )}
          {questions && (
            <QATextInputs
              questions={questions.slice(4, 6)}
              answers={answers}
              handleChange={this.updateAnswer}
              activeId={activeId}
            />
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
                tooltipAccessors={['radius']}
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
                tooltipAccessors={['radius']}
              />
            )}
          </div>
        </div>
      </Section>
    );
  }
}

EstimatingStellarRadii.propTypes = {
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
  withData(EstimatingStellarRadii, 'is_member')
);
