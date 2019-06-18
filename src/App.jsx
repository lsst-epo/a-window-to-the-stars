import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Link, HashRouter as Router } from 'react-router-dom';
import ScatterPlot from './components/scatter-plot';
import Histogram from './components/histogram';
import stars from './assets/static-data/stars.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <header className="header-primary">
          <h1>Stellar Graphs</h1>
          <nav className="nav-primary">
            <ul>
              <li>
                <Link to="/">H-R Diagram</Link>
              </li>
              <li>
                <Link to="/temperature">Temperature Histogram</Link>
              </li>
              <li>
                <Link to="/luminosity">Luminosity Histogram</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Route
            exact
            path="/"
            render={routeProps => (
              <ScatterPlot
                {...routeProps}
                width={window.innerWidth}
                height={window.innerHeight - 100}
                padding={80}
                data={stars}
                xValueAccessor="teff"
                yValueAccessor="luminosity"
                xAxisLabel="Temperature (K)"
                yAxisLabel="Luminosity"
              />
            )}
          />
          <Route
            exact
            path="/temperature"
            render={routeProps => (
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
            )}
          />
          <Route
            exact
            path="/luminosity"
            render={routeProps => (
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
            )}
          />
        </main>
      </Router>
    );
  }
}

export default hot(App);
