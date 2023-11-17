import __SColor from '@coffeekraken/s-color';
import __SEnv from '@coffeekraken/s-env';
import __SFrontspec from '@coffeekraken/s-frontspec';
import { __clearTransmations, __isInIframe } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SThemeBase from '../shared/SThemeBase.js';
window._console = {};
['log', 'warn', 'error', 'success'].forEach((key) => {
    window._console[key] = console[key];
});
export default class STheme extends __SThemeBase {
    /**
     * @name      theme
     * @type      String
     * @static
     * @get
     *
     * Store the current theme applied from the html tag context or from the config
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get theme() {
        var _a, _b;
        let theme = window
            .getComputedStyle(document.body)
            .getPropertyValue('--s-theme');
        if (theme) {
            return theme;
        }
        const themeAttr = (_a = document.querySelector('html')) === null || _a === void 0 ? void 0 : _a.getAttribute('theme');
        if (!themeAttr) {
            return ((_b = this._defaultThemeMetas.theme) !== null && _b !== void 0 ? _b : __SFrontspec.get('theme.theme'));
        }
        return themeAttr.split('-')[0];
    }
    /**
     * @name      variant
     * @type      String
     * @static
     * @get
     *
     * Store the current variant applied from the html tag context or from the config
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get variant() {
        var _a, _b;
        let variant = window
            .getComputedStyle(document.body)
            .getPropertyValue('--s-variant');
        if (variant) {
            return variant;
        }
        const themeAttr = (_a = document.querySelector('html')) === null || _a === void 0 ? void 0 : _a.getAttribute('theme');
        if (!themeAttr) {
            return ((_b = this._defaultThemeMetas.variant) !== null && _b !== void 0 ? _b : __SFrontspec.get('theme.theme'));
        }
        return themeAttr.split('-')[0];
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
        // apply the theme on context
        STheme.applyTheme(theme, variant, $context);
        // get the current theme instance
        const currentTheme = this.getTheme(theme !== null && theme !== void 0 ? theme : this.theme, variant !== null && variant !== void 0 ? variant : this.variant);
        // save
        currentTheme.save();
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
        __clearTransmations(document.querySelector('html'), {
            timeout: 100,
        });
        if (theme && variant) {
            $context.setAttribute('theme', `${theme}-${variant}`);
        }
        else if (theme) {
            $context.setAttribute('theme', `${theme}-${__SFrontspec.get('theme.variant')}`);
        }
        else if (variant) {
            $context.setAttribute('theme', `${__SFrontspec.get('theme.theme')}-${variant}`);
        }
        // console.log('SETTED', theme, variant);
        // get the current theme instance
        // const themeInstance = this.getCurrentTheme($context);
        // // set the current theme in the env.SUGAR.theme property
        // if (!document.env) document.env = {};
        // if (!document.env.SUGAR) document.env.SUGAR = {};
        // document.env.SUGAR.theme = themeInstance;
    }
    static get frontData() {
        if (this._frontData) {
            return this._frontData;
        }
        const bodyStyle = window.getComputedStyle(document.body, ':after');
        this._frontData = JSON.parse(JSON.parse(bodyStyle.getPropertyValue('content')));
        return this._frontData;
    }
    static get savedThemeMetas() {
        if (this._savedThemeMetas) {
            return this._savedThemeMetas;
        }
        try {
            const savedTheme = JSON.parse(localStorage.getItem(this._settings.id));
            this._savedThemeMetas = savedTheme;
        }
        catch (e) { }
        return this._savedThemeMetas;
    }
    /**
     * @name        isDarkVariantAvailable
     * @type        Function
     * @static
     *
     * Check in the frontData.theme.themes stack to see if a dark variant is available
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static isDarkVariantAvailable() {
        var _a, _b, _c;
        for (let [idx, theme] of Object.entries((_c = (_b = (_a = this.frontData) === null || _a === void 0 ? void 0 : _a.theme) === null || _b === void 0 ? void 0 : _b.themes) !== null && _c !== void 0 ? _c : {})) {
            if (theme.variant === 'dark') {
                return true;
            }
        }
        return false;
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
        var _a, _b, _c, _d;
        const finalSettings = Object.assign({ $context: document.querySelector('html'), id: 's-theme' }, (settings !== null && settings !== void 0 ? settings : {}));
        this._settings = Object.assign(Object.assign({}, this._settings), finalSettings);
        let theme = (_b = (_a = this.savedThemeMetas) === null || _a === void 0 ? void 0 : _a.theme) !== null && _b !== void 0 ? _b : this.theme, variant = (_d = (_c = this.savedThemeMetas) === null || _c === void 0 ? void 0 : _c.variant) !== null && _d !== void 0 ? _d : this.variant;
        // instanciate the current theme instance
        if (!document.env)
            document.env = {};
        if (!document.env.SUGAR)
            document.env.SUGAR = {};
        document.env.SUGAR.theme = new this(theme, variant, finalSettings);
        // apply the theme
        STheme.applyTheme(this.current.theme, this.current.variant, finalSettings.$context);
        // apply theme from css if no theme restored
        // if (!this.state.theme) {
        //     this._setThemeFromFrontData();
        // }
        // return the current theme
        return this.current;
    }
    /**
     * @name            ensureIsInited
     * @type            Function
     * @static
     *
     * This method allows you to make sure the theme has been inited using the `__STheme.init()` static method.
     * If it's not the case, it will throw an error to make sure the developer knows why it's not working...
     *
     * @param           {Boolean}               [throwError=true]               Specify if you want this method to throw an error when the theme is not correctly inited
     * @return          {Boolean}                                    True if inited, false if not (and will thro)
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static ensureIsInited(throwError = true) {
        var _a, _b;
        // @ts-ignore
        if (!((_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.theme)) {
            if (throwError) {
                throw new Error(`<red>[STheme]</red> You must init your theme using the __STheme.init() static method...`);
            }
            return false;
        }
        return true;
    }
    /**
     * This method will try to get the theme from the frontData object and
     * set it as the current theme
     */
    // static _setThemeFromFrontData(): void {
    //     if (this.frontData.theme?.theme) {
    //         this.setTheme(
    //             this.frontData.theme.theme,
    //             this.frontData.theme.variant,
    //         );
    //     }
    // }
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
        var _a, _b, _c;
        let defaultTheme = (_a = STheme._defaultThemeMetas.theme) !== null && _a !== void 0 ? _a : __SFrontspec.get('theme.theme'), defaultVariant = (_b = STheme._defaultThemeMetas.variant) !== null && _b !== void 0 ? _b : __SFrontspec.get('theme.variant');
        let theme = this.theme, variant = this.variant;
        // if the context is not the HTML root element
        const isContextHtml = $context === document.querySelector('html');
        if ($context && isContextHtml && !this.savedThemeMetas) {
            const computedStyle = getComputedStyle($context);
            // get the css setted --s-theme and --s-variant variable from the $context
            const cssDefinedTheme = computedStyle.getPropertyValue('--s-theme'), cssDefinedVariant = computedStyle.getPropertyValue('--s-variant');
            if (cssDefinedTheme) {
                theme = cssDefinedTheme.trim();
            }
            if (cssDefinedVariant) {
                variant = cssDefinedVariant.trim();
            }
        }
        // hande preferer dark mode
        if (!this.savedThemeMetas) {
            if (this.preferDark() && this.isDarkVariantAvailable()) {
                variant = 'dark';
            }
        }
        else {
            if (this.savedThemeMetas.theme) {
                theme = this.savedThemeMetas.theme;
            }
            if (this.savedThemeMetas.variant) {
                variant = this.savedThemeMetas.variant;
            }
        }
        const name = `${theme !== null && theme !== void 0 ? theme : defaultTheme}-${variant !== null && variant !== void 0 ? variant : defaultVariant}`;
        const metas = (_c = __SFrontspec.get(`theme.themes.${name}`)) !== null && _c !== void 0 ? _c : {};
        return __deepMerge({
            name,
            theme: theme !== null && theme !== void 0 ? theme : defaultTheme,
            variant: variant !== null && variant !== void 0 ? variant : defaultVariant,
        }, metas);
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
     * @name            toggleDarkMode
     * @type            Function
     * @static
     *
     * This static method allows you to toggle between the dark and light mode.
     * Does nothing if the dark mode is not available
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static toggleDarkMode($context = document.querySelector('html')) {
        if (!this.isDarkVariantAvailable())
            return;
        console.log('th', this.variant);
        if (this.variant === 'dark') {
            this.setThemeVariant('light', $context);
        }
        else {
            this.setThemeVariant('dark', $context);
        }
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
    constructor(theme, variant, settings) {
        super(theme, variant, __deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name        state
         * @type        Object
         *
         * Store the current theme state
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.state = {
            theme: undefined,
            variant: undefined,
            overridedConfigs: {},
        };
        if (!__SEnv.is('production') && !__isInIframe()) {
            console.log(`<cyan>[STheme]</cyan> Initializing theme <cyan>${theme}</cyan> in <cyan>${variant}</cyan> variant`);
        }
        // // restore the theme
        // this.restore();
        if (!__SEnv.is('production') && !__isInIframe()) {
            console.log(`<cyan>[STheme]</cyan> Theme initialized <green>successfully</green>`);
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
        this.applyState();
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
    getColor(name, variant, $context = document.body) {
        const $elm = document.createElement('p');
        $elm.classList.add(`s-bc-${name}${variant ? `-${variant}` : ''}`);
        const $wrapper = document.createElement('div');
        $wrapper.setAttribute('hidden', 'true');
        $wrapper.setAttribute('theme', `${this.theme}-${this.variant}`);
        $wrapper.appendChild($elm);
        // @ts-ignore
        $context.appendChild($wrapper);
        const style = getComputedStyle($elm);
        const color = new __SColor(style.backgroundColor);
        $wrapper.remove();
        return color;
    }
    /**
     * @name            isDarkMode
     * @type            Function
     *
     * This method returns true if the theme variant is dark, false if not
     *
     * @return      {Boolean}               true if variant is dark, false otherwise
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isDark() {
        return this.variant === 'dark';
    }
    /**
     * @name            applyState
     * @type            Function
     *
     * This method allows you to apply the overrided configs on your dom context.
     *
     * @param       {HTMLElement}       $context       The dom context on which to apply the overrided configs
     * @return      {STheme}              The current instance
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    applyState($context = document.body) {
        // overrided configs (css)
        const properties = this.jsConfigObjectToCssProperties(this.getOverridedConfig());
        this._applyOverridedConfigs(properties, $context);
        return this;
    }
    /**
     * Apply the overrided configs from the state
     */
    _applyOverridedConfigs(properties, $context = document.body) {
        if (!$context._sThemeOverridedConfigs) {
            $context._sThemeOverridedConfigs = {};
        }
        if (!$context._sThemeOverridedConfigs[this.id]) {
            $context._sThemeOverridedConfigs[this.id] =
                document.createElement('style');
            $context._sThemeOverridedConfigs[this.id].setAttribute('id', this.id);
            $context.appendChild($context._sThemeOverridedConfigs[this.id]);
        }
        let selector = `[theme="${this.theme}-${this.variant}"]`;
        if ($context === document.body) {
            selector += ' body';
        }
        $context._sThemeOverridedConfigs[this.id].innerHTML = `
            ${selector} {
                ${properties.join('\n')}
            }
        `;
    }
    save() {
        clearTimeout(this._saveTimeout);
        this._saveTimeout = setTimeout(() => {
            this.state.overridedConfigs = this._overridedConfig;
            console.log('SAVE', this.state);
            // save in localStorage
            localStorage.setItem(`${this.settings.id}-${this.theme}`, JSON.stringify(this.state));
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
        var _a;
        let savedState = {};
        // get from localStorage
        try {
            savedState = JSON.parse(
            // @ts-ignore
            (_a = localStorage.getItem(`${this.settings.id}-${this.theme}`)) !== null && _a !== void 0 ? _a : '{}');
            // @ts-ignore
            this.state = savedState !== null && savedState !== void 0 ? savedState : {};
        }
        catch (e) {
            savedState = {};
        }
        // restore configs
        // @ts-ignore
        super.restore(savedState.overridedConfigs);
        // apply the configs
        this.applyState();
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
        localStorage.removeItem(`${this.settings.id}-${this.theme}`);
        // clear in super class
        super.clear();
        // apply the configs
        this.applyState();
        // maintain chainability
        return this;
    }
}
STheme._defaultThemeMetas = {};
STheme._settings = {
    $context: document.querySelector('html'),
    id: 's-theme',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFekQsT0FBTyxZQUFZLE1BQU0seUJBQXlCLENBQUM7QUFFbkQsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDckIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNoRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUMsQ0FBQztBQXdDSCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxZQUFZO0lBUTVDOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFNLEtBQUssS0FBSzs7UUFDWixJQUFJLEtBQUssR0FBRyxNQUFNO2FBQ2IsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzthQUMvQixnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVuQyxJQUFJLEtBQUssRUFBRTtZQUNQLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsTUFBTSxTQUFTLEdBQUcsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNaLE9BQU8sQ0FDSCxNQUFBLElBQUksQ0FBQyxr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