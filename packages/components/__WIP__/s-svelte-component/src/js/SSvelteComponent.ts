// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SInterface from '@coffeekraken/s-interface';
import __mustache from 'mustache';
import __stylesheetToString from '@coffeekraken/sugar/js/dom/css/stylesheetToString';

import {
    onMount as __onMount,
    beforeUpdate as __beforeUpdate,
    afterUpdate as __afterUpdate,
    onDestroy as __onDestroy,
    tick as __tick,
    setContext as __setContext,
    getContext as __getContext,
    hasContext as __hasContext,
    createEventDispatcher as __createEventDispatcher,
} from 'svelte';
import { writable } from 'svelte/store';
import { get_current_component } from 'svelte/internal';
import __camelize from '@coffeekraken/sugar/shared/string/camelize';

export interface ISSvelteComponentCtorSettings {
    svelteComponent?: Partial<ISSvelteComponentSettings>;
}
export interface ISSvelteComponentSettings {
    classPrefix: string;
    interface: __SInterface;
}

export interface ISSvelteComponent {}

class SSVelteComponent extends __SClass implements ISSvelteComponent {
    props: Record<string, any> = {};

    /**
     * @name      svelteComponentSettings
     * @type      ISSvelteComponentSettings
     * @get
     *
     * Access the svelteComponent settings
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get svelteComponentSettings(): ISSvelteComponentSettings {
        return (<any>this).settings.svelteComponent;
    }

    /**
     * @name      styleStr
     * @type      String
     * @get
     *
     * Access the document style string
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _styleStr: string = '';
    get styleStr(): string {
        if (!this._styleStr)
            this._styleStr = __stylesheetToString(document.styleSheets);
        return this._styleStr;
    }

    /**
     * @name      $root
     * @type      HTMLElement
     * @get
     *
     * Access the root HTMLElement inside the shadow dom
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    // _currentComponent;
    _$root: HTMLElement;
    get $root(): HTMLElement {
        if (!this._$root) {
            throw new Error(
                `To use the $root property, you MUST call the "setRoot" in your onMount component code and pass it the root HTMLElement of your HTML component code`,
            );
        }
        return this._$root;
    }

    _componentElm: HTMLElement;
    get $elm(): HTMLElement {
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get styleElm(): HTMLElement | undefined {
        for (
            let i = 0;
            i < this._componentElm.shadowRoot.children.length;
            i++
        ) {
            const elm = this._componentElm.shadowRoot.children[i];
            if (elm.tagName === 'STYLE') return elm;
        }
        return undefined;
    }

    constructor(
        params: any,
        settings?: Partial<ISSvelteComponentCtorSettings>,
    ) {
        super(
            __deepMerge(
                {
                    svelteComponent: {
                        classPrefix: 's-',
                    },
                },
                settings || {},
            ),
        );

        // disable mustache escaping
        __mustache.escape = function (text) {
            return text;
        };

        // @ts-ignore
        const interfaceClass =
            // @ts-ignore
            this.svelteComponentSettings.interface ??
            this.constructor.interface;

        const processedParams = {};
        Object.keys(params).forEach((propName) => {
            processedParams[__camelize(propName)] = params[propName];
        });

        // @ts-ignore
        if (interfaceClass) {
            // add default props
            // @ts-ignore
            interfaceClass.definition = {
                // @ts-ignore
                ...interfaceClass.definition,
                noLnf: {
                    type: {
                        type: 'Boolean',
                        nullishAsTrue: true,
                    },
                    default: false,
                },
                noBare: {
                    type: {
                        type: 'Boolean',
                        nullishAsTrue: true,
                    },
                    default: false,
                },
                noStyle: {
                    type: {
                        type: 'Boolean',
                        nullishAsTrue: true,
                    },
                    default: false,
                },
            };
            // @ts-ignore
            const paramsInterfaceResult = interfaceClass.apply(
                processedParams ?? {},
            );
            if (paramsInterfaceResult.hasIssues()) {
                throw new Error(paramsInterfaceResult.toString());
            } else {
                Object.keys(paramsInterfaceResult.value).forEach((propName) => {
                    let value = paramsInterfaceResult.value[propName];

                    const proxy = writable(
                        paramsInterfaceResult.value[propName],
                        () => {
                            return () => {};
                        },
                    );

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
                        },
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
    _applyStyles(): void {
        if (!this.styleElm) return;
        const matches = this.styleElm.innerHTML.match(
            /[\.#]?[a-zA-Z0-9-_:>+*\s]+\{(.*\n?)content:"(s-style-[a-zA-Z0-9-_]+)"(.*\n?)\}/gm,
        );
        if (matches) {
            let newStyleStr = this.styleElm.innerHTML;
            newStyleStr = newStyleStr.replace(
                /content:\?"s-style-[a-zA-Z0-9-_]+"/,
                '',
            );
            matches.forEach((match) => {
                // @ts-ignore
                const selector = match.split('{')[0];
                // @ts-ignore
                const styleName = match.match(/content:"(.*)"/)[1];
                const reg = new RegExp(`\.${styleName}.*\{[^\}]+\}`, 'gm');
                const styleCssMatches = this.styleStr.match(reg);
                if (styleCssMatches) {
                    styleCssMatches.forEach((styleMatch) => {
                        const newStyle = styleMatch.replace(
                            `.${styleName}`,
                            selector,
                        );
                        newStyleStr += newStyle;
                    });
                }
            });
            this.styleElm.innerHTML = newStyleStr;

            const styleElm = document.createElement('style');
            styleElm.innerHTML = this.styleStr.replace(
                /--[a-zA-Z0-9-_]+:[^;]+;/gm,
                '',
            );
            this._componentElm.shadowRoot.prepend(styleElm);
        }
    }

    compileMustache(template: string, data: any): string {
        return __mustache.render(template, data);
    }

    className(name: string = '') {
        return name
            .split(' ')
            .map(
                (cls) =>
                    `${this.svelteComponentSettings.classPrefix}${
                        this.svelteComponentSettings.classPrefix &&
                        cls &&
                        !cls.match(/^__/)
                            ? '-'
                            : ''
                    }${cls}`,
            )
            .join(' ');
    }

    onMount(callback: any): void {
        __onMount(callback);
    }

    beforeUpdate(callback: any): void {
        __beforeUpdate(callback);
    }

    afterUpdate(callback: any): void {
        __afterUpdate(callback);
    }

    onDestroy(callback: any): void {
        __onDestroy(callback);
    }

    tick(): void {
        __tick();
    }

    getContext(callback: Function): void {
        __getContext(callback);
    }

    hasContext(callback: Function): void {
        __hasContext(callback);
    }

    setContext(key: any, context: any): void {
        __setContext(key, context);
    }
}

export default SSVelteComponent;
