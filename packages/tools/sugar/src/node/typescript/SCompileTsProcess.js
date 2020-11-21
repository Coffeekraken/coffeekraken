"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _SProcess = require('../../process/SProcess');
/**
 * @name            STypescriptToJsProcess
 * @namespace           sugar.node.typescript
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the tsc compilation process to compile typescript to js
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class STypescriptToJsProcess extends _SProcess {
    // static interface = __SFrontendServerInterface
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
        super({
            id: 'STypescriptToJsProcess',
            name: 'Typescript to Js Process',
            ...settings
        });
    }
    /**
     * @name              process
     * @type              Function
     *
     * Method that actually execute the process
     *
     * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
     * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
     * @return      {Süromise}                        An SPomise instance representing the build process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(params, settings = {}) {
        // this._frontendServerProcess = __frontendServer(params)
        // this.bindSPromise(this._frontendServerProcess)
    }
};
