// import isEmpty from 'lodash/isEmpty';
import { extent as d3Extent } from 'd3-array';

export const formatValue = function(number, decimalPlaces) {
  return Number.parseFloat(number).toFixed(decimalPlaces);
};

export const arrayify = function(data) {
  return data === null ? null : [].concat(data);
};

export const extentFromSet = function(data, valueAccessor) {
  return d3Extent(data, datum => {
    return datum[valueAccessor];
  });
};

export const capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getValue = function(accessor, data) {
  if (accessor === 'luminosity') {
    return formatValue(data, 4);
  }
  if (accessor === 'radius') {
    return formatValue(data, 2);
  }
  if (accessor === 'mass') {
    return formatValue(data, 2);
  }
  if (accessor === 'lifetime') {
    return formatValue(data / 1000000000, 2);
  }

  return data;
};
