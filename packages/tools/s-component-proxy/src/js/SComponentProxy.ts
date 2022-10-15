import __SClass from '@coffeekraken/s-class';
import __SInterface from '@coffeekraken/s-interface';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __mitosisWebcomponentAdapter from './adapters/mitosisWebcomponentAdapter';
import __reactAdapter from './adapters/reactAdapter';

/**
 * @name                SComponentProxy
 * @namespace           node
 * @type                Class
 * @extends             SPromise
 * @status              wip
 *
 * This class allows you to manage component builded in frameworks like React, Solid, etc...
 * You will be able to set new properties and il will update the component accordingly.
 *
 * @param           {Any}           component               The component tu handle
 * @param           {Object}        [settings={}]           An object of settings to configure your SComponentProxy instance:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SComponentProxy from '@coffeekraken/s-component-proxy';
 * const component = new SComponentProxy(myComponent);
 * component.setProps({
 *      hello: 'world'
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface ISComponentProxySettings {}

export interface ISComponentProxyMetas {
    type: 'webcomponent' | 'react';
    interface: __SInterface;
    preview: string;
}

export interface ISComponentProxyComponent {
    default: any;
    metas?: Partial<ISComponentProxyMetas>;
    preview?: string;
    define?: Function;
    DEFAULT_PROPS?: any;
    $element: any;
}

export interface ISComponentProxyAdapterTestFn {
    (component: any): boolean;
}
export interface ISComponentProxyAdapterSetPropsFn {
    (component: any, props: any): void;
}

export interface ISComponentProxyAdapter {
    id: string;
    test: ISComponentProxyAdapterTestFn;
    setProps: ISComponentProxyAdapterSetPropsFn;
}

export interface ISComponentProxyCreateSettings {
    $root: HTMLElement;
    html: string;
}

class SComponentProxy extends __SClass {
    /**
     * @name            component
     * @type            any
     *
     * Store the component to handle
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public component: ISComponentProxyComponent;

    /**
     * @name            adapter
     * @type            any
     *
     * Store the adapter to handle this component
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public adapter;

    /**
     * Store the registered adapters in { id: adapter } key pair object
     */
    static _registeredAdapter: Record<string, ISComponentProxyAdapter> = {};

    /**
     * @name            registerAdapter
     * @type            Function
     * @static
     *
     * This static method allows you to register a new component adapter for different frameworks, etc...
     *
     * @param       {ISComponentProxyAdapter}       adapter             The adapter to register
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerAdapter(adapter: ISComponentProxyAdapter): void {
        if (SComponentProxy._registeredAdapter[adapter.id]) {
            throw new Error(
                `[SComponentProxy.registerAdapter] Sorry but an adapter with the id "${adapter.id}" does already exists`,
            );
        }
        SComponentProxy._registeredAdapter[adapter.id] = adapter;
    }

    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(
        component: ISComponentProxyComponent,
        settings?: Partial<ISComponentProxySettings>,
    ) {
        super(
            __deepMerge(
                {
                    metas: {
                        id: 'SComponentProxy',
                    },
                },
                settings || {},
            ),
        );
        this.component = {
            default: null,
            metas: {},
            preview: '',
            define: null,
            DEFAULT_PROPS: {},
            $element: null,
            ...component,
        };

        for (let [id, adapter] of Object.entries(
            SComponentProxy._registeredAdapter,
        )) {
            if (adapter.test(this.component)) {
                this.adapter = adapter;
                break;
            }
        }

        if (!this.adapter) {
            console.log('[SComponentProxy] Passed component:', this.component);
            throw new Error(
                `[SComponentProxy] Sorry but no adapter has been found to handle the passed component`,
            );
        }
    }

    // _apply(component: ISComponentProxyComponent): any {
    //     if (!component) return;
    //     this.component.default = component;
    //     return component;
    // }

    /**
     * @name            create
     * @type            Function
     *
     * This method allows you to create a component through the adapter
     *
     * @param       {any}           props           The properties you want to set
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    create(settings: Partial<ISComponentProxyCreateSettings>): void {
        this.adapter.create(this.component, settings);
    }

    /**
     * @name            setProps
     * @type            Function
     *
     * This method allows you to set the properties of a component
     *
     * @param       {any}           props           The properties you want to set
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setProps(props: any): void {
        this.adapter.setProps(this.component, props);
    }
}

// register default adapters
SComponentProxy.registerAdapter(__mitosisWebcomponentAdapter);
SComponentProxy.registerAdapter(__reactAdapter);

export default SComponentProxy;
