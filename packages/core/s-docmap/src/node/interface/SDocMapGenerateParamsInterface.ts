// @ts-nocheck

import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SDocMapGenerateParamsInterface
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
class SDocMapGenerateParamsInterface extends __SInterface {
  static definition = {
    cache: {
      type: 'Boolean',
      default: __sugarConfig('docmap.cache'),
      level: 1
    },
    globs: {
      type: 'Array<String>',
      alias: 'i',
      description: 'Input files glob pattern',
      default: __sugarConfig('docmap.generate.globs'),
      level: 1
    },
    exclude: {
      type: 'Array<String>',
      description:
        'Specify some regexp used to exclude files from resulting docMap',
      default: __sugarConfig('docmap.generate.exclude'),
      level: 1
    },
    fields: {
      type: 'Array<String>',
      description:
        'Specify which docblock fields you want in your final docmap.json file',
      alias: 'f',
      default: __sugarConfig('docmap.generate.fields')
    },
    filters: {
      type: 'Object<RegExp>',
      description:
        'Specify some properties and regex to use to filter docblocks',
      default: __sugarConfig('docmap.generate.filters')
    },
    watch: {
      type: 'Boolean',
      alias: 'w',
      description:
        'Specify if you want to watch the sources files to re-generate the docmap.json automatically on updates',
      default: __sugarConfig('docmap.generate.watch')
    },
    outPath: {
      type: 'String',
      alias: 'p',
      description: 'Output file path',
      default: __sugarConfig('docmap.generate.outPath'),
      level: 1
    },
    save: {
      type: 'Boolean',
      alias: 's',
      description:
        'Specify if you want to save the generated file under the ```outPath``` path',
      default: __sugarConfig('docmap.generate.save')
    }
  };
}
export default SDocMapGenerateParamsInterface;
