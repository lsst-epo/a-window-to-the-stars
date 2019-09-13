import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Button from 'react-md/lib/Buttons/Button';
import ArrowLeft from '../../site/icons/ArrowLeft';
import ArrowRight from '../../site/icons/ArrowRight';
import API from '../../site/API';
import ScatterPlot from '../../scatter-plot';

class CombiningHRD extends React.Component {
  static defaultProps = {
    previousText: 'Back',
    nextText: 'Continue',
  };

  constructor(props) {
    super(props);

    this.state = {
      clusterAData: [],
      clusterBData: [],
      combined: false,
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

  handleCombine = () => {
    const { combined } = this.state;

    if (!combined) {
      this.setState(prevState => ({
        ...prevState,
        combined: true,
      }));
    }
  };

  render() {
    const { combined } = this.state;
    const {
      id,
      clusters,
      previous,
      previousText,
      next,
      nextText,
      regions,
    } = this.props;

    const absColClasses = classnames(
      `col col-absolute padded col-width-50 revealable`,
      {
        combined,
      }
    );

    const navClasses = classnames(`nav-secondary`, {
      combined,
    });

    return (
      <React.Fragment>
        <section>
          <h2 className="section-title">
            Combining H-R Diagrams: Cluster {clusters[0].name} & Cluster{' '}
            {clusters[1].name}
          </h2>
          <p>
            Not all star clusters contain stars at every stage of their
            evolution. Textbook H-R Diagrams are made by combining data from
            many different types of stars, but all these stars usually belong to
            several clusters of different ages.
          </p>
          <p>
            To get a more complete H-R Diagram, combine the Star Cluster H-R
            Diagrams from the previous section.
          </p>
          <br />
          <Button
            flat
            secondary
            swapTheming
            disabled={combined}
            onClick={this.handleCombine}
          >
            Combine {clusters[0].name} & {clusters[1].name}
          </Button>
        </section>
        <hr className="divider-horizontal" />
        <div className="container-flex spaced">
          <div className={absColClasses}>
            <p>
              As you can see in your combined H-R diagram, stars are not equally
              distributed in temperature or in luminosity. Some values are more
              common, but it is difficult to visually estimate how many stars of
              each type there are just from looking at the H-R Diagram.
            </p>
            <p>
              Histograms are a great tool for examining the distribution of star
              properties. Let’s see how this works with temperatures of stars.
            </p>
            <br />
            <nav role="navigation" className="nav-secondary">
              <Button
                flat
                primary
                swapTheming
                to={previous || `/${parseInt(id, 10) - 1}`}
                component={Link}
                iconEl={<ArrowLeft />}
                iconBefore
              >
                {previousText}
              </Button>
              <Button
                flat
                primary
                swapTheming
                to={next || `/${parseInt(id, 10) + 1}`}
                component={Link}
                iconEl={<ArrowRight />}
                iconBefore={false}
              >
                {nextText}
              </Button>
            </nav>
          </div>
          {clusters.map((cluster, i) => {
            const { name, key, xDomain, yDomain } = cluster;
            const { [key]: clusterData } = this.state;

            const colClasses = classnames(
              `col col-${i + 1} padded col-width-50 ${
                i === 0 ? 'mergable' : ''
              }`,
              {
                combined,
              }
            );

            const nameClasses = classnames('cluster-name', {
              combined,
            });

            return (
              <div key={name} className={colClasses}>
                <h2 className={nameClasses}>{name}</h2>
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
              </div>
            );
          })}
        </div>
        <br />
        <nav role="navigation" className={navClasses}>
          <Button
            flat
            primary
            swapTheming
            to={previous || `/${parseInt(id, 10) - 1}`}
            component={Link}
            iconEl={<ArrowLeft />}
            iconBefore
          >
            {previousText}
          </Button>
          <Button
            flat
            primary
            swapTheming
            to={next || `/${parseInt(id, 10) + 1}`}
            component={Link}
            iconEl={<ArrowRight />}
            iconBefore={false}
          >
            {nextText}
          </Button>
        </nav>
      </React.Fragment>
    );
  }
}

CombiningHRD.propTypes = {
  id: PropTypes.number,
  clusters: PropTypes.array,
  next: PropTypes.string,
  previous: PropTypes.string,
  previousText: PropTypes.string,
  nextText: PropTypes.string,
  regions: PropTypes.array,
};

export default CombiningHRD;
