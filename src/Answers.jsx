import React from 'react';
import reactn from 'reactn';
import isEmpty from 'lodash/isEmpty';

@reactn
class Answers extends React.PureComponent {
  render() {
    const { answers } = this.global;
    const keys = Object.keys(answers);
    const empty = isEmpty(answers);

    return (
      <React.Fragment>
        {!empty && (
          <div>
            {keys.map(answerId => {
              const answer = answers[answerId];
              const aKeys = Object.keys(answer);

              return (
                <p key={`answer-${answerId}`}>
                  {aKeys.map(aKey => {
                    return (
                      <span
                        key={`${aKey}-${answerId}`}
                        style={{ display: 'block' }}
                      >
                        <span>{aKey}: </span>
                        <span>{JSON.stringify(answer[aKey])}</span>
                      </span>
                    );
                  })}
                </p>
              );
            })}
          </div>
        )}
        {empty && <div>There are no answers.</div>}
      </React.Fragment>
    );
  }
}

export default Answers;
