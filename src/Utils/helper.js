// src/utils/helper.js

/**
 * Format a date to a readable string.
 * @param {Date | string} date - The date to format.
 * @returns {string} - Formatted date string.
 */
export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  /**
   * Capitalize the first letter of a string.
   * @param {string} str - The string to capitalize.
   * @returns {string} - Capitalized string.
   */
  export const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  /**
   * Truncate a string to a specific length.
   * @param {string} str - The string to truncate.
   * @param {number} length - The maximum length.
   * @returns {string} - Truncated string.
   */
  export const truncateString = (str, length) => {
    if (str.length <= length) return str;
    return `${str.slice(0, length)}...`;
  };
  
  /**
   * Check if an object is empty.
   * @param {Object} obj - The object to check.
   * @returns {boolean} - `true` if the object is empty, `false` otherwise.
   */
  export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };
  