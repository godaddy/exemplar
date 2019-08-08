import React, { Component } from 'react';
import { radios } from '@storybook/addon-knobs';

const insane = [
  'appCodeName',
  'appName',
  'hardwareConcurrency',
  'language',
  'product',
  'vendor',
];

export default class YoDawg extends Component {
  get vendorField() {
    return radios('Navigator Insanity?', insane, 'appName');
  }

  render() {
    const field = this.vendorField;
    const sillypants = window.window.window.window.navigator[field];

    return (
      <>
        Yo dawg I heard you like things that only work in the client,
        so I put a <code>window</code> reference inside your <code>window</code> reference
        so you can <code>window</code> reference while you <code>window</code> reference.
        <h2>
          { '{ ' }{ field }{ ': ' }{ sillypants }{ ' }' }
        </h2>
      </>
    );
  }
}
