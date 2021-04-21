import __SFile from '@coffeekraken/s-file';
import __sugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name            registerSFileClasses
 * @namespace            node.fs
 * @type            Function
 *
 * This function is responsivle to register the SFile classes with their proper
 * extensions.
 *
 * @since       2.0.0
 */
export default () => {
  const map: Record<string, string> = __sugarConfig('fs.sFileClassesMap');
  Object.keys(map).forEach((key) => {
    const cls = require(map[key]).default;
    key
      .split(',')
      .map((l) => l.trim())
      .forEach((pattern) => {
        __SFile.registerClass(pattern, cls);
      });
  });
};
