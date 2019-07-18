import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, design, onClick }) => (
  <button className={ design } onClick={ onClick }>
    { children }
  </button>
);

Button.propTypes = {
  design: PropTypes.oneOf(['red', 'green', 'blue']),
  onClick: PropTypes.func,
  children: PropTypes.node
};

Button.defaultProps = {
  design: 'blue',
  onClick: () => {}
};

const Text = ({ children, design }) => (
  <span className={ design }>
    { children }
  </span>
);

Text.propTypes = {
  design: PropTypes.oneOf(['red', 'green', 'blue']),
  children: PropTypes.node
};

Text.defaultProps = {
  design: 'blue'
};

export {
  Text,
  Button
}
