import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
// import isEmpty from 'lodash/isEmpty';
import API from '../../site/API';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';

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
        <section className="col-graph">
          <h2 className="section-title">Placeholder Star Cluster</h2>
          <ScatterPlot
            width={600}
            height={600}
            padding={80}
            data={clusterData}
            xValueAccessor="teff"
            yValueAccessor="luminosity"
            xAxisLabel="Temperature (K)"
            yAxisLabel="Solar Luminosity"
            useLasso
            dataLassoCallback={this.onGraphLasso}
            dataSelectionCallback={this.onGraphSelection}
          />
        </section>
        <div className="col-graph">
          <h2>H-R Diagram</h2>
          <ScatterPlot
            width={600}
            height={600}
            padding={50}
            data={selection}
            xValueAccessor="teff"
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
