const __fs = require('fs');
const __SNav = require('../nav/SNav');
const __SNavItem = require('../nav/SNavItem');
const __isJson = require('../is/json');
const __isPath = require('../is/path');
const __deepMap = require('../object/deepMap');
const __getFilename = require('../fs/filename');
const __ensureExists = require('../object/ensureExists');
const __get = require('../object/get');
const __paramCase = require('../string/paramCase');

/**
 * @name              docNav
 * @namespace         sugar.node.doc
 * @type              Function
 *
 * This function take as parameter a docMap JSON data structure and convert it to an
 * SNav instance that you can convert then into markdown, html, etc...
 *
 * @param       {Object}          docMap             Either directly a docMap JSON or a docMap.json path
 * @param       {Object}          [settings={}]     A settings object that will be passed to the SNav constructor
 * @return      {SNav}                              An SNav instance representing the document navigation
 *
 * @example       js
 * const docNav = require('@coffeekraken/sugar/node/doc/docNav');
 * docNav('something/docMap.json');
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function docNav(docMap) {
  if (!__isJson(docMap) && !__isPath(docMap, true)) {
    throw new Error(
      `You try to generate a docNav by passing "${docMap}" as parameter but this parameter MUST be either a valid docMap JSON or a valid docMap.json file path...`
    );
  }
  let json = docMap;
  if (__isPath(docMap, true)) {
    json = JSON.parse(__fs.readFileSync(docMap, 'utf8'));
  }

  let stacks = [];
  Object.keys(json.flat).forEach((path) => {
    const item = json.flat[path];
    const dotedPath = path
      .replace(item.filename, '')
      .split('/')
      .filter((t) => t !== '')
      .join('.');
    stacks.push(dotedPath);
  });
  stacks = [...new Set(stacks)];

  let navItems = {};
  stacks.forEach((stackPath) => {
    __ensureExists(navItems, stackPath, []);
  });

  Object.keys(json.flat).forEach((path) => {
    const item = json.flat[path];
    const dotedPath = path
      .replace(item.filename, '')
      .split('/')
      .filter((t) => t !== '')
      .join('.');
    const array = __get(navItems, dotedPath);
    if (!Array.isArray(array)) return;

    array.push(
      new __SNavItem(__paramCase(item.filename), item.title, item.path, {})
    );
  });

  // navItems = __deepMap(navItems, (value, prop, fullProp) => {
  //   if (Array.isArray(value)) {
  //     return new __SNav(fullProp, prop, value);
  //   }

  //   if (typeof value === 'object') {
  //     return new __SNav(fullProp, prop, )
  //     console.log(Object.keys(value));
  //   }

  //   return value;

  //   // return new __SNav(fullProp, prop, [value]);
  // });

  let currentItem = navItems;
  const rootNav = new __SNav('doc', 'Doc', []);
  function deep(stack, sNav) {
    if (!Array.isArray(stack) && typeof stack === 'object') {
      Object.keys(stack).forEach((key) => {});
    }

    Object.keys(stack).forEach((key) => {
      const item = stack[key];

      if (!Array.isArray(item) && typeof item === 'object') {
        const nav = new __SNav(key, key, []);
      }

      if (!Array.isArray(item) && typeof item === 'object') {
        return deep(item);
      } else if (Array.isArray(item)) {
        return new __SNav(key, item.title);
      }
      console.log(key);
    });
  }
  deep(currentItem, rootNav);

  // console.log(navItems.node.toMarkdown());

  // __deepMap(json, (value, prop, fullProp) => {
  //   console.log(fullProp);
  //   return value;
  // });
};
