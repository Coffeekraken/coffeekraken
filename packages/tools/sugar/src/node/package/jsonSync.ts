// @ts-nocheck

import __packageRoot from './rootPath';
import __fs from 'fs';
import __readJsonSync from '../fs/readJsonSync';

/**
 * @name          jsonSync
 * @namespace            node.package
 * @type          Function
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This function return you the package.json of the current working package into object format
 *
 * @param     {String}      [from=process.cwd()]      The path from where to search upward for the package.json file
 * @return    {Object}          The package.json into object format
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import json from '@coffeekraken/sugar/node/package/json';
 * json();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
let __packageJson = {};
function jsonSync(from = process.cwd(), highest = false) {

  const prop = highest ? 'highest' : 'default';

  if (__packageJson[from]?.[prop]) {
    return __packageJson[from][prop];
  }

  const path = `${__packageRoot(from, highest)}/package.json`;
  if (!__fs.existsSync(path)) return false;

  const json = __readJsonSync(path);

  if (!__packageJson[from]) __packageJson[from] = {};
  __packageJson[from][prop] = json;

  return json;
}
export default jsonSync;
