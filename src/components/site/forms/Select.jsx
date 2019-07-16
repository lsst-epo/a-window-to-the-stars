import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.PureComponent {
  render() {
    const {
      options,
      label,
      name,
      value,
      defaultValue,
      placeholder,
      handleChange,
      handleBlur,
      className,
    } = this.props;

    return (
      <div className={`select ${className}`}>
        <select
          name={name}
          value={value}
          defaultValue={defaultValue || ''}
          onBlur={handleBlur}
          onChange={handleChange}
          aria-label={label}
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
        <hr />
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  className: PropTypes.string,
};

export default Select;
