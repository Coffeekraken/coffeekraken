import __SInterface from '@coffeekraken/s-interface';

export default class SColorPickerComponentInterface extends __SInterface {
  static definition = {
    color: {
      type: 'String',
      default: '#ff0000'
    }
  };
}
