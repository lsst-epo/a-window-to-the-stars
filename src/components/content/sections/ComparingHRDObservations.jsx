import React from 'react';
import PropTypes from 'prop-types';
import { WithAnswerHandlers } from '../containers/WithAnswerHandlers';
import { WithActiveQuestions } from '../containers/WithActiveQuestions';
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

  selectItems(clusters) {
    return clusters.map((cluster, i) => {
      return { label: `Cluster ${cluster.name}`, value: i };
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
      activeId,
      answerHandler,
      setActive,
      advanceActive,
      tableAnswerIds,
      tableRowTitles,
      tableHeaders,
    } = this.props;
    const { activeScatter } = this.state;

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
            answerIds={tableAnswerIds}
            rowTitles={tableRowTitles}
            colTitles={tableHeaders}
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
  tableAnswerIds: PropTypes.array,
  tableAnswersRanges: PropTypes.array,
  tableHeaders: PropTypes.array,
  tableRowTitles: PropTypes.array,
};

export default WithAnswerHandlers(
  WithActiveQuestions(ComparingHRDObservations)
);
