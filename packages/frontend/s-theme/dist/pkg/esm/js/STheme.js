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
     * @name            restore
     * @type            Function
     * @static
     *
     * This method allows you to restore locally the current theme with the changes applied using the `set` method.
     *
     * @return      {STheme}                                The current theme instance
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static restore() {
        let savedState = this.savedThemeMetas;
        if ((savedState === null || savedState === void 0 ? void 0 : savedState.theme) && (savedState === null || savedState === void 0 ? void 0 : savedState.variant)) {
            this.setTheme(savedState.theme, savedState.variant);
        }
        else {
            if (this.preferDark() && this.isDarkVariantAvailable()) {
                this.setThemeVariant('dark');
            }
        }
        // maintain chainability
        return this;
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
        // set the state
        this.globalState.theme = theme !== null && theme !== void 0 ? theme : this.theme;
        this.globalState.variant = variant !== null && variant !== void 0 ? variant : this.variant;
        // save
        currentTheme.save();
        // set the current theme in the env.SUGAR.theme property
        if (!document.env)
            document.env = {};
        if (!document.env.SUGAR)
            document.env.SUGAR = {};
        document.env.SUGAR.theme = currentTheme;
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
            const savedTheme = JSON.parse(localStorage.getItem(this.globalSettings.id));
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
        this.globalSettings = Object.assign(Object.assign({}, this.globalSettings), finalSettings);
        // restore
        this.restore();
        let theme = (_b = (_a = this.globalState) === null || _a === void 0 ? void 0 : _a.theme) !== null && _b !== void 0 ? _b : this.theme, variant = (_d = (_c = this.globalState) === null || _c === void 0 ? void 0 : _c.variant) !== null && _d !== void 0 ? _d : this.variant;
        // instanciate the current theme instance
        if (!document.env)
            document.env = {};
        if (!document.env.SUGAR)
            document.env.SUGAR = {};
        document.env.SUGAR.theme = new this(theme, variant, finalSettings);
        // apply the theme
        STheme.applyTheme(theme, variant, finalSettings.$context);
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
            overridedConfigs: {},
        };
        if (!__SEnv.is('production') && !__isInIframe()) {
            console.log(`<cyan>[STheme]</cyan> Initializing theme <cyan>${theme}</cyan> in <cyan>${variant}</cyan> variant`);
        }
        // // restore the theme
        // this.restore();
        console.trace('coco');
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
            this.state.overridedConfigs = this.getOverridedConfig();
            // save in localStorage
            localStorage.setItem(`${this.constructor.globalSettings.id}`, JSON.stringify(this.constructor.globalState));
            localStorage.setItem(`${this.constructor.globalSettings.id}-${this.theme}-${this.variant}`, JSON.stringify(this.state));
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
            (_a = localStorage.getItem(`${this.constructor.globalSettings.id}-${this.theme}`)) !== null && _a !== void 0 ? _a : '{}');
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
STheme.globalSettings = {
    $context: document.querySelector('html'),
    id: 's-theme',
};
STheme.globalState = {
    theme: undefined,
    variant: undefined,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFekQsT0FBTyxZQUFZLE1BQU0seUJBQXlCLENBQUM7QUFFbkQsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDckIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNoRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUMsQ0FBQztBQXdDSCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxZQUFZO0lBYTVDOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFNLEtBQUssS0FBSzs7UUFDWixJQUFJLEtBQUssR0FBRyxNQUFNO2FBQ2IsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzthQUMvQixnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVuQyxJQUFJLEtBQUssRUFBRTtZQUNQLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsTUFBTSxTQUFTLEdBQUcsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNaLE9BQU8sQ0FDSCxNQUFBLElBQUksQ0FBQyxr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