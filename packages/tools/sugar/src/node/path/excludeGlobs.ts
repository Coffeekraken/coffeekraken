// @ts-nocheck

import __SugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                            excludeGlobs
 * @namespace            node.path
 * @type                            Function
 * @stable
 *
 * Return the array of exclude globs
 *
 * @return                {Array<String>}         The array of globs to exclude from the overall project
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import excludeGlobs from '@coffeekraken/node/fs/excludeGlobs';
 * excludeGlobs();
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


export default function (): string[] {
  const excludeGlobs = __SugarConfig.get('storage.exclude');
  return excludeGlobs ?? [];
}
