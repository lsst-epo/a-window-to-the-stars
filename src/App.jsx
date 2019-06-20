import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Link, HashRouter as Router } from 'react-router-dom';
import stars from './assets/static-data/stars.json';

import Page from './components/site/Page';
import StyleGuide from './StyleGuide';
import ScatterPlot from './components/scatter-plot';
import Histogram from './components/histogram';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <header className="header-primary">
          <Link to="/">
            <h1 className="header-title heading-primary">Stellar Graphs</h1>
          </Link>
          <nav role="navigation" className="nav-primary">
            <span className="nav-item">
              <Link to="/styles">Style Guide</Link>
            </span>
            <span className="nav-item">
              <Link to="/">H-R Diagram</Link>
            </span>
            <span className="nav-item">
              <Link to="/temperature">Temperature Histogram</Link>
            </span>
            <span className="nav-item">
              <Link to="/luminosity">Luminosity Histogram</Link>
            </span>
          </nav>
        </header>
        <main className="container-main">
          <Route
            exact
            path="/"
            render={routeProps => (
              <Page {...routeProps} title="H-R Diagram" next="/temperature">
                <ScatterPlot
                  width={window.innerWidth}
                  height={window.innerHeight - 100}
                  padding={80}
                  data={stars}
                  xValueAccessor="teff"
                  yValueAccessor="luminosity"
                  xAxisLabel="Temperature (K)"
                  yAxisLabel="Luminosity"
                />
              </Page>
            )}
          />
          <Route
            exact
            path="/temperature"
            render={routeProps => (
              <Page
                {...routeProps}
                title="Temperature Histogram"
                previous="/"
                next="/luminosity"
              >
                <Histogram
                  {...routeProps}
                  width={window.innerWidth}
                  height={window.innerHeight - 100}
                  padding={80}
                  data={stars}
                  valueAccessor="teff"
                  xAxisLabel="Temperature (K)"
                  yAxisLabel="Count"
                />
              </Page>
            )}
          />
          <Route
            exact
            path="/luminosity"
            render={routeProps => (
              <Page {...routeProps} title="H-R Diagram" previous="/temperature">
                <Histogram
                  {...routeProps}
                  width={window.innerWidth}
                  height={window.innerHeight - 100}
                  padding={80}
                  data={stars}
                  valueAccessor="luminosity"
                  xAxisLabel="Luminosity"
                  yAxisLabel="Count"
                />
              </Page>
            )}
          />
          <Route exact path="/styles" component={StyleGuide} />
        </main>
      </Router>
    );
  }
}

export default hot(App);
