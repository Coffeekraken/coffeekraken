/**
*
* @name            getExtendsStack
* @namespace       shared.class.utils
* @type            Function
* @platform          js
* @platform          ts
* @platform          node
* @status          beta
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
* import getExtendsStack from '@coffeekraken/sugar/shared/class/utils/getExtendsStack';
* class Coco extends Error {}
* class Plop extends Coco {}
* getExtendsStack(Plop); // => {Coco: [class ...], Error: [class ...]};
*
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/