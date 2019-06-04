import React from 'react';
import PropTypes from 'prop-types';
import * as d3Base from 'd3';
import * as d3Lasso from 'd3-lasso';

const d3 = Object.assign(d3Base, { d3Lasso });

class ScatterPlot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.svgEl = React.createRef();
  }

  componentDidMount() {
    this.updateScatterPlot();
  }

  componentDidUpdate() {
    this.updateScatterPlot();
  }

  updateScatterPlot() {
    const { width, height } = this.props;
    const xRange = d3.scaleLinear().range([0, width]);
    const yRange = d3.scaleLinear().range([height, 0]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const xAxis = d3.axisBottom(xRange);
    const yAxis = d3.axisLeft(yRange);

    const svg = d3
      .select(this.svgEl.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');

    // add the tooltip area to the webpage
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // Initialize lasso
    const lassoSelector = d3.d3Lasso.lasso();

    // Lasso functions to execute while lassoing
    const lassoStart = () =>
      lassoSelector
        .items()
        .transition()
        .attr('rx', 0)
        .attr('ry', 0)
        .attr('height', 8)
        .attr('width', 8)
        .style('fill', null) // clear all of the fills
        .classed({ not_possible: true,
            selected: false, }); // style as not possible

    const lassoDraw = () => {
      // Style the possible dots
      lassoSelector
        .items()
        .filter(d => {
          return d.possible === true;
        })
        .classed({ not_possible: false, possible: true });

      // Style the not possible dot
      lassoSelector
        .items()
        .filter(d => {
          return d.possible === false;
        })
        .classed({ not_possible: true, possible: false });
    };

    const lassoEnd = () => {
      // Reset the color of all dots
      lassoSelector.items().style('fill', d => {
        return color(d.species);
      });

      // Style the selected dots
      lassoSelector
        .items()
        .filter(d => {
          return d.selected === true;
        })
        .classed({ not_possible: false, possible: false })
        .transition()
        .attr('rx', 8)
        .attr('ry', 8)
        .attr('height', 16)
        .attr('width', 16);

      // Reset the style of the not selected dots
      lassoSelector
        .items()
        .filter(d => {
          return d.selected === false;
        })
        .classed({ not_possible: false, possible: false })
        .transition()
        .attr('rx', 0)
        .attr('ry', 0)
        .attr('height', 8)
        .attr('width', 8);
    };

    // Create the area where the lasso event can be triggered
    const lassoArea = svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('opacity', 0);

    // Configure the lasso
    lassoSelector
      .closePathDistance(75) // max distance for the lasso loop to be closed
      .closePathSelect(true) // can items be selected by closing the path?
      .hoverSelect(true) // can items by selected by hovering over them?
      .area(lassoArea) // area where the lasso can be started
      .on('start', lassoStart) // lasso start function
      .on('draw', lassoDraw) // lasso draw function
      .on('end', lassoEnd); // lasso end function

    // Init the lasso on the svg:g that contains the dots
    svg.call(lassoSelector);

    d3.tsv('assets/static-data/scatter-lasso.tsv', (error, data) => {
      // console.log(data);
      data.forEach(d => {
        d.sepalLength = +d.sepalLength;
        d.sepalWidth = +d.sepalWidth;
      });

      xRange
        .domain(
          d3.extent(data, d => {
            return d.sepalWidth;
          }),
        )
        .nice();

      yRange
        .domain(
          d3.extent(data, d => {
            return d.sepalLength;
          }),
        )
        .nice();

      svg
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .append('text')
        .attr('class', 'label')
        .attr('x', width)
        .attr('y', -6)
        .style('text-anchor', 'end')
        .text('Sepal Width (cm)');

      svg
        .append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('class', 'label')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Sepal Length (cm)');

      svg
        .selectAll('.dot')
        .data(data)
        .enter()
        .append('rect')
        .attr('id', (d, i) => {
          return 'dot_' + i;
        }) // added
        .attr('class', 'dot')
        .attr('height', 8)
        .attr('width', 8)
        .attr('x', d => {
          return d.sepalWidth;
        })
        .attr('y', d => {
          return d.sepalLength;
        })
        .style('fill', d => {
          return color(d.species);
        })
        .on('mouseover', d => {
          tooltip
            .transition()
            .duration(200)
            .style('opacity', 0.9);

          tooltip
            .html('I am a tool tip.</br>' + d.species)
            .style('left', d3.event.pageX + 5 + 'px')
            .style('top', d3.event.pageY - 28 + 'px');

          d3.select(this)
            .transition()
            .duration(400)
            .attr('rx', 8)
            .attr('ry', 8)
            .attr('height', 16)
            .attr('width', 16);
        })
        .on('mouseout', () => {
          tooltip
            .transition()
            .duration(400)
            .style('opacity', 0);

          d3.select(this)
            .transition()
            .duration(1000)
            .attr('rx', 0)
            .attr('ry', 0)
            .attr('height', 8)
            .attr('width', 8);
        });

      lassoSelector.items(d3.selectAll('.dot'));

      const legend = svg
        .selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => {
          return 'translate(0,' + i * 20 + ')';
        });

      legend
        .append('rect')
        .attr('x', width - 18)
        .attr('width', 18)
        .attr('height', 18)
        .style('fill', color);

      legend
        .append('text')
        .attr('x', width - 24)
        .attr('y', 9)
        .attr('dy', '.35em')
        .style('text-anchor', 'end')
        .text(d => {
          return d;
        });
    });
  }

  render() {
    const { width, height } = this.props;

    return (
      <div>
        <svg width={width} height={height} ref={this.svgEl} />
      </div>
    );
  }
}

ScatterPlot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  // data: PropTypes.any,
};

export default ScatterPlot;
