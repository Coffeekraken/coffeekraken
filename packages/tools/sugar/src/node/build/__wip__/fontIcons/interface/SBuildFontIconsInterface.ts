// @ts-nocheck

const __SInterface = require('../../../class/SInterface');
const __SBuildInterface = require('../../interface/SBuildInterface');
const __sugarConfig = require('../../../config/sugar');
const __deepMerge = require('../../../object/deepMerge');
const __path = require('path');

/**
 * @name                SBuildFontIconsInterface
 * @namespace           sugar.node.build.js.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an express server process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildFontIconsInterface extends __SInterface {
  static definition = {
    inputDir: {
      type: 'String',
      required: true,
      default: __sugarConfig('build.fonticons.inputDir'),
      level: 1
    },
    outputDir: {
      type: 'String',
      required: true,
      default: __sugarConfig('build.fonticons.outputDir'),
      level: 1
    },
    config: {
      type: 'String',
      required: true,
      default: __path.resolve(__dirname, '../fantasticon.config.js'),
      level: 1
    },
    watch: {
      type: 'String',
      default: __sugarConfig('build.fonticons.watch'),
      level: 1
    }
  };
};
