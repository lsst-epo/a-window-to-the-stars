import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';
import Button from 'react-md/lib/Buttons/Button';
import { formatValue } from '../../lib/utilities.js';
import StellarValue from '../charts/shared/StellarValue';
import StellarValueRange from '../charts/shared/StellarValueRange';

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
            <span className="answer-content">
              <span>{formatValue(content[0], 0)}</span>
              <span className="unit">K</span>
              {` – `}
              <span>{formatValue(content[1], 0)}</span>
              <span className="unit">K</span>
            </span>
          )}
          {accessor !== 'temperature range' && includes(accessor, 'range') && (
            <span className="answer-content">
              <StellarValueRange
                type={accessor.split(' range')[0]}
                data={content}
              />
            </span>
          )}
          {!includes(accessor, 'range') && (
            <span className="answer-content">
              <StellarValue type={accessor} value={content} />
            </span>
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
