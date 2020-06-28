import {
  define,
  SLitHtmlWebComponent
} from '@coffeekraken/sugar/js/webcomponent/register';

class SFiltrableInputWebComponent extends SLitHtmlWebComponent(
  HTMLInputElement
) {
  static props = {
    items: {
      type: 'Array<Object>',
      required: true,
      physical: true,
      default: [{ name: 'hello' }]
    }
  };

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(settings);
  }
}

define('SFiltrableInput', SFiltrableInputWebComponent, {});
