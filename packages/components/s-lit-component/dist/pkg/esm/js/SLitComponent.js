// @ts-nocheck
// @TODO            check how to override private static methods
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SComponentUtils, { SComponentUtilsDefaultPropsInterface, } from '@coffeekraken/s-component-utils';
import { __injectStyle, __querySelectorLive } from '@coffeekraken/sugar/dom';
import { __expandPleasantCssClassnames } from '@coffeekraken/sugar/html';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import { html as __html, LitElement } from 'lit';
export function html(strings, ...values) {
    var _a, _b;
    return __html(strings, ...values);
    const newStrings = [];
    newStrings.raw = strings.raw;
    const newValues = [];
    const classmap = (_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.classmap;
    let inClass = false, newClasses = [];
    for (let i = 0; i < strings.length; i++) {
        let newStr = strings[i], newVal = values[i];
        // patch html if a classmap is available
        // and expand classnames
        newStr = __expandPleasantCssClassnames(newStr);
        // if (classmap && (inClass || newStr.match(/class="/))) {
        //     newStr = classmap.patchHtml(newStr);
        // }
        // patch html in the value if possible
        // and expand classnames
        if (newVal && typeof newVal === 'string') {
            newVal = __expandPleasantCssClassnames(newVal);
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
    return __html(newStrings, ...newValues);
}
export default class SLitComponent extends LitElement {
    get state() {
        return this._state;
    }
    set state(state) {
        Object.assign(this._state, state);
    }
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
        __SComponentUtils.setDefaultProps(selector, props);
    }
    static propertiesFromInterface(properties, int) {
        var _a;
        const propertiesObj = {};
        class SLitComponentPropsInterface extends SComponentUtilsDefaultPropsInterface {
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
            // set the attribute to check on the element
            propertiesObj[prop].attribute = __dashCase(prop);
            // handle physical and boolean attributes
            if (definition.physical ||
                ((_f = (_e = (_d = definition.type) === null || _d === void 0 ? void 0 : _d.type) === null || _e === void 0 ? void 0 : _e.toLowerCase) === null || _f === void 0 ? void 0 : _f.call(_e)) === 'boolean' ||
                ((_h = (_g = definition.type) === null || _g === void 0 ? void 0 : _g.toLowerCase) === null || _h === void 0 ? void 0 : _h.call(_g)) === 'boolean' ||
                ((_l = (_k = (_j = definition.type) === null || _j === void 0 ? void 0 : _j.type) === null || _k === void 0 ? void 0 : _k.toLowerCase) === null || _l === void 0 ? void 0 : _l.call(_k)) === 'object' ||
                ((_o = (_m = definition.type) === null || _m === void 0 ? void 0 : _m.toLowerCase) === null || _o === void 0 ? void 0 : _o.call(_m)) === 'object') {
                propertiesObj[prop].reflect = true;
            }
            // converter
            propertiesObj[prop].converter = {
                fromAttribute: (value, type) => {
                    var _a, _b, _c, _d, _e;
                    const typeStr = (_c = (_b = (_a = definition.type) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== null && _c !== void 0 ? _c : (_d = definition.type) === null || _d === void 0 ? void 0 : _d.toLowerCase();
                    if (typeStr === 'object' && typeof value === 'string') {
                        try {
                            const json = JSON.parse(value);
                            const finalJson = __deepMerge((_e = definition.default) !== null && _e !== void 0 ? _e : {}, json);
                            return finalJson;
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                    if (value === 'true' || value === '')
                        return true;
                    if (value === 'null')
                        return null;
                    if (value === 'undefined')
                        return undefined;
                    if (value === 'false')
                        return false;
                    return value;
                },
                toAttribute(value) {
                    if (value === 'false' ||
                        value === false ||
                        value === null) {
                        return undefined;
                    }
                    if (typeof value !== 'string' &&
                        typeof value !== 'boolean') {
                        try {
                            const jsonStr = JSON.stringify(value);
                            return jsonStr;
                        }
                        catch (e) { }
                    }
                    return value;
                },
            };
        });
        const props = Object.assign(Object.assign({}, propertiesObj), (properties !== null && properties !== void 0 ? properties : {}));
        return props;
    }
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
        this.settings = __deepMerge({
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
        // check if we need to inject the css into the
        // document that is not the same as the app one
        const doc = this._getDocumentFromElement(this);
        if (document !== doc && this.constructor.styles) {
            __injectStyle(this.constructor.styles, {
                rootNode: doc,
            });
        }
        // make sure the injected styles stays BEFORE the link[rel="stylesheet"]
        // to avoid style override
        if (!SLitComponent._keepInjectedCssBeforeStylesheetLinksInited) {
            const $firstStylesheetLink = document.head.querySelector('link[rel="stylesheet"]');
            __querySelectorLive('style', ($style) => {
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
        this.utils = new __SComponentUtils(this, Object.assign(Object.assign(Object.assign({}, ((_d = this.settings) !== null && _d !== void 0 ? _d : {})), ((_e = this.settings.componentUtils) !== null && _e !== void 0 ? _e : {})), { style: (_k = (_h = (_g = (_f = this.constructor.styles) === null || _f === void 0 ? void 0 : _f.cssText) !== null && _g !== void 0 ? _g : this.settings.style) !== null && _h !== void 0 ? _h : (_j = this.settings.componentUtils) === null || _j === void 0 ? void 0 : _j.style) !== null && _k !== void 0 ? _k : '' }));
        (() => __awaiter(this, void 0, void 0, function* () {
            var _l, _m;
            const defaultProps = __SComponentUtils.getDefaultProps(this.tagName.toLowerCase());
            const mountWhen = (_m = (_l = this.getAttribute('mount-when')) !== null && _l !== void 0 ? _l : defaultProps.mountWhen) !== null && _m !== void 0 ? _m : 'direct';
            // component class
            this.classList.add(...this.utils.cls('').split(' '));
            // wait until mount
            yield this.utils.waitAndExecute(mountWhen, () => {
                this._mount();
            });
        }))();
    }
    _getDocumentFromElement($elm) {
        while ($elm.parentNode) {
            $elm = $elm.parentNode;
        }
        return $elm;
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
            const _this = this, defaultProps = __SComponentUtils.getDefaultProps(this.tagName.toLowerCase());
            // const defaultFromInterface = this.settings.interface?.defaults() ?? {};
            let properties = this.constructor.properties;
            if (!properties) {
                properties = this.constructor.propertiesFromInterface();
            }
            // this.props stack
            let finalProps = {};
            for (let [prop, obj] of Object.entries(properties)) {
                if (this[prop] !== undefined) {
                    finalProps[prop] = this[prop];
                }
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
            // await __wait();
            if (this.props.adoptStyle && this.shadowRoot) {
                yield this.utils.adoptStyleInShadowRoot(this.shadowRoot);
            }
            return true;
        });
    }
}
SLitComponent._keepInjectedCssBeforeStylesheetLinksInited = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxnRUFBZ0U7Ozs7Ozs7Ozs7QUFHaEUsT0FBTyxpQkFBaUIsRUFBRSxFQUN0QixvQ0FBb0MsR0FDdkMsTUFBTSxpQ0FBaUMsQ0FBQztBQUV6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxJQUFJLElBQUksTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUVqRCxNQUFNLFVBQVUsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU07O0lBQ25DLE9BQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBRWxDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN0QixVQUFVLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDN0IsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBRXJCLE1BQU0sUUFBUSxHQUFHLE1BQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLFFBQVEsQ0FBQztJQUUvQyxJQUFJLE9BQU8sR0FBRyxLQUFLLEVBQ2YsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUVwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQ25CLE1BQU0sR0FBRyxNQUFNLENBQUMs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