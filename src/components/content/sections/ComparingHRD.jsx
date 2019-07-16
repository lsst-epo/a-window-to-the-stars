import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import API from '../../site/API';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import StarSelector from '../../star-selector';

@reactn
class ComparingHRD extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clusterData: [],
    };
  }

  componentDidMount() {
    const { dataPath } = this.props;

    API.get(dataPath).then(res => {
      const clusterData = res.data.stars.filter(datum => {
        return !!datum.is_member;
      });

      this.setState(prevState => ({
        ...prevState,
        clusterData,
      }));
    });
  }

  render() {
    const { clusterData } = this.state;
    const {
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
    const answer = this.global.answers[activeId];
    const selection = answer ? answer.data : [];

    return (
      <Section {...this.props} layout="">
        <section>
          <h2 className="section-title">
            Comparing H-R Diagrams: {clusterName}
          </h2>
          <p>
            It’s not obvious which stars belong to the cluster. Astronomers have
            the same challenge, and they may spend more than a year carefully
            collecting different types of data (such as spectra or composition)
            on each star to decide whether it belongs to a star cluster.
          </p>
          <p>
            Something else you may have noticed is that the H-R Diagrams of your
            star clusters don’t look like the H-R Diagrams you find in your
            textbook or online. There’s a reason for that, which we’ll get to
            shortly.
          </p>
        </section>
        <br />
        <div className="container-flex spaced">
          <div className="col padded col-2 col-width-50">
            <h2 className="section-title">Your Star Cluster</h2>
            <br />
            <StarSelector
              width={clusterWidth}
              height={clusterHeight}
              data={selection}
              xValueAccessor="RA"
              yValueAccessor="Dec"
              xDomain={clusterXDomain}
              yDomain={clusterYDomain}
              dataLassoCallback={this.onGraphLasso}
              dataSelectionCallback={this.onGraphSelection}
              backgroundImage={clusterImage}
              preSelected
            />
            <br />
            <h2>Your H-R Diagram</h2>
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
          <div className="col padded col-2 col-width-50">
            <h2 className="section-title">Astronomer&apos;s Star Cluster</h2>
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
              dataSelectionCallback={this.onGraphSelection}
              backgroundImage={clusterImage}
              preSelected
            />
            <br />
            <h2>Astronomer&apos;s H-R Diagram</h2>
            <ScatterPlot
              data={clusterData}
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
      </Section>
    );
  }
}

ComparingHRD.propTypes = {
  id: PropTypes.number,
  layout: PropTypes.string,
  dividers: PropTypes.bool,
  paginationLocation: PropTypes.number,
  questionsRange: PropTypes.array,
  questions: PropTypes.array,
  activeId: PropTypes.string,
  dataPath: PropTypes.string,
  clusterName: PropTypes.string,
  clusterImage: PropTypes.node,
  clusterWidth: PropTypes.number,
  clusterHeight: PropTypes.number,
  clusterXDomain: PropTypes.array,
  clusterYDomain: PropTypes.array,
  scatterXDomain: PropTypes.array,
  scatterYDomain: PropTypes.array,
};

export default ComparingHRD;
