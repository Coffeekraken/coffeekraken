import __SColor from '@coffeekraken/s-color';
import __SThemeBase from '../shared/SThemeBase.js';

/**
 * @name            STheme
 * @namespace       node
 * @type            Class
 * @extends         SThemeBase
 * @platform            node
 * @status          beta
 *
 * This class represent the sugar theme you've passed the name in the constructor.
 * Once you have an instance of this theme you will have access to a lot of utilities
 * methods like "loopOnColors", etc...
 *
 * @param       {String}        [theme=undefined]        The name of the theme you want to instanciate utilities for. If not specified, will take either the "default" theme, or the theme defined in the sugar.json file
 *
 * @example         js
 * import STheme from '@coffeekraken/s-theme';
 * const theme = new STheme();
 * theme.loopOnColors(({name, schema, value}) => {
 *      // do something...
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class STheme extends __SThemeBase {
    /**
     * @name        cssSettings
     * @type        Object
     * @static
     * @get
     *
     * Access the settings printed inside the css by the postcssSugarPlugin postcss plugin.
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get cssSettings(): any {
        return {};
    }

    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(theme?: string, variant?: string) {
        super(theme, variant);
    }

    /**
     * @name            getCurrentTheme
     * @type            Function
     * @static
     *
     * This method allows you to get the current applied theme STheme instance
     *
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getCurrentTheme(): STheme {
        // @ts-ignore
        return this.getTheme();
    }

    /**
     * @name            getColor
     * @type            Function
     *
     * THis method allows you to access a particular theme color
     *
     * @param           {String}            name            The color name you want to get
     * @param           {String}            [schema=null]     The color schema you want to get
     * @param           {HTMLElement}       [$context=document.body]        The context in which to get the color
     * @return          {SColor}                                    An SColor instance that you can make use of
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getColor(
        name: string,
        schema?: string,
        state: string = 'default',
    ): __SColor {
        const color = this.get(`color.${name}.color`);
        if (!color) {
            throw new Error(
                `Sorry but the requested "<yellow>${name}</yellow> color does not exists...`,
            );
        }
        if (!schema) {
            return new __SColor(color);
        }
        const schemaObj = this.get(`colorSchema.${schema}`);
        if (!schemaObj) {
            throw new Error(
                `Sorry but the requested "<yellow>${name}</yellow>"color, schema "<cyan>${schema}</cyan>" and state "<magenta>${state}</magenta>" does not exists...`,
            );
        }
        const colorInstance = new __SColor(color);
        colorInstance.apply(schemaObj);
        return colorInstance;
    }
}
