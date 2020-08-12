import __isClass from '../is/class';

/**
 * @name            getExtendsStack
 * @namespace       js.class
 * @type            Function
 *
 * This function take a class as parameter and return an array of all the class names used to extends this one...
 *
 * @param       {Class}         cls         The class to get the stack of
 * @return      {Array}                     An array of all the parent classes names
 *
 * @example         js
 * import getExtendsStack from '@coffeekraken/sugar/js/class/getExtendsStack';
 * class Coco extends Error {}
 * class Plop extends Coco {}
 * getExtendsStack(Plop); // => ['Coco','Error'];
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function getExtendsStack(cls) {
  const stack = [];

  if (!__isClass(cls)) {
    cls = cls.constructor;
  }

  // if (cls instanceof Function) {
  let baseClass = cls;

  while (baseClass) {
    const newBaseClass = Object.getPrototypeOf(baseClass);

    if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
      stack.push(newBaseClass.name);
      baseClass = newBaseClass;
    } else {
      break;
    }
  }

  return stack;
  // }
  return [];
}
