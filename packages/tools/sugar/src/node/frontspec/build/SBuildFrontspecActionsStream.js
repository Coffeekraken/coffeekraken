"use strict";
var _a;
const __SActionsStream = require('../../stream/SActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');
const __SBuildFrontspecInterface = require('./interface/SBuildFrontspecInterface');
const __SBuildFrontspecStreamAction = require('./actions/SBuildFrontspecStreamAction');
/**
 * @name            SBuildFrontspecActionsStream
 * @namespace           sugar.node.build.frontspec
 * @type            Class
 * @extends         SActionsStream
 *
 * This class represent a pre-configured action stream to build easily frontspec files
 *
 * @param           {Object}          [settings={}]         The settings object to configure your instance
 *
 * @todo        Document the streamObj required properties
 *
 * @example         js
 * const SBuildFrontspecActionsStream = require('@coffeekraken/sugar/node/build/frontspec/SBuildFrontspecActionsStream');
 * const myStream = new SBuildFrontspecActionsStream();
 * myStream.start({
 *    input: '...',
 *    outputDir: '...'
 * }).on('resolve', (result) => {
 *    // do something
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SBuildFrontspecActionsStream extends __SActionsStream {
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
                buildFrontspec: __SBuildFrontspecStreamAction,
                fsOutput: __SFsOutputStreamAction
            }, __deepMerge({
                id: 'SBuildFrontspecActionsStream',
                name: 'Build Frontspec.json Actions Stream',
                afterActions: {},
                beforeActions: {}
            }, settings));
        }
    },
    _a.interface = __SBuildFrontspecInterface,
    _a);
