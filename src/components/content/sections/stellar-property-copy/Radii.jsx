import React from 'react';

function RadiiCopy() {
  return (
    <React.Fragment>
      <p>
        The Stefan-Boltzmann equation predicts the size of a star from its
        luminosity and temperature. If we use solar luminosity units (the Sun’s
        luminosity = 1), the equation is:
      </p>
      <div className="equation-container">
        <b className="equation">
          L = R<sup>2</sup>T<sup>4</sup>
        </b>
      </div>
      <p>
        <b>L</b> is the luminosity of the star, <b>R</b> is the radius of the
        star, and <b>T</b> is the temperature of the star, all relative to the
        Sun. For example, a star with a temperature three times the temperature
        of the Sun has a temperature: <b>T = 3</b>.
      </p>
      <p>
        The H-R Diagram records both temperature and luminosity, so we can
        rearrange this equation to determine the size of the star:
      </p>
      <div className="equation-container">
        <b className="equation">
          R = &radic;(L/T<sup>4</sup>)
        </b>
      </div>
      <p>
        To explore how this works, consider a star with the same luminosity as
        the Sun (<b>L=1</b>) and a surface temperature that is twice as hot as
        the Sun (<b>T=2</b>
        ). Substituting these values into the equation above:
      </p>
      <div className="equation-container">
        <div className="container-flex direction-column wrap">
          <b className="equation">
            R = &radic;(1/2<sup>4</sup>)
          </b>
          <b className="equation">R = &radic;(1/16)</b>
          <b className="equation">R = &frac14;</b>
        </div>
      </div>
      <p>
        The star is considerably smaller, having a radius of only &frac14; (or
        25% of) the Sun’s radius.
      </p>
    </React.Fragment>
  );
}

export default RadiiCopy;
