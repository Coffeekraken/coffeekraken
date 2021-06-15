import __SInterface from '@coffeekraken/s-interface';

export default class SHighlightJsComponentInterface extends __SInterface {
  static definition = {
    theme: {
      type: 'String',
      default:
        'https://gitcdn.link/repo/PrismJS/prism-themes/master/themes/prism-nord.css'
    },
    active: {
      type: 'String'
    },
    language: {
      type: 'String',
      default: 'javascript'
    },
    defaultStyleClasses: {
      type: 'Object',
      default: {
        main: 's-tabs'
      }
    }
  };
}
