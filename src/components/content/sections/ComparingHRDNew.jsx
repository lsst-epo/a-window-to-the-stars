import React from 'react';
import PropTypes from 'prop-types';
import { withData } from '../containers/WithData';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import StarSelector from '../../star-selector';

class ComparingHRD extends React.PureComponent {
  render() {
    const {
      clusterData,
      clusterImage,
      clusterName,
      clusterWidth,
      clusterHeight,
      clusterXDomain,
      clusterYDomain,
      scatterXDomain,
      scatterYDomain,
      answer,
    } = this.props;

    const selection = answer ? answer.data : [];
    const multipleData = [
      { className: 'user', data: selection },
      { className: 'astronomer', data: clusterData },
    ];
    // console.log(selection);
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
          <div className="col padded col-width-50">
            <StarSelector
              width={clusterWidth}
              height={clusterHeight}
              data={multipleData}
              xValueAccessor="RA"
              yValueAccessor="Dec"
              xDomain={clusterXDomain}
              yDomain={clusterYDomain}
              dataLassoCallback={this.onGraphLasso}
              dataSelectionCallback={this.onGraphSelection}
              backgroundImage={clusterImage}
              preSelected
              multiple
            />
          </div>
          <div className="col padded col-width-50">
            <ScatterPlot
              data={multipleData}
              xDomain={scatterXDomain}
              yDomain={scatterYDomain}
              xValueAccessor="temperature"
              yValueAccessor="luminosity"
              xAxisLabel="Temperature (K)"
              yAxisLabel="Solar Luminosity"
              preSelected
              multiple
            />
          </div>
        </div>
        <br />
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
  clusterData: PropTypes.array,
  clusterName: PropTypes.string,
  clusterImage: PropTypes.node,
  clusterWidth: PropTypes.number,
  clusterHeight: PropTypes.number,
  clusterXDomain: PropTypes.array,
  clusterYDomain: PropTypes.array,
  scatterXDomain: PropTypes.array,
  scatterYDomain: PropTypes.array,
  answer: PropTypes.object,
};

export default withData(ComparingHRD, 'is_member');
