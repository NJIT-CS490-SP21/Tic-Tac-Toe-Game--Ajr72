import React from 'react';
import PropTypes from 'prop-types';

export function Spect({ spect }) {
  return (
    <ul>
      {spect.map((item) => (
        <li>
          {' '}
          {item}
        </li>
      ))}
    </ul>
  );
}
Spect.propTypes = {
  spect: PropTypes.arrayOf(PropTypes.string).isRequired,
};
