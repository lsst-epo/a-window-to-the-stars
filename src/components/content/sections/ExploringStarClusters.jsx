import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import placeholder from '../../../assets/images/placeholder.jpg';

class ExploringStarClusters extends React.PureComponent {
  render() {
    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">
            Exploring H-R Diagrams of Star Clusters
          </h2>
          <p>
            An H-R Diagram is a plot that displays temperature and luminosity
            information about stars. Luminosity (Y axis) is a measure of the
            total energy output from a star per unit of time. It’s commonly
            expressed as Solar luminosity, which is the ratio of a star’s energy
            output compared to the energy output of the Sun. For example, a star
            with a solar luminosity of 10 is giving off ten times more energy
            than the Sun. Temperature (X axis) is commonly measured in Kelvin.
          </p>
          <p>
            A star’s physical properties—its size, temperature, color, and
            brightness—are the product of the star’s initial mass and this clash
            of forces, and these physical properties change during a star’s
            lifetime.
          </p>
        </section>
        <img src={placeholder} alt="Star Field" className="hero-image" />
      </Section>
    );
  }
}

ExploringStarClusters.propTypes = {
  id: PropTypes.number,
  layout: PropTypes.string,
  dividers: PropTypes.bool,
  paginationLocation: PropTypes.number,
};

export default ExploringStarClusters;
