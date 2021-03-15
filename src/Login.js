import React from 'react';
import PropTypes from 'prop-types';

export function Login({ inputRef, onPressLogin }) {
  return (
    <div>
      <input
        className="login-box"
        ref={inputRef}
        type="text"
        placeholder="Enter your username here!!!"
      />
      <br />
      <button type="button" className="login-button" onClick={() => onPressLogin()}>
        Login
      </button>
    </div>
  );
}
Login.propTypes = {
  onPressLogin: PropTypes.func.isRequired,
  inputRef: PropTypes.string.isRequired,
};
