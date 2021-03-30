import __sugarConfig from '../../shared/config/sugar';
import __fs from 'fs';
import __path from 'path';
import __packageRoot from '../path/packageRoot';

/**
 * @name            tsconfigJson
 * @namespace       sugar.node.ts
 * @type            Function
 * @status          wip
 *
 * This function allows you to get the content of a tsconfig file by passing
 * a stack like "js", "shared" or "node", or directly a tsconfig file path
 *
 * @todo         Doc
 *
 * @param       {String}           stackOrPath      The stack name or a valid json file path
 * @return      {JSON}                              The tsconfig file content in json format
 *
 * @example         js
 * import tsconfigJson from '@coffeekraken/sugar/node/ts/tsconfigJson';
 * tsconfigJson('js');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface ITsconfigJsonSettings {
  clean: boolean;
}

export default function tsconfigJson(
  stackOrPath: string,
  settings: Partial<ITsconfigJsonSettings>
): string | undefined {
  const set = <ITsconfigJsonSettings>{
    clean: true,
    ...(settings ?? {})
  };

  let json;

  // stacks
  const stacks = __sugarConfig('ts.stacks');
  if (stacks[stackOrPath]) {
    if (!__fs.existsSync(stacks[stackOrPath]))
      throw new Error(
        `<red>[sugar.node.ts.tsconfigJson]</red> Sorry but the requested stacks "<yellow>${stackOrPath}</yellow>" point to a file "<cyan>${stacks[stackOrPath]}</cyan>" that does not exists...`
      );
    json = require(stacks[stackOrPath]);
  }

  // check path directly
  const potentialPath = __path.resolve(__packageRoot(), stackOrPath);
  if (!json && __fs.existsSync(potentialPath)) {
    json = require(potentialPath);
  }

  // mono repo
  const potentialTopPath = __path.resolve(
    __packageRoot(process.cwd(), true),
    stackOrPath
  );
  if (!json && potentialTopPath !== potentialPath) {
    if (__fs.existsSync(potentialTopPath)) {
      json = require(potentialTopPath);
    }
  }

  if (set.clean && json) {
    Object.keys(json).forEach((prop) => {
      if (prop.match(/^_/)) delete json[prop];
    });
  }

  return json;
}
