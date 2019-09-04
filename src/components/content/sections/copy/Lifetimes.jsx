import React from 'react';

function LifetimesCopy() {
  return (
    <React.Fragment>
      <p>
        Stars spend about 90% of their lifetimes as main sequence stars. The
        main sequence mass of a star is used to calculate its main sequence
        lifetime. This lifetime is not the age of the star in years, it is a
        predicted time for how long the star will exist as a stable main
        sequence star with balanced forces.
      </p>
      <p>
        The lifetime of a star depends on two factors: how much hydrogen is
        available for nuclear fusion, and the rate at which fusion is
        proceeding. The cores of high mass stars experience a much greater
        gravitational force than the cores of low mass stars. As a result,
        temperature and fusion rates are much higher in the cores of high mass
        stars.
      </p>
      <p>
        The main sequence lifetime of a star can be estimated by this
        relationship:
      </p>
      <div className="equation-container">
        <b className="equation">
          <div className="container-flex centered">
            <span>
              <span>
                T<sub>ms</sub>
              </span>
              <span>&nbsp;&asymp;&nbsp;</span>
              <span>
                10<sup>10</sup>&nbsp;x&nbsp;
              </span>
            </span>
            <span>
              <span className="parenthetical">
                <span className="fraction">
                  <span className="numerator">
                    m<sub>Sun</sub>
                  </span>
                  <span className="denominator">
                    m<sub>star</sub>
                  </span>
                </span>
              </span>
              <sup>&nbsp;3</sup>
            </span>
          </div>
        </b>
      </div>
      <p>
        <span>
          m<sub>Sun</sub>
        </span>
        &nbsp;and&nbsp;
        <span>
          m<sub>star</sub>
        </span>
        &nbsp;represent the respective masses of the Sun and the other star, and
        T<sub>ms</sub> is the star’s main sequence lifetime in years.
      </p>
    </React.Fragment>
  );
}

export default LifetimesCopy;
