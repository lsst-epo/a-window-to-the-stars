import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
// import isEmpty from 'lodash/isEmpty';
import { capitalize, getAnswerData } from '../../../lib/utilities';
import { WithData } from '../containers/WithData';
import { WithAnswerHandlers } from '../containers/WithAnswerHandlers';
import { WithActiveQuestions } from '../containers/WithActiveQuestions';
import Section from './Section';
import Select from '../../site/forms/Select';
import ScatterPlot from '../../scatter-plot';
import Histogram from '../../histogram';
import QAs from '../../qas';
import SunIcon from '../../site/icons/Sun';

@reactn
class EstimatingStellarRadii extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeGraph: 0,
    };
  }

  onGraphSelect = e => {
    const { value } = e.target;

    this.setState(prevState => ({
      ...prevState,
      activeGraph: parseInt(value, 10),
    }));
  };

  updateAnswer = (id, value, type) => {
    const { answerHandler, advanceActive } = this.props;

    answerHandler(id, value, type);

    if (type === 'change') {
      advanceActive();
    }
  };

  onGraphSelection = selectedData => {
    const { answerHandler, activeId } = this.props;

    answerHandler(activeId, selectedData);
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
      answerHandler,
      setActive,
      advanceActive,
      activeId,
    } = this.props;
    const { activeGraph } = this.state;
    const { answers } = this.global;
    const activeData = getAnswerData(answers, activeId);

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
          <p>
            Use the dropdown above the graph to switch between your H-R Diagram
            and the {capitalize(histogramAccessor)} Histogram.{' '}
            <span className="copy-secondary">
              Note: The Sun <SunIcon className="sun-icon" /> has been added to
              your H-R Diagram.
            </span>
          </p>
          <hr className="divider-horizontal" />
          {questions && (
            <QAs
              questions={questions}
              answers={answers}
              activeId={activeId}
              answerHandler={answerHandler}
              advanceActive={advanceActive}
              setActive={setActive}
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
                activeData={activeData}
                xDomain={scatterXDomain}
                yDomain={scatterYDomain}
                xValueAccessor="temperature"
                yValueAccessor="luminosity"
                xAxisLabel="Temperature (K)"
                yAxisLabel="Solar Luminosity"
                dataSelectionCallback={this.onGraphSelection}
                tooltipAccessors={['radius']}
                includeSun
              />
            )}
            {activeGraph === 1 && (
              <Histogram
                data={clusterData}
                activeData={activeData}
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
  activeId: PropTypes.string,
  setActive: PropTypes.func,
  advanceActive: PropTypes.func,
  questions: PropTypes.array,
  answerHandler: PropTypes.func,
  scatterXDomain: PropTypes.array,
  scatterYDomain: PropTypes.array,
  histogramAccessor: PropTypes.string,
  histogramDomain: PropTypes.array,
  histogramAxisLabel: PropTypes.string,
};

export default WithAnswerHandlers(
  WithActiveQuestions(WithData(EstimatingStellarRadii, 'is_member'))
);
