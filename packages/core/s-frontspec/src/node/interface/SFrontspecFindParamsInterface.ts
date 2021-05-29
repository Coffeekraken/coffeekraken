// @ts-nocheck

import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
import __SFrontspecParamsInterface from './SFrontspecParamsInterface';

/**
 * @name                SFrontspecFindParamsInterface
 * @namespace           node.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to search for fronspec.json file(s)
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontspecFindParamsInterface extends __SInterface {
  static definition = {
    ...__SFrontspecParamsInterface.definition,
    globs: {
      type: 'Array<String>',
      alias: 'i',
      description: 'frontspec.json files glob pattern',
      default: __SugarConfig.get('frontspec.find.globs'),
      level: 1
    },
    exclude: {
      type: 'Object',
      description:
        'Specify some regexp used to exclude files from searching frontspecs',
      default: __SugarConfig.get('frontspec.find.exclude'),
      level: 1
    }
  };
}
export default SFrontspecFindParamsInterface;
