import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, HashRouter as Router } from 'react-router-dom';
// import stars from './assets/static-data/stars.json';
import SiteHeader from './components/site/SiteHeader';
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
    const { stars } = this.state;
    return (
      <Router>
        <SiteHeader />
        <main className="container-main">
          <Route
            exact
            path="/"
            render={routeProps => (
              <Page
                {...routeProps}
                title="H-R Diagram"
                next="/temperature"
                layout="two-col"
                paginationLocation={1}
              >
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus euismod nulla nunc, eu mattis velit sollicitudin ut.
                  Ut rhoncus sapien id ultrices gravida. Maecenas interdum, quam
                  ut commodo consectetur, orci magna lacinia nunc, sed sodales
                  est eros vitae enim. Proin ut hendrerit eros, a rhoncus dui.
                  Pellentesque porttitor blandit aliquet. Quisque pellentesque
                  nisi eget leo convallis, a porttitor odio viverra. Suspendisse
                  ut ante ac magna mollis dignissim maximus eu lacus. Etiam
                  augue nisl, mollis a imperdiet nec, molestie ac tortor. Sed
                  sit amet elementum erat. Praesent ligula ex, tempus id tempus
                  id, commodo quis diam. Quisque mollis egestas urna, non
                  pharetra felis mattis a. Praesent suscipit aliquam risus at
                  mollis. Etiam metus est, dignissim sed velit in, posuere
                  condimentum ipsum. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Sed in magna pellentesque, feugiat diam non,
                  euismod nibh. Donec dictum eros nec mi vulputate, ac pharetra
                  eros posuere. In sodales est vel semper volutpat. Vivamus
                  auctor sem erat, ut bibendum nibh pharetra sed. Nam vehicula
                  mauris et porttitor ultrices. Fusce et libero gravida, ornare
                  leo ut, vehicula turpis. Vestibulum id leo dolor. Sed lobortis
                  finibus augue, eu tempus purus bibendum sit amet. Ut eget
                  sollicitudin nisl. Nulla nec lectus et sem lobortis imperdiet.
                  Praesent tristique tortor ac magna aliquam pulvinar. Donec
                  pretium congue magna vel consectetur. Aliquam id eros eu purus
                  molestie vulputate blandit at augue. Ut consequat et magna eu
                  pretium. Proin suscipit metus mauris, sit amet consectetur
                  diam porttitor quis. Praesent scelerisque facilisis neque a
                  blandit. Mauris condimentum diam id dui pulvinar, laoreet
                  consectetur odio porta. Donec id arcu dictum, faucibus odio
                  at, ultricies magna. Cras vel arcu vitae enim efficitur
                  condimentum sed in neque. Aenean sed urna facilisis dui luctus
                  tincidunt. Sed quis ante quis sapien pretium mattis. Nunc
                  rhoncus nisi in risus suscipit, id varius est tincidunt.
                  Nullam iaculis molestie viverra.
                </div>
                <ScatterPlot
                  width={600}
                  height={600}
                  padding={80}
                  dataPath="data/stars.json"
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
                  dataPath="data/stars.json"
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
                  dataPath="data/stars.json"
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
