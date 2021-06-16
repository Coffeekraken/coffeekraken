import __SInterface from '@coffeekraken/s-interface';

export default class SOpengraphViewerComponentInterface extends __SInterface {
  static definition = {
    url: {
      type: 'String',
      required: true
    }
  };
}
