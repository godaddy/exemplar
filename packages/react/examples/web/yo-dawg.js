import React, { Component, Fragment as F } from 'react';

export default class MimicTitle extends Component {
  render() {
    return (
      <F>
        Yo dawg I heard you like things that only work in the client,
        so I put a <code>window</code> reference inside your <code>window</code> reference
        so you can <code>window</code> reference while you <code>window</code> reference.
        <p>
          { window.window.window.window.window.window.window.window.window.window.window.navigator.vendor }
        </p>
      </F>
    );
  }
}
