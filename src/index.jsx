import Block from '../block.json';
import ExpoCanvas from './expoCanvas';
import { registerBlockType } from '@wordpress/blocks';
import '../scss/main.scss';
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';

registerBlockType(Block.name, {
  ...Block,
  edit: ({ attributes, setAttributes }) => {
    return (
      <Fragment>
        <ExpoCanvas attributes={attributes} setAttributes={setAttributes} />
      </Fragment>
    );
  },
  save: () => {
    return null;
  },
});
