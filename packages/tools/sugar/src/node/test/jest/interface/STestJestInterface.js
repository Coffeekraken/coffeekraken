"use strict";
var _a;
const __SInterface = require('../../../class/SInterface');
const __STestInterface = require('../../interface/STestInterface');
const __sugarConfig = require('../../../config/sugar');
const __deepMerge = require('../../../object/deepMerge');
/**
 * @name                STestJestCliInterface
 * @namespace           sugar.node.test.jest.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the cli parameters for the
 * test jest process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class STestJestCliInterface extends __SInterface {
    },
    _a.definitionObj = __deepMerge(__STestInterface.definitionObj, {
        input: {
            default: __sugarConfig('jest.cli.input')
        },
        watch: {
            default: __sugarConfig('jest.cli.watch')
        }
    }),
    _a);
