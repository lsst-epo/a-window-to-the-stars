import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
// import HelloWorld from './components/hello-world';
import ScatterPlot from './components/scatter-plot';
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
          H-R Diagram
        </h1>
        <ScatterPlot
          width={window.innerWidth}
          height={window.innerHeight}
          data={stars}
        />
      </main>
    );
  }
}

export default hot(App);
