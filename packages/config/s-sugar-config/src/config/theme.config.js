import __SInterface from '@coffeekraken/s-interface';
class ColorModifierInterface extends __SInterface {
}
ColorModifierInterface.definition = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBSXJELE1BQU0sc0JBQXVCLFNBQVEsWUFBWTs7QUFDdEMsaUNBQVUsR0FBRztJQUNoQixRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7S0FDakI7Q0FDSixDQUFDO0FBR04sZUFBZTtJQUNYOzs7T0FHRztJQUNILEtBQUssRUFBRSxPQUFPO0lBRWQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUVuQjs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsb0JBQW9CO1FBQzFCLEtBQUssRUFBRSxxQkFBcUI7UUFDNUIsSUFBSSxFQUFFLG9CQUFvQjtLQUM3QjtDQUNKLENBQUMifQ==