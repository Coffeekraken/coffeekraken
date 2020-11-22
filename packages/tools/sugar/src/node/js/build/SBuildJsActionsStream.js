"use strict";
const __SActionsStream = require('../../stream/SActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __getFilename = require('../../fs/filename');
const __SFsFilesResolverStreamAction = require('../../stream/actions/SFsFilesResolverStreamAction');
const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');
const __SCompileJsStreamAction = require('./actions/SCompileJsStreamAction');
const __path = require('path');
/**
 * @name            SBuildJsActionsStream
 * @namespace           sugar.node.build.js
 * @type            Class
 * @extends         SActionsStream
 *
 * This class represent a pre-configured action stream to build easily some javascript files
 *
 * @param           {Object}          [settings={}]         The settings object to configure your instance
 *
 * @todo        Document the streamObj required properties
 *
 * @example         js
 * const SBuildJsActionsStream = require('@coffeekraken/sugar/node/build/SBuildJsActionsStream');
 * const myStream = new SBuildJsActionsStream();
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
module.exports = class SBuildJsActionsStream extends __SActionsStream {
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
            filesResolver: __SFsFilesResolverStreamAction,
            compile: __SCompileJsStreamAction,
            fsOutput: __SFsOutputStreamAction
        }, __deepMerge({
            id: 'SBuildJsActionsStream',
            name: 'Build JS Actions Stream',
            before: (streamObj) => {
                streamObj.docMapInput = streamObj.input;
                return streamObj;
            },
            afterActions: {
                filesResolver: (streamObj) => {
                    if (streamObj.input) {
                        streamObj.filename = __getFilename(streamObj.input);
                    }
                    return streamObj;
                },
                frontspecRead: (streamObj) => {
                    return streamObj;
                }
            },
            beforeActions: {
                fsOutput: (streamObj) => {
                    return this._ensureOutputStack(streamObj);
                }
            }
        }, settings));
    }
    _ensureOutputStack(streamObj) {
        if (!streamObj.outputStack)
            streamObj.outputStack = {};
        if (streamObj.outputDir && streamObj.filename) {
            streamObj.outputStack.data = __path.resolve(streamObj.outputDir, streamObj.prod
                ? streamObj.inputObj.relPath.replace('.js', '.prod.js')
                : streamObj.inputObj.relPath.replace('.js', '.js'));
        }
        if (streamObj.outputDir && streamObj.filename && streamObj.sourcemapData) {
            streamObj.outputStack.sourcemapData = __path.resolve(streamObj.outputDir, streamObj.prod
                ? streamObj.inputObj.relPath.replace('.js', '.prod.js.map')
                : streamObj.inputObj.relPath.replace('.js', '.js.map'));
        }
        return streamObj;
    }
};
