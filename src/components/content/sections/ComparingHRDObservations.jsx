import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { formatValue } from '../../../lib/utilities.js';
import { WithAnswerHandlers } from '../containers/WithAnswerHandlers';
import { WithActiveQuestions } from '../containers/WithActiveQuestions';
import API from '../../site/API';
import Section from './Section';
import Table from '../../site/forms/Table';
import Select from '../../site/forms/Select';
import ScatterPlot from '../../scatter-plot';
import QAs from '../../qas';

@reactn
class ComparingHRDObservations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clusterAData: [],
      clusterBData: [],
      activeScatter: 0,
    };
  }

  componentDidMount() {
    const { clusters } = this.props;

    clusters.forEach(cluster => {
      const { path, key } = cluster;
      API.get(path).then(res => {
        const clusterData = res.data.stars.filter(datum => {
          return !!datum.is_member;
        });

        this.setState(prevState => ({
          ...prevState,
          [key]: clusterData,
        }));
      });
    });
  }

  tableHeaders(clusters) {
    const cells = [''];

    clusters.forEach(cluster => {
      cells.push(cluster.name);
    });
    return cells;
  }

  tableValues(answers, tableAnswersRanges) {
    const cells = [
      ['Main Sequence Temperature Range'],
      ['Total Giant Stars'],
      ['Total White Dwarf Stars'],
    ];

    tableAnswersRanges.forEach(range => {
      const a1 = range[0];
      const a2 = range[1];
      const a3 = range[2];
      const a4 = range[3];

      if (!isEmpty(answers[a1]) && !isEmpty(answers[a2])) {
        cells[0].push(
          `${formatValue(answers[a1].content, 0)} K  -  ${formatValue(
            answers[a2].content,
            0
          )} K`
        );
      } else {
        cells[0].push('');
      }

      if (!isEmpty(answers[a3])) {
        cells[1].push(answers[a3].content);
      } else {
        cells[1].push('');
      }

      if (!isEmpty(answers[a4])) {
        cells[2].push(answers[a4].content);
      } else {
        cells[2].push('');
      }
    });

    return cells;
  }

  selectItems(clusters) {
    return clusters.map((cluster, i) => {
      return { label: cluster.name, value: i };
    });
  }

  onClusterSelect = e => {
    const { value } = e.target;

    this.setState(prevState => ({
      ...prevState,
      activeScatter: parseInt(value, 10),
    }));
  };

  render() {
    const {
      clusters,
      questions,
      answers,
      tableAnswersRanges,
      activeId,
      answerHandler,
      setActive,
      advanceActive,
    } = this.props;
    const { activeScatter } = this.state;

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">
            Comparing {clusters[0].name} & {clusters[1].name}
          </h2>
          <p>
            Now compare {clusters[0].name} and {clusters[1].name}. The table
            shows your observations of both cluters.
          </p>
          <br />
          <hr className="divider-horizontal" />
          <Table
            colTitles={this.tableHeaders(clusters)}
            includeRowTitles
            rows={this.tableValues(answers, tableAnswersRanges)}
          />
          <hr className="divider-horizontal" />
          <div className="copy-secondary">
            Think about what is different about the main sequences of your two
            clusters.
          </div>
          {questions && (
            <QAs
              questions={questions}
              answers={answers}
              activeId={activeId}
              answerHandler={answerHandler}
              advanceActive={advanceActive}
              setActive={setActive}
            />
          )}
        </section>
        <div className="container-flex direction-column">
          <Select
            className="cluster-selector"
            options={this.selectItems(clusters)}
            label="Cluster Selector"
            name="Cluster Selector"
            handleChange={this.onClusterSelect}
          />
          {clusters.map((cluster, i) => {
            if (activeScatter !== i) return null;
            const { name, key, xDomain, yDomain } = cluster;
            const { [key]: clusterData } = this.state;
            const id = `${name}-${i}`;

            return (
              <React.Fragment key={id}>
                <ScatterPlot
                  data={clusterData}
                  xDomain={xDomain}
                  yDomain={yDomain}
                  xValueAccessor="temperature"
                  yValueAccessor="luminosity"
                  xAxisLabel="Temperature (K)"
                  yAxisLabel="Solar Luminosity"
                  preSelected
                />
              </React.Fragment>
            );
          })}
        </div>
      </Section>
    );
  }
}

ComparingHRDObservations.propTypes = {
  scatters: PropTypes.array,
  clusters: PropTypes.array,
  activeId: PropTypes.string,
  setActive: PropTypes.func,
  advanceActive: PropTypes.func,
  answerHandler: PropTypes.func,
  questions: PropTypes.array,
  answers: PropTypes.array,
  tableAnswersRanges: PropTypes.array,
};

export default WithAnswerHandlers(
  WithActiveQuestions(ComparingHRDObservations)
);
