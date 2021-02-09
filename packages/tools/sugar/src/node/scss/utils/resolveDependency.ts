import __sugarConfig from '../../config/sugar';
import __path from 'path';
import __glob from 'glob';
import __extension from '../../fs/extension';
import __getFilename from '../../fs/filename';
import __folderPath from '../../fs/folderPath';
import __SScssFile from '../SScssFile';
import __deepMerge from '../../object/deepMerge';
import __fs from 'fs';

/**
 * @name                resolveDependency
 * @namespace           sugar.node.scss.utils
 * @type                Function
 * @status              beta
 *
 * This function simply take an scss import or use path and resolve it using the passed includePaths array
 *
 * @param           {String}            path            The path to resolve
 * @param           {IResolveDependencySettings}        [settings={}]           Some settings to configure your resolve process
 * @return          {SFile}                    The resolved SFile instance
 *
 * @setting         {Array<String>}     [includePaths=config.scss.compile.includePaths]     Specify the directories where to search for resolving dependencies
 * @setting         {String}            [from=null]                                         Specify the file path from where you try to resolve the dependencies
 *
 * @example         js
 * import resolveDependency from '@coffeekraken/sugar/node/scss/utils/resolveDependency';
 * resolveDependency('@coffeekraken/s-filtrable-input');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
interface IResolveDependencySettings {
  includePaths?: Array<string>;
  from?: string;
}
function resolveDependency(path, settings: IResolveDependencySettings = {}) {
  settings = __deepMerge(
    {
      includePaths: __sugarConfig('scss.compile.includePaths'),
      from: undefined
    },
    settings
  );

  if (__fs.existsSync(path)) {
    return path;
  }

  // add the "from" folder path in the includePaths if exist
  // @ts-ignore
  if (settings.from !== undefined) {
    // @ts-ignore
    settings.includePaths.unshift(__folderPath(settings.from));
  }

  // loop on include paths
  // @ts-ignore
  for (let i = 0; i < settings.includePaths?.length; i++) {
    // @ts-ignore
    const includePath = settings.includePaths[i];
    const extension = __extension(path);
    const filename = __getFilename(path);
    const folderPath = __folderPath(path);
    let pattern;
    if (!extension) {
      pattern = `${folderPath}/?(_)${filename}.*`;
    } else {
      pattern = `${folderPath}/?(_)${filename}`;
    }
    const potentialPaths = __glob.sync(pattern, {
      // @ts-ignore
      cwd: includePath
    });
    if (potentialPaths && potentialPaths.length) {
      return __path.resolve(includePath, potentialPaths[0]);
    }
  }
}

export default resolveDependency;
