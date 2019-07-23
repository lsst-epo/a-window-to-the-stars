import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';
import { formatValue } from '../../lib/utilities.js';

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
          {accessor === 'temperature range' && (
            <React.Fragment>
              <span className="answer-content">
                <span>{formatValue(content[0], 0)}</span>
                <span className="unit">K</span>
                {` – `}
                <span>{formatValue(content[1], 0)}</span>
                <span className="unit">K</span>
              </span>
            </React.Fragment>
          )}
          {accessor === 'temperature' && (
            <React.Fragment>
              <span className="answer-content">{formatValue(content, 0)}</span>
              <span className="unit"> K</span>
            </React.Fragment>
          )}
          {accessor === 'luminosity' && (
            <React.Fragment>
              <span className="answer-content">{formatValue(content, 2)}</span>
              <sub className="unit">&#8857;</sub>
            </React.Fragment>
          )}
          {accessor === 'count' && (
            <React.Fragment>
              <span className="answer-content">{content}</span>
              <span className="unit"> stars</span>
            </React.Fragment>
          )}
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
