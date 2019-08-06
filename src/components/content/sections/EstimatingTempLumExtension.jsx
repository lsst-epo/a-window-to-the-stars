import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
// import isEmpty from 'lodash/isEmpty';
import { getAnswerData } from '../../../lib/utilities';
import { withData } from '../containers/WithData';
import { withAnswerHandlers } from '../containers/WithAnswerHandlers';
import { withActiveQuestions } from '../containers/withActiveQuestions';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import QAs from '../../qas';

@reactn
class EstimatingTempLumExtension extends React.PureComponent {
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
      answerHandler,
      setActive,
      advanceActive,
      activeId,
    } = this.props;
    const { answers } = this.global;
    const activeData = getAnswerData(answers, activeId);

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">Steller Temperature & Luminosity</h2>
          <p>
            As you can see, the real power of using an H-R Diagram is to compare
            and to reveal properties of stars. In this section you will consider
            what can be learned from using the H-R Diagram to categorize groups
            of stars by their temperatures and luminosities, and to use those
            properties to infer additional information about the stars.
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
        <div className="inner-column">
          <h2 className="space-bottom">H-R Diagram</h2>
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
          />
        </div>
      </Section>
    );
  }
}

EstimatingTempLumExtension.propTypes = {
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

export default withAnswerHandlers(
  withActiveQuestions(withData(EstimatingTempLumExtension, 'is_member'))
);
