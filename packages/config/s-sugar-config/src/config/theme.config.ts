import __SColor from '@coffeekraken/s-color';
import __get from '@coffeekraken/sugar/shared/object/get';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __SInterface from '@coffeekraken/s-interface';
import __filter from '@coffeekraken/sugar/shared/object/filter';
import __SDuration from '@coffeekraken/s-duration';

class ColorModifierInterface extends __SInterface {
    static definition = {
        saturate: {
            type: 'Number|String',
            default: 0,
        },
        desaturate: {
            type: 'Number',
            default: 0,
        },
        darken: {
            type: 'Number',
            default: 0,
        },
        lighten: {
            type: 'Number',
            default: 0,
        },
        spin: {
            type: 'Number',
            default: 0,
        },
        alpha: {
            type: 'Number',
        },
    };
}

export default {
    /**
     * @name          theme
     * @namespace     config.theme
     */
    theme: 'light',

    /**
     * @name          cssVariables
     * @namespace     config.theme
     *
     * Specify which config(s) you want to be printed in your css as variables.
     * If we have a configuration available like "some.thing.cool", the outgoing variable
     * will be "--s-theme-some-thing-cool".
     * You can specify some patterns like "color.*", "typo.something.*" cause the check will be
     * made using micromatch package
     *
     * @see           https://www.npmjs.com/package/micromatch
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    cssVariables: ['*'],

    /**
     * @name          themes
     * @namespace     config.theme
     * @type          Object
     *
     * Store all the themes inside a property each like "default", "myCoolTheme", etc...
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    themes: {
        base: '[config.themeBase]',
        light: '[config.themeLight]',
        dark: '[config.themeDark]',
    },
};
