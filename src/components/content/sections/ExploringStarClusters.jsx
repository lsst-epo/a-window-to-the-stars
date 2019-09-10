import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import { getAnswerData } from '../../../lib/utilities';
import { WithData } from '../containers/WithData';
import { WithAnswerHandlers } from '../containers/WithAnswerHandlers';
import { WithActiveQuestions } from '../containers/WithActiveQuestions';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import QAs from '../../qas';
import ObservationsTable from '../../charts/shared/ObservationsTable';

@reactn
class ExploringStarClusters extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { answers: prevAnswers } = prevProps;
    const { answers, regionAnswers } = this.props;

    if (prevAnswers !== answers) {
      this.dispatch.updateUserDefinedRegions(regionAnswers);
    }
  }

  render() {
    const {
      questions,
      answers,
      clusterData,
      scatterXDomain,
      scatterYDomain,
      answerHandler,
      setActive,
      advanceActive,
      activeId,
      tableCells,
      tableRowTitles,
      tableHeaders,
      regions,
    } = this.props;

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">
            Exploring H-R Diagrams of Star Clusters
          </h2>
          <p>
            An H-R Diagram is a plot that displays temperature and luminosity
            information about stars. Luminosity (Y axis) is a measure of the
            total energy output from a star per unit of time. It’s commonly
            expressed as Solar luminosity, which is the ratio of a star’s energy
            output compared to the energy output of the Sun. For example, a star
            with a solar luminosity of 10 is giving off ten times more energy
            than the Sun. The temperature (X axis) is commonly measured in
            Kelvin.
          </p>
          <p>
            Notice that most data points occupy a region stretching diagonally
            from the upper left to the lower right of the plot. This region is
            called the main sequence. Stars in the main sequence are fusing
            hydrogen. The fusion pressure force is balanced against the force of
            gravity, which keeps the star in a stable state for most of its
            lifetime.
          </p>
          <p>
            There are also groups of points above the main sequence representing
            giant stars, and beneath the main sequence representing white dwarf
            stars. Giant stars are stars in the late stages of their lifetimes.
            They are powered by more than one type of nuclear fusion reaction.
            White dwarfs are stellar remnants that are no longer powered by
            fusion. White dwarfs are commonly referred to as dead stars.
          </p>
          <p>
            These three areas (giant stars, main sequence, and white dwarfs)
            will always appear on an H-R Diagram, even if you import the data
            from thousands of stars.
          </p>
          <p>
            The main sequence forms a slightly s-shaped diagonal band across the
            plot. To determine the approximate position of the main sequence
            stars on this H-R Diagram, complete the following:
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
          <hr className="divider-horizontal" />
          <ObservationsTable
            answers={answers}
            cells={tableCells}
            rowTitles={tableRowTitles}
            colTitles={tableHeaders}
          />
        </section>
        <div className="inner-column">
          <h2 className="space-bottom">H-R Diagram</h2>
          <ScatterPlot
            data={clusterData}
            activeId={activeId}
            activeData={getAnswerData(answers, activeId)}
            xValueAccessor="temperature"
            yValueAccessor="luminosity"
            xAxisLabel="Temperature (K)"
            yAxisLabel="Solar Luminosity"
            xDomain={scatterXDomain}
            yDomain={scatterYDomain}
            dataSelectionCallback={answerHandler}
            showColorLegend
            regions={regions}
          />
        </div>
      </Section>
    );
  }
}

ExploringStarClusters.propTypes = {
  clusterData: PropTypes.array,
  activeId: PropTypes.string,
  setActive: PropTypes.func,
  advanceActive: PropTypes.func,
  questions: PropTypes.array,
  answers: PropTypes.object,
  answerHandler: PropTypes.func,
  scatterXDomain: PropTypes.array,
  scatterYDomain: PropTypes.array,
  tableCells: PropTypes.array,
  tableHeaders: PropTypes.array,
  tableRowTitles: PropTypes.array,
  regionAmswers: PropTypes.array,
  regionAnswers: PropTypes.array,
  regions: PropTypes.array,
};

export default WithAnswerHandlers(
  WithActiveQuestions(WithData(ExploringStarClusters, 'is_member'))
);
