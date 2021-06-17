var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SClass from '@coffeekraken/s-class';
import __mustache from 'mustache';
import __handlebars from 'handlebars';
export default class SComponentUtils extends __SClass {
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
        var _a;
        super(__deepMerge({}, settings));
        /**
         * @name            $targets
         * @type            HTMLElement[]
         *
         * Store the target(s) getted using the "target" property
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.$targets = [];
        this.node = node;
        this.name = node.tagName.toLowerCase();
        this.props = props !== null && props !== void 0 ? props : {};
        Object.keys(this.constructor._defaultProps).forEach(selector => {
            const defaultProps = this.constructor._defaultProps[selector];
            if (selector === this.name || (this.node.id && selector === `#${this.node.id}`) || (this.node.id && selector === `${this.name}#${this.node.id}`)) {
                this.props = __deepMerge(defaultProps, this.props);
            }
        });
        if (this._settings.interface) {
            this._settings.interface.definition = Object.assign(Object.assign({}, this._settings.interface.definition), { target: {
                    type: 'String'
                }, defaultStyle: {
                    type: {
                        type: 'Boolean',
                        nullishAsTrue: true
                    },
                    default: false
                } });
            Object.keys(this._settings.interface.definition).forEach(propName => {
                const obj = this._settings.interface.definition[propName];
                if (obj.type && (obj.type === 'Boolean' || obj.type === 'boolean')) {
                    obj.type = {
                        type: 'Boolean',
                        nullishAsTrue: true
                    };
                    this._settings.interface.definition[propName] = obj;
                }
            });
            this.props = this._settings.interface.apply((_a = this.props) !== null && _a !== void 0 ? _a : {}).value;
            if (this.props.target) {
                if (!this.props.target.match(/^(\.|\[])/)) {
                    this._targetSelector = `#${this.props.target}`;
                }
                else {
                    this._targetSelector = this.props.target;
                }
                if (this._targetSelector) {
                    const targets = Array.from(document.querySelectorAll(this._targetSelector));
                    // @ts-ignore
                    if (targets.length)
                        this.$targets = targets;
                }
            }
        }
        __handlebars.registerHelper('if_even', function (conditional, options) {
            if ((conditional % 2) == 0) {
                return options.fn(this);
            }
            else {
                return options.inverse(this);
            }
        });
    }
    static setDefaultProps(selector, props) {
        this._defaultProps[selector] = props;
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
            .map((clsName) => `${this.name}${clsName && !clsName.match(/^__/) ? '-' : ''}${clsName}`)
            .join(' ');
        if (style && this.props.defaultStyle) {
            clsString += ` ${style}`;
        }
        return clsString;
    }
    decodeHtml(input) {
        const e = document.createElement('textarea');
        e.innerHTML = input;
        // handle case of empty input
        return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
    }
    /**
     * @name          compileMustache
     * @type          Function
     *
     * This method allows you to compile some mustache template
     * directly from your component.
     *
     * @param         {String}        template        The template to compile
     * @param         {any}           data            The data with which you want to compile your template
     * @return        {String}                        The compiled template
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    compileMustache(template, data) {
        const res = __mustache.render(template, data);
        return res;
    }
    /**
     * @name          compileHandlebars
     * @type          Function
     *
     * This method allows you to compile some mustache template
     * directly from your component.
     *
     * @param         {String}        template        The template to compile
     * @param         {any}           data            The data with which you want to compile your template
     * @return        {String}                        The compiled template
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    compileHandlebars(template, data) {
        const renderFn = __handlebars.compile(template);
        const res = renderFn(data);
        return res;
    }
    /**
     * @name        dispatchSyncEvent
     * @type        Function
     *
     * This method allows you to dispatch a sync event that will wait for an answer
     * before passing to the next statements.
     * This mechanism work by sending a "ping" event to check if someone (another component) listen to us.
     * If their's no answer, we pass to the next statements whichout doing anything but
     * if we have an answer, we send the actual event and wait for an answer.
     *
     * @param     {String}     name       The event name you want to send
     * @param     {Any}       details     Some details you want to attach to the event
     * @return    {SPromise}              An SPromise instance that will be resolved if we get an answer and rejected if not
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    dispatchSyncEvent(name, details) {
        return new Promise((resolve, reject) => {
            let hasListeners = false;
            this.node.dispatchEvent(new CustomEvent(name, {
                detail: Object.assign(Object.assign({}, details), { onPing() {
                        hasListeners = true;
                    },
                    onResolve(data) {
                        resolve(data);
                    } })
            }));
            setTimeout(() => {
                if (!hasListeners)
                    reject();
            });
        });
    }
    addTargetsEventListener(name, handler) {
        this.$targets.forEach($target => {
            $target.addEventListener(name, (e) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                // @ts-ignore
                if (!((_a = e.detail) === null || _a === void 0 ? void 0 : _a.onPing))
                    return handler(e);
                // @ts-ignore
                e.detail.onPing();
                const res = yield handler(e);
                // @ts-ignore
                e.detail.onResolve(res);
            }));
        });
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
 * @param     {String}      selector      The selector to use to target elements on which these props will be applied
 * @param     {Any}         props         An object of props you want to set defaults for
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
SComponentUtils._defaultProps = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBvbmVudFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbXBvbmVudFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUVsQyxPQUFPLFlBQVksTUFBTSxZQUFZLENBQUM7QUFvQ3RDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxRQUFRO0lBcUVuRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLElBQWlCLEVBQ2pCLEtBQVUsRUFDVixXQUFrRCxFQUFFOztRQUVwRCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBakRuQzs7Ozs7Ozs7V0FRRztRQUNILGFBQVEsR0FBa0IsRUFBRSxDQUFDO1FBeUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLENBQUM7UUFFekIsTUFBTSxDQUFDLElBQUksQ0FBTyxJQUFJLENBQUMsV0FBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwRSxNQUFNLFlBQVksR0FBUyxJQUFJLENBQUMsV0FBWSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRSxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJ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