import React from 'react';
import Section from './Section';
import placeholder from '../../../assets/images/placeholder.jpg';

class IntroMakingHRD extends React.PureComponent {
  render() {
    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">Making & Comparing H-R Diagrams</h2>
          <p>
            In the following sections you will locate the star cluster in an
            image, create an H-R Diagram from that star cluster, and then
            compare your results to an anstronomer&apos;s. You will do this
            twice, and then compare your observations of two star clusters.
          </p>
          <p className="copy-secondary">
            Note: Not all the stars you see in the image are actually stars in
            the cluster—some are much closer to Earth than the stars in the
            cluster, and some are farther away. Because of their different
            distances, these stars can provide inaccurate information on an H-R
            Diagram if plotted with the stars in the cluster, so you should
            eliminate as many of these stars from your selection as possible.
          </p>
        </section>
        <img src={placeholder} alt="Placeholder" className="hero-image" />
      </Section>
    );
  }
}

export default IntroMakingHRD;
