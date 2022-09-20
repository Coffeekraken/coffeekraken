"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const dom_1 = require("@coffeekraken/sugar/dom");
const object_1 = require("@coffeekraken/sugar/object");
const fastdom_1 = __importDefault(require("fastdom"));
const SThemeBase_1 = __importDefault(require("../shared/SThemeBase"));
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
        fastdom_1.default.mutate(() => {
            (0, dom_1.__clearTransmations)(document.querySelector('html'), {
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
        let defaultTheme = (_a = STheme.defaultThemeMetas.theme) !== null && _a !== void 0 ? _a : s_sugar_config_1.default.get('theme.theme'), defaultVariant = (_b = STheme.defaultThemeMetas.variant) !== null && _b !== void 0 ? _b : s_sugar_config_1.default.get('theme.variant');
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
        const metas = (_d = s_sugar_config_1.default.get(`theme.themes.${name}.metas`)) !== null && _d !== void 0 ? _d : {};
        return (0, object_1.__deepMerge)({
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
STheme.defaultThemeMetas = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUMxRCxpREFBOEQ7QUFDOUQsdURBQXlEO0FBQ3pELHNEQUFnQztBQUNoQyxzRUFBZ0Q7QUFpQ2hELE1BQXFCLE1BQU8sU0FBUSxvQkFBWTtJQXVVNUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxLQUFjLEVBQUUsT0FBZ0I7UUFDeEMsS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0QixpQ0FBaUM7UUFDakMsdURBQXVEO1FBQ3ZELG9CQUFvQjtRQUNwQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQXBWRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLEtBQUssS0FBSzs7UUFDWixNQUFNLFNBQVMsR0FBRyxNQUFBLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLDBDQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ1osT0FBTyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxLQUFLLE9BQU87O1FBQ2QsTUFBTSxTQUFTLEdBQUcsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNaLE9BQU8sd0JBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDOUM7UUFDRCxPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FB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