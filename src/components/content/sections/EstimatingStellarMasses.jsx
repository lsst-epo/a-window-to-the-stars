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
class EstimatingStellarMasses extends React.PureComponent {
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
      tableAnswerIds,
      tableHeaders,
      tableRowTitles,
      graphSelectHandler,
      activeGraph,
    } = this.props;

    const { answers } = this.global;
    const activeData = getAnswerData(answers, activeId);

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
                (2M<sub>&#8857;</sub> &lt; M &lt; 20M<sub>&#8857;</sub>)
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
                tooltipAccessors={['mass']}
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
    WithActiveQuestions(WithData(EstimatingStellarMasses, 'is_member'))
  )
);
