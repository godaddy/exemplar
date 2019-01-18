import React, { Component } from 'react';

export default class Large extends Component {
  render() {
    return (
      <h1>{ this.props.children }</h1>
    );
  }
}
