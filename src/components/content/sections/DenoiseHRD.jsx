import React from 'react';
import PropTypes from 'prop-types';
import { WithData } from '../containers/WithData';
import { WithAnswerHandlers } from '../containers/WithAnswerHandlers';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import StarSelector from '../../star-selector';
import Prompt from '../../questions/Prompt';

class DenoiseHRD extends React.PureComponent {
  render() {
    const {
      answer,
      questions,
      answerHandler,
      activeId,
      clusterImage,
      clusterName,
      clusterWidth,
      clusterHeight,
      clusterXDomain,
      clusterYDomain,
      scatterXDomain,
      scatterYDomain,
    } = this.props;

    const selection = answer ? answer.data : [];

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">
            Making H-R Diagrams: Star Cluster {clusterName}
          </h2>
          {questions && <Prompt question={questions[0]} />}
          <br />
          <StarSelector
            width={clusterWidth}
            height={clusterHeight}
            data={selection}
            activeId={activeId}
            xValueAccessor="RA"
            yValueAccessor="Dec"
            xDomain={clusterXDomain}
            yDomain={clusterYDomain}
            dataLassoCallback={answerHandler}
            backgroundImage={clusterImage}
            preselected
          />
        </section>
        <div className="inner-column">
          <h2 className="space-bottom">H-R Diagram</h2>
          <ScatterPlot
            data={selection}
            activeId={activeId}
            xDomain={scatterXDomain}
            yDomain={scatterYDomain}
            xValueAccessor="temperature"
            yValueAccessor="luminosity"
            xAxisLabel="Temperature (K)"
            yAxisLabel="Solar Luminosity"
            dataSelectionCallback={answerHandler}
            preSelected
            useEraser
            showColorLegend
          />
        </div>
      </Section>
    );
  }
}

DenoiseHRD.propTypes = {
  questions: PropTypes.array,
  answer: PropTypes.object,
  answerHandler: PropTypes.func,
  activeId: PropTypes.string,
  clusterImage: PropTypes.node,
  clusterName: PropTypes.string,
  clusterWidth: PropTypes.number,
  clusterHeight: PropTypes.number,
  clusterXDomain: PropTypes.array,
  clusterYDomain: PropTypes.array,
  scatterXDomain: PropTypes.array,
  scatterYDomain: PropTypes.array,
  introduction: PropTypes.string,
};

export default WithAnswerHandlers(WithData(DenoiseHRD));
