import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
// import HelloWorld from './components/hello-world';
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
      <main>
        <h1
          style={{
            position: 'absolute',
            left: '10%',
            top: '20px',
          }}
        >
          Stellar Graphs
        </h1>
        <Histogram
          width={window.innerWidth}
          height={window.innerHeight}
          padding={80}
          data={stars}
          valueAccessor="teff"
          xAxisLabel="Temperature (K)"
          yAxisLabel="Count"
        />
        <Histogram
          width={window.innerWidth}
          height={window.innerHeight}
          padding={80}
          data={stars}
          valueAccessor="luminosity"
          xAxisLabel="Luminosity"
          yAxisLabel="Count"
        />
        <ScatterPlot
          width={window.innerWidth}
          height={window.innerHeight}
          padding={80}
          data={stars}
          xValueAccessor="teff"
          yValueAccessor="luminosity"
          xAxisLabel="Temperature (K)"
          yAxisLabel="Luminosity"
        />
      </main>
    );
  }
}

export default hot(App);
