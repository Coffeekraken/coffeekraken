"use strict";
// @ts-nocheck
const __SActionsStream = require('../../stream/SActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __SFantasticonsStreamAction = require('./actions/SFantasticonStreamAction');
const __path = require('path');
/**
 * @name            SBuildIconsActionsStream
 * @namespace           sugar.node.build.icons
 * @type            Class
 * @extends         SActionsStream
 *
 * This class represent a pre-configured action stream to build easily some icons into fonticons
 *
 * @param           {Object}          [settings={}]         The settings object to configure your instance
 *
 * @todo        Document the streamObj required properties
 *
 * @example         js
 * const SBuildIconsActionsStream = require('@coffeekraken/sugar/node/build/SBuildIconsActionsStream');
 * const myStream = new SBuildIconsActionsStream();
 * myStream.start({
 *    input: '...',
 *    output: '...'
 * }).on('resolve', (result) => {
 *    // do something
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildIconsActionsStream extends __SActionsStream {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        // init actions stream
        super({
            fantasticon: __SFantasticonsStreamAction
        }, __deepMerge({
            id: 'SBuildIconsActionsStream',
            name: 'Build Font Icons Actions Stream',
            before: (streamObj) => {
                return streamObj;
            },
            afterActions: {},
            beforeActions: {}
        }, settings));
    }
};
//# sourceMappingURL=module.js.map