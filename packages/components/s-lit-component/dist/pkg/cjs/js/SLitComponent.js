"use strict";
// @ts-nocheck
// @TODO            check how to override private static methods
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.html = void 0;
const s_component_utils_1 = __importStar(require("@coffeekraken/s-component-utils"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
const dom_1 = require("@coffeekraken/sugar/dom");
const html_1 = require("@coffeekraken/sugar/html");
const object_1 = require("@coffeekraken/sugar/object");
const dashCase_1 = __importDefault(require("@coffeekraken/sugar/shared/string/dashCase"));
const lit_1 = require("lit");
function html(strings, ...values) {
    var _a, _b;
    return (0, lit_1.html)(strings, ...values);
    const newStrings = [];
    newStrings.raw = strings.raw;
    const newValues = [];
    const classmap = (_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.classmap;
    let inClass = false, newClasses = [];
    for (let i = 0; i < strings.length; i++) {
        let newStr = strings[i], newVal = values[i];
        // patch html if a classmap is available
        // and expand classnames
        newStr = (0, html_1.__expandPleasantCssClassnames)(newStr);
        // if (classmap && (inClass || newStr.match(/class="/))) {
        //     newStr = classmap.patchHtml(newStr);
        // }
        // patch html in the value if possible
        // and expand classnames
        if (newVal && typeof newVal === 'string') {
            newVal = (0, html_1.__expandPleasantCssClassnames)(newVal);
            // if (classmap && (inClass || newStr.match(/class="/))) {
            //     newVal = classmap.patchHtml(newVal);
            // }
        }
        // // check if the newStr ends with some classes like `class="my-class ${something}`
        // const classesMatches = newStr.match(/class="([a-zA-Z0-9_-\s]+)$/m);
        // if (inClass && typeof values[i] === 'string') {
        //     newClasses.push(values[i]);
        // } else if (classesMatches?.[1]) {
        //     inClass = true;
        // } else if (i > 0 && inClass && newStr.match(/^"/)) {
        //     newStrings[i - 1] += ` ${newClasses.join(' ')}`;
        //     newClasses = [];
        //     inClass = false;
        // }
        // add the new string into the template string
        newStrings.push(newStr);
        // add the new value
        newValues.push(newVal);
    }
    // console.log(newStrings);
    return (0, lit_1.html)(newStrings, ...newValues);
}
exports.html = html;
class SLitComponent extends lit_1.LitElement {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(settings = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        super();
        /**
         * @name            settings
         * @type            Object
         * @private
         *
         * Store the settings
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.settings = {};
        /**
         * @name            props
         * @type            Object
         *
         * Store the component props
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.props = {};
        this._shouldUpdate = false;
        this._state = {};
        this.settings = (0, object_1.__deepMerge)({
            componentUtils: {},
            shadowDom: false,
            get rootNode() {
                var _a;
                return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('*:first-child');
            },
        }, settings);
        // init default state
        if (this.constructor.state) {
            this.state = Object.assign({}, this.constructor.state);
        }
        else {
            this.state = {};
        }
        if (!((_a = this.state) === null || _a === void 0 ? void 0 : _a.status)) {
            this.state.status = 'idle';
        }
        // shadow handler
        if (this.settings.shadowDom === false) {
            this.createRenderRoot = () => {
                return this;
            };
        }
        // make sure the injected styles stays BEFORE the link[rel="stylesheet"]
        // to avoid style override
        if (!SLitComponent._keepInjectedCssBeforeStylesheetLinksInited) {
            const $firstStylesheetLink = document.head.querySelector('link[rel="stylesheet"]');
            (0, dom_1.__querySelectorLive)('style', ($style) => {
                if ($firstStylesheetLink) {
                    document.head.insertBefore($style, $firstStylesheetLink);
                }
            }, {
                rootNode: document.head,
            });
            SLitComponent._keepInjectedCssBeforeStylesheetLinksInited = true;
        }
        // @ts-ignore
        const nodeFirstUpdated = (_b = this.firstUpdated) === null || _b === void 0 ? void 0 : _b.bind(this);
        // @ts-ignore
        this.firstUpdated = () => __awaiter(this, void 0, void 0, function* () {
            if (nodeFirstUpdated) {
                yield nodeFirstUpdated();
            }
            // set the component as mounted
            // @ts-ignore
            this.setAttribute('mounted', true);
        });
        // litElement shouldUpdate
        // @ts-ignore
        const nodeShouldUpdate = (_c = this.shouldUpdate) === null || _c === void 0 ? void 0 : _c.bind(this);
        // @ts-ignore
        this.shouldUpdate = () => {
            if (nodeShouldUpdate) {
                const res = nodeShouldUpdate();
                if (!res)
                    return false;
            }
            return this._shouldUpdate;
        };
        this.utils = new s_component_utils_1.default(this, Object.assign(Object.assign(Object.assign({}, ((_d = this.settings) !== null && _d !== void 0 ? _d : {})), ((_e = this.settings.componentUtils) !== null && _e !== void 0 ? _e : {})), { style: (_k = (_h = (_g = (_f = this.constructor.styles) === null || _f === void 0 ? void 0 : _f.cssText) !== null && _g !== void 0 ? _g : this.settings.style) !== null && _h !== void 0 ? _h : (_j = this.settings.componentUtils) === null || _j === void 0 ? void 0 : _j.style) !== null && _k !== void 0 ? _k : '' }));
        (() => __awaiter(this, void 0, void 0, function* () {
            var _l, _m;
            const defaultProps = s_component_utils_1.default.getDefaultProps(this.tagName.toLowerCase());
            const mountWhen = (_m = (_l = this.getAttribute('mount-when')) !== null && _l !== void 0 ? _l : defaultProps.mountWhen) !== null && _m !== void 0 ? _m : 'direct';
            // component class
            this.classList.add(...this.utils.cls('').split(' '));
            yield (0, datetime_1.__wait)();
            yield (0, datetime_1.__wait)();
            if (!mountWhen.match(/^direct(ly)?$/)) {
                // wait until mount
                yield this.utils.waitAndExecute(mountWhen, () => {
                    this._mount();
                });
            }
            else {
                this._mount();
            }
        }))();
    }
    get state() {
        return this._state;
    }
    set state(state) {
        Object.assign(this._state, state);
    }
    // static expand(tpl) {
    //     // console.log('PL', `${tpl}`);
    //     console.log(tpl);
    //     for (let [key, str] of Object.entries(tpl.strings)) {
    //         console.log('jey', key);
    //         tpl.strings[key] = 'coco';
    //     }
    //     return tpl;
    // }
    /**
     * @name            define
     * @type            Function
     * @static
     *
     * This static method allows you to define a custom element just like the `customElement.define` does.
     * The trick is that this define method will not initialize the component directly. It will
     * wait until it is near the viewport before actually creating a new element names "%tagName-up".
     * This will be the custom element that is registered and that will replace your "%tagName" HTMLElement.
     *
     * @param
     * @param       {Any}           props          The initial props to apply to your custom element
     * @param       {String}        tagName         The tagname you want to search in the DOM
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static define(tagName, Cls, props = {}, settings = {}) {
        var _a;
        const win = (_a = settings.window) !== null && _a !== void 0 ? _a : window;
        if (win.customElements.get(tagName.toLowerCase())) {
            return;
        }
        // set the default props
        SLitComponent.setDefaultProps(tagName, props);
        win.customElements.define(tagName.toLowerCase(), class extends Cls {
        });
    }
    /**
     * @name            setDefaultProps
     * @type            Function
     * @static
     *
     * This static method allows you to set some default props for some particular
     * component(s). You can target components using simple css selectorl like "my-component#cool".
     * Once the component is instanciated, it will check if some defaults are specified and
     * extends them with the passed props.
     *
     * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
     * @param     {Any}         props         An object of props you want to set defaults for
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static setDefaultProps(selector, props) {
        s_component_utils_1.default.setDefaultProps(selector, props);
    }
    static propertiesFromInterface(properties, int) {
        var _a;
        const propertiesObj = {};
        class SLitComponentPropsInterface extends s_component_utils_1.SComponentUtilsDefaultPropsInterface {
        }
        SLitComponentPropsInterface.definition = Object.assign(Object.assign({}, SLitComponentPropsInterface.definition), ((_a = int === null || int === void 0 ? void 0 : int.definition) !== null && _a !== void 0 ? _a : {}));
        // @ts-ignore
        Object.keys(SLitComponentPropsInterface.definition).forEach((prop) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            // @ts-ignore
            const definition = SLitComponentPropsInterface.definition[prop];
            propertiesObj[prop] = Object.assign({}, ((_a = definition.lit) !== null && _a !== void 0 ? _a : {}));
            let type = String, typeStr = (_c = (_b = definition.type) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : definition.type;
            switch (typeStr.toLowerCase()) {
                case 'boolean':
                    type = Boolean;
                    break;
                case 'object':
                    type = Object;
                    break;
                case 'number':
                    type = Number;
                    break;
                default:
                    if (typeStr.match(/\[\]$/)) {
                        type = Array;
                    }
                    break;
            }
            // const type = definition.type?.type ?? definition.type ?? 'string';
            // set the type
            propertiesObj[prop].type = type;
            // set the default value
            propertiesObj[prop].default = definition.default;
            // handle physical and boolean attributes
            if (definition.physical ||
                ((_f = (_e = (_d = definition.type) === null || _d === void 0 ? void 0 : _d.type) === null || _e === void 0 ? void 0 : _e.toLowerCase) === null || _f === void 0 ? void 0 : _f.call(_e)) === 'boolean' ||
                ((_h = (_g = definition.type) === null || _g === void 0 ? void 0 : _g.toLowerCase) === null || _h === void 0 ? void 0 : _h.call(_g)) === 'boolean' ||
                ((_l = (_k = (_j = definition.type) === null || _j === void 0 ? void 0 : _j.type) === null || _k === void 0 ? void 0 : _k.toLowerCase) === null || _l === void 0 ? void 0 : _l.call(_k)) === 'object' ||
                ((_o = (_m = definition.type) === null || _m === void 0 ? void 0 : _m.toLowerCase) === null || _o === void 0 ? void 0 : _o.call(_m)) === 'object') {
                propertiesObj[prop].reflect = true;
                propertiesObj[prop].attribute = (0, dashCase_1.default)(prop);
                propertiesObj[prop].converter = {
                    fromAttribute: (value, type) => {
                        var _a, _b, _c, _d;
                        const typeStr = (_c = (_b = (_a = definition.type) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== null && _c !== void 0 ? _c : (_d = definition.type) === null || _d === void 0 ? void 0 : _d.toLowerCase();
                        if (typeStr === 'object' && typeof value === 'string') {
                            try {
                                const json = JSON.parse(value);
                                return json;
                            }
                            catch (e) {
                                console.error(e);
                            }
                        }
                        if (value === 'true' || value === '')
                            return true;
                        return value;
                    },
                    toAttribute(value) {
                        if (typeof value !== 'string' &&
                            typeof value !== 'boolean') {
                            try {
                                const jsonStr = JSON.stringify(value);
                                return jsonStr;
                            }
                            catch (e) { }
                        }
                        if (value === 'false' ||
                            value === false ||
                            value === null) {
                            return undefined;
                        }
                        return value;
                    },
                };
            }
        });
        const props = Object.assign(Object.assign({}, propertiesObj), (properties !== null && properties !== void 0 ? properties : {}));
        return props;
    }
    disconnectedCallback() {
        // this.state?.revoke?.();
    }
    /**
     * @name            mount
     * @type            Function
     * @async
     *
     * This method allows you to actually mount your feature behavior.
     * It will be called depending on the "mountWhen" setting setted.
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _mount() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const _this = this, defaultProps = s_component_utils_1.default.getDefaultProps(this.tagName.toLowerCase());
            let properties = this.constructor.properties;
            if (!properties) {
                properties = this.constructor.propertiesFromInterface();
            }
            // this.props stack
            let finalProps = {};
            for (let [prop, obj] of Object.entries(properties)) {
                Object.defineProperty(this.props, prop, {
                    enumerable: true,
                    get() {
                        return _this[prop];
                    },
                    set(value) {
                        var _a;
                        // get the value
                        value = (_a = value === null || value === void 0 ? void 0 : value.value) !== null && _a !== void 0 ? _a : value;
                        // try to parse JSON if the value is a string
                        if (value && typeof value === 'string') {
                            try {
                                _this[prop] = JSON.parse(value);
                                return;
                            }
                            catch (e) { }
                        }
                        // set the value
                        _this[prop] = value;
                    },
                });
                let attrValue = this.getAttribute((0, dashCase_1.default)(prop));
                if (attrValue !== null) {
                    if (attrValue === 'false')
                        attrValue = false;
                    if (attrValue === '')
                        attrValue = true;
                    finalProps[prop] = attrValue;
                }
                // default props
                if (finalProps[prop] === undefined && this[prop] === undefined) {
                    finalProps[prop] = (_a = defaultProps[prop]) !== null && _a !== void 0 ? _a : obj.default;
                }
            }
            if (this.settings.interface) {
                finalProps = this.settings.interface.apply(finalProps);
            }
            Object.assign(this.props, finalProps);
            // make props responsive
            this.utils.makePropsResponsive(this.props);
            // verbose
            if (this.props.verbose) {
                console.log(`[${this.tagName.toLowerCase()}]${this.id ? ` #${this.id} ` : ' '}mounting`);
            }
            // handle state if needed
            if (this.state) {
                const state = Object.assign({}, this.state);
                delete this.state;
                Object.defineProperty(this, 'state', {
                    enumerable: true,
                    value: this.utils.handleState(state, {
                        save: this.props.saveState,
                    }),
                });
                this.state.$set('*', () => {
                    this.requestUpdate();
                });
            }
            // custom mount function
            if (this.mount && typeof this.mount === 'function') {
                yield this.mount();
            }
            // set the not as updatable
            this._shouldUpdate = true;
            // @ts-ignore
            this.requestUpdate();
            yield this.updateComplete;
            this.utils.injectStyle((_c = (_b = this.constructor.styles) === null || _b === void 0 ? void 0 : _b.cssText) !== null && _c !== void 0 ? _c : '', this.tagName);
            yield (0, datetime_1.__wait)();
            if (this.props.adoptStyle && this.shadowRoot) {
                yield this.utils.adoptStyleInShadowRoot(this.shadowRoot);
            }
            return true;
        });
    }
}
exports.default = SLitComponent;
SLitComponent._keepInjectedCssBeforeStylesheetLinksInited = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsZ0VBQWdFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdoRSxxRkFFeUM7QUFFekMsMkRBQXNEO0FBQ3RELGlEQUE4RDtBQUM5RCxtREFBeUU7QUFDekUsdURBQXlEO0FBQ3pELDBGQUFvRTtBQUNwRSw2QkFBaUQ7QUFFakQsU0FBZ0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU07O0lBQ25DLE9BQU8sSUFBQSxVQUFNLEVBQUMsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFFbEMsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLFVBQVUsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUM3QixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFFckIsTUFBTSxRQUFRLEdBQUcsTUFBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLDBDQUFFLEtBQUssMENBQUUsUUFBUSxDQUFDO0lBRS9DLElBQUksT0FBTyxHQUFHLEtBQUssRUFDZixVQUFVLEdBQUcsRUFBRSxDQUFDO0lBRXBCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFDbkIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2Qix3Q0FBd0M7UUFDeEMsd0JBQXdCO1FBQ3hCLE1BQU0sR0FBRyxJQUFBLG9DQUE2QixFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLDBEQUEwRDtRQUMxRCwyQ0FBMkM7UUFDM0MsSUFBSTtRQUVKLHNDQUFzQztRQUN0Qyx3QkFBd0I7UUFDeEIsSUFBSSxNQUFNLElBQUksT0FB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