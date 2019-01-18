import React, { Component } from 'react';

export default class Medium extends Component {
  render() {
    return (
      <h2>{ this.props.children }</h2>
    );
  }
}
