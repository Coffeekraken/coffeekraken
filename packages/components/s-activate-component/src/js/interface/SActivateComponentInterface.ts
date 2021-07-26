import __SInterface from '@coffeekraken/s-interface';

export default class SActivateComponentInterface extends __SInterface {
  static definition = {
    href: {
      type: 'String'
    },
    group: {
      type: 'String'
    },
    toggle: {
      type: {
        type: 'Boolean',
        nullishAsTrue: true
      },
      default: false
    },
    history: {
      type: {
        type: 'Boolean',
        nullishAsTrue: true
      },
      default: false
    },
    active: {
      type: {
        type: 'Boolean',
        nullishAsTrue: true
      },
      default: false
    },
    saveState: {
      type: 'Boolean',
      default: false
    },
    trigger: {
      type: {
        type: 'Array<String>',
        splitChars: [',']
      },
      default: ['click']
    }
  };
}
