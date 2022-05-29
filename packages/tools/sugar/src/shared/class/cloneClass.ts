import { cloneClass } from 'clone-class';

/**
 * @name            cloneClass
 * @namespace            js.class
 * @type            Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Clone ES6 Classes
 *
 * @param       {Class}          class        The class to clone
 * @return      {Class}                             A new class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import __cloneClass from '@coffeekraken/sugar/js/class/cloneClass';
 * const NewClass = __closeClass(class MyClass() {});
 *
 * @see             https://www.npmjs.com/package/clone-class
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (cls: any): any {
    return cloneClass(cls);
}
