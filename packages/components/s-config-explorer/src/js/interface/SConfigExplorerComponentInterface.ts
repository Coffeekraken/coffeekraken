import __SInterface from '@coffeekraken/s-interface';

export default class SConfigExplorerComponentInterface extends __SInterface {
  static definition = {
    path: {
        type: 'String',
        default: 'api/config'
    },
    maxItems: {
      type: 'Number',
      default: 30
    }
  };
}
