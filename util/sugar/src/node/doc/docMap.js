const __deepMerge = require('../object/deepMerge');
const __findInFiles = require('find-in-files');
const __getFilename = require('../fs/filename');
const __set = require('../object/set');
const __ensureExists = require('../object/ensureExists');
const __path = require('path');
const __fs = require('fs');
const __extension = require('../fs/extension');
const __get = require('../object/get');
const __minimatch = require('minimatch');

/**
 * @name          docMap
 * @namespace     sugar.node.doc
 * @type          Function
 * @async
 *
 * This function search for "@namespace     something..." inside the files of the specified folder and generate
 * a JSON file that list all the founded files with their relative path from the specified folder.
 *
 * @param       {String}          rootDir         The root directory where to search for documentation files
 * @param       {Object}          [settings={}]   An object of settings to configure your docMap generation:
 * - tag (namespace) {String}: The tag to search for inside the files
 * - exclude (**\/ +(__tests__ | __wip__);\/**) {String}: A regex string to specify which files to exclude from the research
 *
 * @example       js
 * const docMap = require('@coffeekraken/sugar/node/doc/docMap');
 * docMap('my/cool/folder');
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = async function docMap(rootDir, settings = {}) {
  settings = __deepMerge(
    {
      tag: 'namespace',
      exclude: '**/+(__tests__|__wip__)/**'
    },
    settings
  );

  let founded = await __findInFiles.find(`@${settings.tag}`, rootDir);

  const flattenItemsObj = {};
  Object.keys(founded).forEach((path) => {
    const item = founded[path];
    const relativePath = __path.relative(rootDir, path);

    if (__minimatch(relativePath, settings.exclude)) return;

    const content = __fs.readFileSync(path, 'utf8');
    const reg = /#\s?.*/g;
    const matches = content.match(reg);

    flattenItemsObj[relativePath] = {
      path: relativePath,
      filename: __getFilename(relativePath),
      title:
        matches && matches.length
          ? matches[0].replace('#', '').replace('# ', '').trim()
          : null,
      namespace: item.line[0]
        .replace('<!--', '')
        .replace('-->', '')
        .replace(`@${settings.tag}`, '')
        .trim()
    };
  });

  const itemsObj = {};
  Object.keys(flattenItemsObj).forEach((path) => {
    const filename = __getFilename(path);
    const dotedPath = path
      .replace(__getFilename(path), '')
      .split('/')
      .filter((i) => i !== '')
      .join('.');
    __ensureExists(itemsObj, dotedPath, {});
    const obj = __get(itemsObj, dotedPath);
    obj[filename] = flattenItemsObj[path];
  });

  return {
    flat: flattenItemsObj,
    tree: itemsObj
  };
};
