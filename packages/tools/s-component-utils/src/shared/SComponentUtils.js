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
                const targets = Array.from(document.querySelectorAll(this._targetSelector));
                // @ts-ignore
                if (targets.length)
                    this.$targets = targets;
                console.log(this.$targets);
            }
        }
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
                if (!((_a = e.detail) === null || _a === void 0 ? void 0 : _a.onPing))
                    return handler(e);
                e.detail.onPing();
                const res = yield handler(e);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBvbmVudFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbXBvbmVudFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQXFDbEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLFFBQVE7SUFxRW5EOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsSUFBaUIsRUFDakIsS0FBVSxFQUNWLFdBQWtELEVBQUU7O1FBRXBELEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFqRG5DOzs7Ozs7OztXQVFHO1FBQ0gsYUFBUSxHQUFrQixFQUFFLENBQUM7UUF5QzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLEVBQUUsQ0FBQztRQUV6QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlELElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxRQUFRLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVB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