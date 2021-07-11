// @ts-nocheck

import __packageRoot from './rootPath';
import __fs from 'fs';
import __readJsonSync from '../fs/readJsonSync';

/**
 * @name          json
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
function json(from = process.cwd(), highest = false) {
  const path = `${__packageRoot(from, highest)}/package.json`;
  if (!__fs.existsSync(path)) return false;
  return __readJsonSync(path);
}
export default json;
