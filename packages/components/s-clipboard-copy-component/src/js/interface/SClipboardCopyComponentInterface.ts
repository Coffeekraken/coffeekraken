import __SInterface from '@coffeekraken/s-interface';

export default class SHighlightJsComponentInterface extends __SInterface {
  static definition = {
    successTimeout: {
      type: 'Number',
      default: 1500
    },
    errorTimeout: {
      type: 'Number',
      default: 3000
    }
  };
}
