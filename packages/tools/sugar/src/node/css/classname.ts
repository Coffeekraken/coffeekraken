import __sugarConfig from '../config/sugar';

/**
 * @name            classname
 * @namespace       sugar.node.css
 * @type            Function
 *
 * This function take a classname you want to generate and returns you the prefixed (if prefix exists in config.classes) classname
 *
 * @param       {String}            classname               The classname to generate
 * @return      {String}                                    The correctly preffixed classname
 *
 * @example         js
 * import classname from '@coffeekraken/sugar/node/css/classname';
 * classname('coco'); // => s-coco
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function classname(classname) {
  const prefix = __sugarConfig('classes.generate.prefix');
  if (prefix) return `${prefix}-${classname}`;
  return classname;
}
