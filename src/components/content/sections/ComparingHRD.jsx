import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import API from '../../site/API';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import StarSelector from '../../star-selector';
import ClusterImage from '../../../assets/images/ngc188_FINAL.jpg';

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
    const { activeId } = this.props;
    const answer = this.global.answers[activeId];
    const selection = answer ? answer.data : [];

    return (
      <Section {...this.props}>
        <div>
          <h2 className="section-title">Your Star Cluster</h2>
          <br />
          <StarSelector
            width={1200}
            height={1185}
            data={selection}
            xValueAccessor="RA"
            yValueAccessor="Dec"
            xDomain={[16.160474211844242, 9.616988842401822]}
            yDomain={[84.99507547492594, 85.53437634262413]}
            dataLassoCallback={this.onGraphLasso}
            dataSelectionCallback={this.onGraphSelection}
            backgroundImage={ClusterImage}
            preSelected
          />
          <br />
          <h2>Your H-R Diagram</h2>
          <ScatterPlot
            data={selection}
            xValueAccessor="temperature"
            yValueAccessor="luminosity"
            xAxisLabel="Temperature (K)"
            yAxisLabel="Solar Luminosity"
            preSelected
          />
        </div>
        <div>
          <h2 className="section-title">Astronomer&apos;s Star Cluster</h2>
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
            dataSelectionCallback={this.onGraphSelection}
            backgroundImage={ClusterImage}
            filterBy="is_member"
            preSelected
          />
          <br />
          <h2>Astronomer&apos;s H-R Diagram</h2>
          <ScatterPlot
            data={clusterData}
            xValueAccessor="temperature"
            yValueAccessor="luminosity"
            xAxisLabel="Temperature (K)"
            yAxisLabel="Solar Luminosity"
            filterBy="is_member"
            preSelected
          />
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
};

export default ComparingHRD;
