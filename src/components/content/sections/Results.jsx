import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import isEmpty from 'lodash/isEmpty';
import Button from 'react-md/lib/Buttons/Button';
import { formatValue } from '../../../lib/utilities.js';
import Page from '../../site/Page';
import ScatterPlot from '../../scatter-plot';
import ArrowLeft from '../../site/icons/ArrowLeft';

class Results extends React.PureComponent {
  static defaultProps = {
    next: '/',
    nextText: 'Finish',
    previousText: 'Back',
    order: range(1, 14),
  };

  renderAccordionQA(index, question, answer) {
    const { answerPre: pre, answerAccessor: accessor, label } = question;
    const count = index + 1;

    return (
      <div className="qa">
        <div className="question">
          <span>{count}. </span>
          {label}
        </div>
        {!isEmpty(answer) ? (
          <p className="answer">
            {pre && <span className="answer-pre">{pre} </span>}

            {accessor === 'temperature' && (
              <React.Fragment>
                <span className="answer-content">
                  {formatValue(answer.content, 0)}
                </span>
                <span className="unit"> K</span>
              </React.Fragment>
            )}
            {accessor === 'luminosity' && (
              <React.Fragment>
                <span className="answer-content">
                  {formatValue(answer.content, 3)}
                </span>
                <sub className="unit">&#8857;</sub>
              </React.Fragment>
            )}
            {accessor === 'count' && (
              <span className="unit">
                {parseInt(answer.content, 10) > 1 ? 'stars' : 'star'}
              </span>
            )}
          </p>
        ) : (
          <p className="answer">No answer provided</p>
        )}
      </div>
    );
  }

  renderPromptQA(index, question, answer) {
    const { answerPre: pre } = question;
    const count = index + 1;

    return (
      <div className="qa">
        <div className="question">
          <span>{count}. </span>
          {pre}
        </div>
        {!isEmpty(answer) ? (
          <div className="answer graph">
            <ScatterPlot
              data={answer.data}
              xValueAccessor="temperature"
              yValueAccessor="luminosity"
              xAxisLabel="Temperature (K)"
              yAxisLabel="Solar Luminosity"
              preSelected
            />
          </div>
        ) : (
          <p className="answer">No answer provided</p>
        )}
      </div>
    );
  }

  renderTextQA(index, question, answer) {
    const { label } = question;
    const count = index + 1;

    return (
      <div className="qa">
        <div className="question">
          <span>{count}. </span>
          {label}
        </div>
        {!isEmpty(answer) ? (
          <div className="answer">{answer.content}</div>
        ) : (
          <p className="answer">No answer provided</p>
        )}
      </div>
    );
  }

  renderQA(index, question, answer) {
    const { type } = question;

    if (type === 'accordion') {
      return this.renderAccordionQA(index, question, answer);
    }

    if (type === 'prompt') {
      return this.renderPromptQA(index, question, answer);
    }

    if (type === 'text' || type === 'textArea') {
      return this.renderTextQA(index, question, answer);
    }

    return (
      <div className="qa">
        <div className="question">{JSON.stringify(question)}</div>
        {!isEmpty(answer) ? (
          <p className="answer">{JSON.stringify(answer)}</p>
        ) : (
          <p className="answer">No answer provided</p>
        )}
      </div>
    );
  }

  renderQAs(order, questions, answers) {
    return (
      <ul className="results qas">
        {order.map((id, index) => {
          const question = questions[id];
          const answer = answers[id];

          return (
            <li key={`qa-${id}`} className="result">
              {this.renderQA(index, question, answer)}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const {
      id,
      previous,
      previousText,
      next,
      nextText,
      questions = {},
      answers = {},
      order,
      handleFinish,
    } = this.props;

    return (
      <Route
        exact
        path={`/${id}`}
        render={routeProps => (
          <Page {...routeProps}>
            <section>
              <h1 className="section-title">Results</h1>
              {questions &&
                answers &&
                this.renderQAs(order, questions, answers)}
            </section>
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
                to={next}
                component={Link}
                onClick={handleFinish}
              >
                {nextText}
              </Button>
            </nav>
          </Page>
        )}
      />
    );
  }
}

Results.propTypes = {
  id: PropTypes.number,
  questions: PropTypes.object,
  answers: PropTypes.object,
  next: PropTypes.string,
  nextText: PropTypes.string,
  previous: PropTypes.string,
  previousText: PropTypes.string,
  order: PropTypes.array,
  handleFinish: PropTypes.func,
};

export default Results;
