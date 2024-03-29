import React from 'react';
import PropTypes from 'prop-types';
import ExpansionList from 'react-md/lib//ExpansionPanels/ExpansionList';
import QAExpansionPanel from './QAExpansionPanel';

class QAExpansionList extends React.PureComponent {
  toggleHandler = () => {
    return null;
  };

  render() {
    const {
      question,
      answer,
      activeId,
      cancelHandler,
      saveHandler,
      editHandler,
    } = this.props;
    const { id } = question;

    return (
      <ExpansionList className="qas unstyled">
        <QAExpansionPanel
          {...this.props}
          key={`qa-${id}`}
          question={question}
          answer={answer}
          active={activeId === id}
          toggleHandler={this.toggleHandler}
          cancelHandler={cancelHandler}
          saveHandler={saveHandler}
          editHandler={editHandler}
        />
      </ExpansionList>
    );
  }
}

QAExpansionList.propTypes = {
  question: PropTypes.array,
  answer: PropTypes.object,
  activeId: PropTypes.string,
  cancelHandler: PropTypes.func,
  saveHandler: PropTypes.func,
  editHandler: PropTypes.func,
};

export default QAExpansionList;
