import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';

class CopyWithHero extends React.PureComponent {
  render() {
    const { children, sectionTitle, heroImage, heroAltText } = this.props;

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">{sectionTitle}</h2>
          {children}
        </section>
        <img src={heroImage} alt={heroAltText} className="hero-image" />
      </Section>
    );
  }
}

CopyWithHero.propTypes = {
  children: PropTypes.node,
  sectionTitle: PropTypes.string,
  heroImage: PropTypes.element,
  heroAltText: PropTypes.element,
  scrollable: PropTypes.number,
};

export default CopyWithHero;
