import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';
import ArrowLeft from '../../site/icons/ArrowLeft';
import ArrowRight from '../../site/icons/ArrowRight';
import { WithProgress } from '../containers/WithProgress';

class ProgressCheckIn extends React.PureComponent {
  renderProgressMessage(progress) {
    if (progress < 50) {
      return <span>you&apos;re well on your way!</span>;
    }

    if (progress > 75) {
      return <span>you&apos;re almost done!</span>;
    }

    if (progress > 50) {
      return <span>you&apos;re more than halfway there!</span>;
    }

    return <span>you&apos;re doing great!</span>;
  }

  render() {
    const { match, pageProgress } = this.props;
    const { id } = match.params;

    return (
      <div className="container-page">
        <section className="container-flex direction-column centered spaced">
          <h2 className="section-title">
            Congratulations, {this.renderProgressMessage(pageProgress)}
          </h2>
          <p>You&apos;re learning so much! Keep it up!</p>
          <br />
          <div className="progress-donut-container">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 42 42"
              className="donut progress-donut"
            >
              <circle
                className="donut-ring"
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                strokeWidth="6"
              />
              <circle
                className="donut-segment"
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                strokeWidth="6"
                strokeDasharray={`${pageProgress} ${100 - pageProgress}`}
                strokeDashoffset="25"
              />
              <g className="donut-text" textAnchor="middle">
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  className="donut-number"
                >
                  {pageProgress}%
                </text>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  className="donut-label"
                >
                  Complete
                </text>
              </g>
            </svg>
          </div>
          <br />
          <nav role="navigation" className="nav-secondary">
            <Button
              flat
              primary
              swapTheming
              to={`/${parseInt(id, 10)}`}
              component={Link}
              iconEl={<ArrowLeft />}
              iconBefore
            >
              Back
            </Button>
            <Button
              flat
              primary
              swapTheming
              to={`/${parseInt(id, 10) + 1}`}
              component={Link}
              iconEl={<ArrowRight />}
              iconBefore={false}
            >
              Continue
            </Button>
          </nav>
        </section>
      </div>
    );
  }
}

ProgressCheckIn.propTypes = {
  match: PropTypes.object,
  // investigationProgress: PropTypes.number,
  pageProgress: PropTypes.number,
};

export default WithProgress(ProgressCheckIn);
