import __isClass from '../is/class';

/**
 * @name            getExtendsStack
 * @namespace       sugar.js.class
 * @type            Function
 * @stable
 *
 * This function take a class as parameter and return an array of all the class names used to extends this one...
 *
 * @param       {Class}         cls         The class to get the stack of
 * @param       {IGetExtendsStackSettings}    [settings={}]       Some settings to configure your process
 * @return      {Object}                     An object of all the parent classes
 *
 * @setting     {Boolean}     [includeBaseClass=false]      Specify if you want to include the base class in the stack or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import getExtendsStack from '@coffeekraken/sugar/js/class/getExtendsStack';
 * class Coco extends Error {}
 * class Plop extends Coco {}
 * getExtendsStack(Plop); // => {Coco: [class ...], Error: [class ...]};
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IGetExtendsStackSettings {
  includeBaseClass?: boolean;
}
export interface IGetExtendsStackResult {
  [key: string]: any;
}
export interface IGetExtendsStack {
  (cls: any, settings?: IGetExtendsStackSettings): IGetExtendsStackResult;
}

const fn: IGetExtendsStack = function (
  cls: any,
  settings: IGetExtendsStackSettings = {}
) {
  const stack = {};

  if (!__isClass(cls)) {
    cls = cls.constructor;
  }

  if (settings.includeBaseClass === true) {
    stack[cls.name] = cls;
  }

  let baseClass = cls;

  while (baseClass) {
    const newBaseClass = Object.getPrototypeOf(baseClass);
    if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
      stack[newBaseClass.name] = newBaseClass;
      baseClass = newBaseClass;
    } else {
      break;
    }
  }

  return stack;
};
export default fn;
