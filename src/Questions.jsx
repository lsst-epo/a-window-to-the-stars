import React from 'react';
import API from './components/site/API';

class Questions extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      questions: {},
    };
  }

  componentDidMount() {
    API.get('static-data/questions.json').then(res => {
      this.setState(prevState => ({
        ...prevState,
        questions: res.data,
      }));
    });
  }

  render() {
    const { questions } = this.state;
    const keys = Object.keys(questions);

    return (
      <div>
        {keys.map(questionId => {
          const question = questions[questionId];
          const qKeys = Object.keys(question);

          return (
            <p key={`question-${questionId}`}>
              {qKeys.map(qKey => {
                return (
                  <span
                    key={`${qKey}-${questionId}`}
                    style={{ display: 'block' }}
                  >
                    <span>{qKey}: </span>
                    <span>{JSON.stringify(question[qKey])}</span>
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>
    );
  }
}

export default Questions;
