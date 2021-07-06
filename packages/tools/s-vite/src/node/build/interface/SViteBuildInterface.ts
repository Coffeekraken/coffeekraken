import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SViteBuildInterface
 * @namespace           s-vite
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe parameters of the SFrontstackViteProcess
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SViteBuildInterface extends __SInterface {
  static definition = {
    input: {
      type: 'String',
      path: {
        exists: true,
        absolute: true
      },
      default: `${__SSugarConfig.get('storage.src.jsDir')}/index.ts`,
      required: true
    },
    type: {
      type: 'Array<String>',
      values: ['lib', 'bundle', 'module'],
      default: ['bundle','module'],
      alias: 't'
    },
    format: {
      type: 'Array<String>',
      values: ['es','umd','cjs','iife'],
      default: ['es','umd'],
      alias: 'f'
    },
    target: {
      type: 'String',
      values: ['modules', 'esnext', 'es2015', 'es2016', 'es2020'],
      default: undefined
    },
    watch: {
      type: 'Boolean',
      default: false,
      alias: 'w'
    },
    noWrite: {
      type: 'Boolean',
      default: false
    },
    prod: {
      type: 'Boolean',
      default: false,
      alias: 'p'
    },
    chunks: {
      type: 'Boolean',
      default: false,
      alias: 'c'
    },
    minify: {
      type: 'Boolean',
      default: false,
      alias: 'm'
    },
    analyze: {
      type: 'Boolean',
      default: false,
      alias: 'a'
    }
  };
}

export default SViteBuildInterface;
