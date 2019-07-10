import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import isEmpty from 'lodash/isEmpty';
import Button from 'react-md/lib/Buttons/Button';
import Page from '../../site/Page';
import ArrowLeft from '../../site/icons/ArrowLeft';

class Results extends React.PureComponent {
  static defaultProps = {
    next: '1',
    nextText: 'Finish',
    previousText: 'Back',
    order: range(1, 6),
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
            <span className="answer-content">{answer.content}</span>
            {accessor === 'temperature' && <span className="unit"> K</span>}
            {accessor === 'luminosity' && <sub className="unit">&#8857;</sub>}
          </p>
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

    return (
      <div className="qa">
        <div className="question">{JSON.strigify(question)}</div>
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
