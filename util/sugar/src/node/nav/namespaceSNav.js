const __deepMerge = require('../object/deepMerge');
const __SNav = require('./SNav');
const __SNavItem = require('./SNavItem');
const __ensureExists = require('../object/ensureExists');
const __get = require('../object/get');
const __paramCase = require('../string/paramCase');
const __firstLookup = require('../docblock/firstLookup');

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
module.exports = (directory, settings = {}) => {
  return new Promise(async (resolve, reject) => {
    settings = __deepMerge(
      {
        url: '[path]',
        exclude: '**/+(__tests__|__wip__)/**'
      },
      settings
    );

    const namespaceObj = await __firstLookup(directory, settings);

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
    resolve(finalNavObj);

    // const itemsObj = {};
    // Object.keys(flattenItemsObj).forEach((namespace) => {
    //   const itemObj = flattenItemsObj[namespace];
    //   __ensureExists(itemsObj, namespace, itemObj);
    // });

    // return {
    //   flat: flattenItemsObj,
    //   tree: itemsObj
    // };
  });
};
