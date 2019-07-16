import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import API from '../../site/API';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import StarSelector from '../../star-selector';
import QuestionPrompts from '../../questions/prompts';

@reactn
class MakingHRD extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clusterData: [],
    };
  }

  componentDidMount() {
    const { dataPath } = this.props;

    API.get(dataPath).then(res => {
      this.setState(prevState => ({
        ...prevState,
        clusterData: res.data.stars,
      }));
    });
  }

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
    const { clusterData } = this.state;
    const {
      activeId,
      questions,
      clusterImage,
      introduction,
      clusterName,
      clusterWidth,
      clusterHeight,
      clusterXDomain,
      clusterYDomain,
      scatterXDomain,
      scatterYDomain,
    } = this.props;
    const answer = this.global.answers[activeId];
    const selection = answer ? answer.data : [];

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">Making H-R Diagrams: {clusterName}</h2>
          <p>{introduction}</p>
          <hr className="divider-horizontal" />
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
        </section>
        <div className="col-graph">
          <h2>H-R Diagram</h2>
          <ScatterPlot
            data={selection}
            xDomain={scatterXDomain}
            yDomain={scatterYDomain}
            xValueAccessor="temperature"
            yValueAccessor="luminosity"
            xAxisLabel="Temperature (K)"
            yAxisLabel="Solar Luminosity"
          />
        </div>
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
  activeId: PropTypes.string,
  dataPath: PropTypes.string,
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

export default MakingHRD;
