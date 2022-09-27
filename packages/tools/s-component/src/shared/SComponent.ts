// @ts-nocheck
// @TODO            check how to override private static methods

import __SClass from '@coffeekraken/s-class';
import __SInterface from '@coffeekraken/s-interface';

import { __deepMerge } from '@coffeekraken/sugar/object';
import __SComponentSettingsInterface from './interface/SComponentSettingsInterface';

export interface ISComponentSettings {
    interface?: typeof __SInterface;
    bare: boolean;
}

export default class SComponent extends __SClass {
    /**
     * @name            name
     * @type            String
     *
     * Get the name of the node or feature that this component utils is
     * used by. Get from `settings.componentUtils.name` then throught the passed
     * node using his tagName property
     *
     * @since   2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    name: string;

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
        selector = Array.isArray(selector) ? selector : [selector];
        selector.forEach((sel) => {
            this._defaultProps[sel] = {
                ...(this._defaultProps[sel] ?? {}),
                ...props,
            };
        });
    }

    /**
     * @name            getDefaultProps
     * @type            Function
     * @static
     *
     * This static method allows you to get back some default props setted for a component/feature, etc...
     *
     * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
     * @return    {Any}                                 Some default props setted or an empty object
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static getDefaultProps(selector: string): any {
        return {
            ...(this._defaultProps['*'] ?? {}),
            ...(this._defaultProps[selector] ?? {}),
        };
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
    constructor(name: string, settings?: Partial<ISComponentSettings>) {
        super(
            __deepMerge(
                __SComponentSettingsInterface.defaults(),
                settings ?? {},
            ),
        );

        this.name = name;
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
    className(cls = '', styleCls, bareStyleCls) {
        let clsString = cls
            .split(' ')
            .map((clsName) => {
                const clses: string[] = [];
                // class from the passed "name" in the settings
                clses.push(
                    `${this.name.toLowerCase()}${
                        clsName && !clsName.match(/^__/) ? '-' : ''
                    }${clsName}`,
                );
                return clses.join(' ');
            })
            .join(' ');

        if (!this.settings.bare && styleCls) {
            clsString += ` ${styleCls}`;
        } else if (this.settings.bare && bareStyleCls) {
            clsString += ` ${bareStyleCls}`;
        }

        return clsString;
    }
}
