const __fs = require('fs');
const __SNav = require('../nav/SNav');
const __SNavItem = require('../nav/SNavItem');
const __isJson = require('../is/json');
const __isPath = require('../is/path');
const __ensureExists = require('../object/ensureExists');
const __get = require('../object/get');
const __set = require('../object/set');
const __paramCase = require('../string/paramCase');
const __deepMerge = require('../object/deepMerge');
const __sugarConfig = require('../config/sugar');

/**
 * @name              docNav
 * @namespace         sugar.node.doc
 * @type              Function
 *
 * This function take as parameter a docMap JSON data structure and convert it to an
 * SNav instance that you can convert then into markdown, html, etc...
 *
 * @param       {Object}          [docMap=`${__sugarConfig('doc.rootDir')}/docMap.json`]             Either directly a docMap JSON or a docMap.json path
 * @param       {Object}          [settings={}]     A settings object that will be passed to the SNav constructor
 * - url ([path]) {String}: Specify the url you want in each SNavItem. The token "[path]" will be replaced by the actual doc file path
 * - id (doc) {String}: Specify the id passed to the SNav instance
 * - text (Documentation) {String}: Specify the text passed to the SNav instance
 * @return      {SNav}                              An SNav instance representing the document navigation
 *
 * @example       js
 * const docNav = require('@coffeekraken/sugar/node/doc/docNav');
 * docNav('something/docMap.json');
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function docNav(
  docMap = `${__sugarConfig('doc.rootDir')}/docMap.json`,
  settings = {}
) {
  settings = __deepMerge(
    {
      url: '[path]',
      id: 'doc',
      text: 'Documentation'
    },
    settings
  );

  let finalNavObj = new __SNav(settings.id, settings.text, []);

  if (!__isJson(docMap) && !__isPath(docMap, true)) {
    // throw new Error(
    //   `You try to generate a docNav by passing "${docMap}" as parameter but this parameter MUST be either a valid docMap JSON or a valid docMap.json file path...`
    // );
    return finalNavObj;
  }

  let json = docMap;
  if (__isPath(`${docMap}/docMap.json`, true)) {
    json = JSON.parse(__fs.readFileSync(`${docMap}/docMap.json`, 'utf8'));
  } else if (__isPath(docMap, true)) {
    json = JSON.parse(__fs.readFileSync(docMap, 'utf8'));
  }

  const navObj = {};

  Object.keys(json.flat).forEach((path) => {
    const item = json.flat[path];
    __ensureExists(navObj, `${item.namespace}.${item.name}`, null);
  });

  function deep(currentNavInstance, dotPath = '') {
    // get nav items in the navObj
    const navItem = __get(navObj, dotPath);
    if (navItem === null) {
      const docMapItem = json.flat[dotPath];
      const sNavItem = new __SNavItem(
        __paramCase(dotPath),
        docMapItem.title,
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

  // console.log(finalNavObj.toHtml());

  return finalNavObj;
};
