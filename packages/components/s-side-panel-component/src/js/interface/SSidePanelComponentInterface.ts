import __SInterface from '@coffeekraken/s-interface';

export default class SSidePanelComponentInterface extends __SInterface {
  static definition = {
    side: {
        type: 'String',
        values: ['top','left','bottom','right'],
        default: 'left'
    },
    active: {
      type: 'Boolean',
      default: false
    },
    overlay: {
      type: 'Boolean',
      default: false
    },
    closeOn: {
      type: {
        type: "Array<String>",
        splitChars: [','
      },
      values: ['click','escape'],
      default: ['click','escape']
    }
  };
}
