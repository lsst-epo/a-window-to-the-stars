import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import { withData } from '../containers/WithData';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import StarSelector from '../../star-selector';
import QuestionPrompts from '../../questions/prompts';

@reactn
class MakingHRD extends React.PureComponent {
  updateAnswer(id, data) {
    const { answers: prevAnswers } = this.global;
    const prevAnswer = { ...prevAnswers[id] };

    this.setGlobal(prevGlobal => ({
      ...prevGlobal,
      answers: {
        ...prevAnswers,
        [id]: {
          ...prevAnswer,
          id,
          data,
        },
      },
    }));
  }

  onGraphLasso = selectedData => {
    const { activeId } = this.props;
    this.updateAnswer(activeId, selectedData);
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
          <h2 className="section-title">Making H-R Diagrams: {clusterName}</h2>
          <p>{introduction}</p>
        </section>
        <hr className="divider-horizontal" />
        <div className="container-flex spaced">
          <div className="col padded col-width-50">
            <QuestionPrompts questions={questions} />
            <br />
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
            <h2>H-R Diagram</h2>
            <ScatterPlot
              data={selection}
              xDomain={scatterXDomain}
              yDomain={scatterYDomain}
              xValueAccessor="temperature"
              yValueAccessor="luminosity"
              xAxisLabel="Temperature (K)"
              yAxisLabel="Solar Luminosity"
              preSelected
            />
          </div>
        </div>
        <br />
      </Section>
    );
  }
}

MakingHRD.propTypes = {
  id: PropTypes.number,
  layout: PropTypes.string,
  dividers: PropTypes.bool,
  paginationLocation: PropTypes.number,
  questionsRange: PropTypes.array,
  questions: PropTypes.array,
  answer: PropTypes.object,
  activeId: PropTypes.string,
  dataPath: PropTypes.string,
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

export default withData(MakingHRD);
