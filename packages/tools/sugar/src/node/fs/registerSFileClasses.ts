import __SFile from '@coffeekraken/s-file';
import __SugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name            registerSFileClasses
 * @namespace            node.fs
 * @type            Function
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This function is responsivle to register the SFile classes with their proper
 * extensions.
 *
 * @since       2.0.0
 */
export default  () => {
  const map: Record<string, string> = __SugarConfig.get('fs.sFileClassesMap');
  Object.keys(map).forEach(async (key) => {
    const { default: cls } = await import(map[key]);
    key
      .split(',')
      .map((l) => l.trim())
      .forEach((pattern) => {
        __SFile.registerClass(pattern, cls);
      });
  });
};
