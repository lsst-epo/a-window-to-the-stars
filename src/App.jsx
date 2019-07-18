import React, { Component } from 'react';
import reactn from 'reactn';
import { hot } from 'react-hot-loader/root';
import { Route, HashRouter as Router } from 'react-router-dom';
import SiteHeader from './components/site/SiteHeader';
import Sections from './components/content/sections';
import StyleGuide from './StyleGuide';
// import Histogram from './components/histogram';

@reactn
class App extends Component {
  render() {
    return (
      <Router>
        <SiteHeader />
        <main className="container-main">
          {/* <Route path="/" component={Sections} /> */}
          <Sections />
          {/* <Route
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
                  dataPath="static-data/stars.json"
                  width={window.innerWidth}
                  height={window.innerHeight - 100}
                  padding={80}
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
                  dataPath="static-data/stars.json"
                  width={window.innerWidth}
                  height={window.innerHeight - 100}
                  padding={80}
                  valueAccessor="luminosity"
                  xAxisLabel="Luminosity"
                  yAxisLabel="Count"
                />
              </Page>
            )}
          /> */}
          <Route exact path="/styles" component={StyleGuide} />
        </main>
      </Router>
    );
  }
}

export default hot(App);
