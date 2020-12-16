// @ts-nocheck

import __deepMerge from '../object/deepMerge';
import __findInFiles from 'find-in-files';
import __minimatch from 'minimatch';
import __fs from 'fs';
import __path from 'path';
import __getFilename from '../fs/filename';
import __extension from '../fs/extension';
import __SDocblock from './SDocblock';

/**
 * @name                  firstDocblockWithNamespaceInFolder
 * @namespace           sugar.node.docblock
 * @type                  Function
 * @async
 * @wip
 *
 * This function search in the passed folder for files containing a "@namespace" tag (and an "@name" optional one)
 * and generate a SNav instance with all these founded files as sources...
 *
 * @param         {String}          directory               The directory in which to search for files with the namespace tag
 * @param         {Object}          [settings={}]           A settings object to configure your navigation generation:
 * - exclude ('**\/+(__tests__ | __wip__)\/**') {String}: Specify a glob pattern representing the files to exclude from the generation
 * @return        {Object}                                    An object containing the docblocks holded in each namespaces as properties
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import firstDocblockWithNamespaceInFolder from '@coffeekraken/sugar/node/nav/firstDocblockWithNamespaceInFolder';
 * firstDocblockWithNamespaceInFolder('my/cool/folder');
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = async function firstDocblockWithNamespaceInFolder(
  directory,
  settings = {}
) {
  settings = __deepMerge(
    {
      exclude: '**/+(__tests__|__wip__)/**'
    },
    settings
  );

  if (!__fs.existsSync(directory)) return {};

  let founded = await __findInFiles.find(`@namespace`, directory);

  const namespaceObj = {};

  Object.keys(founded).forEach((path) => {
    const relativePath = __path.relative(directory, path);
    if (__minimatch(relativePath, settings.exclude)) return;

    const content = __fs.readFileSync(path, 'utf8');

    const docblocks = new __SDocblock(content);
    const docblock = docblocks.blocks[0] ? docblocks.blocks[0] : null;

    if (!docblock) return;
    delete docblock.object.raw;

    const name =
      docblock.object.name ||
      __getFilename(path).replace(`.${__extension(path)}`, '');

    namespaceObj[docblock.object.namespace + '.' + name] = {
      ...docblock.object,
      path: relativePath
    };
  });

  return namespaceObj;
};
