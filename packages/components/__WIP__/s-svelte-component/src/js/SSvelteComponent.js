// @ts-nocheck
import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __mustache from 'mustache';
import __stylesheetToString from '@coffeekraken/sugar/js/css/stylesheetToString';
import { onMount as __onMount, beforeUpdate as __beforeUpdate, afterUpdate as __afterUpdate, onDestroy as __onDestroy, tick as __tick, setContext as __setContext, getContext as __getContext, hasContext as __hasContext } from 'svelte';
import { writable } from 'svelte/store';
import __camelize from '@coffeekraken/sugar/shared/string/camelize';
class SSVelteComponent extends __SClass {
    constructor(params, settings) {
        var _a;
        super(__deepMerge({
            svelteComponent: {
                classPrefix: 's-'
            }
        }, settings || {}));
        this.props = {};
        /**
         * @name      styleStr
         * @type      String
         * @get
         *
         * Access the document style string
         *
         * @since     2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._styleStr = '';
        // disable mustache escaping
        __mustache.escape = function (text) {
            return text;
        };
        // @ts-ignore
        const interfaceClass = (_a = 
        // @ts-ignore
        this.svelteComponentSettings.interface) !== null && _a !== void 0 ? _a : this.constructor.interface;
        const processedParams = {};
        Object.keys(params).forEach((propName) => {
            processedParams[__camelize(propName)] = params[propName];
        });
        // @ts-ignore
        if (interfaceClass) {
            // add default props
            // @ts-ignore
            interfaceClass.definition = Object.assign(Object.assign({}, interfaceClass.definition), { noLnf: {
                    type: {
                        type: 'Boolean',
                        nullishAsTrue: true
                    },
                    default: false
                }, noBare: {
                    type: {
                        type: 'Boolean',
                        nullishAsTrue: true
                    },
                    default: false
                }, noStyle: {
                    type: {
                        type: 'Boolean',
                        nullishAsTrue: true
                    },
                    default: false
                } });
            // @ts-ignore
            const paramsInterfaceResult = interfaceClass.apply(processedParams !== null && processedParams !== void 0 ? processedParams : {});
            if (paramsInterfaceResult.hasIssues()) {
                throw new Error(paramsInterfaceResult.toString());
            }
            else {
                Object.keys(paramsInterfaceResult.value).forEach((propName) => {
                    let value = paramsInterfaceResult.value[propName];
                    const proxy = writable(paramsInterfaceResult.value[propName], () => {
                        return () => { };
                    });
                    proxy.subscribe((v) => {
                        value = v;
                    });
                    Object.defineProperty(this.props, propName, {
                        enumerable: true,
                        get() {
                            return value;
                        },
                        set(v) {
                            // proxy.update((v) => v);
                            proxy.set(v);
                        }
                    });
                });
            }
        }
        this.onMount(() => {
            if (this.props.noLnf) {
                this.$root.classList.add('s-no-lnf');
            }
            if (this.props.noBare) {
                this.$root.classList.add('s-no-bare');
            }
        });
    }
    /**
     * @name      svelteComponentSettings
     * @type      ISSvelteComponentSettings
     * @get
     *
     * Access the svelteComponent settings
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get svelteComponentSettings() {
        return this._settings.svelteComponent;
    }
    get styleStr() {
        if (!this._styleStr)
            this._styleStr = __stylesheetToString(document.styleSheets);
        return this._styleStr;
    }
    get $root() {
        if (!this._$root) {
            throw new Error(`To use the $root property, you MUST call the "setRoot" in your onMount component code and pass it the root HTMLElement of your HTML component code`);
        }
        return this._$root;
    }
    get $elm() {
        return this._componentElm;
    }
    /**
     * @name      styleElm
     * @type      HTMLElement
     * @get
     *
     * Access the root style HTMLElement inside the shadow dom
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get styleElm() {
        for (let i = 0; i < this._componentElm.shadowRoot.children.length; i++) {
            const elm = this._componentElm.shadowRoot.children[i];
            if (elm.tagName === 'STYLE')
                return elm;
        }
        return undefined;
    }
    setRoot($root) {
        this._$root = $root;
        this._componentElm = this._$root.parentNode.host;
        if (!this.props.noStyle) {
            this._applyStyles();
        }
    }
    /**
     * @name      _applyStyles
     * @type      Function
     *
     * This function simply check if a "@sugar.style.apply" directive has been applied
     * and apply it correctly using the stylesheets applied to the page
     *
     * @since     2.0.0
     *
     */
    _applyStyles() {
        if (!this.styleElm)
            return;
        const matches = this.styleElm.innerHTML.match(/[\.#]?[a-zA-Z0-9-_:>+*\s]+\{(.*\n?)content:"(s-style-[a-zA-Z0-9-_]+)"(.*\n?)\}/gm);
        if (matches) {
            let newStyleStr = this.styleElm.innerHTML;
            newStyleStr = newStyleStr.replace(/content:\?"s-style-[a-zA-Z0-9-_]+"/, '');
            matches.forEach((match) => {
                // @ts-ignore
                const selector = match.split('{')[0];
                // @ts-ignore
                const styleName = match.match(/content:"(.*)"/)[1];
                const reg = new RegExp(`\.${styleName}.*\{[^\}]+\}`, 'gm');
                const styleCssMatches = this.styleStr.match(reg);
                if (styleCssMatches) {
                    styleCssMatches.forEach((styleMatch) => {
                        const newStyle = styleMatch.replace(`.${styleName}`, selector);
                        newStyleStr += newStyle;
                    });
                }
            });
            this.styleElm.innerHTML = newStyleStr;
            const styleElm = document.createElement('style');
            styleElm.innerHTML = this.styleStr.replace(/--[a-zA-Z0-9-_]+:[^;]+;/gm, '');
            this._componentElm.shadowRoot.prepend(styleElm);
        }
    }
    compileMustache(template, data) {
        return __mustache.render(template, data);
    }
    className(name = '') {
        return name
            .split(' ')
            .map((cls) => `${this.svelteComponentSettings.classPrefix}${this.svelteComponentSettings.classPrefix && cls && !cls.match(/^__/)
            ? '-'
            : ''}${cls}`)
            .join(' ');
    }
    onMount(callback) {
        __onMount(callback);
    }
    beforeUpdate(callback) {
        __beforeUpdate(callback);
    }
    afterUpdate(callback) {
        __afterUpdate(callback);
    }
    onDestroy(callback) {
        __onDestroy(callback);
    }
    tick() {
        __tick();
    }
    getContext(callback) {
        __getContext(callback);
    }
    hasContext(callback) {
        __hasContext(callback);
    }
    setContext(key, context) {
        __setContext(key, context);
    }
}
export default SSVelteComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdmVsdGVDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLG9CQUFvQixNQUFNLCtDQUErQyxDQUFDO0FBRWpGLE9BQU8sRUFDTCxPQUFPLElBQUksU0FBUyxFQUNwQixZQUFZLElBQUksY0FBYyxFQUM5QixXQUFXLElBQUksYUFBYSxFQUM1QixTQUFTLElBQUksV0FBVyxFQUN4QixJQUFJLElBQUksTUFBTSxFQUNkLFVBQVUsSUFBSSxZQUFZLEVBQzFCLFVBQVUsSUFBSSxZQUFZLEVBQzFCLFVBQVUsSUFBSSxZQUFZLEVBRTNCLE1BQU0sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFeEMsT0FBTyxVQUFVLE1BQU0sNENBQTRDLENBQUM7QUFZcEUsTUFBTSxnQkFBaUIsU0FBUSxRQUFRO0lBOEVyQyxZQUFZLE1BQVcsRUFBRSxRQUFpRDs7UUFDeEUsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLGVBQWUsRUFBRTtnQkFDZixXQUFXLEVBQUUsSUFBSTthQUNsQjtTQUNGLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUF2RkosVUFBSyxHQUF3QixFQUFFLENBQUM7UUFnQmhDOzs7Ozs7Ozs7V0FTRztRQUNILGNBQVMsR0FBVyxFQUFFLENBQUM7UUErRHJCLDRCQUE0QjtRQUM1QixVQUFVLENBQUMsTUFBTSxHQUFHLFVBQVUsSUFBSTtZQUNoQyxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztRQUVGLGFBQWE7UUFDYixNQUFNLGNBQWM7UUFDbEIsYUFBYTtRQUNiLElBQUksQ0FB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