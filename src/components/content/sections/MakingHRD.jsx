import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import API from '../../site/API';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import StarSelector from '../../star-selector';
import QuestionPrompts from '../../questions/prompts';
import ClusterImage from '../../../assets/images/ngc188_FINAL.jpg';

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
    const { activeId, questions } = this.props;
    const answer = this.global.answers[activeId];
    const selection = answer ? answer.data : [];

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">
            Making H-R Diagrams of Star Clusters
          </h2>
          <p>
            Locate the star cluster in this image. Not all the stars you see in
            the image are actually stars in the cluster—some are much closer to
            Earth than the stars in the cluster, and some are farther away.
            Because of their different distances, these stars can provide
            inaccurate information on an H-R Diagram if plotted with the stars
            in the cluster. It’s not obvious which stars belong to the cluster.
            Astronomers have the same challenge, and they may spend more than a
            year carefully collecting different types of data (such as spectra
            or composition) on each star to decide whether it belongs to a star
            cluster.
          </p>
          {/*  <p>
            Use the lasso to encircle only the stars that you think belong to
            the star cluster. After you lasso the stars of the cluster, points
            representing the luminosity and temperature of these stars will be
            plotted on the H-R Diagram at the right.
          </p>
          <p>
            Next, use the lasso tool on the H-R Diagram (not on the image) to
            encircle the points that are in the three regions previously
            described. Use the guidelines you developed in questions 1-3 to help
            identify where those regions are on your H-R Diagram.
          </p>
          <p>
            Notice that when you select points on the H-R Diagram, the stars
            they represent are highlighted in the star field image at the left.
            When you are done with your selections, save both the image and the
            H-R Diagram for your cluster.
          </p>  */}
          <hr className="divider-horizontal" />
          <QuestionPrompts questions={questions} />
          <br />
          <StarSelector
            width={1200}
            height={1185}
            data={clusterData}
            xValueAccessor="RA"
            yValueAccessor="Dec"
            xDomain={[16.160474211844242, 9.616988842401822]}
            yDomain={[84.99507547492594, 85.53437634262413]}
            dataLassoCallback={this.onGraphLasso}
            backgroundImage={ClusterImage}
            selection={selection}
          />
        </section>
        <div className="col-graph">
          <h2>H-R Diagram</h2>
          <ScatterPlot
            data={selection}
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
};

export default MakingHRD;
