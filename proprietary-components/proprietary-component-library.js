import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ chidren, design, onPress }) => (
  <button className={ design } onPress={ onPress }>
    { children }
  </button>
);

Button.propTypes = {
  design: PropTypes.oneOf(['red', 'green', 'blue']),
  onPress: PropTypes.func,
  children: PropTypes.node
};

Button.defaultProps - {
  design: 'blue',
  onPress: () => {}
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

Text.defaultProps - {
  design: 'blue'
};

export default {
  Text,
  Button
}
