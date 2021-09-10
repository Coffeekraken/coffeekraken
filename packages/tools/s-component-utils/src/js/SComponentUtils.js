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
// import __mustache from 'mustache';
import __SInterface from '@coffeekraken/s-interface';
import __adoptStyleInShadowRoot from '@coffeekraken/sugar/js/css/adoptStyleInShadowRoot';
import __injectStyle from '@coffeekraken/sugar/js/css/injectStyle';
import __whenInViewport from '@coffeekraken/sugar/js/dom/detect/whenInViewport';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import __SClass from '@coffeekraken/s-class';
export class SComponentDefaultInterface extends __SInterface {
}
SComponentDefaultInterface.definition = {
    id: {
        type: 'String',
        physical: true,
    },
    mounted: {
        type: 'Boolean',
        default: false,
        physical: true,
    },
    mountWhen: {
        type: 'String',
        values: ['directly', 'inViewport'],
        default: 'directly',
    },
    adoptStyle: {
        type: 'Boolean',
        default: true,
        physical: true,
    },
    defaultStyle: {
        type: 'Boolean',
        default: true,
        physical: true,
    },
};
export default class SComponent extends __SClass {
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
    constructor(node, props, settings = {}) {
        var _a, _b;
        var _c;
        super(__deepMerge({
            sComponentUtils: {},
        }, settings));
        /**
         * @name            state
         * @type            String
         *
         * Track the state of the component.
         * - pending: default state when nothing has been done
         * - mount: state when the component has to be mounted
         * - mounted: state when the component has been mounded
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.state = 'pending';
        this.node = node;
        this._props = props;
        // build the final interface class to apply on props
        let InterfaceToApply = (_c = class InlineSComponentUtilsInterface extends __SInterface {
            },
            _c.definition = {},
            _c);
        // @ts-ignore
        InterfaceToApply.definition = Object.assign(Object.assign({}, Object.assign({}, SComponentDefaultInterface.definition)), ((_b = (_a = this.sComponentUtilsSettings.interface) === null || _a === void 0 ? void 0 : _a.definition) !== null && _b !== void 0 ? _b : {}));
        // @ts-ignore
        this.InterfaceToApply = InterfaceToApply;
        // @ts-ignore
        const styleStr = this.sComponentUtilsSettings.style;
        this.injectStyle(styleStr !== null && styleStr !== void 0 ? styleStr : '');
        // waiting for mount state
        this._whenMountedPromise = new Promise((resolveMounted) => __awaiter(this, void 0, void 0, function* () {
            this._whenMountPromise = new Promise((resolveMount) => __awaiter(this, void 0, void 0, function* () {
                // mount component when needed
                switch (this.props.mountWhen) {
                    case 'inViewport':
                        (() => __awaiter(this, void 0, void 0, function* () {
                            // @ts-ignore
                            yield __whenInViewport(this.node);
                        }))();
                        break;
                    case 'direct':
                    case 'directly':
                    default:
                        break;
                }
                resolveMount(() => {
                    this.state = 'mounted';
                    resolveMounted();
                });
            }));
        }));
    }
    static setDefaultProps(selector, props) {
        selector = Array.isArray(selector) ? selector : [selector];
        selector.forEach((sel) => {
            var _a;
            this._defaultProps[sel] = Object.assign(Object.assign({}, ((_a = this._defaultProps[sel]) !== null && _a !== void 0 ? _a : {})), props);
        });
    }
    /**
     * @name        sComponentUtilsSettings
     * @type        ISComponentUtilsSettings
     * @get
     *
     * Access the component utils sertings
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    get sComponentUtilsSettings() {
        return this._settings.sComponentUtils;
    }
    /**
     * @name           whenMountState
     * @type            Function
     * @async
     *
     * This asynv method allows you to wait for the component (node) has reached
     * his "mount" state. This state depends fully on the "mountWhen" property
     *
     * @return          {Promise}           A promise fullfilled when the component (node) has reached his "mount" state
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    whenMountState() {
        return this._whenMountPromise;
    }
    /**
     * @name           whenMountedState
     * @type            Function
     * @async
     *
     * This asynv method allows you to wait for the component (node) has reached
     * his "mounted" state. This state depends fully on the "mountWhen" property
     *
     * @return          {Promise}           A promise fullfilled when the component (node) has reached his "mount" state
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    whenMountedState() {
        return this._whenMountedPromise;
    }
    /**
     * @name        adoptStyleInShadowRoot
     * @type        Function
     * @async
     *
     * This method allows you to make the passed shadowRoot element adopt
     * the style of the passed context who's by default the document itself
     *
     * @param       {HTMLShadowRootElement}         $shadowRoot             The shadow root you want to adopt the $context styles
     * @param      {HTMLElement}                   [$context=document]     The context from which you want to adopt the styles
     * @return      {Promise}                                               Return a promise fullfilled when the styles have been adopted
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    adoptStyleInShadowRoot($shadowRoot, $context) {
        return __adoptStyleInShadowRoot($shadowRoot, $context);
    }
    get props() {
        // if props already builded
        if (this._finalProps)
            return this._finalProps;
        const props = this._props;
        let passedProps = {};
        if (props.constructor.name === 'NamedNodeMap') {
            Object.keys(props).forEach((key) => {
                var _a, _b, _c;
                let value;
                if (((_a = props[key]) === null || _a === void 0 ? void 0 : _a.nodeValue) !== undefined) {
                    if (props[key].nodeValue === '')
                        value = true;
                    else
                        value = props[key].nodeValue;
                }
                if (!value)
                    return;
                passedProps[__camelCase((_c = (_b = props[key]) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : key)] = value;
            });
        }
        else {
            passedProps = props;
        }
        this._finalProps = __deepMerge(this.defaultProps, this.InterfaceToApply.apply(passedProps, {
            descriptor: {
                defaults: false,
            },
        }));
        return this._finalProps;
    }
    get defaultProps() {
        var _a, _b, _c;
        if (this._defaultProps)
            return Object.assign({}, this._defaultProps);
        this._defaultProps = Object.assign({}, __deepMerge(
        // @ts-ignore
        this.InterfaceToApply.defaults(), (_a = this.sComponentUtilsSettings.defaultProps) !== null && _a !== void 0 ? _a : {}, (_b = this.constructor._defaultProps['*']) !== null && _b !== void 0 ? _b : {}, (_c = this.constructor._defaultProps[this.node.tagName.toLowerCase()]) !== null && _c !== void 0 ? _c : {}));
        return this._defaultProps;
    }
    static getFinalInterface(int) {
        class InlineSComponentUtilsInterface extends __SInterface {
        }
        InlineSComponentUtilsInterface.definition = SComponentDefaultInterface.definition;
        if (int) {
            InlineSComponentUtilsInterface.definition = Object.assign(Object.assign({}, SComponentDefaultInterface.definition), int.definition);
        }
        // @ts-ignore
        return InlineSComponentUtilsInterface;
    }
    injectStyle(css, id = this.tagName) {
        // @ts-ignore
        if (this.constructor._injectedStyles.indexOf(id) !== -1)
            return;
        // @ts-ignore
        this.constructor._injectedStyles.push(id);
        __injectStyle(css, id);
    }
    /**
     * @name            exposeApi
     * @type            Function
     *
     * This method allows you to pass a simple key value object
     * that tells binding of some methods on the actual dom node.
     *
     * @param       {Any}           apiObj          The simple key value pairs api object
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    exposeApi(apiObj) {
        setTimeout(() => {
            let $on = this.node;
            Object.keys(apiObj).forEach((apiFnName) => {
                const apiFn = apiObj[apiFnName];
                $on[apiFnName] = apiFn;
            });
        });
    }
    /**
     * @name          className
     * @type          Function
     *
     * This method allows you to get a component ready className like my-component__something, etc...
     *
     * @param         {String}        cls         The class you want to process. Can be multiple classes separated by a space
     * @return        {String}                    The generated class that you can apply
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    className(cls = '', style = '') {
        let clsString = cls
            .split(' ')
            .map((clsName) => `${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^__/) ? '-' : ''}${clsName}`)
            .join(' ');
        if (style && this.props.defaultStyle) {
            clsString += ` ${style}`;
        }
        return clsString;
    }
    /**
     * @name      isMounted
     * @type      Function
     *
     * This method returns true if the component is mounted, false if not
     *
     * @return    {Boolean}       true if is mounted, false if not
     *
     * @since   2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    isMounted() {
        var _a;
        return (_a = this.node) === null || _a === void 0 ? void 0 : _a.hasAttribute('mounted');
    }
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
SComponent._defaultProps = {};
SComponent._injectedStyles = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBvbmVudFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbXBvbmVudFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxnRUFBZ0U7Ozs7Ozs7Ozs7QUFFaEUscUNBQXFDO0FBQ3JDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sd0JBQXdCLE1BQU0sbURBQW1ELENBQUM7QUFDekYsT0FBTyxhQUFhLE1BQU0sd0NBQXdDLENBQUM7QUFDbkUsT0FBTyxnQkFBZ0IsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUl0RSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsWUFBWTs7QUFDakQscUNBQVUsR0FBRztJQUNoQixFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO1FBQ2xDLE9BQU8sRUFBRSxVQUFVO0tBQ3RCO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsSUFBSTtRQUNiLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsSUFBSTtRQUNiLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0osQ0FBQztBQW9CTixNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFR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