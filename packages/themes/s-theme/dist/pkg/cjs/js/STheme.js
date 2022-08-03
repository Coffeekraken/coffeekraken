"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const clearTransmations_1 = __importDefault(require("@coffeekraken/sugar/js/dom/transmation/clearTransmations"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SThemeBase_1 = __importDefault(require("../shared/SThemeBase"));
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
 * @param       {String}        [theme=undefined]        The name of the theme you want to instanciate utilities for. If not specified, will take either the "default" theme, or the theme defined in the sugar.json file
 *
 * @example         js
 * import STheme from '@coffeekraken/s-theme';
 * const theme = new STheme();
 * theme.loopOnColors(({name, schema, value}) => {
 *      // do something...
 * });
 *
 * @event       s-theme.change          Dispatched when the theme has been changed
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class STheme extends SThemeBase_1.default {
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
            return s_sugar_config_1.default.get('theme.theme');
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
            return s_sugar_config_1.default.get('theme.variant');
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
        (0, clearTransmations_1.default)(document.querySelector('html'), {
            timeout: 100,
        });
        if (theme && variant) {
            $context.setAttribute('theme', `${theme}-${variant}`);
        }
        else if (theme) {
            $context.setAttribute('theme', `${theme}-${s_sugar_config_1.default.get('theme.variant')}`);
        }
        else if (variant) {
            $context.setAttribute('theme', `${s_sugar_config_1.default.get('theme.theme')}-${variant}`);
        }
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
    static init($context = document.querySelector('html')) {
        // set the current theme in the env.SUGAR.theme property
        const themeInstance = this.getCurrentTheme($context);
        if (!document.env)
            document.env = {};
        if (!document.env.SUGAR)
            document.env.SUGAR = {};
        document.env.SUGAR.theme = themeInstance;
        // apply the theme
        STheme.applyTheme(themeInstance.theme, themeInstance.variant, $context);
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
        var _a, _b;
        let defaultTheme = s_sugar_config_1.default.get('theme.theme'), defaultVariant = s_sugar_config_1.default.get('theme.variant');
        let theme = defaultTheme, variant = defaultVariant;
        // restore theme if needed
        const savedTheme = localStorage.getItem('s-theme');
        if (savedTheme && savedTheme.split('-').length === 2) {
            const parts = savedTheme.split('-');
            theme = parts[0];
            variant = parts[1];
        }
        else if ($context.hasAttribute('theme')) {
            let attr = (_a = $context.getAttribute('theme')) !== null && _a !== void 0 ? _a : '', parts = attr.split('-').map((l) => l.trim());
            (theme = parts[0]), (variant = parts[1]);
        }
        const name = `${theme !== null && theme !== void 0 ? theme : defaultTheme}-${variant !== null && variant !== void 0 ? variant : defaultVariant}`;
        const metas = (_b = s_sugar_config_1.default.get(`theme.themes.${name}.metas`)) !== null && _b !== void 0 ? _b : {};
        return (0, deepMerge_1.default)({
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
        $context.appendChild($wrapper);
        const style = getComputedStyle($elm);
        const color = new s_color_1.default(style.backgroundColor);
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
        const properties = SThemeBase_1.default.jsConfigObjectToCssProperties(this.getOverridedConfig());
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
exports.default = STheme;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUMxRCxpSEFBMkY7QUFDM0YsNEZBQXNFO0FBQ3RFLHNFQUFnRDtBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFxQixNQUFPLFNBQVEsb0JBQVk7SUE4UzVDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksS0FBYyxFQUFFLE9BQWdCO1FBQ3hDLEtBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEIsaUNBQWlDO1FBQ2pDLHVEQUF1RDtRQUN2RCxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUE3VEQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxLQUFLLEtBQUs7O1FBQ1osTUFBTSxTQUFTLEdBQUcsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNaLE9BQU8sd0JBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sS0FBSyxPQUFPOztRQUNkLE1BQU0sU0FBUyxHQUFHLE1BQUEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsMENBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDWixPQUFPLHdCQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsT0FBTyxTQUFTLENBQUMsS0FBSyxDQUFD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