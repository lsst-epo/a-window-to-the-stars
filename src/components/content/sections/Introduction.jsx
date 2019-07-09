import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import placeholder from '../../../assets/images/placeholder.jpg';

class Introduction extends React.PureComponent {
  render() {
    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">Introduction</h2>
          <p>
            From the moment of its birth, a star is engaged in an internal,
            unrelenting struggle. Crushing gravitational forces press inward,
            opposing the outward push of hot gas generated by nuclear fusion
            deep in the core. For most of a star’s lifetime these two forces are
            equally balanced, but at certain moments one force gets stronger or
            weaker, causing profound changes in the star.
          </p>
          <p>
            In order to accurately compare stars to each other and measure their
            properties, we need a way to account for their different distances
            from Earth, since two stars of the same intrinsic brightness will
            look very different if one is farther away from Earth than the
            other. There’s no way to figure out the distance to each star by
            looking at an image (or the real stars in the night sky), but one
            way we can make sure we are comparing stars accurately is by working
            with data from a group of stars in a star cluster. All the stars in
            a cluster are the same distance away from Earth, and they formed at
            about the same time, which means they’re the same age.
          </p>
          <p>
            You will work with several star clusters in order to determine the
            range of star properties, and then you’ll compare those stars to the
            Sun to see how our local star matches up to other types of stars in
            our galaxy.
          </p>
          <h3 className="list-title">Essential Questions</h3>
          <ol>
            <li>
              How can an H-R Diagram be used to estimate the ranges of star
              properties (temperatures, sizes, masses, lifetimes, and energy
              outputs)?
            </li>
            <li>
              What are the properties of the most common star type observed in
              our galaxy?
            </li>
            <li>
              Is the Sun an average star? Is it the most common kind of star?
            </li>
          </ol>
        </section>
        <img src={placeholder} alt="Star Field" className="hero-image" />
      </Section>
    );
  }
}

Introduction.propTypes = {
  id: PropTypes.number,
  layout: PropTypes.string,
  dividers: PropTypes.bool,
  paginationLocation: PropTypes.number,
};

export default Introduction;