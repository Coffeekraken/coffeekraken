// @ts-nocheck

import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
import __SDocMapParamsInterface from './SDocMapParamsInterface';

/**
 * @name                SDocMapSettingsInterface
 * @namespace           node.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDocMapSettingsInterface extends __SInterface {
  static definition = {
    ...__SDocMapParamsInterface.definition,
    globs: {
      type: 'Array<String>',
      alias: 'i',
      description: 'docMap.json files glob pattern',
      default: __SugarConfig.get('docmap.find.globs'),
      level: 1
    },
    exclude: {
      type: 'Object',
      description:
        'Specify some regexp used to exclude files from searching docMaps',
      default: __SugarConfig.get('docmap.find.exclude'),
      level: 1
    }
  };
}
export default SDocMapSettingsInterface;
