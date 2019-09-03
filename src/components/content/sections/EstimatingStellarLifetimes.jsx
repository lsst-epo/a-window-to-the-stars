import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import { capitalize, getAnswerData } from '../../../lib/utilities';
import { WithData } from '../containers/WithData';
import { WithAnswerHandlers } from '../containers/WithAnswerHandlers';
import { WithActiveQuestions } from '../containers/WithActiveQuestions';
import { WithGraphToggler } from '../containers/WithGraphToggler';
import Section from './Section';
import Select from '../../site/forms/Select';
import ScatterPlot from '../../scatter-plot';
import Histogram from '../../histogram';
import QAs from '../../qas';
import StellarTable from '../../charts/shared/StellarTable';
import SunIcon from '../../site/icons/Sun';

@reactn
class EstimatingStellarLifetimes extends React.PureComponent {
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
      graphSelectHandler,
      activeGraph,
      setActive,
      advanceActive,
      activeId,
      tableAnswerIds,
      tableHeaders,
      tableRowTitles,
    } = this.props;

    const { answers } = this.global;
    const activeData = getAnswerData(answers, activeId);

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
          <StellarTable
            answers={answers}
            answerIds={tableAnswerIds}
            colTitles={tableHeaders}
            rowTitles={tableRowTitles}
          />
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
            handleChange={graphSelectHandler}
          />
          <div className="container-graphs">
            {activeGraph === 0 && (
              <ScatterPlot
                data={clusterData}
                activeId={activeId}
                activeData={activeData}
                xDomain={scatterXDomain}
                yDomain={scatterYDomain}
                xValueAccessor="temperature"
                yValueAccessor="luminosity"
                xAxisLabel="Temperature (K)"
                yAxisLabel="Solar Luminosity"
                dataSelectionCallback={answerHandler}
                tooltipAccessors={['lifetime']}
                includeSun
              />
            )}
            {activeGraph === 1 && (
              <Histogram
                data={clusterData}
                activeId={activeId}
                activeData={activeData}
                valueAccessor={histogramAccessor}
                domain={histogramDomain}
                xAxisLabel={histogramAxisLabel}
                dataSelectionCallback={answerHandler}
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
  tableAnswerIds: PropTypes.array,
  tableHeaders: PropTypes.array,
  tableRowTitles: PropTypes.array,
  activeGraph: PropTypes.number,
  graphSelectHandler: PropTypes.func,
};

export default WithGraphToggler(
  WithAnswerHandlers(
    WithActiveQuestions(WithData(EstimatingStellarLifetimes, 'is_member'))
  )
);
