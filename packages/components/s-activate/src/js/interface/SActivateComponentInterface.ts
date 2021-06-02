import __SInterface from '@coffeekraken/s-interface';

export default class SActivateComponentInterface extends __SInterface {
  static definition = {
    target: {
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
    trigger: {
      type: {
        type: 'Array<String>',
        commaSplit: true
      },
      default: ['click']
    }
  };
}
