import React from 'react';
import PropTypes from 'prop-types';
import { WithData } from '../containers/WithData';
import { WithAnswerHandlers } from '../containers/WithAnswerHandlers';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import StarSelector from '../../star-selector';
import Prompt from '../../questions/Prompt';

class MakingHRD extends React.Component {
  onGraphLasso = selectedData => {
    const { answerHandler, activeId } = this.props;

    answerHandler(activeId, selectedData);
  };

  render() {
    const {
      answer,
      questions,
      clusterImage,
      introduction,
      clusterData,
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
      <Section {...this.props} layout="">
        <section>
          <h2 className="section-title">
            Making H-R Diagrams: Star Cluster {clusterName}
          </h2>
          <p>{introduction}</p>
        </section>
        <hr className="divider-horizontal" />
        <div className="container-flex spaced">
          <div className="col padded col-width-50">
            {questions && <Prompt question={questions[0]} />}
          </div>
          <div className="col padded col-width-50">
            <h2>H-R Diagram</h2>
          </div>
        </div>
        <br />
        <div className="container-flex spaced">
          <div className="col padded col-width-50">
            <StarSelector
              width={clusterWidth}
              height={clusterHeight}
              data={clusterData}
              xValueAccessor="RA"
              yValueAccessor="Dec"
              xDomain={clusterXDomain}
              yDomain={clusterYDomain}
              dataLassoCallback={this.onGraphLasso}
              backgroundImage={clusterImage}
              selection={selection}
            />
          </div>
          <div className="col padded col-width-50">
            <ScatterPlot
              data={selection}
              xDomain={scatterXDomain}
              yDomain={scatterYDomain}
              xValueAccessor="temperature"
              yValueAccessor="luminosity"
              xAxisLabel="Temperature (K)"
              yAxisLabel="Solar Luminosity"
              preSelected
              showColorLegend
            />
          </div>
        </div>
        <br />
      </Section>
    );
  }
}

MakingHRD.propTypes = {
  questions: PropTypes.array,
  answer: PropTypes.object,
  answerHandler: PropTypes.func,
  activeId: PropTypes.string,
  clusterData: PropTypes.array,
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

export default WithAnswerHandlers(WithData(MakingHRD));
