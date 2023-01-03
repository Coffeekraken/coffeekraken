var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SColor from '@coffeekraken/s-color';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __clearTransmations } from '@coffeekraken/sugar/dom';
import { __isCrawler } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __speedIndex } from '@coffeekraken/sugar/perf';
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
            lod: undefined,
            overridedConfigs: {},
        };
        // restore the theme
        this.restore();
        // handle lod
        if (this.lodConfig.enabled) {
            this._initLod();
        }
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
     * @name      lod
     * @type      Number
     * @static
     *
     * Get the current theme lod (level of details)
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get lod() {
        const currentTheme = this.getCurrentTheme();
        return currentTheme.lod;
    }
    /**
     * @name            setLod
     * @type            Function
     * @static
     *
     * This method allows you to set the level of details you want on any HTMLElement context
     *
     * @param               {String|Number}     level           The level you want to set
     * @param               {Partial<ISThemeSetLodSettings>}        Some settings to configure your action
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static setLod(level, settings) {
        // get the current theme instance
        const currentTheme = this.getCurrentTheme();
        currentTheme.setLod(level, settings);
        return currentTheme;
    }
    /**
     * @name            whenLodChange
     * @type            Function
     * @static
     *
     * This method allows you to subscribe at the lod "level of details" changes
     *
     * @param           {Function}              cb              The callback to call when the lod change
     * @return          {Function}                                    A function to remove the event listener
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static whenLodChange(cb) {
        // get the current theme instance
        const currentTheme = this.getCurrentTheme();
        return currentTheme.whenLodChange(cb);
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
        return __awaiter(this, void 0, void 0, function* () {
            const finalSettings = Object.assign({ $context: document.querySelector('html'), theme: undefined, variant: undefined, lod: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
            let themeInstance;
            // wait for css to be applied
            // const themeMetas = this.getThemeMetas(finalSettings.$context);
            // save default theme metas
            STheme.defaultThemeMetas = {
                theme: finalSettings.theme,
                variant: finalSettings.variant,
            };
            // set the current theme in the env.SUGAR.theme property
            themeInstance = this.getCurrentTheme(finalSettings.$context);
            // @ts-ignore
            if (!document.env)
                document.env = {};
            // @ts-ignore
            if (!document.env.SUGAR)
                document.env.SUGAR = {};
            // @ts-ignore
            document.env.SUGAR.theme = themeInstance;
            // apply the theme
            STheme.applyTheme(themeInstance.theme, themeInstance.variant, finalSettings.$context);
            // return the current theme
            return themeInstance;
        });
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
        // @ts-ignore
        if (!document.env.SUGAR.theme) {
            if (throwError) {
                throw new Error(`<red>[STheme]</red> You must init your theme using the __STheme.init() static method...`);
            }
            return false;
        }
        return true;
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
        var _a, _b, _c;
        let defaultTheme = (_a = STheme.defaultThemeMetas.theme) !== null && _a !== void 0 ? _a : __SSugarConfig.get('theme.theme'), defaultVariant = (_b = STheme.defaultThemeMetas.variant) !== null && _b !== void 0 ? _b : __SSugarConfig.get('theme.variant');
        let theme = defaultTheme, variant = defaultVariant;
        // restore theme if needed
        // const savedTheme = localStorage.getItem('s-theme');
        // if (savedTheme && savedTheme.split('-').length === 2) {
        //     const parts = savedTheme.split('-');
        //     theme = parts[0];
        //     variant = parts[1];
        // } else if ($context.hasAttribute('theme')) {
        //     let attr = $context.getAttribute('theme') ?? '',
        //         parts = attr.split('-').map((l) => l.trim());
        //     (theme = parts[0]), (variant = parts[1]);
        // } else
        if ($context) {
            const computedStyle = getComputedStyle($context);
            // get the css setted --s-theme and --s-theme-variant variable from the $context
            const cssDefinedTheme = computedStyle.getPropertyValue('--s-theme'), cssDefinedVariant = computedStyle.getPropertyValue('--s-theme-variant');
            if (cssDefinedTheme) {
                theme = cssDefinedTheme.trim();
            }
            if (cssDefinedVariant) {
                variant = cssDefinedVariant.trim();
            }
        }
        const name = `${theme !== null && theme !== void 0 ? theme : defaultTheme}-${variant !== null && variant !== void 0 ? variant : defaultVariant}`;
        const metas = (_c = __SSugarConfig.get(`theme.themes.${name}.metas`)) !== null && _c !== void 0 ? _c : {};
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
        return this.getTheme({
            theme: themeMetas.theme,
            variant: themeMetas.variant,
        });
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
     * @name      lod
     * @type      Number
     *
     * Get the current theme lod (level of details)
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get lod() {
        return this.state.lod || this.get('lod.defaultLevel');
    }
    get lodConfig() {
        if (!this._lodConfig) {
            this._lodConfig = this.get('lod');
        }
        return this._lodConfig;
    }
    /**
     * This method takes care of initializing the lod (level of details) features
     * like the "botLevel", lod by speedIndex, etc...
     */
    _initLod() {
        var _a;
        // check if is a crawler
        const isCrawler = __isCrawler();
        // if the user does not have selected a specific lod
        // we check which lod is the most suited for his
        // computer using the "speedIndex" calculated value
        if (!isCrawler && this.state.lod === undefined) {
            const speedIndex = __speedIndex();
            let suitedLod = 0;
            // get the higher lod depending on the speedIndex
            for (let [lod, lodObj] of Object.entries((_a = this.lodConfig.levels) !== null && _a !== void 0 ? _a : {})) {
                if (lodObj.speedIndex > speedIndex) {
                    break;
                }
                suitedLod = parseInt(lod);
            }
            // set the suited calculated lod
            this.setLod(suitedLod);
        }
        // check if is a crawler and that we have a botLevel config
        if (isCrawler && this.lodConfig.botLevel !== undefined) {
            this.setLod(this.lodConfig.botLevel);
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
     * @name            setLod
     * @type            Function
     *
     * This method allows you to set the level of details you want on any HTMLElement context
     *
     * @param               {String|Number}     level           The level you want to set
     * @param               {Partial<ISThemeSetLodSettings>}        Some settings to configure your action
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setLod(level, settings) {
        const finalSettings = Object.assign({ $context: document.body }, (settings !== null && settings !== void 0 ? settings : {}));
        // @ts-ignore
        level = parseInt(`${level}`);
        // save in state
        this.state.lod = level;
        this.save();
        // remove all the lod classes above the wanted level
        for (let i = 0; i <= 10; i++) {
            if (i > level) {
                finalSettings.$context.classList.remove(`s-lod--${i}`);
            }
        }
        // add the new classes
        for (let i = 0; i <= level; i++) {
            finalSettings.$context.classList.add('s-lod', `s-lod--${i}`);
        }
        // dispatch a change event
        document.dispatchEvent(new CustomEvent('s-theme.lod.change', {
            detail: {
                level,
                theme: this,
            },
        }));
        // return the current theme
        return this;
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
     * @name            whenLod
     * @type            Function
     *
     * This method allows you to have a promise back that will be resolved when the actuel theme lod meet the requested one
     *
     * @param           {Number}                level           The level you want to wait on
     * @return          {Promise}                                    A promise that will be resolved once the correct level has been reached
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    whenLod(level) {
        return new Promise((resolve) => {
            if (document.body.classList.contains(`s-lod--${level}`)) {
                return resolve();
            }
        });
    }
    /**
     * @name            whenLodChange
     * @type            Function
     *
     * This method allows you to subscribe at the lod "level of details" changes
     *
     * @param           {Function}              cb              The callback to call when the lod change
     * @return          {Function}                                    A function to remove the event listener
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    whenLodChange(cb) {
        // @ts-ignore
        document.addEventListener('s-theme.lod.change', cb);
        return () => {
            // @ts-ignore
            document.removeEventListener('s-theme.lod.change', cb);
        };
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
    applyState($context = document.querySelector('html')) {
        // overrided configs (css)
        const properties = __SThemeBase.jsConfigObjectToCssProperties(this.getOverridedConfig());
        this._applyOverridedConfigs(properties, $context);
        // lod
        if (this.state.lod !== undefined) {
            this.setLod(this.state.lod);
        }
        return this;
    }
    /**
     * Apply the overrided configs from the state
     */
    _applyOverridedConfigs(properties, $context = document.querySelector('html')) {
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
    }
    save() {
        clearTimeout(this._saveTimeout);
        this._saveTimeout = setTimeout(() => {
            // save in localStorage
            localStorage.setItem(`s-theme-${this.theme}`, JSON.stringify(this.state));
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
            (_a = localStorage.getItem(`s-theme-${this.theme}`)) !== null && _a !== void 0 ? _a : '{}');
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
        localStorage.removeItem(`s-theme-${this.theme}`);
        // clear in super class
        super.clear();
        // clear the state
        // @ts-ignore
        this.state = {};
        // apply the configs
        this.applyState();
        // set theme again to dispatch event
        // @ts-ignore
        this.constructor.setTheme();
        // maintain chainability
        return this;
    }
}
STheme.defaultThemeMetas = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLFlBQVksTUFBTSxzQkFBc0IsQ0FBQztBQXVDaEQsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsWUFBWTtJQWdlNUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxLQUFjLEVBQUUsT0FBZ0I7UUFDeEMsS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQXZEMUI7Ozs7Ozs7O1dBUUc7UUFDSCxVQUFLLEdBQUc7WUFDSixHQUFHLEVBQUUsU0FBUztZQUNkLGdCQUFnQixFQUFFLEVBQUU7U0FDdkIsQ0FBQztRQTZDRSxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsYUFBYTtRQUNiLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQWpmRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLEtBQUssS0FBSzs7UUFDWixNQUFNLFNBQVMsR0FBRyxNQUFBLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLDBDQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RSxJQUFJ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