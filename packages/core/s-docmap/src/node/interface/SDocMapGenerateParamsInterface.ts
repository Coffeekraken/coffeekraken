// @ts-nocheck

import __SugarConfig from '@coffeekraken/s-sugar-config';
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
    globs: {
      type: 'Array<String>',
      description:
        'Specify some globs to use to search docblocks to use in docmap generation',
      default: __SugarConfig.get('docmap.generate.globs')
    },
    exclude: {
      type: 'Array<String>',
      description:
        'Specify some regexp used to exclude files from resulting docMap',
      default: __SugarConfig.get('docmap.generate.exclude'),
      level: 1
    },
    fields: {
      type: 'Array<String>',
      description:
        'Specify which docblock fields you want in your final docmap.json file',
      alias: 'f',
      default: __SugarConfig.get('docmap.generate.fields')
    },
    filters: {
      type: 'Object<RegExp>',
      description:
        'Specify some properties and regex to use to filter docblocks',
      default: __SugarConfig.get('docmap.generate.filters')
    },
    noExtends: {
      type: {
        type: 'Boolean',
        nullishAsTrue: true
      },
      description: 'Specify if you want to avoid searching for docmap.json files in the dependency packages',
      default: __SugarConfig.get('docmap.generate.noExtends'),
    },
    save: {
      type: 'Boolean',
      alias: 's',
      description:
        'Specify if you want to save the generated file under the ```outPath``` path',
      default: __SugarConfig.get('docmap.generate.save')
    },
    outPath: {
      type: 'String',
      alias: 'o',
      description: 'Specify where you want to save the builded file. Usually saved in package root with the name docmap.json',
      default: __SugarConfig.get('docmap.generate.outPath')
    }
  };
}
export default SDocMapGenerateParamsInterface;
