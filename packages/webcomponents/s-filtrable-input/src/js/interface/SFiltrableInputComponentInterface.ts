import __SInterface from '@coffeekraken/s-interface';

export default class SHighlightJsComponentInterface extends __SInterface {
  static definition = {
    value: {
      type: 'String',
      default: ''
    },
    template: {
      type: 'String'
    },
    noItemTemplate: {
      type: 'String'
    },
    filtrable: {
      type: {
        type: 'Array<String>',
        commaSplit: true
      },
      default: []
    }
  };
}
