import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import QuestionsAnswers from '../../questions/ExpansionList';

@reactn
class ExploringStarClusters extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clearGraphSelection: false,
    };
  }

  componentDidUpdate() {
    const { questions } = this.props;
    const { answers, activeId } = this.global;

    if (questions && !activeId && !answers[questions[0].id]) {
      this.setGlobal(prevGlobal => ({
        ...prevGlobal,
        activeId: questions[0].id,
      }));
    }
  }

  indexFromId(id) {
    const { questionsRange } = this.props;
    return questionsRange.indexOf(parseInt(id, 10));
  }

  clearAnswer(id) {
    const { answers: prevAnswers } = this.global;

    this.setGlobal(prevGlobal => ({
      ...prevGlobal,
      answers: {
        ...prevAnswers,
        [id]: {},
      },
    }));

    this.setState(prevState => ({
      ...prevState,
      clearGraphSelection: true,
    }));
  }

  updateAnswer(id, data) {
    const { questions } = this.props;
    const activeIndex = this.indexFromId(id);
    const { answerAccessor } = questions[activeIndex];
    const { answers: prevAnswers } = this.global;
    const prevAnswer = { ...prevAnswers[id] };
    const content = answerAccessor ? data[answerAccessor] : data;

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
  }

  setActiveQuestion(id) {
    this.setGlobal(prevGlobal => ({
      ...prevGlobal,
      activeId: id,
    }));
  }

  advanceActiveQuestion(id) {
    const { questionsRange } = this.props;
    const lastIndex = questionsRange.length - 1;
    const currentIndex = this.indexFromId(id);
    const nextIndex = currentIndex + 1;
    let nextId = null;

    if (nextIndex <= lastIndex) {
      nextId = questionsRange[nextIndex].toString();
    }

    this.setActiveQuestion(nextId);
  }

  onGraphSelection = selectedData => {
    const { activeId } = this.props;

    if (selectedData) {
      this.updateAnswer(activeId, selectedData);
    } else {
      this.clearAnswer(activeId);
    }
  };

  onQAToggle = () => {
    return null;
  };

  onAnswerCancel = id => {
    this.clearAnswer(id);
  };

  onAnswerSave = id => {
    this.advanceActiveQuestion(id);
  };

  onEdit = id => {
    this.setActiveQuestion(id);
  };

  render() {
    const { questions, activeId } = this.props;
    const { answers } = this.global;
    const activeAnswer = answers[activeId] || {};

    return (
      <Section {...this.props}>
        <section>
          <h2 className="section-title">
            Exploring H-R Diagrams of Star Clusters
          </h2>
          <p>
            An H-R Diagram is a plot that displays temperature and luminosity
            information about stars. Luminosity (Y axis) is a measure of the
            total energy output from a star per unit of time. It’s commonly
            expressed as Solar luminosity, which is the ratio of a star’s energy
            output compared to the energy output of the Sun. For example, a star
            with a solar luminosity of 10 is giving off ten times more energy
            than the Sun. Temperature (X axis) is commonly measured in Kelvin.
          </p>
          <p>
            A star’s physical properties—its size, temperature, color, and
            brightness—are the product of the star’s initial mass and this clash
            of forces, and these physical properties change during a star’s
            lifetime.
          </p>
          <hr className="divider-horizontal" />
          {questions && (
            <QuestionsAnswers
              questions={questions}
              answers={answers}
              activeId={activeId}
              toggleHandler={this.onQAToggle}
              cancelHandler={this.onAnswerCancel}
              saveHandler={this.onAnswerSave}
              editHandler={this.onEdit}
            />
          )}
        </section>
        <div className="col-graph">
          <h2>H-R Diagram</h2>
          <ScatterPlot
            width={600}
            height={600}
            padding={50}
            dataPath="static-data/stars.json"
            xValueAccessor="teff"
            yValueAccessor="luminosity"
            xAxisLabel="Temperature (K)"
            yAxisLabel="Solar Luminosity"
            dataSelectionCallback={this.onGraphSelection}
            clearOnChange={isEmpty(activeAnswer)}
          />
        </div>
      </Section>
    );
  }
}

ExploringStarClusters.propTypes = {
  id: PropTypes.number,
  layout: PropTypes.string,
  dividers: PropTypes.bool,
  paginationLocation: PropTypes.number,
  questionsRange: PropTypes.array,
  questions: PropTypes.array,
  activeId: PropTypes.string,
};

export default ExploringStarClusters;
