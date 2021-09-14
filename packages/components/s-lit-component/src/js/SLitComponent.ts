// @ts-nocheck
// @TODO            check how to override private static methods

// import __mustache from 'mustache';
import __SInterface from '@coffeekraken/s-interface';
import __adoptStyleInShadowRoot from '@coffeekraken/sugar/js/css/adoptStyleInShadowRoot';
import __injectStyle from '@coffeekraken/sugar/js/css/injectStyle';
import __whenInViewport from '@coffeekraken/sugar/js/dom/detect/whenInViewport';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import { LitElement } from 'lit';

export interface ISLitComponentSettings {
    interface?: typeof __SInterface;
    rootNode?: HTMLElement;
    shadowDom?: boolean;
    defaultProps?: any;
}

export interface ISLitComponentCtorSettings {
    litComponent: Partial<ISLitComponentSettings>;
}

export interface ISLitComponentDefaultProps {
    id: string;
    mountWhen: 'directly' | 'inViewport';
    adoptStyle: boolean;
    defaultStyle: boolean;
}

export default class SLitComponent extends LitElement {
    /**
     * @name            _settings
     * @type            Object
     * @private
     *
     * Store the settings
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _settings = {};

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
    componentUtils: __SComponentUtils;
    _shouldUpdate = false;

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
    static setDefaultProps(selector: string | string[], props: any): void {
        __SComponentUtils.setDefaultProps(selector, props);
    }

    /**
     * @name        litComponentSettings
     * @type        ISLitComponentSettings
     * @get
     *
     * Access the component utils sertings
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    get litComponentSettings(): ISLitComponentSettings {
        return (<any>this._settings).litComponent;
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
    constructor(settings: Partial<ISLitComponentCtorSettings> = {}) {
        super();

        this._settings = __deepMerge(
            {
                componentUtils: {},
                litComponent: {
                    shadowDom: true,
                    get rootNode() {
                        return this.shadowRoot?.querySelector('*:first-child');
                    },
                },
            },
            settings,
        );

        this.componentUtils = new __SComponentUtils(this, this.attributes, {
            componentUtils: {
                ...(this._settings.componentUtils ?? {}),
                style: this.constructor.styles?.cssText ?? this._settings.componentUtils?.style ?? '',
            },
        });
        this.props = this.componentUtils.props;

        // shadow handler
        if (this.litComponentSettings.shadowDom === false) {
            this.createRenderRoot = () => {
                return this;
            };
        }

        // set each props on the node
        Object.keys(this.componentUtils.props).forEach((prop) => {
            this[prop] = this.componentUtils.props[prop];
        });

        // @ts-ignore
        const nodeFirstUpdated = this.firstUpdated?.bind(this);
        // @ts-ignore
        this.firstUpdated = async () => {
            if (nodeFirstUpdated) {
                await nodeFirstUpdated();
            }
            // set the component as mounted
            // @ts-ignore
            this.mounted = true;
        };

        // litElement shouldUpdate
        // @ts-ignore
        const nodeShouldUpdate = this.shouldUpdate?.bind(this);
        // @ts-ignore
        this.shouldUpdate = () => {
            if (nodeShouldUpdate) {
                const res = nodeShouldUpdate();
                if (!res) return false;
            }
            return this._shouldUpdate;
        };

        (async () => {
            const mountedCallback = await this.componentUtils.whenMountState();
            await this.mount();
            mountedCallback();
        })();
    }

    static properties(properties: any, int: typeof __SInterface): any {
        const propertiesObj = {};
        const InterfaceToApply = __SComponentUtils.getFinalInterface(int);

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
    async mount() {
        // set the not as updatable
        this._shouldUpdate = true;
        // @ts-ignore
        this.requestUpdate();
        this.componentUtils.injectStyle(this.constructor.styles?.cssText ?? '', this.tagName);
        await __wait();
        if (this.componentUtils.props.adoptStyle && this.shadowRoot) {
            await this.componentUtils.adoptStyleInShadowRoot(this.shadowRoot);
        }
        return true;
    }
}
