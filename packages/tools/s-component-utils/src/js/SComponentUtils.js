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
        default: false,
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
        Array.from(selector).forEach((sel) => {
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
    /**
     * @name           defaultProps
     * @type            Any
     *
     * This property allows you to get back the default props object
     * that has been build using the SComponentUtilsDefaultProps interface
     * and the one you passed in the sComponent.interface setting
     *
     * @return      {Any}           The props object with all the default values
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    get defaultProps() {
        var _a, _b, _c;
        const defaultProps = __deepMerge(
        // @ts-ignore
        this.InterfaceToApply.defaults(), (_a = this.sComponentUtilsSettings.defaultProps) !== null && _a !== void 0 ? _a : {}, (_b = this.constructor._defaultProps['*']) !== null && _b !== void 0 ? _b : {}, (_c = this.constructor._defaultProps[this.name]) !== null && _c !== void 0 ? _c : {});
        return defaultProps;
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
        __injectStyle(css);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBvbmVudFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbXBvbmVudFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxnRUFBZ0U7Ozs7Ozs7Ozs7QUFFaEUscUNBQXFDO0FBQ3JDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sd0JBQXdCLE1BQU0sbURBQW1ELENBQUM7QUFDekYsT0FBTyxhQUFhLE1BQU0sd0NBQXdDLENBQUM7QUFDbkUsT0FBTyxnQkFBZ0IsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUl0RSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsWUFBWTs7QUFDakQscUNBQVUsR0FBRztJQUNoQixFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO1FBQ2xDLE9BQU8sRUFBRSxVQUFVO0tBQ3RCO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsSUFBSTtRQUNiLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0osQ0FBQztBQW9CTixNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBa0Y1Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQWlCLEVBQUUsS0FBVSxFQUFFLFdBQWtELEVBQUU7OztRQUMzRixLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksZUFBZSxFQUFFLEVBQUU7U0FDdEIsRUFDRCxRQUFRLENBQ1gsQ0FDSixDQUFDO1FBN0VOOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQW1FZCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixvREFBb0Q7UUFDcEQsSUFBSSxnQkFBZ0IsU0FBRyxNQUFNLDhCQUErQixTQUFRLFlBQVk7YUFFL0U7WUFEVSxhQUFVLEdBQUcsRUFBRztlQUMxQixDQUFDO1FBQ0YsYUFBYTtRQUNiLGdCQUFnQixDQUFDLFVBQVUsbUNBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLDBCQUEwQixDQUFDLFVBQVUsQ0FBQyxHQUV4RCxDQUFDLE1BQUEsTUFBQSxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUywwQ0FBRSxVQUFVLG1DQUFJLEVBQUUsQ0FBQyxDQUNoRSxDQUFDO1FBQ0YsYUFBYTtRQUNiLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUV6QyxhQUFhO1FBQ2IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQztRQUNwRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRWpDLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBTyxjQUFjLEVBQUUsRUFBRTtZQUM1RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBTyxZQUFZLEVBQUUsRUFBRTtnQkFDeEQsOEJBQThCO2dCQUM5QixRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO29CQUMxQixLQUFLLFlBQVk7d0JBQ2IsQ0FBQyxHQUFTLEVBQUU7NEJBQ1IsYUFBYTs0QkFDYixNQUFNLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEMsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO3dCQUNMLE1BQU07b0JBQ1YsS0FBSyxRQUFRLENBQUM7b0JBQ2QsS0FBSyxVQUFVLENBQUM7b0JBQ2hCO3dCQUNJLE1BQU07aUJBQ2I7Z0JBQ0QsWUFBWSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztvQkFDdkIsY0FBYyxFQUFFLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBeEZELE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBMkIsRUFBRSxLQUFVO1FBQzFELEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7O1lBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLG1DQUNoQixDQUFDLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsbUNBQUksRUFBRSxDQUFDLEdBQy9CLEtBQUssQ0FDWCxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSx1QkFBdUI7UUFDdkIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLGVBQWUsQ0FBQztJQUNqRCxDQUFDO0lBcUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsZ0JBQWdCO1FBQ1osT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsc0JBQXNCLENBQUMsV0FBd0IsRUFBRSxRQUF1QztRQUNwRixPQUFPLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBY0QsSUFBSSxLQUFLO1FBQ0wsMkJBQTJCO1FBQzNCLElBQUksSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxjQUFjLEVBQUU7WUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7Z0JBQy9CLElBQUksS0FBSyxDQUFDO2dCQUNWLElBQUksQ0FBQSxNQUFBLEtBQUssQ0FBQyxHQUFHLENBQUMsMENBQUUsU0FBUyxNQUFLLFNBQVMsRUFBRTtvQkFDckMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxLQUFLLEVBQUU7d0JBQUUsS0FBSyxHQUFHLElBQUksQ0FBQzs7d0JBQ3pDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO2lCQUNyQztnQkFDRCxJQUFJLENBQUMsS0FBSztvQkFBRSxPQUFPO2dCQUNuQixXQUFXLENBQUMsV0FBVyxDQUFDLE1BQUEsTUFBQSxLQUFLLENBQUMsR0FBRyxDQUFDLDBDQUFFLElBQUksbUNBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDOUQsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUMxQixJQUFJLENBQUMsWUFBWSxFQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUNyQyxVQUFVLEVBQUU7Z0JBQ1IsUUFBUSxFQUFFLEtBQUs7YUFDbEI7U0FDSixDQUFDLENBQ0wsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsSUFBSSxZQUFZOztRQUNaLE1BQU0sWUFBWSxHQUFHLFdBQVc7UUFDNUIsYUFBYTtRQUNiLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsRUFDaEMsTUFBQSxJQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxtQ0FBSSxFQUFFLEVBQy9DLE1BQU0sSUFBSSxDQUFDLFdBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLG1DQUFJLEVBQUUsRUFDaEQsTUFBTSxJQUFJLENBQUMsV0FBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1DQUFJLEVBQUUsQ0FDekQsQ0FBQztRQUNGLE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBeUI7UUFDOUMsTUFBTSw4QkFBK0IsU0FBUSxZQUFZOztRQUM5Qyx5Q0FBVSxHQUFHLDBCQUEwQixDQUFDLFVBQVUsQ0FBQztRQUU5RCxJQUFJLEdBQUcsRUFBRTtZQUNMLDhCQUE4QixDQUFDLFVBQVUsbUNBQ2xDLDBCQUEwQixDQUFDLFVBQVUsR0FFckMsR0FBRyxDQUFDLFVBQVUsQ0FDcEIsQ0FBQztTQUNMO1FBQ0QsYUFBYTtRQUNiLE9BQU8sOEJBQThCLENBQUM7SUFDMUMsQ0FBQztJQUdELFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPO1FBQzlCLGFBQWE7UUFDYixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2hFLGFBQWE7UUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFNBQVMsQ0FBQyxNQUFXO1FBQ2pCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDaEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsU0FBUyxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsS0FBSyxHQUFHLEVBQUU7UUFDMUIsSUFBSSxTQUFTLEdBQUcsR0FBRzthQUNkLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixHQUFHLENBQ0EsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUNSLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQ25HO2FBQ0EsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWYsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDbEMsU0FBUyxJQUFJLElBQUksS0FBSyxFQUFFLENBQUM7U0FDNUI7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQVM7O1FBQ0wsT0FBTyxNQUFBLElBQUksQ0FBQyxJQUFJLDBDQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDOztBQXpURDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSSx3QkFBYSxHQUFRLEVBQUUsQ0FBQztBQWlPeEIsMEJBQWUsR0FBYSxFQUFFLENBQUMifQ==