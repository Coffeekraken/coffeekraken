"use strict";
var _a;
const __SActionsStream = require('../../stream/SActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __getFilename = require('../../fs/filename');
const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');
const __SRenderScssStreamAction = require('./actions/SRenderScssStreamAction');
const __SFsFilesResolverStreamAction = require('../../stream/actions/SFsFilesResolverStreamAction');
const __path = require('path');
const __SBuildScssInterface = require('./interface/SBuildScssInterface');
/**
 * @name            SBuildScssActionsStream
 * @namespace           sugar.node.build.scss
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
 * const SBuildScssActionsStream = require('@coffeekraken/sugar/node/build/SBuildScssActionsStream');
 * const myStream = new SBuildScssActionsStream();
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
module.exports = (_a = class SBuildScssActionsStream extends __SActionsStream {
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
                render: __SRenderScssStreamAction,
                fsOutput: __SFsOutputStreamAction
            }, __deepMerge({
                id: 'SBuildScssActionsStream',
                name: 'Build SCSS Actions Stream',
                before: (streamObj) => {
                    return streamObj;
                },
                afterActions: {
                    filesResolver: (streamObj) => {
                        streamObj.filename = __getFilename(streamObj.input);
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
                    ? streamObj.filename.replace('.scss', '.prod.css')
                    : streamObj.filename.replace('.scss', '.css'));
            }
            if (streamObj.outputDir && streamObj.filename && streamObj.sourcemapData) {
                streamObj.outputStack.sourcemapData = __path.resolve(streamObj.outputDir, streamObj.prod
                    ? streamObj.filename.replace('.css', '.prod.css.map')
                    : streamObj.filename.replace('.css', '.css.map'));
            }
            return streamObj;
        }
    },
    _a.interface = __SBuildScssInterface,
    _a);
