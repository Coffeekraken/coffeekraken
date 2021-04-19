// @ts-nocheck

import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

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
    cache: {
      type: 'Boolean',
      default: __sugarConfig('docMap.cache'),
      level: 1
    },
    'build.globs': {
      type: 'Array<String>',
      alias: 'i',
      description: 'Input files glob pattern',
      default: __sugarConfig('docMap.build.globs'),
      level: 1
    },
    'build.exclude': {
      type: 'Object',
      description:
        'Specify some regexp used to exclude files from resulting docMap',
      default: __sugarConfig('docMap.build.exclude'),
      level: 1
    },
    'find.globs': {
      type: 'Array<String>',
      alias: 'i',
      description: 'docMap.json files glob pattern',
      default: __sugarConfig('docMap.find.globs'),
      level: 1
    },
    'find.exclude': {
      type: 'Object',
      description:
        'Specify some regexp used to exclude files from searching docMaps',
      default: __sugarConfig('docMap.find.exclude'),
      level: 1
    },
    'save.path': {
      type: 'String',
      alias: 'p',
      description: 'Output file path',
      default: __sugarConfig('docMap.save.path'),
      level: 1
    }
  };
}
export default SDocMapSettingsInterface;
