"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
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
        // saving the settings
        setSettings(this, settings);
        // interface
        applyInterface(this);
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
    static extends(Cls) {
        class SClass extends Cls {
            constructor(settings, ...args) {
                super(...args);
                this._settings = {};
                // saving the settings
                setSettings(this, settings);
                // interface
                applyInterface(this);
            }
            get id() {
                return this._settings.id || this.constructor.name;
            }
            expose(instance, settings) {
                expose(this, instance, settings);
            }
        }
        return SClass;
    }
    expose(instance, settings) {
        expose(this, instance, settings);
    }
}
function expose(ctx, instance, settings) {
    settings = deepMerge_1.default({
        as: undefined,
        props: []
    }, settings);
    if (settings.as && typeof settings.as === 'string') {
        ctx[settings.as] = instance;
    }
    if (settings.props) {
        settings.props.forEach((prop) => {
            ctx[prop] = instance[prop].bind(instance);
        });
    }
}
function applyInterface(ctx) {
    // apply the interface if exists
    if (ctx.constructor.interface) {
        ctx.constructor.interface.apply(ctx);
    }
}
function setSettings(ctx, settings = {}) {
    // saving the settings
    if (ctx.constructor.settingsInterface) {
        ctx._settings = deepMerge_1.default(ctx.constructor.settingsInterface.defaults(), settings);
    }
    else {
        ctx._settings = settings;
    }
}
// const cls: ISClass = SClass;
exports.default = SClass;
//# sourceMappingURL=SClass.js.map