const __deepMerge = require('../object/deepMerge');
const __findInFiles = require('find-in-files');
const __minimatch = require('minimatch');
const __fs = require('fs');
const __path = require('path');
const __getFilename = require('../fs/filename');
const __extension = require('../fs/extension');
const __SDocblock = require('./SDocblock');

/**
 * @name                  firstDocblockWithNamespaceInFolder
 * @namespace           node.docblock
 * @type                  Function
 * @async
 *
 * This function search in the passed folder for files containing a "@namespace" tag (and an "@name" optional one)
 * and generate a SNav instance with all these founded files as sources...
 *
 * @param         {String}          directory               The directory in which to search for files with the namespace tag
 * @param         {Object}          [settings={}]           A settings object to configure your navigation generation:
 * - exclude ('**\/+(__tests__ | __wip__)\/**') {String}: Specify a glob pattern representing the files to exclude from the generation
 * @return        {Object}                                    An object containing the docblocks holded in each namespaces as properties
 *
 * @example       js
 * const firstDocblockWithNamespaceInFolder = require('@coffeekraken/sugar/node/nav/firstDocblockWithNamespaceInFolder);
 * firstDocblockWithNamespaceInFolder('my/cool/folder');
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = async function firstDocblockWithNamespaceInFolder(
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

    // console.log(content);

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
