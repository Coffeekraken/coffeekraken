import __SColor from '@coffeekraken/s-color';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __clearTransmations } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __fastdom from 'fastdom';
import __SThemeBase from '../shared/SThemeBase';
export default class STheme extends __SThemeBase {
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
    constructor(theme, variant) {
        super(theme, variant);
        // apply the theme on dom element
        // this.constructor.setTheme(this.theme, this.variant);
        // restore the theme
        this.restore();
    }
    /**
     * @name      theme
     * @type      String
     * @static
     *
     * Store the current theme applied from the html tag context or from the config
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get theme() {
        var _a;
        const themeAttr = (_a = document.querySelector('html')) === null || _a === void 0 ? void 0 : _a.getAttribute('theme');
        if (!themeAttr) {
            return __SSugarConfig.get('theme.theme');
        }
        return themeAttr.split('-')[0];
    }
    /**
     * @name      variant
     * @type      String
     * @static
     *
     * Store the current variant applied from the html tag context or from the config
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get variant() {
        var _a;
        const themeAttr = (_a = document.querySelector('html')) === null || _a === void 0 ? void 0 : _a.getAttribute('theme');
        if (!themeAttr) {
            return __SSugarConfig.get('theme.variant');
        }
        return themeAttr.split('-')[1];
    }
    /**
     * @name            setTheme
     * @type            Function
     * @static
     *
     * This method allows you to set the current applied theme and get back an STheme instance
     *
     * @param               {String}            theme           The theme name to apply
     * @param               {String}            variant         The theme variant to apply
     * @param               {HTMLElement}       [$context=document.querySelector('html')]            The context element on which to apply the theme
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static setTheme(theme, variant, $context = document.querySelector('html')) {
        let themeStr;
        if (theme && variant) {
            themeStr = `${theme}-${variant}`;
        }
        else if (theme) {
            themeStr = `${theme}-light`;
        }
        else if (variant) {
            themeStr = `default-${variant}`;
        }
        // apply the theme on context
        STheme.applyTheme(theme, variant, $context);
        // save the theme in localstorage
        localStorage.setItem('s-theme', themeStr);
        // get the current theme instance
        const currentTheme = this.getCurrentTheme($context);
        // dispatch a change event
        document.dispatchEvent(new CustomEvent('s-theme.change', {
            detail: {
                theme: currentTheme,
            },
        }));
        return currentTheme;
    }
    /**
     * @name            applyTheme
     * @type            Function
     * @static
     *
     * This method allows you to apply a theme on a particular $context HTMLElement
     *
     * @param               {String}            theme           The theme name to apply
     * @param               {String}            variant         The theme variant to apply
     * @param               {HTMLElement}       [$context=document.querySelector('html')]            The context element on which to apply the theme
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static applyTheme(theme, variant, $context = document.querySelector('html')) {
        __fastdom.mutate(() => {
            __clearTransmations(document.querySelector('html'), {
                timeout: 100,
            });
            if (theme && variant) {
                $context.setAttribute('theme', `${theme}-${variant}`);
            }
            else if (theme) {
                $context.setAttribute('theme', `${theme}-${__SSugarConfig.get('theme.variant')}`);
            }
            else if (variant) {
                $context.setAttribute('theme', `${__SSugarConfig.get('theme.theme')}-${variant}`);
            }
        });
    }
    /**
     * @name            isDarkMode
     * @type            Function
     * @static
     *
     * This method returns true if the theme variant is dark, false if not
     *
     * @param       {HTMLElement}           [$context=document.querySelector('html')]       The context in which to get informations from
     * @return      {Boolean}               true if variant is dark, false otherwise
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static isDark($context = document.querySelector('html')) {
        const metas = STheme.getThemeMetas($context);
        return metas.variant === 'dark';
    }
    /**
     * @name            preferDark
     * @type            Function
     * @static
     *
     * This method just check if the user prefer the dark mode or not.
     *
     * @return      {Boolean}               true if prefer dark mode, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static preferDark() {
        return (window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    /**
     * @name            setThemeVariant
     * @type            Function
     * @static
     *
     * This method allows you to set the current applied theme variant and get back an STheme instance
     *
     * @param               {String}            variant         The theme variant to apply
     * @param               {HTMLElement}       [$context=document.querySelector('html')]            The context element on which to apply the theme
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static setThemeVariant(variant, $context = document.querySelector('html')) {
        return this.setTheme(undefined, variant, $context);
    }
    /**
     * @name            init
     * @type            Function
     * @static
     *
     * This method allows you to init the your STheme instance, restore savec updated if their some, etc...
     *
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static init(settings) {
        const finalSettings = Object.assign({ $context: document.querySelector('html'), theme: undefined, variant: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        // save default theme metas
        STheme.defaultThemeMetas = {
            theme: finalSettings.theme,
            variant: finalSettings.variant,
        };
        // set the current theme in the env.SUGAR.theme property
        const themeInstance = this.getCurrentTheme(finalSettings.$context);
        if (!document.env)
            document.env = {};
        if (!document.env.SUGAR)
            document.env.SUGAR = {};
        document.env.SUGAR.theme = themeInstance;
        // apply the theme
        STheme.applyTheme(themeInstance.theme, themeInstance.variant, finalSettings.$context);
        // return the current theme
        return themeInstance;
    }
    /**
     * @name            getThemeMetas
     * @type            Function
     * @static
     *
     * This method allows you to get the theme metas like "name", "theme" and "variant" from the passed HTMLElement
     *
     * @param       {HTMLElement}       [$context=document.querySelector('html')]        The context from which to get the theme metas
     * @return      {any}                               The theme metas object containing the "name", "theme" and "variant" properties
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getThemeMetas($context = document.querySelector('html')) {
        var _a, _b, _c, _d;
        let defaultTheme = (_a = STheme.defaultThemeMetas.theme) !== null && _a !== void 0 ? _a : __SSugarConfig.get('theme.theme'), defaultVariant = (_b = STheme.defaultThemeMetas.variant) !== null && _b !== void 0 ? _b : __SSugarConfig.get('theme.variant');
        let theme = defaultTheme, variant = defaultVariant;
        // restore theme if needed
        const savedTheme = localStorage.getItem('s-theme');
        if (savedTheme && savedTheme.split('-').length === 2) {
            const parts = savedTheme.split('-');
            theme = parts[0];
            variant = parts[1];
        }
        else if ($context.hasAttribute('theme')) {
            let attr = (_c = $context.getAttribute('theme')) !== null && _c !== void 0 ? _c : '', parts = attr.split('-').map((l) => l.trim());
            (theme = parts[0]), (variant = parts[1]);
        }
        const name = `${theme !== null && theme !== void 0 ? theme : defaultTheme}-${variant !== null && variant !== void 0 ? variant : defaultVariant}`;
        const metas = (_d = __SSugarConfig.get(`theme.themes.${name}.metas`)) !== null && _d !== void 0 ? _d : {};
        return __deepMerge({
            name,
            theme: theme !== null && theme !== void 0 ? theme : defaultTheme,
            variant: variant !== null && variant !== void 0 ? variant : defaultVariant,
        }, metas);
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
    // @ts-ignore
    static getCurrentTheme($context = document.querySelector('html')) {
        const themeMetas = STheme.getThemeMetas($context);
        return this.getTheme(themeMetas.theme, themeMetas.variant);
    }
    /**
     * @name            applyCurrentColor
     * @type            Function
     * @static
     *
     * This static method allows you to apply a color on a particular context
     *
     * @param       {String}        color               The color name/code you want to apply
     * @param       {HTMLElement}       [$context=document.querySelector('html')]        The context on which to apply the color
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static applyCurrentColor(color, $context = document.querySelector('html')) {
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
     * @param           {String}            color                   The color you want to set
     * @param           {String}            value                   The color value you want to set
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setColor(color, value) {
        // set color in config
        this.set(`color.${color}.color`, value);
    }
    /**
     * @name            set
     * @type            Function
     *
     * This method allows you to set a value of the current theme.
     * Specify the value you want to set using the dotPath syntax like "color.accent.color", etc...
     *
     * @param       {String}        dotPath           The dot path of the config you want to set
     * @param       {any}           value               The value you want to set
     * @return      {STheme}                        The current theme instance
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    set(dotPath, value) {
        // set in super class
        super.set(dotPath, value);
        // apply overrided configs
        this.applyOverridedConfigs();
        // save the config
        this.save();
        // maintain chainability
        return this;
    }
    /**
     * @name            getColor
     * @type            Function
     *
     * THis method allows you to access a particular theme color in a particular context
     *
     * @param           {String}            name            The color name you want to get
     * @param           {String}            [variant=null]     The color variant you want to get
     * @param           {HTMLElement}       [$context=document.querySelector('html')]        The context in which to get the color
     * @return          {SColor}                                    An SColor instance that you can make use of
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getColor(name, variant, $context = document.querySelector('html')) {
        const $elm = document.createElement('p');
        $elm.classList.add(`s-bg--${name}${variant ? `-${variant}` : ''}`);
        const $wrapper = document.createElement('div');
        $wrapper.setAttribute('hidden', 'true');
        $wrapper.setAttribute('theme', this.theme);
        $wrapper.setAttribute('variant', this.variant);
        $wrapper.appendChild($elm);
        // @ts-ignore
        $context.appendChild($wrapper);
        const style = getComputedStyle($elm);
        const color = new __SColor(style.backgroundColor);
        $wrapper.remove();
        return color;
    }
    /**
     * @name            applyOverridedConfigs
     * @type            Function
     *
     * This method allows you to apply the overrided configs on your dom context.
     *
     * @param       {HTMLElement}       $context       The dom context on which to apply the overrided configs
     * @return      {STheme}              The current instance
     *
     * @since       2.0.0
     *
     */
    applyOverridedConfigs($context = document.querySelector('html')) {
        const properties = __SThemeBase.jsConfigObjectToCssProperties(this.getOverridedConfig());
        if (!$context._sThemeOverridedConfigs) {
            $context._sThemeOverridedConfigs = {};
        }
        if (!$context._sThemeOverridedConfigs[this.id]) {
            $context._sThemeOverridedConfigs[this.id] =
                document.createElement('style');
            $context._sThemeOverridedConfigs[this.id].setAttribute('id', this.id);
            $context.appendChild($context._sThemeOverridedConfigs[this.id]);
        }
        $context._sThemeOverridedConfigs[this.id].innerHTML = `
            [theme="${this.theme}-${this.variant}"] {
                ${properties.join('\n')}
            }
        `;
        return this;
    }
    save() {
        clearTimeout(this._saveTimeout);
        this._saveTimeout = setTimeout(() => {
            // save in localStorage
            localStorage.setItem(`s-theme`, JSON.stringify(this.getOverridedConfig()));
            // emit saved event
            this.emitSavedEvent();
        }, 500);
        // maintain chainability
        return this;
    }
    /**
     * @name            restore
     * @type            Function
     *
     * This method allows you to restore locally the current theme with the changes applied using the `set` method.
     *
     * @return      {STheme}                                The current theme instance
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    restore() {
        let savedConfigs = {};
        // get from localStorage
        try {
            savedConfigs = JSON.parse(
            // @ts-ignore
            localStorage.getItem(`s-theme`));
        }
        catch (e) { }
        // restore configs
        super.restore(savedConfigs);
        // apply the configs
        this.applyOverridedConfigs();
        // maintain chainability
        return this;
    }
    /**
     * @name            clear
     * @type            Function
     *
     * This method allows you to clear locally the current theme with the changes applied using the `set` method.
     *
     * @return      {STheme}                                The current theme instance
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    clear() {
        // delete the local storage
        localStorage.removeItem(`s-theme`);
        // clear in super class
        super.clear();
        // apply the configs
        this.applyOverridedConfigs();
        // set theme again to dispatch event
        this.constructor.setTheme();
        // maintain chainability
        return this;
    }
}
STheme.defaultThemeMetas = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxZQUFZLE1BQU0sc0JBQXNCLENBQUM7QUFpQ2hELE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLFlBQVk7SUF1VTVDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksS0FBYyxFQUFFLE9BQWdCO1FBQ3hDLEtBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEIsaUNBQWlDO1FBQ2pDLHVEQUF1RDtRQUN2RCxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFwVkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxLQUFLLEtBQUs7O1FBQ1osTUFBTSxTQUFTLEdBQUcsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNaLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxLQUFLLE9BQU87O1FBQ2QsTUFBTSxTQUFTLEdBQUcsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNaLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUM5QztRQUNELE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsUUFBUSxDQUNYLEtBQWMsRUFDZCxPQUFnQixFQUNoQixRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFFekMsSUFBSSxRQUFRLENBQUM7UUFDYixJQUFJLEtBQUssSUFBSSxPQUFPLEVBQUU7WUFDbEIsUUFBUSxHQUFHLEdBQUcsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxLQUFLLEVBQUU7WUFDZCxRQUFRLEdBQUcsR0FBRyxLQUFLLFFBQVEsQ0FBQztTQUMvQjthQUFNLElBQUksT0FBTyxFQUFFO1lBQ2hCLFFBQVEsR0FBRyxXQUFXLE9BQU8sRUFBRSxDQUFDO1NBQ25DO1FBRUQsNkJBQTZCO1FBQzdCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU1QyxpQ0FBaUM7UUFDakMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFMUMsaUNBQWlDO1FBQ2pDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFcEQsMEJBQTBCO1FBQzFCLFFBQVEsQ0FBQyxhQUFhLENBQ2xCLElBQUksV0FBVyxDQUFDLGdCQUFnQixFQUFFO1lBQzlCLE1BQU0sRUFBRTtnQkFDSixLQUFLLEVBQUUsWUFBWTthQUN0QjtTQUNKLENBQUMsQ0FDTCxDQUFDO1FBRUYsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FDYixLQUFjLEVBQ2QsT0FBZ0IsRUFDaEIsV0FBcUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFFbkUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDbEIsbUJBQW1CLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDaEQsT0FBTyxFQUFFLEdBQUc7YUFDZixDQUFDLENBQUM7WUFFSCxJQUFJLEtBQUssSUFBSSxPQUFPLEVBQUU7Z0JBQ2xCLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUM7YUFDekQ7aUJBQU0sSUFBSSxLQUFLLEVBQUU7Z0JBQ2QsUUFBUSxDQUFDLFlBQVksQ0FDakIsT0FBTyxFQUNQLEdBQUcsS0FBSyxJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FDcEQsQ0FBQzthQUNMO2lCQUFNLElBQUksT0FBTyxFQUFFO2dCQUNoQixRQUFRLENBQUMsWUFBWSxDQUNqQixPQUFPLEVBQ1AsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUNwRCxDQUFDO2FBQ0w7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUNuRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sS0FBSyxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLFVBQVU7UUFDYixPQUFPLENBQ0gsTUFBTSxDQUFDLFVBQVU7WUFDakIsTUFBTSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE9BQU8sQ0FDNUQsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLGVBQWUsQ0FDbEIsT0FBZSxFQUNmLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUV6QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQXVDO1FBQy9DLE1BQU0sYUFBYSxHQUFHLGdCQUNsQixRQUFRLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFDeEMsS0FBSyxFQUFFLFNBQVMsRUFDaEIsT0FBTyxFQUFFLFNBQVMsSUFDZixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsMkJBQTJCO1FBQzNCLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRztZQUN2QixLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUs7WUFDMUIsT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPO1NBQ2pDLENBQUM7UUFFRix3REFBd0Q7UUFDeEQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHO1lBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSztZQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqRCxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO1FBRXpDLGtCQUFrQjtRQUNsQixNQUFNLENBQUMsVUFBVSxDQUNiLGFBQWEsQ0FBQyxLQUFLLEVBQ25CLGFBQWEsQ0FBQyxPQUFPLEVBQ3JCLGFBQWEsQ0FBQyxRQUFRLENBQ3pCLENBQUM7UUFFRiwyQkFBMkI7UUFDM0IsT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxhQUFhLENBQ2hCLFdBQXdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDOztRQUV0RCxJQUFJLFlBQVksR0FDUixNQUFBLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLG1DQUM5QixjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUNyQyxjQUFjLEdBQ1YsTUFBQSxNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBTyxtQ0FDaEMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUU1QyxJQUFJLEtBQUssR0FBRyxZQUFZLEVBQ3BCLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFFN0IsMEJBQTBCO1FBQzFCLE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2xELE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RCO2FBQU0sSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZDLElBQUksSUFBSSxHQUFHLE1BQUEsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsbUNBQUksRUFBRSxFQUMzQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2pELENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxZQUFZLElBQUksT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksY0FBYyxFQUFFLENBQUM7UUFFckUsTUFBTSxLQUFLLEdBQUcsTUFBQSxjQUFjLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLFFBQVEsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFFckUsT0FBTyxXQUFXLENBQ2Q7WUFDSSxJQUFJO1lBQ0osS0FBSyxFQUFFLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLFlBQVk7WUFDNUIsT0FBTyxFQUFFLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLGNBQWM7U0FDckMsRUFDRCxLQUFLLENBQ1IsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILGFBQWE7SUFDYixNQUFNLENBQUMsZUFBZSxDQUNsQixXQUF3QixRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUV0RCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELE9BQWUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLGlCQUFpQixDQUNwQixLQUFhLEVBQ2IsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBRXpDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xELEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0RCxhQUFhO1lBQ2IsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzFDO0lBQ0wsQ0FBQztJQW9CRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFFBQVEsQ0FBQyxLQUFhLEVBQUUsS0FBYTtRQUNqQyxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsR0FBRyxDQUFDLE9BQWUsRUFBRSxLQUFVO1FBQzNCLHFCQUFxQjtRQUNyQixLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQiwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0Isa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLHdCQUF3QjtRQUN4QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFFBQVEsQ0FDSixJQUFZLEVBQ1osT0FBZ0IsRUFDaEIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBRXpDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEMsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLGFBQWE7UUFDYixRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNsRCxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gscUJBQXFCLENBQ2pCLFdBQXdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBRXRELE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyw2QkFBNkIsQ0FDekQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQzVCLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1lBQ25DLFFBQVEsQ0FBQyx1QkFBdUIsR0FBRyxFQUFFLENBQUM7U0FDekM7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM1QyxRQUFRLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDckMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FDbEQsSUFBSSxFQUNKLElBQUksQ0FBQyxFQUFFLENBQ1YsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ25FO1FBRUQsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUc7c0JBQ3hDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU87a0JBQzlCLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztTQUU5QixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQWVELElBQUk7UUFDQSxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNoQyx1QkFBdUI7WUFDdkIsWUFBWSxDQUFDLE9BQU8sQ0FDaEIsU0FBUyxFQUNULElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FDNUMsQ0FBQztZQUNGLG1CQUFtQjtZQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDMUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1Isd0JBQXdCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsT0FBTztRQUNILElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN0Qix3QkFBd0I7UUFDeEIsSUFBSTtZQUNBLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSztZQUNyQixhQUFhO1lBQ2IsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FDbEMsQ0FBQztTQUNMO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtRQUVkLGtCQUFrQjtRQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVCLG9CQUFvQjtRQUNwQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3Qix3QkFBd0I7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxLQUFLO1FBQ0QsMkJBQTJCO1FBQzNCLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsdUJBQXVCO1FBQ3ZCLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLG9CQUFvQjtRQUNwQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1Qix3QkFBd0I7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7QUE3aEJNLHdCQUFpQixHQUFHLEVBQUUsQ0FBQyJ9