import React from 'react';
import PropTypes from 'prop-types';
import { WithAnswerHandlers } from '../containers/WithAnswerHandlers';
import { WithActiveQuestions } from '../containers/WithActiveQuestions';
import { WithGraphToggler } from '../containers/WithGraphToggler';
import API from '../../site/API';
import Section from './Section';
import Select from '../../site/forms/Select';
import ScatterPlot from '../../scatter-plot';
import ObservationsTable from '../../charts/shared/ObservationsTable';
import QAs from '../../qas';

class ComparingHRDObservations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clusterAData: [],
      clusterBData: [],
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

  selectItems(clusters) {
    return clusters.map((cluster, i) => {
      return { label: `Cluster ${cluster.name}`, value: i };
    });
  }

  render() {
    const {
      clusters,
      questions,
      answers,
      activeId,
      answerHandler,
      setActive,
      advanceActive,
      tableCells,
      tableRowTitles,
      tableHeaders,
      graphSelectHandler,
      activeGraph,
      regions,
    } = this.props;

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">
            Comparing Star Cluster {clusters[0].name} & Star Cluster{' '}
            {clusters[1].name}
          </h2>
          <p>
            Now compare Star Cluster {clusters[0].name} and Star Cluster{' '}
            {clusters[1].name}. The table shows your observations of both
            cluters.
          </p>
          <br />
          <hr className="divider-horizontal" />
          <ObservationsTable
            answers={answers}
            cells={tableCells}
            rowTitles={tableRowTitles}
            colTitles={tableHeaders}
          />
          <hr className="divider-horizontal" />
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
            handleChange={graphSelectHandler}
          />
          {clusters.map((cluster, i) => {
            if (activeGraph !== i) return null;
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
                  regions={regions}
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
  tableCells: PropTypes.array,
  tableHeaders: PropTypes.array,
  tableRowTitles: PropTypes.array,
  activeGraph: PropTypes.number,
  graphSelectHandler: PropTypes.func,
  regions: PropTypes.array,
};

export default WithGraphToggler(
  WithAnswerHandlers(WithActiveQuestions(ComparingHRDObservations))
);
