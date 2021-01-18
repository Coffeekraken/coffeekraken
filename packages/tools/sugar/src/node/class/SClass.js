"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const plainObject_1 = __importDefault(require("../is/plainObject"));
class SClass {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        // static usableAsMixin = true;
        /**
         * @name            _settings
         * @type            ISClassSettings
         * @private
         *
         * Store the class settings
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        this.$init(settings);
    }
    /**
     * @name            id
     * @type            String
     * @get
     *
     * Access the id setted in the ```_settings.id```
     * By default, the id will be the ```constructor.name```
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get id() {
        return this._settings.id || this.constructor.name;
    }
    static mixin(mixins, Cls) {
        // const mixinProps = {};
        const mixinInitStack = [];
        if (!mixins)
            mixins = [];
        // function bindProps(ctx: any) {
        //   // console.log(mixinProps);
        //   Object.keys(mixinProps).forEach((mixinName) => {
        //     ctx[mixinName] = {};
        //     Object.getOwnPropertyNames(mixinProps[mixinName]).forEach(
        //       (propName) => {
        //         if (mixinName === 'default') {
        //           ctx[propName] = mixinProps[mixinName][propName].bind(ctx);
        //         } else {
        //           ctx[mixinName][propName] = mixinProps[mixinName][propName].bind(
        //             ctx
        //           );
        //         }
        //       }
        //     );
        //   });
        // }
        function callInitStack(ctx, settings) {
            mixinInitStack.forEach((initFn) => {
                const bindedInitFn = initFn.bind(ctx);
                bindedInitFn(settings);
            });
        }
        let BaseClass;
        if (!Cls) {
            class SClassBase {
                constructor(...args) {
                    const superArgs = args;
                    const settings = args[args.length - 1];
                    if (plainObject_1.default(settings)) {
                        superArgs.pop();
                    }
                    callInitStack(this, settings);
                }
            }
            BaseClass = SClassBase;
        }
        else {
            // mixins.push(SClass);
            class SClassBase extends Cls {
                constructor(...args) {
                    const superArgs = args;
                    const settings = args[args.length - 1];
                    if (plainObject_1.default(settings)) {
                        superArgs.pop();
                    }
                    super(...superArgs);
                    callInitStack(this, settings);
                }
            }
            BaseClass = SClassBase;
        }
        const defaultMixinSettings = {
            initFnName: '$init'
            // as: undefined
        };
        for (let i = mixins.length - 1; i >= 0; i--) {
            const mixin = mixins[i];
            const mixinSettings = deepMerge_1.default(defaultMixinSettings, mixin.mixinSettings || {});
            if (mixin.usableAsMixin === undefined || mixin.usableAsMixin !== true) {
                throw `The class "<yellow>${mixin.name}</yellow>" cannot be used as a mixin...`;
            }
            // mixinProps[mixinName] = {};
            let hasInit = false;
            console.log(mixin.prototype);
            Object.getOwnPropertyNames(mixin.prototype).forEach((name) => {
                // console.log(mixin.name, name);
                if (name === mixinSettings.initFnName) {
                    hasInit = true;
                    mixinInitStack.push(mixin.prototype[name]);
                }
                else if (name !== 'constructor') {
                    const desc = (Object.getOwnPropertyDescriptor(mixin.prototype, name));
                    // desc.enumerable = true;
                    Object.defineProperty(BaseClass.prototype, name, Object.assign({}, desc));
                }
            });
            if (!hasInit) {
                mixinInitStack.push(function (settings = {}) {
                    // @ts-ignore
                    this._settings = deepMerge_1.default(this._settings, settings || {});
                });
            }
        }
        return BaseClass;
    }
    $init(settings = {}) {
        // saving the settings
        this.$setSettings(settings);
        // interface
        this.$applyInterface();
    }
    $applyInterface() {
        // apply the interface if exists
        if (this.constructor.interface) {
            this.constructor.interface.apply(this);
        }
    }
    $setSettings(settings = {}) {
        // saving the settings
        if (this.constructor.settingsInterface) {
            this._settings = deepMerge_1.default(this.constructor.settingsInterface.defaults(), settings);
        }
        else {
            this._settings = settings;
        }
    }
}
// const cls: ISClass = SClass;
exports.default = SClass;
//# sourceMappingURL=SClass.js.map