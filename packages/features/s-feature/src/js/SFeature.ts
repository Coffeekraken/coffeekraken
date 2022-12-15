import __SClass from '@coffeekraken/s-class';
import type { ISComponentUtilsSettings } from '@coffeekraken/s-component-utils';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __SInterface from '@coffeekraken/s-interface';
import { __injectStyle, __querySelectorLive } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';

/**
 * @name                SFeature
 * @namespace           shared
 * @type                Class
 * @extends             SClass
 * @status              beta
 *
 * This class allows you to create "features". Feature is like webcomponent but does not provide a
 * custom HTML tag.
 *
 * @param       {String}            name                    Specify the component name in dash-case
 * @param       {Object}            [settings={}]           Configure your instance as wanted
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SFeature from '@coffeekraken/s-lit-component';
 * const component = new SFeature('my-cool-component');
 * component.className('__something'); // => my-cool-component__something
 * component.className('hello'); // => my-cool-component-hello
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface ISFeatureSettings extends ISComponentUtilsSettings {
    name: string;
    interface?: typeof __SInterface;
    defaultProps?: any;
}

export interface ISFeatureDefaultProps {
    id: string;
    mountWhen: 'directly' | 'inViewport';
}

export interface ISFeature {
    name: string;
    node: HTMLElement;
    props: any;
    componentUtils: __SComponentUtils;
}

export default class SFeature extends __SClass implements ISFeature {
    /**
     * @name            name
     * @type            String
     *
     * Store the feature name
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    name: String;

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
     * @name              define
     * @type            Function
     * @static
     *
     * This static method allows you to register a new feature
     * associated with an HTMLElement attribute like "s-activate", etc...
     *
     * @param           {String}        name           The attribute that trigger the feature
     * @param           {SFeature}       feature                The actual feature class to use
     * @param           {Any}           [defaultProps={}]       Some default props to set for this feature
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static define(
        name: string,
        featureCls: typeof SFeature,
        defaultProps: any = {},
    ) {
        this.setDefaultProps(name, defaultProps);
        __querySelectorLive(
            `[${name}]`,
            ($elm) => {
                new featureCls(
                    name,
                    $elm,
                    __SComponentUtils.getDefaultProps(name),
                );
            },
            {
                // attributes: [name],
            },
        );
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
    constructor(
        name: string,
        node: HTMLElement,
        settings?: Partial<ISFeatureSettings>,
    ) {
        super(__deepMerge({}, settings));

        // inject style if needed
        if (this.settings.style) {
            __injectStyle(this.settings.style, {
                id: `s-feature-${name}`,
            });
        }

        this.componentUtils = new __SComponentUtils(node, {
            ...(this.settings ?? {}),
            ...(this.settings.componentUtils ?? {}),
            useTagNameForClassName: false,
            name,
        });

        // name
        this.name = name;

        // node
        this.node = node;

        // add the base class on the feature
        this.node.classList.add(
            ...this.componentUtils.className('').split(' '),
        );

        // assign props
        this.props = this.componentUtils.handleProps(
            {},
            {
                interface:
                    this.settings.interface ??
                    this.settings.componentUtils?.interface,
            },
        );

        this.componentUtils.waitAndExecute(
            this.props.mountWhen,
            // @ts-ignore
            async () => {
                // @ts-ignore
                await this.mount?.();
                this.props.mounted = true;
            },
        );
    }

    /**
     * @name            beforePropChange
     * @type            Function
     *
     * This method allows you to catch a property change before it actually occurs.
     * You can return the value to set it as it is, return another value to set another one
     * or returns undefined to prevent the change to be commited.
     *
     * @param           {String}            prop        The property about to be updated
     * @param           {Any}               value       The value about to be setted
     * @return          {Any}                           The value you want to actually set, or undefined if you want to prevent the update
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name            afterPropChanged
     * @type            Function
     *
     * This method allows you to catch properties updates AFTER it has been commited.
     *
     * @param           {String}            prop        The property about to be updated
     * @param           {Any}               value       The value about to be setted
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

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
}
