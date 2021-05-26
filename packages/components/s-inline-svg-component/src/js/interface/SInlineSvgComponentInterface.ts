import __SInterface from '@coffeekraken/s-interface';

export default class SDocblockToHtmlComponentInterface extends __SInterface {
  static definition = {
    src: {
      type: 'String',
      required: true,
      alias: 's'
    }
  };
}
