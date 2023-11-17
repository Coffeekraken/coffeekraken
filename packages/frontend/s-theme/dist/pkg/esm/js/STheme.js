import __SColor from '@coffeekraken/s-color';
import __SEnv from '@coffeekraken/s-env';
import __SFrontspec from '@coffeekraken/s-frontspec';
import { __clearTransmations, __isInIframe } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SThemeBase from '../shared/SThemeBase.js';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
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
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static setTheme(theme, variant) {
        // apply the theme on context
        STheme.applyTheme(theme, variant);
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
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static applyTheme(theme, variant) {
        const $context = document.querySelector('html');
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
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static setThemeVariant(variant) {
        return this.setTheme(undefined, variant);
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
        var _a, _b, _c, _d, _e, _f;
        const finalSettings = Object.assign({ id: 's-theme' }, (settings !== null && settings !== void 0 ? settings : {}));
        // hotkey
        if (!this._isHotkeyRegistered) {
            __hotkey('ctrl+m').on('press', () => {
                this.toggleDarkMode();
            });
        }
        this.globalSettings = Object.assign(Object.assign({}, this.globalSettings), finalSettings);
        // restore from localStorage
        this.restore();
        let theme = (_b = (_a = this.globalState) === null || _a === void 0 ? void 0 : _a.theme) !== null && _b !== void 0 ? _b : this.theme, variant = (_d = (_c = this.globalState) === null || _c === void 0 ? void 0 : _c.variant) !== null && _d !== void 0 ? _d : this.variant;
        if ((_f = (_e = document.env) === null || _e === void 0 ? void 0 : _e.SUGAR) === null || _f === void 0 ? void 0 : _f.theme) {
            return document.env.SUGAR.theme;
        }
        // instanciate the current theme instance
        if (!document.env)
            document.env = {};
        if (!document.env.SUGAR)
            document.env.SUGAR = {};
        document.env.SUGAR.theme = new this(theme, variant, finalSettings);
        // apply the theme
        STheme.applyTheme(theme, variant);
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
    static toggleDarkMode() {
        if (!this.isDarkVariantAvailable())
            return;
        if (this.variant === 'dark') {
            this.setThemeVariant('light');
        }
        else {
            this.setThemeVariant('dark');
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
        // restore the theme
        this.restore();
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
            (_a = localStorage.getItem(`${this.constructor.globalSettings.id}-${this.theme}-${this.variant}`)) !== null && _a !== void 0 ? _a : '{}');
            // @ts-ignore
            this.state = savedState !== null && savedState !== void 0 ? savedState : {};
        }
        catch (e) {
            savedState = {};
        }
        // restore configs
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
        localStorage.removeItem(`${this.constructor.globalSettings.id}-${this.theme}-${this.variant}`);
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
    id: 's-theme',
};
STheme.globalState = {
    theme: undefined,
    variant: undefined,
};
STheme._isHotkeyRegistered = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFekQsT0FBTyxZQUFZLE1BQU0seUJBQXlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXhELE1BQU0sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDaEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDLENBQUM7QUF1Q0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsWUFBWTtJQWM1Qzs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSxLQUFLLEtBQUs7O1FBQ1osSUFBSSxLQUFLLEdBQUcsTUFBTTthQUNiLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDL0IsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFbkMsSUFBSSxLQUFLLEVBQUU7WUFDUCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELE1BQU0sU0FBUyxHQUFHLE1BQUEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsMENBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FB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