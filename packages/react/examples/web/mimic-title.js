import React, { Component, Fragment as F } from 'react';

export default class MimicTitle extends Component {
  render() {
    return (
      <F>
        { document.title }
      </F>
    );
  }
}
