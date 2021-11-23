import __SThemeBase from '../shared/SThemeBase';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SColor from '@coffeekraken/s-color';

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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class STheme extends __SThemeBase {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static getCurrentTheme($context = document.body): __SThemeBase {
        const theme =
                $context.getAttribute('theme') ??
                __SSugarConfig.get('theme.theme'),
            variant =
                $context.getAttribute('variant') ??
                __SSugarConfig.get('theme.variant');

        return this.getTheme(theme, variant);
    }

    /**
     * @name            color
     * @type            Function
     *
     * THis method allows you to access a particular theme color in a particular context
     *
     * @param           {String}            [dotPath='']            The dot path of the config you want to hash
     * @return          {SColor}                                    An SColor instance that you can make use of
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    color(name: string, variant?: string, $context = document.body): __SColor {
        const $elm = document.createElement('p');
        $elm.classList.add(`s-tc--${name}${variant ? `-${variant}` : ''}`);
        $elm.setAttribute('theme', this.name);
        $elm.setAttribute('variant', this.variant);
        $context.appendChild($elm);
        const style = getComputedStyle($elm);
        const color = new __SColor(style.color);
        return color;
    }
}
