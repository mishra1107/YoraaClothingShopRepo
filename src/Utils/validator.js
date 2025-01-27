// src/utils/validator.js

/**
 * Validate an email address.
 * @param {string} email - The email to validate.
 * @returns {boolean} - `true` if valid, `false` otherwise.
 */
export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  /**
   * Validate a phone number.
   * @param {string} phone - The phone number to validate.
   * @returns {boolean} - `true` if valid, `false` otherwise.
   */
  export const isValidPhone = (phone) => {
    const regex = /^\d{10}$/; // Example: Validates a 10-digit number
    return regex.test(phone);
  };
  
  /**
   * Validate a password (example: at least 8 characters, 1 number, 1 special character).
   * @param {string} password - The password to validate.
   * @returns {boolean} - `true` if valid, `false` otherwise.
   */
  export const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  
  /**
   * Check if a string is empty.
   * @param {string} str - The string to check.
   * @returns {boolean} - `true` if empty, `false` otherwise.
   */
  export const isEmptyString = (str) => {
    return !str || str.trim().length === 0;
  };
  
  /**
   * Validate if two passwords match.
   * @param {string} password - The first password.
   * @param {string} confirmPassword - The second password.
   * @returns {boolean} - `true` if passwords match, `false` otherwise.
   */
  export const doPasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  