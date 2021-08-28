import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SClass from '@coffeekraken/s-class';
// import __mustache from 'mustache';
import __SInterface from '@coffeekraken/s-interface';
// import __handlebars from 'handlebars';
import __striptags from '@coffeekraken/sugar/shared/html/striptags';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import __whenInViewport from '@coffeekraken/sugar/js/dom/detect/whenInViewport';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __injectStyle from '@coffeekraken/sugar/js/css/injectStyle';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __cloneClass from '@coffeekraken/sugar/shared/class/utils/cloneClass';
import __clone from '@coffeekraken/sugar/shared/object/clone';

/**
 * @name                SComponentUtils
 * @namespace           shared
 * @type                Class
 * @extends             SClass
 * @status              beta
 *
 * This class allows you to access some component utils like ```className```, and more to come
 *
 * @param       {String}            name                    Specify the component name in dash-case
 * @param       {Object}            [settings={}]           Configure your instance as wanted
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SComponentUtils from '@coffeekraken/s-component-utils';
 * const component = new SComponentUtils('my-cool-component');
 * component.className('__something'); // => my-cool-component__something
 * component.className('hello'); // => my-cool-component-hello
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface ISComponentUtilsDataProvider {
    getData(): Promise<any>;
}

export interface ISComponentUtilsSettings {
    interface?: typeof __SInterface;
    rootNode?: HTMLElement;
    display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'grid';
    defaultProps?: any;
}

export interface ISComponentUtilsCtorSettings {
    componentUtils: Partial<ISComponentUtilsSettings>;
}

export interface ISComponentUtilsDefaultProps {
    id: string;
    mountWhen: 'directly' | 'inViewport';
    adoptStyle: boolean;
    defaultStyle: boolean;
}

export class SComponentUtilsDefaultInterface extends __SInterface {
    static definition = {
        id: {
            type: 'String',
            physical: true,
        },
        mounted: {
            type: 'Boolean',
            default: false,
            physical: true,
        },
        // ready: {
        //     type: 'Boolean',
        //     default: false,
        //     physical: true,
        // },
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
}

export default class SComponentUtils extends __SClass {
    /**
     * @name            node
     * @type            HTMLElement
     *
     * Store the component node
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    node: HTMLElement;

    /**
     * @name            name
     * @type            String
     *
     * Store the component name
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    name: string;

    /**
     * @name            props
     * @type            Object
     *
     * Store the component props
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    props: any;

    /**
     * @name            $targets
     * @type            HTMLElement[]
     *
     * Store the target(s) getted using the "target" property
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    $targets: HTMLElement[] = [];

    _InterfaceToApply: __SInterface;
    _targetSelector?: string;

    shouldUpdate = false;

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
    static _defaultProps: any = {};
    static setDefaultProps(selector: string | string[], props: any): void {
        Array.from(selector).forEach((sel) => {
            this._defaultProps[sel] = {
                ...(this._defaultProps[sel] ?? {}),
                ...props,
            };
        });
    }

    /**
     * @name        componentUtilsSettings
     * @type        ISComponentUtilsSettings
     * @get
     *
     * Access the component utils sertings
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    get componentUtilsSettings(): ISComponentUtilsSettings {
        return (<any>this._settings).componentUtils;
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
    constructor(name: string, node: HTMLElement, props: any, settings: Partial<ISComponentUtilsCtorSettings> = {}) {
        super(
            __deepMerge(
                {
                    componentUtils: {
                        get rootNode() {
                            return node.shadowRoot?.querySelector('*:first-child');
                        },
                    },
                },
                settings,
            ),
        );

        // name
        this.name = name;

        // node
        this.node = node;
        // @ts-ignore
        if (!this.node.tagName) this.node = this.node.parentNode;
        // @ts-ignore
        if (this.node.parentNode?.tagName?.toLowerCase() === this.name) {
            // @ts-ignore
            this.node = node.parentNode;
        }

        let InterfaceToApply = class InlineComponentUtilsInterface extends __SInterface {
            static definition = {};
        };

        // @ts-ignore
        InterfaceToApply.definition = {
            ...Object.assign({}, SComponentUtilsDefaultInterface.definition),
            // @ts-ignore
            ...(this.componentUtilsSettings.interface?.definition ?? {}),
        };
        // @ts-ignore
        this._InterfaceToApply = InterfaceToApply;

        // props
        const defaultProps = __deepMerge(
            // @ts-ignore
            InterfaceToApply.defaults(),
            this.componentUtilsSettings.defaultProps ?? {},
            (<any>this.constructor)._defaultProps['*'] ?? {},
            (<any>this.constructor)._defaultProps[this.name] ?? {},
        );

        let passedProps = {};
        if (props.constructor.name === 'NamedNodeMap') {
            Object.keys(props).forEach((key) => {
                let value;
                if (props[key]?.nodeValue !== undefined) {
                    if (props[key].nodeValue === '') value = true;
                    else value = props[key].nodeValue;
                }
                if (!value) return;
                passedProps[__camelCase(props[key]?.name ?? key)] = value;
            });
        } else {
            passedProps = props;
        }
        this.props = __deepMerge(
            defaultProps,
            InterfaceToApply.apply(passedProps, {
                descriptor: {
                    defaults: false,
                },
            }),
        );

        // @ts-ignore
        const nodeFirstUpdated = this.node.firstUpdated?.bind(this.node);
        // @ts-ignore
        this.node.firstUpdated = async () => {
            if (nodeFirstUpdated) {
                await nodeFirstUpdated();
            }
            // set the component as mounted
            this.node.mounted = true;
        };

        // litElement shouldUpdate
        // @ts-ignore
        const nodeShouldUpdate = this.node.shouldUpdate?.bind(this.node);
        // @ts-ignore
        this.node.shouldUpdate = () => {
            if (nodeShouldUpdate) {
                const res = nodeShouldUpdate();
                if (!res) return false;
            }
            return this.shouldUpdate;
        };

        // set each props on the node
        Object.keys(this.props).forEach((prop) => {
            // _updateProp(prop, this.node[prop]);
            this.node[prop] = this.props[prop];
        });

        // @ts-ignore
        const styleStr = this.node.constructor.styles;
        this.injectStyle(styleStr?.cssText ?? '');

        // mount component when needed
        switch (this.props.mountWhen) {
            case 'inViewport':
                (async () => {
                    // @ts-ignore
                    await __whenInViewport(this.node);
                    this.mount();
                })();
                break;
            case 'direct':
            case 'directly':
            default:
                this.mount();
                break;
        }
    }

    static getFinalInterface(int?: typeof __SInterface): __SInterface {
        class InlineComponentUtilsInterface extends __SInterface {
            static definition = SComponentUtilsDefaultInterface.definition;
        }
        if (int) {
            InlineComponentUtilsInterface.definition = {
                ...SComponentUtilsDefaultInterface.definition,
                // @ts-ignore
                ...int.definition,
            };
        }
        // @ts-ignore
        return InlineComponentUtilsInterface;
    }

    static properties(properties: any, int: typeof __SInterface): any {
        const propertiesObj = {};
        const InterfaceToApply = this.getFinalInterface(int);

        // @ts-ignore
        Object.keys(InterfaceToApply.definition).forEach((prop) => {
            // @ts-ignore
            const definition = InterfaceToApply.definition[prop];
            propertiesObj[prop] = {
                ...(definition.lit ?? {}),
            };
            // const type = definition.type?.type ?? definition.type ?? 'string';
            if (
                definition.physical ||
                definition.type?.toLowerCase?.() === 'boolean' ||
                definition.type?.type?.toLowerCase?.() === 'boolean'
            ) {
                propertiesObj[prop].reflect = true;
                propertiesObj[prop].attribute = __dashCase(prop);
                propertiesObj[prop].converter = {
                    toAttribute(value) {
                        if (value === false || value === null) return null;
                        return String(value);
                    },
                };
            }
        });

        const props = {
            ...propertiesObj,
            ...(properties ?? {}),
        };

        return props;
    }

    static _injectedStyles: string[] = [];
    injectStyle(css, id = this.node.tagName) {
        // @ts-ignore
        if (this.constructor._injectedStyles.indexOf(id) !== -1) return;
        // @ts-ignore
        this.constructor._injectedStyles.push(id);
        __injectStyle(css);
    }

    async mount() {
        // adopting parent styles
        if (this.props.adoptStyle) await this._adoptStyle();
        // set the not as updatable
        this.shouldUpdate = true;
        // @ts-ignore
        this.node.requestUpdate();
    }

    static _styleNodes = [];
    async _adoptStyle() {
        const $links = document.querySelectorAll('link[rel="stylesheet"]');
        if ($links && this.node.shadowRoot) {
            Array.from($links).forEach(async ($link) => {
                if (Array.isArray(this.props.adoptStyle) && this.props.adoptStyle.indexOf($link.id ?? '') === -1) {
                    return; // this style is not wanted...
                }

                // @ts-ignore
                if ($link._stylesheet) {
                    // @ts-ignore
                    this.node.shadowRoot.adoptedStyleSheets = [
                        // @ts-ignore
                        ...this.node.shadowRoot.adoptedStyleSheets,
                        // @ts-ignore
                        $link._stylesheet,
                    ];
                    return;
                }

                this.node.shadowRoot?.appendChild($link.cloneNode());

                // avoid processing multiple time same stylesheet
                // @ts-ignore
                if (this.constructor._styleNodes.indexOf($link) !== -1) return;
                // @ts-ignore
                this.constructor._styleNodes.push($link);

                // request stylesheet to store it in a unique CSSStylesheet instance
                // @ts-ignore
                const res = await fetch($link.href, {
                    headers: {
                        Accept: 'text/css,*/*;q=0.1',
                    },
                });

                let cssStr = await res.text();
                const stylesheet = new CSSStyleSheet();
                // @ts-ignore
                stylesheet.replace(cssStr);
                // @ts-ignore
                $link._stylesheet = stylesheet;
            });
        }

        const $styles = document.querySelectorAll('style');
        if ($styles && this.node.shadowRoot) {
            Array.from($styles).forEach(($style) => {
                if (Array.isArray(this.props.adoptStyle) && this.props.adoptStyle.indexOf($style.id ?? '') === -1) {
                    return; // this style is not wanted...
                }

                // @ts-ignore
                if ($style._stylesheet) {
                    // @ts-ignore
                    this.node.shadowRoot.adoptedStyleSheets = [
                        // @ts-ignore
                        ...this.node.shadowRoot.adoptedStyleSheets,
                        // @ts-ignore
                        $style._stylesheet,
                    ];
                    return;
                }

                const stylesheet = new CSSStyleSheet();
                // @ts-ignore
                stylesheet.replace($style.innerHTML);
                // @ts-ignore
                $style._stylesheet = stylesheet;

                // @TODO            avoid these ts-ignore
                // @ts-ignore
                this.node.shadowRoot.adoptedStyleSheets = [
                    // @ts-ignore
                    ...this.node.shadowRoot.adoptedStyleSheets,
                    // @ts-ignore
                    $style._stylesheet,
                ];
            });
        }

        return true;
    }

    exposeApi(apiObj: any): void {
        setTimeout(() => {
            let $on = this.node;
            // @ts-ignore
            if (this.node.parentNode?._component) {
                // check if the parent a a vue3-component-wrapper
                // @ts-ignore
                $on = this.node.parentNode;
            }
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
            .map((clsName) => `${this.name}${clsName && !clsName.match(/^__/) ? '-' : ''}${clsName}`)
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
        return this.node?.hasAttribute('mounted');
    }

    decodeHtml(input) {
        const e = document.createElement('textarea');
        e.innerHTML = input;
        // handle case of empty input
        return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
    }

    // /**
    //  * @name          compileMustache
    //  * @type          Function
    //  *
    //  * This method allows you to compile some mustache template
    //  * directly from your component.
    //  *
    //  * @param         {String}        template        The template to compile
    //  * @param         {any}           data            The data with which you want to compile your template
    //  * @return        {String}                        The compiled template
    //  *
    //  * @since         2.0.0
    //  * @author 		Olivier Bossel<olivier.bossel@gmail.com>
    //  */
    // compileMustache(template: string, data: any): string {
    //   const res = __mustache.render(template, data);
    //   return res;
    // }

    // /**
    //  * @name          renderHandlerbars
    //  * @type          Function
    //  *
    //  * This method allows you to compile some mustache template
    //  * directly from your component.
    //  *
    //  * @param         {String}        template        The template to compile
    //  * @param         {any}           data            The data with which you want to compile your template
    //  * @return        {String}                        The compiled template
    //  *
    //  * @since         2.0.0
    //  * @author 		Olivier Bossel<olivier.bossel@gmail.com>
    //  */
    // renderHandlerbars(template: string, data: any): string {
    //   const renderFn = __handlebars.compile(template);
    //   const res = renderFn(data);
    //   return res;
    // }

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
    dispatchSyncEvent(name: string, details: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let hasListeners = false;

            this.node.dispatchEvent(
                new CustomEvent(name, {
                    detail: {
                        ...details,
                        onPing() {
                            hasListeners = true;
                        },
                        onResolve(data) {
                            resolve(data);
                        },
                    },
                }),
            );
            setTimeout(() => {
                if (!hasListeners) reject();
            });
        });
    }

    addSyncEventListener(name: string, handler: Function): void {
        this.node.addEventListener(name, async (e) => {
            // @ts-ignore
            if (!e.detail?.onPing) return handler(e);
            // @ts-ignore
            e.detail.onPing();
            const res = await handler(e);
            // @ts-ignore
            e.detail.onResolve(res);
        });
    }

    addSyncEventListenerOn($targets, name: string, handler: Function): void {
        $targets.forEach(($target) => {
            $target.addEventListener(name, async (e) => {
                // @ts-ignore
                if (!e.detail?.onPing) return handler(e);
                // @ts-ignore
                e.detail.onPing();
                const res = await handler(e);
                // @ts-ignore
                e.detail.onResolve(res);
            });
        });
    }

    addTargetsEventListener(name: string, handler: Function): void {
        this.$targets.forEach(($target) => {
            $target.addEventListener(name, async (e) => {
                // @ts-ignore
                if (!e.detail?.onPing) return handler(e);
                // @ts-ignore
                e.detail.onPing();
                const res = await handler(e);
                // @ts-ignore
                e.detail.onResolve(res);
            });
        });
    }
}
