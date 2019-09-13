import React from 'react';
import PropTypes from 'prop-types';
import { WithData } from '../containers/WithData';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';

class CombinedHRD extends React.PureComponent {
  render() {
    const {
      clusterNames,
      scatterXDomain,
      scatterYDomain,
      clusterData,
      regions,
    } = this.props;

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">
            Combining H-R Diagrams: Cluster {clusterNames[0]} & Cluster{' '}
            {clusterNames[1]}
          </h2>
          <p>
            Not all star clusters contain stars at every stage of their
            evolution. Textbook H-R Diagrams are made by combining data from
            many different types of stars, but all these stars usually belong to
            several clusters of different ages.
          </p>
          <p>
            As you can see in your combined H-R diagram, stars are not equally
            distributed in temperature or in luminosity. Some values are more
            common, but it is difficult to visually estimate how many stars of
            each type there are just from looking at the H-R Diagram.
          </p>
          <p>
            Histograms are a great tool for examining the distribution of star
            properties. Let’s see how this works with temperatures of stars.
          </p>
        </section>
        <div className="container-flex direction-column">
          <h2 className="space-bottom">Combined H-R Diagram</h2>
          <ScatterPlot
            data={clusterData}
            xDomain={scatterXDomain}
            yDomain={scatterYDomain}
            xValueAccessor="temperature"
            yValueAccessor="luminosity"
            xAxisLabel="Temperature (K)"
            yAxisLabel="Solar Luminosity"
            preSelected
            regions={regions}
          />
        </div>
      </Section>
    );
  }
}

CombinedHRD.propTypes = {
  id: PropTypes.number,
  clusterNames: PropTypes.array,
  clusterData: PropTypes.array,
  scatterXDomain: PropTypes.array,
  scatterYDomain: PropTypes.array,
  regions: PropTypes.array,
};

export default WithData(CombinedHRD, 'is_member');
