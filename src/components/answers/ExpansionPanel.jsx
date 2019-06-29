import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';

class AnswerExpansionPanel extends React.PureComponent {
  render() {
    const {
      id,
      pre,
      content,
      accessor,
      showEditButton,
      editHandler,
    } = this.props;

    return (
      <div className="container-flex centered">
        {showEditButton && (
          <Button
            onClick={() => editHandler(id)}
            flat
            secondary
            className="outlined mini edit-button"
          >
            Change Answer
          </Button>
        )}
        <p id={`answer-content-${id}`}>
          {pre && <span className="answer-pre">{pre} </span>}
          <span className="answer-content">{content}</span>
          {accessor === 'teff' && <span className="unit"> K</span>}
          {accessor === 'luminosity' && <sub className="unit">&#8857;</sub>}
        </p>
      </div>
    );
  }
}

AnswerExpansionPanel.propTypes = {
  id: PropTypes.string,
  content: PropTypes.string,
  accessor: PropTypes.string,
  pre: PropTypes.string,
  showEditButton: PropTypes.bool,
  editHandler: PropTypes.func,
};

export default AnswerExpansionPanel;
