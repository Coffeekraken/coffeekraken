import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SClass from '@coffeekraken/s-class';
import __SPromise from '@coffeekraken/s-promise';
import __SDuration from '@coffeekraken/s-duration';
import __SInterface from '@coffeekraken/s-interface';
import __SLog from '@coffeekraken/s-log';

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

export interface ISBuilderSettings {
    interface: typeof __SInterface;
}

export interface ISBuilderCtorSettings {
    builder?: Partial<ISBuilderSettings>;
}

export interface ISBuilder {
    build(params: any, settings?: any);
}

class SBuilder extends __SClass implements ISBuilder {
    /**
     * @name        builderSettings
     * @type        any
     * @get
     *
     * Access the builder settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get builderSettings(): any {
        return (<any>this).settings.builder;
    }

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
    constructor(settings: ISBuilderCtorSettings) {
        super(
            __deepMerge(
                {
                    builder: {
                        interface: undefined,
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
        settings = __deepMerge(this.builderSettings, settings);

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

        promise.emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<yellow>[build]</yellow> Start ${this.constructor.name} build`,
        });

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

        return promise;
    }
}

export default SBuilder;
