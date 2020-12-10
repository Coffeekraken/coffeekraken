"use strict";
// @ts-nocheck
var _a;
const __SBuildDocMapActionsStream = require('./SBuildDocMapActionsStream');
const __SProcess = require('../../process/SProcess');
const __SBuildDocMapInterface = require('./interface/SBuildDocMapInterface');
/**
 * @name            SBuildDocMapProcess
 * @namespace           sugar.node.build.docMap
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SBuildDocMapProcess extends __SProcess {
        /**
         * @name          constructor
         * @type          Function
         * @constructor
         *
         * Constructor
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
            super(__filename, Object.assign({ id: 'SBuildDocMapProcess', name: 'Build docMap.json Process' }, settings));
        }
        /**
         * @name              process
         * @type              Function
         *
         * Method that execute the actual process code
         *
         * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
         * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
         * @return      {Süromise}                        An SPomise instance representing the build process
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        process(params, settings = {}) {
            const docMapStream = new __SBuildDocMapActionsStream(Object.assign(Object.assign({}, settings), { logs: {
                    start: false,
                    success: false
                } }));
            const docMapStreamProcess = docMapStream.start(params);
            this.bindSPromise(docMapStreamProcess);
        }
    },
    _a.interface = __SBuildDocMapInterface,
    _a);
//# sourceMappingURL=module.js.map