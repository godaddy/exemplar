import React, { Component, Fragment } from 'react';

export default class MimicTitle extends Component {
  render() {
    return (
      <Fragment>
        { document.title }
      </Fragment>
    );
  }
}
