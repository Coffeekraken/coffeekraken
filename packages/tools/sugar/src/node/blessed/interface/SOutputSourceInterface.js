"use strict";
var _a;
const __SInterface = require('../../class/SInterface');
/**
 * @name                SOutputSourceInterface
 * @namespace           sugar.node.blessed.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element passed to the SOutput ```log``` method.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SOutputSourceInterface extends __SInterface {
    },
    _a.definitionObj = {
        on: {
            type: 'Function',
            required: true
        }
    },
    _a);
