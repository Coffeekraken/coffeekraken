import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SColorApplyParamsInterface
 * @namespace           sugar.node.svelte.compile.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe parameters of the SSvelteCompiler
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SColorApplyParamsInterface extends __SInterface {
  static definition = {
    desaturate: {
      type: 'Number',
      default: 0,
      alias: 'd',
      description: 'Allows you to desaturate the color using a percentage'
    },
    saturate: {
      type: 'Number',
      default: 0,
      alias: 's',
      description: 'Allows you to saturate the color using a percentage'
    },
    greyscale: {
      type: 'Boolean',
      default: false,
      alias: 'g',
      description: 'Allows you to get back the grayscale version of your color'
    },
    spin: {
      type: 'Number',
      default: 0,
      description: 'Spin the hue on the passed value (max 360)'
    },
    transparentize: {
      type: 'Number',
      default: 0,
      description: 'The amount of transparence to apply between 0-100|0-1'
    },
    alpha: {
      type: 'Number',
      default: 0,
      alias: 'a',
      description: 'The new alpha value to apply between 0-100|0-1'
    },
    opacity: {
      type: 'Number',
      default: 0,
      alias: 'o',
      description: 'The new alpha value to apply between 0-100|0-1'
    },
    opacify: {
      type: 'Number',
      default: 0,
      description: 'The amount of transparence to remove between 0-100|0-1'
    },
    darken: {
      type: 'Number',
      default: 0,
      description:
        'The amount of darkness (of the nightmare of the shadow) to apply between 0-100'
    },
    lighten: {
      type: 'Number',
      default: 0,
      alias: 'l',
      description:
        'The amount of lightness (of the sky of the angels) to apply between 0-100'
    },
    invert: {
      type: 'Boolean',
      default: false,
      alias: 'i',
      description:
        'Specify if you want to invert the color to keep a good contrast ratio with a background for example'
    }
  };
}

export default SColorApplyParamsInterface;
