import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import { withData } from '../containers/WithData';
import Section from './Section';
import Select from '../../site/forms/Select';
import ScatterPlot from '../../scatter-plot';
import Histogram from '../../histogram';
import QuestionsAnswers from '../../questions/TextInputs';

@reactn
class ComparingStarProperties extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeGraph: 0,
    };
  }

  // componentDidUpdate() {
  //   console.log(this.props.clusterData[0]);
  // }

  selectItems(clusters) {
    return clusters.map((cluster, i) => {
      return { label: cluster.name, value: i };
    });
  }

  onGraphSelect = e => {
    const { value } = e.target;

    this.setState(prevState => ({
      ...prevState,
      activeGraph: parseInt(value, 10),
    }));
  };

  updateAnswer = (id, value) => {
    const { answers: prevAnswers } = this.global;
    const prevAnswer = { ...prevAnswers[id] };
    const content = value || '';

    this.setGlobal(prevGlobal => ({
      ...prevGlobal,
      answers: {
        ...prevAnswers,
        [id]: {
          ...prevAnswer,
          id,
          content,
        },
      },
    }));
  };

  render() {
    const { clusterData, questions, xDomain, yDomain } = this.props;
    const { activeGraph } = this.state;
    const { answers } = this.global;

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">Comparing Star Temperatures</h2>
          <p>
            Use the tabs above the graph to switch between your H-R Diagram and
            the Temperature Histogram.{' '}
            <span className="copy-secondary">
              Note: The Sun <span>SUN ICON</span> has been added to your H-R
              Diagram.
            </span>
          </p>
          <hr className="divider-horizontal" />
          {questions && (
            <QuestionsAnswers
              questions={questions}
              answers={answers}
              handleChange={this.updateAnswer}
            />
          )}
        </section>
        <div className="container-flex direction-column">
          <Select
            className="graph-selector"
            options={[
              { label: 'H-R Diagram', value: 0 },
              { label: 'Temperature Histogram', value: 1 },
            ]}
            label="Graph Selector"
            name="Graph Selector"
            handleChange={this.onGraphSelect}
          />
          <div className="container-graphs">
            {activeGraph === 0 && (
              <ScatterPlot
                data={clusterData}
                xDomain={xDomain}
                yDomain={yDomain}
                xValueAccessor="temperature"
                yValueAccessor="luminosity"
                xAxisLabel="Temperature (K)"
                yAxisLabel="Solar Luminosity"
              />
            )}
            {activeGraph === 1 && (
              <Histogram
                data={clusterData}
                valueAccessor="temperature"
                xAxisLabel="Temperature (K)"
              />
            )}
          </div>
        </div>
      </Section>
    );
  }
}

ComparingStarProperties.propTypes = {
  clusterData: PropTypes.array,
  questionsRange: PropTypes.array,
  questions: PropTypes.array,
  getActiveId: PropTypes.func,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
};

export default withData(ComparingStarProperties, 'is_member');
