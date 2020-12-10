"use strict";
// @ts-nocheck
const __SActionsStream = require('../../stream/SActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __SFsFilesResolverStreamAction = require('../../stream/actions/SFsFilesResolverStreamAction');
const __SFsReadFileStreamAction = require('../../stream/actions/SFsReadFileStreamAction');
const __SFsUnlinkStreamAction = require('../../stream/actions/SFsUnlinkStreamAction');
const __globParent = require('glob-parent');
const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');
const __path = require('path');
/**
 * @name            SBuildViewsActionsStream
 * @namespace           sugar.node.build.views
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
 * const SBuildViewsActionsStream = require('@coffeekraken/sugar/node/build/views/SBuildViewsActionsStream');
 * const myStream = new SBuildViewsActionsStream();
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
module.exports = class SBuildViewsActionsStream extends __SActionsStream {
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
            unlink: __SFsUnlinkStreamAction,
            filesResolver: __SFsFilesResolverStreamAction,
            readFile: __SFsReadFileStreamAction,
            fsOutput: __SFsOutputStreamAction
        }, __deepMerge({
            name: 'Build Views',
            actions: {
                filesResolver: {
                    ignoreFolders: [],
                    out: 'array'
                }
            },
            before: (streamObj) => {
                streamObj.inputDir = __globParent(streamObj.input);
                streamObj.unlink = streamObj.outputDir;
                return streamObj;
            },
            beforeActions: {
                fsOutput: (streamObj) => {
                    let outputPath = streamObj.input.replace(streamObj.inputDir, '');
                    if (outputPath.slice(0, 1) === '/')
                        outputPath = outputPath.slice(1);
                    if (!streamObj.outputStack)
                        streamObj.outputStack = {};
                    if (streamObj.outputDir && outputPath && streamObj.data) {
                        streamObj.outputStack.data = __path.resolve(streamObj.outputDir, outputPath);
                    }
                    return streamObj;
                }
            }
        }, settings));
    }
};
//# sourceMappingURL=module.js.map