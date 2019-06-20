import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.PureComponent {
  render() {
    const {
      options,
      label,
      name,
      value,
      placeholder,
      handleChange,
    } = this.props;

    return (
      <div className="select">
        <label htmlFor={name}> {label} </label>
        <select
          name={name}
          value={value || ''}
          onChange={handleChange}
          onBlur={handleChange}
        >
          {placeholder && (
            <option key="placeholder-option" value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, i) => {
            const type = typeof option;
            if (type === 'object') {
              return (
                <option
                  key={option.id || `option-${i}`}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </option>
              );
            }

            return (
              <option key={option} value={option} label={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
};

export default Select;
