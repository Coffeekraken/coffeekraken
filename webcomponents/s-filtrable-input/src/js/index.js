import __register from '@coffeekraken/sugar/js/webcomponent/register';

class SFiltrableInputWebComponent extends __register('SFiltrableInput') {
  static coco = 'hello world';

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
    console.log('COCO');
  }
}

// __register('input:SFiltrableInput', SFiltrableInputWebComponent);

// console.log(SFiltrableInputWebComponent);

// __SWebComponent.define('input:sFiltrableInput', {
//   name: 'cocococococococ'
// });
