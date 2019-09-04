import React from 'react';

function MassesCopy() {
  return (
    <React.Fragment>
      <p>
        The mass of a main sequence star establishes its rate of fusion. More
        massive stars have stronger gravity, and therefore require higher rates
        of fusion to avoid collapse. The hot gas pressure from fusion reactions
        in turn determines other factors, such as the star’s size, luminosity,
        and surface temperature.
      </p>
      <p>
        Although we cannot directly measure the mass of most stars, astronomers
        have derived equations that relate the luminosity of a star to its mass.
        In the equation below, the symbols L<sub>&#8857;</sub> and M
        <sub>&#8857;</sub> are the symbols for the luminosity and mass of the
        Sun.
      </p>
      <p>
        <b>Important note</b>: These equations can only predict the masses of
        stars on the main sequence.
      </p>
      <div className="equation-flex">
        <div className="equation-container padded">
          <b className="equation">
            <div className="container-flex centered">
              <span className="fraction">
                <span className="numerator">L</span>
                <span className="denominator">
                  L<sub>&#8857;</sub>
                </span>
              </span>
              <span>&nbsp;&asymp;&nbsp;</span>
              <span>0.23&nbsp;</span>
              <span>
                <span className="parenthetical">
                  <span className="fraction">
                    <span className="numerator">M</span>
                    <span className="denominator">
                      M<sub>&#8857;</sub>
                    </span>
                  </span>
                </span>
                <sup>&nbsp;2.3</sup>
              </span>
            </div>
          </b>
        </div>
        <div className="equation-container padded">
          <b className="equation">
            (M &lt; 0.43M<sub>&#8857;</sub>)
          </b>
        </div>
      </div>
      <div className="equation-flex">
        <div className="equation-container padded">
          <b className="equation">
            <div className="container-flex centered">
              <span className="fraction">
                <span className="numerator">L</span>
                <span className="denominator">
                  L<sub>&#8857;</sub>
                </span>
              </span>
              <span>&nbsp;=&nbsp;</span>
              <span>
                <span className="parenthetical">
                  <span className="fraction">
                    <span className="numerator">M</span>
                    <span className="denominator">
                      M<sub>&#8857;</sub>
                    </span>
                  </span>
                </span>
                <sup>&nbsp;4</sup>
              </span>
            </div>
          </b>
        </div>
        <div className="equation-container padded">
          <b className="equation">
            (0.43M<sub>&#8857;</sub> &lt; M &lt; 2M<sub>&#8857;</sub>)
          </b>
        </div>
      </div>
      <div className="equation-flex">
        <div className="equation-container padded">
          <b className="equation">
            <div className="container-flex centered">
              <span className="fraction">
                <span className="numerator">L</span>
                <span className="denominator">
                  L<sub>&#8857;</sub>
                </span>
              </span>
              <span>&nbsp;&asymp;&nbsp;</span>
              <span>1.5&nbsp;</span>
              <span>
                <span className="parenthetical">
                  <span className="fraction">
                    <span className="numerator">M</span>
                    <span className="denominator">
                      M<sub>&#8857;</sub>
                    </span>
                  </span>
                </span>
                <sup>&nbsp;3.5</sup>
              </span>
            </div>
          </b>
        </div>
        <div className="equation-container padded">
          <b className="equation">
            (2M<sub>&#8857;</sub> &lt; M &lt; 20M<sub>&#8857;</sub>)
          </b>
        </div>
      </div>
      <div className="equation-flex">
        <div className="equation-container padded">
          <b className="equation">
            <div className="container-flex centered">
              <span className="fraction">
                <span className="numerator">L</span>
                <span className="denominator">
                  L<sub>&#8857;</sub>
                </span>
              </span>
              <span>&nbsp;&asymp;&nbsp;</span>
              <span>3200&nbsp;</span>
              <span className="fraction">
                <span className="numerator">M</span>
                <span className="denominator">
                  M<sub>&#8857;</sub>
                </span>
              </span>
            </div>
          </b>
        </div>
        <div className="equation-container padded">
          <b className="equation">
            (M &gt; 20M<sub>&#8857;</sub>)
          </b>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MassesCopy;
