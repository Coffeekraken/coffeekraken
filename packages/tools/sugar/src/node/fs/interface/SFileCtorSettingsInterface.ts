import __SInterface from '@coffeekraken/s-interface';
// import SFileSettingsInterface from './SFileSettingsInterface';

export default class SFileCtorSettingsInterface extends __SInterface {
  static definition = {
    file: {
      // interface: SFileSettingsInterface,
      type: 'Object',
      required: true
    }
  };
}
