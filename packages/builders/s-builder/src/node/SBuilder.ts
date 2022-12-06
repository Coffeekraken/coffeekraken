import type { ISClass } from '@coffeekraken/s-class';
import __SClass from '@coffeekraken/s-class';
import __SDuration from '@coffeekraken/s-duration';
import __SEnv from '@coffeekraken/s-env';
import __SInterface from '@coffeekraken/s-interface';
import __SLog from '@coffeekraken/s-log';
import { __deepMerge } from '@coffeekraken/sugar/object';

/**
 * @name                SBuilder
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @status              wip
 *
 * This represent the main builder class that has to be extended for builders like typescript, scss, etc...
 * His main goal is to provide basic features like storing the inputs, settings, etc...
 *
 * @param           {Object}                        [settings={}]       Specify an object of settings to configure your compilation process
 *
 * @example         js
 * import SBuilder from '@coffeekraken/s-builder';
 * import SPromise from '@coffeekraken/s-promise';
 * class MyBuilder extends SBuilder {
 *      constructor(settings = {}) {
 *          super(settings);
 *      }
 *      _build(params, settings) {
 *          return new SPromise(({resolve, reject, emit}) => {
 *              // compilation logic
 *          });
 *      }
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISBuilderLogSettings {
    verbose: boolean;
}

export interface ISBuilderSettings {
    interface: typeof __SInterface;
    log: Partial<ISBuilderLogSettings>;
}

export interface ISBuilder extends ISClass {
    build(params: any, settings?: any);
}

class SBuilder extends __SClass implements ISBuilder {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings: Partial<ISBuilderSettings>) {
        super(
            __deepMerge(
                {
                    interface: undefined,
                    log: {
                        verbose: __SEnv.is('verbose'),
                    },
                },
                settings || {},
            ),
        );
    }

    /**
     * @name            build
     * @type            Function
     *
     * This method is the one you have to call when you want to launch a compilation process.
     * It will call the ```_build``` one which MUST return an instance of the SPromise class.
     *
     * @param           {String|Array<String>}          input           Specify the input to use for compilation
     * @param           {Object}                        [settings={}]       Specify an object of settings to configure your compilation process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(params: any = {}, settings: any = {}) {
        settings = __deepMerge(this.settings, settings);

        const duration = new __SDuration();

        // @weird:ts-compilation-issue
        let finalParams = params;
        if (settings.interface) {
            finalParams = settings.interface.apply(params);
        }

        // @ts-ignore
        if (!this._build) {
            throw new Error(
                `<yellow>[SBuilder]</yellow> Your "<yellow>${this.constructor.name}</yellow>" MUST have a "<magenta>_build</magenta>" method...`,
            );
        }

        // @ts-ignore
        const promise = this._build(finalParams, settings);

        if (this.settings.log.verbose) {
            promise.emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[build]</yellow> Start ${this.constructor.name} build`,
            });
        }

        if (this.settings.log.verbose) {
            promise.then(() => {
                promise.emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[success]</green> Build ${
                        this.constructor.name
                    } finished <green>successfully</green> in <yellow>${
                        duration.end().formatedDuration
                    }</yellow>`,
                });
            });
        }

        return promise;
    }
}

export default SBuilder;
