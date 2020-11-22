"use strict";
var _a;
const __SInterface = require('../../class/SInterface');
const __sugarConfig = require('../../config/sugar');
const __deepMerge = require('../../object/deepMerge');
/**
 * @name                STestInterface
 * @namespace           sugar.node.test.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the cli parameters for the
 * test process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class STestInterface extends __SInterface {
    },
    _a.definitionObj = {
        input: {
            type: 'String',
            alias: 'i',
            description: 'Input files glob pattern',
            required: true,
            level: 1
        },
        watch: {
            type: 'String|Object',
            alias: 'w',
            description: 'Watch files glob pattern or settings object',
            level: 1
        }
    },
    _a);
