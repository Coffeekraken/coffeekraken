import __SInterface from '@coffeekraken/s-interface/browser';

export default class SHighlightJsComponentInterface extends __SInterface {
  static definition: {
    theme: {
      type: 'String';
      default: 'default';
    };
  };
}
