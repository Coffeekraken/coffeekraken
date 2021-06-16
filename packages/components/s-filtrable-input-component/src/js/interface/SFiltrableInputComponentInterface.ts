import __SInterface from '@coffeekraken/s-interface';

export default class SHighlightJsComponentInterface extends __SInterface {
  static definition = {
    value: {
      type: 'String',
      default: ''
    },
    noItemText: {
      type: 'String',
      default: 'No item to display'
    },
    filtrable: {
      type: {
        type: 'Array<String>',
        splitChars: [',']
      },
      default: []
    },
    closeTimeout: {
      type: 'Number',
      default: 200
    },
    interactive: {
      type: 'Boolean',
      default: false
    },
    maxItems: {
      type: 'Number',
      default: 25
    }
  };
}
