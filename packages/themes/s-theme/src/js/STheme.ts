import __SThemeBase from '../shared/SThemeBase';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SColor from '@coffeekraken/s-color';
import __clearTransmations from '@coffeekraken/sugar/js/dom/transmation/clearTransmations';

/**
 * @name            STheme
 * @namespace       js
 * @type            Class
 * @extends         SThemeBase
 *
 * This class represent the sugar theme you've passed the name in the constructor.
 * Once you have an instance of this theme you will have access to a lot of utilities
 * methods like "loopOnColors", etc...
 *
 * @param       {String}        [theme=undefined]        The name of the theme you want to instanciate utilities for. If not specified, will take either the "default" theme, or the theme defined in the sugar.json file
 *
 * @example         js
 * import STheme from '@coffeekraken/s-theme';
 * const theme = new STheme();
 * theme.loopOnColors(({name, modifier, value}) => {
 *      // do something...
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class STheme extends __SThemeBase {
    /**
     * @name            setTheme
     * @type            Function
     * @static
     *
     * This method allows you to set the current applied theme and get back an STheme instance
     *
     * @param               {String}            theme           The theme name to apply
     * @param               {String}            variant         The theme variant to apply
     * @param               {HTMLElement}       [$context=document.body]            The context element on which to apply the theme
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static setTheme(
        theme?: string,
        variant?: string,
        $context = document.querySelector('html'),
    ): STheme {
        __clearTransmations(document.body, {
            timeout: 100
        });

        if (theme && variant) {
            $context.setAttribute('theme', `${theme}-${variant}`);
        } else if (theme) {
            $context.setAttribute('theme', theme);
        } else if (variant) {
            $context.setAttribute('theme', variant);
        }

        return this.getCurrentTheme($context);
    }

    /**
     * @name            setThemeVariant
     * @type            Function
     * @static
     *
     * This method allows you to set the current applied theme variant and get back an STheme instance
     *
     * @param               {String}            variant         The theme variant to apply
     * @param               {HTMLElement}       [$context=document.body]            The context element on which to apply the theme
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static setThemeVariant(variant: string, $context = document.querySelector('html')): STheme {
        return this.setTheme(undefined, variant, $context);
    }

    /**
     * @name            getCurrentTheme
     * @type            Function
     * @static
     *
     * This method allows you to get the current applied theme STheme instance
     *
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getCurrentTheme($context = document.body): STheme {

        const theme = __SSugarConfig.get('theme.theme');
        const variant = __SSugarConfig.get('theme.variant');
        
        if (!$context.hasAttribute('theme')) {
            return <STheme>this.getTheme(theme, variant);
        }
        
        let attr = $context.getAttribute('theme') ?? '',
        parts = attr.split('-').map(l => l.trim());

        if (parts.length === 2) {
            return <STheme>this.getTheme(parts[0], parts[1]);
        }
        
        const themes = __SSugarConfig.get('theme.themes');
        for (let [key, value] of Object.entries(themes)) {
            if (key === `${parts[0]}-${variant}` || key === `${theme}-${parts[0]}`) {
                const p = key.split('-').map(l => l.trim()),
                    t = p[0], v = p[1];
                console.log('AA', t, v);
                return <STheme>this.getTheme(t, v);
            }
        }

        throw new Error(`The requested current theme with the "theme" attribute "${$context.getAttribute('theme')}" on the context "${$context}" does not exists...`);
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
     * @name            applyCurrentColor
     * @type            Function
     * @static
     *
     * This static method allows you to apply a color on a particular context
     *
     * @param       {String}        color               The color name/code you want to apply
     * @param       {HTMLElement}       [$context=document.body]        The context on which to apply the color
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static applyCurrentColor(color: string,  $context = document.body): void {
        const vars = this.remapCssColor('current', color);
        for (let [key, value] of Object.entries(vars.properties)) {
            // @ts-ignore
            $context.style.setProperty(key, value);
        }
    }

    /**
     * @name            setColor
     * @type            Function
     *
     * THis method allows you to set a color for the theme that represent this instance
     *
     * @param           {String}            color                   The color you want to set
     * @param           {String}            value                   The color value you want to set
     * @param           {HTMLElement}       [$context=document.body]        The context in which to set the color
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setColor(color: string, value: string, $context = document.body): void {
        const colorInstance = new __SColor(value);

        $context.style.setProperty(
            `--s-theme-color-${color}-h`,
            colorInstance.h,
        );
        $context.style.setProperty(
            `--s-theme-color-${color}-s`,
            colorInstance.s,
        );
        $context.style.setProperty(
            `--s-theme-color-${color}-l`,
            colorInstance.l,
        );
    }

    /**
     * @name            getColor
     * @type            Function
     *
     * THis method allows you to access a particular theme color in a particular context
     *
     * @param           {String}            name            The color name you want to get
     * @param           {String}            [variant=null]     The color variant you want to get
     * @param           {HTMLElement}       [$context=document.body]        The context in which to get the color
     * @return          {SColor}                                    An SColor instance that you can make use of
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getColor(name: string, variant?: string, $context = document.body): __SColor {
        const $elm = document.createElement('p');
        $elm.classList.add(`s-bg--${name}${variant ? `-${variant}` : ''}`);
        const $wrapper = document.createElement('div');
        $wrapper.setAttribute('hidden', 'true');
        $wrapper.setAttribute('theme', this.name);
        $wrapper.setAttribute('variant', this.variant);
        $wrapper.appendChild($elm);
        $context.appendChild($wrapper);
        const style = getComputedStyle($elm);
        const color = new __SColor(style.backgroundColor);
        $wrapper.remove();
        return color;
    }
}
