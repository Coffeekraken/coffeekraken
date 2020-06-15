const __deepMerge = require('../object/deepMerge');
const __findInFiles = require('find-in-files');
const __minimatch = require('minimatch');
const __fs = require('fs');
const __path = require('path');
const __getFilename = require('../fs/filename');
const __extension = require('../fs/extension');
const __SNav = require('./SNav');
const __SNavItem = require('./SNavItem');
const __ensureExists = require('../object/ensureExists');
const __get = require('../object/get');
const __paramCase = require('../string/paramCase');

/**
 * @name                  namespaceSNav
 * @namespace             sugar.node.nav
 * @type                  Function
 * @async
 *
 * This function search in the passed folder for files containing a "@namespace" tag (and an "@name" optional one)
 * and generate a SNav instance with all these founded files as sources...
 *
 * @param         {String}          directory               The directory in which to search for files with the namespace tag
 * @param         {Object}          [settings={}]           A settings object to configure your navigation generation:
 * - exclude (null) {String}: Specify a glob pattern representing the files to exclude from the generation
 * @return        {SNav}                                    An SNav instance of the founded files
 *
 * @example       js
 * const namespaceNav = require('@coffeekraken/sugar/node/nav/namespaceSNav);
 * namespaceSNav('my/cool/folder');
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = async function namespaceSNav(directory, settings = {}) {
  settings = __deepMerge(
    {
      url: '[path]',
      exclude: '**/+(__tests__|__wip__)/**'
    },
    settings
  );

  let founded = await __findInFiles.find(`@namespace`, directory);

  const namespaceObj = {};

  const flattenItemsObj = {};
  Object.keys(founded).forEach((path) => {
    const item = founded[path];
    const relativePath = __path.relative(directory, path);

    if (__minimatch(relativePath, settings.exclude)) return;

    const regNamespace = /.*@namespace\s+([a-zA-Z0-9.]+).*/gm;
    const namespaceMatches = regNamespace.exec(item.line[0]);
    const namespace =
      namespaceMatches && namespaceMatches[1] ? namespaceMatches[1] : '';

    const content = __fs.readFileSync(path, 'utf8');
    // const reg = /#\s?.*/g;

    const nameReg = /.*\@name\s+([a-zA-Z0-9_-])+.*/g;
    const nameLine = content.match(nameReg);
    const regName = /.*@name\s+([a-zA-Z0-9.]+).*/gm;
    const nameMatches = regName.exec(nameLine[0]);
    const name =
      nameMatches && nameMatches[1]
        ? nameMatches[1]
        : __getFilename(path).replace('.' + __extension(path), '');

    namespaceObj[namespace + '.' + name] = {
      name,
      namespace,
      path: relativePath,
      filename: __getFilename(relativePath)
    };

    // const name =
    //   nameLine && nameLine[0]
    //     ? nameLine[0]
    //         .replace('<!--', '')
    //         .replace('-->', '')
    //         .replace(`@name`, '')
    //         .trim()
    //     : __getFilename(relativePath).replace(
    //         '.' + __extension(relativePath),
    //         ''
    //       );
    // const namespace = item.line[0]
    //   .replace('<!--', '')
    //   .replace('-->', '')
    //   .replace(`@${settings.tag}`, '')
    //   .trim();

    // flattenItemsObj[namespace + '.' + name] = {
    //   name,
    //   namespace,
    //   path: relativePath,
    //   filename: __getFilename(relativePath),
    //   title:
    //     matches && matches.length
    //       ? matches[0].replace('#', '').replace('# ', '').trim()
    //       : null
    // };
  });

  const navObj = {};

  Object.keys(namespaceObj).forEach((namespace) => {
    const item = namespaceObj[namespace];
    __ensureExists(navObj, `${item.namespace}.${item.name}`, null);
  });

  let finalNavObj = new __SNav('.', '.', []);

  function deep(currentNavInstance, dotPath = '') {
    // get nav items in the navObj
    const navItem = __get(navObj, dotPath);
    if (navItem === null) {
      const docMapItem = namespaceObj[dotPath];
      const sNavItem = new __SNavItem(
        __paramCase(dotPath),
        docMapItem.name,
        settings.url.replace('[path]', docMapItem.path)
      );
      currentNavInstance.addItem(sNavItem);
    } else if (typeof navItem === 'object') {
      Object.keys(navItem).forEach((navKey) => {
        let newDotKey = dotPath.split('.').filter((i) => i !== '');
        newDotKey = [...newDotKey, navKey].join('.');
        const navInstance = new __SNav(__paramCase(newDotKey), newDotKey, []);
        currentNavInstance.addItem(navInstance);
        deep(navInstance, newDotKey);
      });
    }
  }
  deep(finalNavObj, '');

  return finalNavObj;

  // const itemsObj = {};
  // Object.keys(flattenItemsObj).forEach((namespace) => {
  //   const itemObj = flattenItemsObj[namespace];
  //   __ensureExists(itemsObj, namespace, itemObj);
  // });

  // return {
  //   flat: flattenItemsObj,
  //   tree: itemsObj
  // };
};
