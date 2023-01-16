import { partytownSnippet } from '@builder.io/partytown/integration';
import __SColor from '@coffeekraken/s-color';
import __SEnv from '@coffeekraken/s-env';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __parseHtml } from '@coffeekraken/sugar/console';
import { __getCookie, __setCookie } from '@coffeekraken/sugar/cookie';
import { __clearTransmations } from '@coffeekraken/sugar/dom';
import { __isCrawler } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __speedIndex } from '@coffeekraken/sugar/perf';
import __fastdom from 'fastdom';
import type {
    ISThemeLodSettings,
    ISThemeSettings as __ISThemeSettings,
} from '../shared/SThemeBase';
import __SThemeBase from '../shared/SThemeBase';

import __SFrontspec from '@coffeekraken/s-frontspec';

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
 * @event       s-theme.legal.agree         Dispatched when the user has agree the legal terms throug the `theme.agreeLegal` method
 * @event       s-theme.legal.disagree         Dispatched when the user has disagree the legal terms throug the `theme.disagreeLegal` method
 * @event       s-theme.legal.change             Dispatched when the user legal has been changed
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISThemeLegalSettings {
    cookieName: string;
    defaultMetas: any;
}

export interface ISThemePartytownSettings {
    enabled: boolean;
    [key: string]: any;
}

export interface ISThemeInitSettings {
    $context: HTMLElement;
    theme: string;
    variant: string;
    gtm: string;
    lod: Partial<ISThemeLodSettings>;
    partytown: Partial<ISThemePartytownSettings>;
    legal: Partial<ISThemeLegalSettings>;
    classmap: Partial<ISThemeClassmapSettings>;
}

export interface ISThemeClassmapSettings {
    enabled: boolean;
    url: string;
}

export interface ISThemeSettings
    extends ISThemeInitSettings,
        __ISThemeSettings {
    onReady: Function;
}

export interface ISThemeSetLodSettings {
    enabled: boolean;
    $context: HTMLElement;
}

export default class STheme extends __SThemeBase {
    static _defaultThemeMetas = {};

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
    static get theme(): string {
        const themeAttr = document.querySelector('html')?.getAttribute('theme');
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
    static get variant(): string {
        const themeAttr = document.querySelector('html')?.getAttribute('theme');
        if (!themeAttr) {
            return __SSugarConfig.get('theme.variant');
        }
        return themeAttr.split('-')[1];
    }

    /**
     * @name      lodLevel
     * @type      Number
     * @static
     *
     * Get the current theme lod (level of details)
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get lodLevel(): number {
        const currentTheme = this.getCurrentTheme();
        return currentTheme.lodLevel;
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
    static setLod(
        level: string | number,
        settings?: Partial<ISThemeSetLodSettings>,
    ): STheme {
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
    static whenLodChange(cb: Function): Function {
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
    static setTheme(
        theme?: string,
        variant?: string,
        $context = document.querySelector('html'),
    ): STheme {
        let themeStr;
        if (theme && variant) {
            themeStr = `${theme}-${variant}`;
        } else if (theme) {
            themeStr = `${theme}-light`;
        } else if (variant) {
            themeStr = `default-${variant}`;
        }

        // apply the theme on context
        STheme.applyTheme(theme, variant, $context);

        // save the theme in localstorage
        localStorage.setItem('s-theme', themeStr);

        // get the current theme instance
        const currentTheme = this.getCurrentTheme($context);

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
     * @param               {HTMLElement}       [$context=document.querySelector('html')]            The context element on which to apply the theme
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static applyTheme(
        theme?: string,
        variant?: string,
        $context: HTMLElement = <HTMLElement>document.querySelector('html'),
    ): void {
        __fastdom.mutate(() => {
            __clearTransmations(document.querySelector('html'), {
                timeout: 100,
            });

            if (theme && variant) {
                $context.setAttribute('theme', `${theme}-${variant}`);
            } else if (theme) {
                $context.setAttribute(
                    'theme',
                    `${theme}-${__SSugarConfig.get('theme.variant')}`,
                );
            } else if (variant) {
                $context.setAttribute(
                    'theme',
                    `${__SSugarConfig.get('theme.theme')}-${variant}`,
                );
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
    static isDark($context = document.querySelector('html')): boolean {
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
     * @param               {HTMLElement}       [$context=document.querySelector('html')]            The context element on which to apply the theme
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static setThemeVariant(
        variant: string,
        $context = document.querySelector('html'),
    ): STheme {
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
    static async init(settings?: Partial<ISThemeInitSettings>): STheme {
        const finalSettings = <ISThemeInitSettings>{
            $context: document.querySelector('html'),
            theme: undefined,
            variant: undefined,
            lod: {},
            legal: {},
            partytown: {},
            ...(settings ?? {}),
        };

        let themeInstance;

        // save default theme metas
        STheme._defaultThemeMetas = {
            theme: finalSettings.theme,
            variant: finalSettings.variant,
        };

        // get the current theme instance
        themeInstance = this.getCurrentTheme(finalSettings.$context, {
            ...finalSettings,
            onReady() {
                console.log(
                    `<yellow>[STheme]</yellow> Theme initialized <green>successfully</green>`,
                );
            },
        });

        // set the current theme in the env.SUGAR.theme property
        if (!document.env) document.env = {};
        if (!document.env.SUGAR) document.env.SUGAR = {};
        document.env.SUGAR.theme = themeInstance;

        // apply the theme
        STheme.applyTheme(
            themeInstance.theme,
            themeInstance.variant,
            finalSettings.$context,
        );

        // return the current theme
        return themeInstance;
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
    static getThemeMetas(
        $context: HTMLElement = document.querySelector('html'),
    ): any {
        let defaultTheme =
                STheme._defaultThemeMetas.theme ??
                __SSugarConfig.get('theme.theme'),
            defaultVariant =
                STheme._defaultThemeMetas.variant ??
                __SSugarConfig.get('theme.variant');

        let theme = defaultTheme,
            variant = defaultVariant;

        if ($context) {
            const computedStyle = getComputedStyle($context);
            // get the css setted --s-theme and --s-theme-variant variable from the $context
            const cssDefinedTheme = computedStyle.getPropertyValue('--s-theme'),
                cssDefinedVariant =
                    computedStyle.getPropertyValue('--s-theme-variant');
            if (cssDefinedTheme) {
                theme = cssDefinedTheme.trim();
            }
            if (cssDefinedVariant) {
                variant = cssDefinedVariant.trim();
            }
        }

        const name = `${theme ?? defaultTheme}-${variant ?? defaultVariant}`;
        const metas = __SSugarConfig.get(`theme.themes.${name}.metas`) ?? {};

        return __deepMerge(
            {
                name,
                theme: theme ?? defaultTheme,
                variant: variant ?? defaultVariant,
            },
            metas,
        );
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
    static getCurrentTheme(
        $context: HTMLElement = document.querySelector('html'),
        settings?: Partial<ISThemeSettings>,
    ): STheme {
        const themeMetas = STheme.getThemeMetas($context);
        return <STheme>(
            this.getTheme(themeMetas.theme, themeMetas.variant, settings)
        );
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
     * @name        state
     * @type        Object
     *
     * Store the current theme state
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    state = {
        lodLevel: undefined,
        overridedConfigs: {},
    };

    /**
     * @name        legal
     * @type        Object
     *
     * Store the legal state like the "agree" flag and the "metas" optional object.
     * This will be stored in the "legal" cookie.
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    legal = {
        agree: false,
        metas: {},
    };

    /**
     * @name      lodLevel
     * @type      Number
     *
     * Get the current theme lod (level of details)
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get lodLevel(): number {
        return this.state.lodLevel || __SFrontspec.get('lod.defaultLevel');
    }

    /**
     * @name      lodConfig
     * @type      Number
     *
     * Get the current theme lod (level of details) config
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _lodConfig: any;
    get lodConfig(): any {
        if (!this._lodConfig) {
            this._lodConfig = this.get('lod');
        }
        return this._lodConfig;
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
    constructor(
        theme?: string,
        variant?: string,
        settings?: Partial<ISThemeSettings>,
    ) {
        super(
            theme,
            variant,
            __deepMerge(
                {
                    google: __SFrontspec.get('google') ?? {},
                    partytown: __SFrontspec.get('partytown') ?? {},
                    lod: __SFrontspec.get('lod') ?? {},
                    legal: {
                        cookieName: 's-legal',
                        defaultMetas: {},
                    },
                },
                settings ?? {},
            ),
        );

        // proxy console
        this._proxyConsole();

        if (!__SEnv.is('production')) {
            const color =
                __SEnv.env.ENV === 'production'
                    ? 'red'
                    : __SEnv.env.ENV === 'staging'
                    ? 'cyan'
                    : 'green';

            console.log(
                `<yellow>[STheme]</yellow> Current environment is "<${color}>${__SEnv.env.ENV}</${color}>"`,
            );

            if (document.env?.PACKAGE) {
                console.log(
                    `<yellow>[STheme]</yellow> Project "<cyan>${document.env.PACKAGE.name}</cyan>" in version "<yellow>${document.env.PACKAGE.version}</yellow>"`,
                );
            }

            console.log(
                `<yellow>[STheme]</yellow> Initializing theme <cyan>${theme}</cyan> in <cyan>${variant}</cyan> variant`,
            );
        }

        // this.settings.classmap = __deepMerge(
        //     {
        //         enabled: this.get('classmap.enabled'),
        //         url: this.get('classmap.url'),
        //     },
        //     settings.classmap ?? {},
        // );

        // default lod (level of details) settings
        this.settings.lod = __deepMerge(
            {
                stylesheet: 'link#global',
            },
            this.settings.lod ?? {},
        );

        // listen for legal changes
        document.addEventListener('s-theme.legal.agree', () => {
            // init tracking when the user agree with the terms
            if (this.isLegalAgree()) {
                this._initTracking();
            }
        });

        // restore the theme
        this.restore();

        (async () => {
            // handle lod
            if (this.settings.lod.enabled) {
                this._initLod();
            }

            // init the tracking
            this._initTracking();

            // classmap (not supported for now...)
            // if (this.settings.classmap.enabled) {
            //     await this._initClassmap();
            // }

            if (settings.onReady) {
                settings.onReady();
            }
        })();
    }

    /**
     * Proxy console methods
     */
    private _proxyConsole() {
        const nativeConsole = {};

        for (let key of ['log', 'error', 'warn']) {
            nativeConsole[key] = console[key];
            console[key] = function (...args) {
                for (let log of args) {
                    if (typeof log === 'string') {
                        nativeConsole[key](__parseHtml(log));
                    } else {
                        nativeConsole[key](log);
                    }
                }
            };
        }
    }

    /**
     * This method take care to init the classmap feature by loading the classmap
     * from the settings specified url, patching native methods, etc...
     */
    // private _initClassmap(): Promise<void> {
    //     return new Promise(async (resolve) => {
    //         const classmap = new __SClassmap();
    //         const classmapJson = await classmap.loadFromUrl(
    //             this.settings.classmap.url,
    //         );
    //         classmap.patchNativeMethods();

    //         // save the classmap un the document.env.SUGAR.classmap property
    //         __set(document, 'env.SUGAR.classmap', classmap);

    //         resolve();
    //     });
    // }

    /**
     * Check if the tracking has been inited or not
     */
    private _isTrackingInited(): boolean {
        return document.querySelector('script#s-theme-gtm') !== null;
    }

    /**
     * Init the tracking (google, partytown, etc...)
     */
    private _initTracking() {
        // make sure the user has agreed the legal terms
        if (!this.isLegalAgree()) {
            if (!__SEnv.is('production')) {
                console.log(
                    `<yellow>[STheme]</yellow> You have a <magenta>google tag manager (gtm)</magenta> setted but the <cyan>legal terms</cyan> are not agreed. Disable tracking.`,
                );
            }
            return;
        }

        if (this._isTrackingInited()) {
            if (!__SEnv.is('production')) {
                console.log(
                    `<yellow>[STheme]</yellow> Tracking <magenta>google tag manager</magenta> already inited.`,
                );
            }
            return;
        }

        // init google tag manager
        if (this.settings.google?.gtm) {
            this._initGtm();
        }

        // partytown
        if (this.settings.partytown.enabled) {
            this._initPartytown();
        }
    }

    /**
     * Init google tag manager
     */
    private _initGtm() {
        if (!__SEnv.is('production')) {
            console.log(
                `<yellow>[STheme]</yellow> Initializing <magenta>google tag manager</magenta> with this id "<cyan>${this.settings.google.gtm}</cyan>"`,
            );
        }

        const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${this.settings.google.gtm}');`;

        // create the actual script tag
        const $script = document.createElement('script');
        $script.innerHTML = gtmScript;
        $script.setAttribute('id', 's-theme-gtm');
        // @ts-ignore
        $script.setAttribute(
            'type',
            this.settings.partytown?.enabled
                ? 'text/partytown'
                : 'text/javascript',
        );
        document.head.appendChild($script);
    }

    /**
     * This method takes care of initializing the partytoen feature.
     */
    private _initPartytown() {
        // make sure we have all we need for partytown
        if (!this.settings.google.gtm) {
            if (!__SEnv.is('production')) {
                console.log(
                    `<yellow>[STheme]</yellow> You have enabled <magenta>partytown</magenta> but you don't have specified any "<cyan>settings.google.gtm</cyan>" tag manager id...'`,
                );
                return;
            }
        }

        // set the partytown settings
        // @ts-ignore
        window.partytown = this.settings.partytown;

        if (!__SEnv.is('production')) {
            console.log(
                '<yellow>[STheme]</yellow> Initializing <magenta>partytown</magenta> with these settings',
                this.settings.partytown,
            );
        }

        // create and inject the partytown snippet
        const snippetText = partytownSnippet();
        const $partytownScript = document.createElement('script');
        $partytownScript.innerHTML = snippetText;
        $partytownScript.setAttribute('type', 'text/javascript');
        document.body.appendChild($partytownScript);
    }

    /**
     * This method takes care of initializing the lod (level of details) features
     * like the "botLevel", lod by speedIndex, etc...
     */
    private _initLod() {
        // setTimeout(() => {
        if (!__SEnv.is('production')) {
            console.log(
                '<yellow>[STheme]</yellow> Initializing <magenta>lod</magenta> (level of details) with these settings',
                this.settings.lod,
            );
        }

        // check if is a crawler
        const isCrawler = __isCrawler();

        // check if is a crawler and that we have a botLevel config
        if (isCrawler && this.lodConfig.botLevel !== undefined) {
            this.setLod(this.lodConfig.botLevel);
        }

        // is a lod is saved in state
        if (this.state.lodLevel !== undefined) {
            this.setLod(this.state.lodLevel);
            return;
        }

        // set lod level
        this.setLod(this.settings.lod.level);

        // if the user does not have selected a specific lod
        // we check which lod is the most suited for his
        // computer using the "speedIndex" calculated value
        if (
            !isCrawler &&
            this.state.lodLevel === undefined &&
            this.settings.lod.level === undefined
        ) {
            const speedIndex = __speedIndex();
            let suitedLod = 0;

            // get the higher lod depending on the speedIndex
            for (let [lod, lodObj] of Object.entries(
                this.lodConfig.levels ?? {},
            )) {
                if (lodObj.speedIndex > speedIndex) {
                    break;
                }
                suitedLod = parseInt(lod);
            }

            // set the suited calculated lod
            this.setLod(suitedLod);
            return;
        }
        // });
    }

    /**
     * @name            agreeLegal
     * @type            Function
     *
     * This method alows you to agree the legal of the website (cookies, etc...)
     * It will flag the state.legal.agree to "true" and save some legals settings
     * in the state.legal.metas object
     *
     * @event       s-theme.legal.agree             Dispatched when the user agree the legal terms
     * @event       s-theme.legal.change             Dispatched when the user legal has been changed
     *
     * @param       {Any}           metas           Some metas to save alongside the agree flag
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    agreeLegal(metas?: any): void {
        // set the agree flag to true
        this.legal.agree = true;
        // save the metas if some
        if (metas) {
            this.legal.metas = metas;
        }
        // save the cookie
        __setCookie(
            this.settings.legal.cookieName,
            Object.assign({}, this.legal),
        );

        // dispatch an event
        document.dispatchEvent(
            new CustomEvent('s-theme.legal.agree', {
                detail: this.legal,
            }),
        );
        document.dispatchEvent(
            new CustomEvent('s-theme.legal.change', {
                detail: {
                    prop: 'agree',
                    ...this.legal,
                },
            }),
        );
    }

    /**
     * @name            disagreeLegal
     * @type            Function
     *
     * This method alows you to disagree the legal of the website (cookies, etc...)
     * It will flag the state.legal.agree to "false" without touching the "metas" to keep
     * the potential user legal settings saved for next time
     *
     * @event       s-theme.legal.disagree             Dispatched when the user agree the legal terms
     * @event       s-theme.legal.change             Dispatched when the user legal has been changed
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    disagreeLegal(): void {
        // set the agree flag to false
        this.legal.agree = false;
        // save the cookie
        __setCookie(
            this.settings.legal.cookieName,
            Object.assign({}, this.legal),
        );

        // dispatch an event
        document.dispatchEvent(
            new CustomEvent('s-theme.legal.disagree', {
                detail: {
                    theme: this,
                },
            }),
        );
        document.dispatchEvent(
            new CustomEvent('s-theme.legal.change', {
                detail: {
                    prop: 'agree',
                    ...this.legal,
                },
            }),
        );
    }

    /**
     * @name            setLegalMetas
     * @type            Function
     *
     * This method allows you to set some legal metas.
     * Note that this will make a deepMerge of the current metas and the passed ones.
     *
     * @event       s-theme.legal.change             Dispatched when the user legal has been changed
     *
     * @param       {Any}           metas           Some metas to set
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setLegalMetas(metas: any): void {
        // save the metas if some
        this.legal.metas = __deepMerge(this.legal.metas, metas);
        // save the cookie
        __setCookie(
            this.settings.legal.cookieName,
            Object.assign({}, this.legal),
        );
        document.dispatchEvent(
            new CustomEvent('s-theme.legal.change', {
                detail: {
                    prop: 'metas',
                    ...this.legal,
                },
            }),
        );
    }

    /**
     * @name            getLegalMetas
     * @type            Function
     *
     * This method allows you to get the legal saved metas
     *
     * @return      {Any}               The legal metas saved
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getLegalMetas(): any {
        return __getCookie(this.settings.legal.cookieName)?.metas ?? {};
    }

    /**
     * @name            isLegalAgree
     * @type            Function
     *
     * This method allows you to check if the legal are agree or not
     *
     * @return      {Boolean}       true if agree, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isLegalAgree(): any {
        return __getCookie(this.settings.legal.cookieName)?.agree;
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
    setLod(
        level: string | number,
        settings?: Partial<ISThemeSetLodSettings>,
    ): STheme {
        const finalSettings = <ISThemeSetLodSettings>{
            $context: document.body,
            ...(settings ?? {}),
        };

        // @ts-ignore
        level = parseInt(`${level}`);

        // save in state
        this.state.lodLevel = level;
        this.save();

        const lodStylesheets = Array.from(
            document.querySelectorAll('link[s-lod]'),
        );

        let $stylesheet;
        if (this.settings.lod.stylesheet instanceof HTMLLinkElement) {
            $stylesheet = this.settings.lod.stylesheet;
        } else if (typeof this.settings.lod.stylesheet === 'string') {
            $stylesheet = document.querySelector(this.settings.lod.stylesheet);
        }

        // remove all the lod classes above the wanted level
        for (let i = 0; i <= 10; i++) {
            if (i > level) {
                finalSettings.$context.classList.remove(`s-lod--${i}`);
            }
        }

        // remove all none used stylesheets
        lodStylesheets.forEach(($link) => {
            const l = parseInt($link.getAttribute('s-lod'));
            if (l > level) {
                $link.remove();
            }
        });

        // add the new classes
        for (let i = 0; i <= level; i++) {
            finalSettings.$context.classList.add('s-lod', `s-lod--${i}`);

            // check if already have the stylesheet in the dom
            if (
                i > 0 &&
                !lodStylesheets.filter(($link) => {
                    const l = parseInt($link.getAttribute('s-lod'));
                    return l === i;
                }).length
            ) {
                const $lodLink = $stylesheet.cloneNode();
                $lodLink.setAttribute(
                    'href',
                    $stylesheet
                        .getAttribute('href')
                        .replace(
                            /([a-zA-Z0-9_-]+)\.css(\?.*)?/,
                            `lod/$1.lod-${i}.css`,
                        ),
                );
                $lodLink.setAttribute('s-lod', i);
                document.head.appendChild($lodLink);
            }
        }

        // dispatch a change event
        document.dispatchEvent(
            new CustomEvent('s-theme.lod.change', {
                detail: {
                    level,
                    theme: this,
                },
            }),
        );

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
    whenLod(level: number): Promise<void> {
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
    whenLodChange(cb: Function): Function {
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
    getColor(
        name: string,
        variant?: string,
        $context = document.querySelector('html'),
    ): __SColor {
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
    applyState($context: HTMLElement = document.querySelector('html')): STheme {
        // overrided configs (css)
        const properties = __SThemeBase.jsConfigObjectToCssProperties(
            this.getOverridedConfig(),
        );
        this._applyOverridedConfigs(properties, $context);

        // lod
        if (this.state.lodLevel !== undefined) {
            this.setLod(this.state.lodLevel);
        }

        return this;
    }

    /**
     * Apply the overrided configs from the state
     */
    _applyOverridedConfigs(
        properties,
        $context: HTMLElement = document.querySelector('html'),
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
        $context._sThemeOverridedConfigs[this.id].innerHTML = `
            [theme="${this.theme}-${this.variant}"] {
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
            // save in localStorage
            localStorage.setItem(
                `s-theme-${this.theme}`,
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
                localStorage.getItem(`s-theme-${this.theme}`) ?? '{}',
            );
            // @ts-ignore
            this.state = savedState ?? {};
        } catch (e) {
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
    clear(): STheme {
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
