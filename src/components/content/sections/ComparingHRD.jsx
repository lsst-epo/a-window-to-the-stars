import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import API from '../../site/API';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import StarSelector from '../../star-selector';
import ClusterImage from '../../../assets/images/star-clusters.jpg';

@reactn
class MakingHRD extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selection: [],
      clusterData: [],
    };
  }

  componentDidMount() {
    API.get('static-data/stars.json').then(res => {
      this.setState(prevState => ({
        ...prevState,
        clusterData: res.data,
      }));
    });
  }

  onGraphLasso = selectedData => {
    this.setState(prevState => ({
      ...prevState,
      selection: selectedData,
    }));
  };

  onGraphSelection = selectedData => {
    this.setState(prevState => ({
      ...prevState,
      selection: selectedData,
    }));
  };

  render() {
    const { clusterData } = this.state;
    let { selection } = this.state;

    if (selection && !Array.isArray(selection)) {
      selection = [selection];
    }

    return (
      <Section {...this.props}>
        <div>
          <h2 className="section-title">Your Star Cluster</h2>
          <br />
          <StarSelector
            width={600}
            height={600}
            data={clusterData}
            xValueAccessor="temperature"
            yValueAccessor="luminosity"
            dataLassoCallback={this.onGraphLasso}
            dataSelectionCallback={this.onGraphSelection}
            backgroundImage={ClusterImage}
          />
          <br />
          <h2>Your H-R Diagram</h2>
          <ScatterPlot
            data={selection}
            xValueAccessor="temperature"
            yValueAccessor="luminosity"
            xAxisLabel="Temperature (K)"
            yAxisLabel="Solar Luminosity"
          />
        </div>
        <div>
          <h2 className="section-title">Astronomer&apos;s Star Cluster</h2>
          <br />
          <StarSelector
            width={600}
            height={600}
            data={clusterData}
            xValueAccessor="temperature"
            yValueAccessor="luminosity"
            dataLassoCallback={this.onGraphLasso}
            dataSelectionCallback={this.onGraphSelection}
            backgroundImage={ClusterImage}
          />
          <br />
          <h2>Astronomer&apos;s H-R Diagram</h2>
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
};

export default MakingHRD;
