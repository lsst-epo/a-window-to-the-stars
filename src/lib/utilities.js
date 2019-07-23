import isEmpty from 'lodash/isEmpty';
import { extent as d3Extent } from 'd3-array';

export const formatValue = function(number, decimalPlaces) {
  return Number.parseFloat(number).toFixed(decimalPlaces);
};

export const arrayify = function(data) {
  return isEmpty(data) ? null : [].concat(data);
};

export const extentFromSet = function(data, valueAccessor) {
  return d3Extent(data, datum => {
    return datum[valueAccessor];
  });
};
