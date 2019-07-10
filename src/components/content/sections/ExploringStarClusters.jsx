import React from 'react';
import reactn from 'reactn';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import API from '../../site/API';
import Section from './Section';
import ScatterPlot from '../../scatter-plot';
import QuestionsAnswers from '../../questions/ExpansionList';

@reactn
class ExploringStarClusters extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clearGraphSelection: false,
      clusterData: [],
    };
  }

  componentDidMount() {
    API.get('static-data/NGC_188_data.json').then(res => {
      this.setState(prevState => ({
        ...prevState,
        clusterData: res.data.stars,
      }));
    });
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
    const { clusterData } = this.state;
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
            than the Sun. The temperature (X axis) is commonly measured in
            Kelvin.
          </p>
          <p>
            Notice that most data points occupy a region stretching diagonally
            from the upper left to the lower right of the plot. This region is
            called the main sequence. Stars in the main sequence are fusing
            hydrogen. The fusion pressure force is balanced against the force of
            gravity, which keeps the star in a stable state for most of its
            lifetime.
          </p>
          <p>
            There are also groups of points above the main sequence representing
            giant stars, and beneath the main sequence representing white dwarf
            stars. Giant stars are stars in the late stages of their lifetimes.
            They are powered by more than one type of nuclear fusion reaction.
            White dwarfs are stellar remnants that are no longer powered by
            fusion. White dwarfs are commonly referred to as dead stars. These
            three areas (giant stars, main sequence, and white dwarfs) will
            always appear on an H-R Diagram, even if you import the data from
            thousands of stars.
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
            data={clusterData}
            xValueAccessor="temperature"
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
