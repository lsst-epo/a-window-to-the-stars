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
        <section className="col-graph">
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
          <p>
            Draw circles around different groups of stars to plot them on the
            H-R Diagram.
          </p>
          <br />
          <StarSelector
            width={600}
            height={600}
            data={clusterData}
            xValueAccessor="teff"
            yValueAccessor="luminosity"
            dataLassoCallback={this.onGraphLasso}
            dataSelectionCallback={this.onGraphSelection}
            backgroundImage={ClusterImage}
          />
        </section>
        <div className="col-graph">
          <h2>H-R Diagram</h2>
          <ScatterPlot
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
