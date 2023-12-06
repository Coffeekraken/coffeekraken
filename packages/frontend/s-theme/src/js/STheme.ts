import __SColor from '@coffeekraken/s-color';
import __SEnv from '@coffeekraken/s-env';
import __SFrontspec from '@coffeekraken/s-frontspec';
import { __clearTransmations, __isInIframe } from '@coffeekraken/sugar/dom';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import { __deepMerge } from '@coffeekraken/sugar/object';
import type { ISThemeSettings as __ISThemeSettings } from '../shared/SThemeBase.js';
import __SThemeBase from '../shared/SThemeBase.js';

/**
 * @name            STheme
 * @namespace       js
 * @type            Class
 * @extends         SThemeBase
 * @platform         js
 * @status              wip
 *
 * This class represent the sugar theme you've passed the name in the constructor.
 * Once you have an instance of this theme you will have access to a lot of utilities
 * methods like "loopOnColors", etc...
 *
 * @param       {String}        [theme=undefined]        The name of the theme you want to instanciate utilities for. If not specified, will take either the "default" theme, or the theme defined in the sugar.json file
 *
 * @snippet          __STheme($1)
 *
 * @example         js
 * import __STheme from '@coffeekraken/s-theme';
 * const theme = new __STheme();
 * theme.loopOnColors(({name, shade, value}) => {
 *      // do something...
 * });
 *
 * @event       s-theme.change          Dispatched when the theme has been changed
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISThemeInitSettings {
    id: string;
}

export interface ISThemeSettings
    extends ISThemeInitSettings,
        __ISThemeSettings {}

export default class STheme extends __SThemeBase {
    static _defaultThemeMetas = {};

    static globalSettings: ISThemeSettings = {
        id: 's-theme',
    };

    static globalState = {
        theme: undefined,
        variant: undefined,
    };

    static _isHotkeyRegistered = false;

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
    static get theme(): string {
        let theme = window
            .getComputedStyle(document.body)
            .getPropertyValue('--s-theme');

        if (theme) {
            return theme;
        }

        const themeAttr = document.querySelector('html')?.getAttribute('theme');
        if (!themeAttr) {
            return (
                this._defaultThemeMetas.theme ?? __SFrontspec.get('theme.theme')
            );
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
    static get variant(): string {
        let variant = window
            .getComputedStyle(document.body)
            .getPropertyValue('--s-variant');

        if (variant) {
            return variant;
        }

        const themeAttr = document.querySelector('html')?.getAttribute('theme');
        if (!themeAttr) {
            return (
                this._defaultThemeMetas.variant ??
                __SFrontspec.get('theme.theme')
            );
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
    static restore(): typeof STheme {
        let savedState = this.savedThemeMetas;
        if (savedState?.theme && savedState?.variant) {
            this.setTheme(savedState.theme, savedState.variant);
        } else {
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
    static setTheme(theme?: string, variant?: string): STheme {
        // apply the theme on context
        STheme.applyTheme(theme, variant);

        // get the current theme instance
        const currentTheme = this.getTheme(
            theme ?? this.theme,
            variant ?? this.variant,
        ) as STheme;

        // set the state
        this.globalState.theme = theme ?? this.theme;
        this.globalState.variant = variant ?? this.variant;

        // save
        currentTheme.save();

        // set the current theme in the env.SUGAR.theme property
        if (!document.env) document.env = {};
        if (!document.env.SUGAR) document.env.SUGAR = {};
        document.env.SUGAR.theme = currentTheme;

        // dispatch a change event
        document.dispatchEvent(
            new CustomEvent('s-theme.change', {
                detail: {
                    theme: currentTheme,
                },
            }),
        );

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
    static applyTheme(theme?: string, variant?: string): typeof STheme {
        const $context = document.querySelector('html');

        __clearTransmations(document.querySelector('html'), {
            timeout: 100,
        });
        if (theme && variant) {
            $context.setAttribute('theme', `${theme}-${variant}`);
        } else if (theme) {
            $context.setAttribute(
                'theme',
                `${theme}-${__SFrontspec.get('theme.variant')}`,
            );
        } else if (variant) {
            $context.setAttribute(
                'theme',
                `${__SFrontspec.get('theme.theme')}-${variant}`,
            );
        }

        return this;
    }

    /**
     * @name        frontData
     * @type        Function
     * @static
     *
     * Access the frontData object stored in the body:after css pseudo element
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static _frontData;
    static get frontData(): any {
        if (this._frontData) {
            return this._frontData;
        }
        const bodyStyle = window.getComputedStyle(document.body, ':after');
        this._frontData = JSON.parse(
            JSON.parse(bodyStyle.getPropertyValue('content'))
                .trim()
                .replace(/^\"/, '')
                .replace(/\"$/, ''),
        );
        return this._frontData;
    }

    /**
     * @name        savedThemeMetas
     * @type        Function
     * @static
     *
     * Get the savec theme metas from the localStorage
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static _savedThemeMetas;
    static get savedThemeMetas(): any {
        if (this._savedThemeMetas) {
            return this._savedThemeMetas;
        }
        try {
            const savedTheme = JSON.parse(
                localStorage.getItem(this.globalSettings.id),
            );
            this._savedThemeMetas = savedTheme;
        } catch (e) {}
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
    static isDarkVariantAvailable(): any {
        for (let [idx, theme] of Object.entries(
            this.frontData?.theme?.themes ?? {},
        )) {
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
    static preferDark(): boolean {
        return (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        );
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
    static setThemeVariant(variant: string): STheme {
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
    static init(settings?: Partial<ISThemeInitSettings>): STheme {
        const finalSettings = <ISThemeInitSettings>{
            id: 's-theme',
            ...(settings ?? {}),
        };

        // hotkey
        if (!this._isHotkeyRegistered) {
            __hotkey('ctrl+m').on('press', () => {
                this.toggleDarkMode();
            });
        }

        this.globalSettings = {
            ...this.globalSettings,
            ...finalSettings,
        };

        // restore from localStorage
        this.restore();

        // get the current theme and variant
        let theme = this.globalState?.theme ?? this.theme,
            variant = this.globalState?.variant ?? this.variant;

        // make sure the env.SUGAR.theme property exists
        if (!document.env) document.env = {};
        if (!document.env.SUGAR) document.env.SUGAR = {};

        // save the available themes
        if (!document.env.SUGAR.themes) {
            document.env.SUGAR.themes = this.frontData.theme.themes;
        }

        // make sure the theme is available
        if (document.env?.SUGAR?.theme) {
            return document.env.SUGAR.theme;
        }

        // instanciate the current theme instance
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
    static ensureIsInited(throwError = true): boolean {
        // @ts-ignore
        if (!document.env?.SUGAR?.theme) {
            if (throwError) {
                throw new Error(
                    `<red>[STheme]</red> You must init your theme using the __STheme.init() static method...`,
                );
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
    static applyCurrentColor(
        color: string,
        $context = document.querySelector('html'),
    ): void {
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
    static toggleDarkMode(): void {
        if (!this.isDarkVariantAvailable()) return;
        if (this.variant === 'dark') {
            this.setThemeVariant('light');
        } else {
            this.setThemeVariant('dark');
        }
    }

    /**
     * @name        state
     * @type        Object
     *
     * Store the current theme state
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    state = {
        overridedConfigs: {},
    };

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
    constructor(
        theme?: string,
        variant?: string,
        settings?: Partial<ISThemeSettings>,
    ) {
        super(theme, variant, __deepMerge({}, settings ?? {}));

        if (!__SEnv.is('production') && !__isInIframe()) {
            console.log(
                `<cyan>[STheme]</cyan> Initializing theme <cyan>${theme}</cyan> in <cyan>${variant}</cyan> variant`,
            );
        }

        // restore the theme
        this.restore();

        if (!__SEnv.is('production') && !__isInIframe()) {
            console.log(
                `<cyan>[STheme]</cyan> Theme initialized <green>successfully</green>`,
            );
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
    setColor(color: string, value: string): void {
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
    set(dotPath: string, value: any): SThemeBase {
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
    getColor(
        name: string,
        variant?: string,
        $context = document.body,
    ): __SColor {
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
    applyState($context: HTMLElement = document.body): STheme {
        // overrided configs (css)
        const properties = this.jsConfigObjectToCssProperties(
            this.getOverridedConfig(),
        );
        this._applyOverridedConfigs(properties, $context);

        return this;
    }

    /**
     * Apply the overrided configs from the state
     */
    _applyOverridedConfigs(
        properties,
        $context: HTMLElement = document.body,
    ): void {
        if (!$context._sThemeOverridedConfigs) {
            $context._sThemeOverridedConfigs = {};
        }
        if (!$context._sThemeOverridedConfigs[this.id]) {
            $context._sThemeOverridedConfigs[this.id] =
                document.createElement('style');
            $context._sThemeOverridedConfigs[this.id].setAttribute(
                'id',
                this.id,
            );
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

    /**
     * @name            save
     * @type            Function
     *
     * This method allows you to save locally the current theme with the changes applied using the `set` method.
     * The theme will be savec in localStorage and restored on page load to apply updates correctly
     *
     * @return      {STheme}                                The current theme instance
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _saveTimeout;
    save(): STheme {
        clearTimeout(this._saveTimeout);
        this._saveTimeout = setTimeout(() => {
            this.state.overridedConfigs = this.getOverridedConfig();
            // save in localStorage
            localStorage.setItem(
                `${this.constructor.globalSettings.id}`,
                JSON.stringify(this.constructor.globalState),
            );
            localStorage.setItem(
                `${this.constructor.globalSettings.id}-${this.theme}-${this.variant}`,
                JSON.stringify(this.state),
            );
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
    restore(): STheme {
        let savedState = {};
        // get from localStorage
        try {
            savedState = JSON.parse(
                // @ts-ignore
                localStorage.getItem(
                    `${this.constructor.globalSettings.id}-${this.theme}-${this.variant}`,
                ) ?? '{}',
            );
            // @ts-ignore
            this.state = savedState ?? {};
        } catch (e) {
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
    clear(): STheme {
        // delete the local storage
        localStorage.removeItem(
            `${this.constructor.globalSettings.id}-${this.theme}-${this.variant}`,
        );
        // clear in super class
        super.clear();
        // apply the configs
        this.applyState();
        // maintain chainability
        return this;
    }
}
