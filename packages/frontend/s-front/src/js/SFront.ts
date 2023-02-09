import { partytownSnippet } from '@builder.io/partytown/integration';
import __SClass from '@coffeekraken/s-class';
import __SEnv from '@coffeekraken/s-env';
import { __getCookie, __setCookie } from '@coffeekraken/sugar/cookie';
import { __isCrawler } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';

import __SStdio, {
    __SStdioBasicAdapter,
    __SStdioConsoleSource,
} from '@coffeekraken/s-stdio';

import { __speedIndex } from '@coffeekraken/sugar/perf';

import __SFrontspec from '@coffeekraken/s-frontspec';
import type { ISThemeInitSettings } from '@coffeekraken/s-theme';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name            SFront
 * @namespace       js
 * @type            Class
 * @extends         SFrontBase
 *
 * Central class to handle frontend stuffs like theme, google, etc...
 *
 * @example         js
 * import SFront from '@coffeekraken/s-front';
 * const theme = new SFront();
 * theme.loopOnColors(({name, schema, value}) => {
 *      // do something...
 * });
 *
 * @event       s-front.legal.agree         Dispatched when the user has agree the legal terms throug the `front.agreeLegal` method
 * @event       s-front.legal.disagree         Dispatched when the user has disagree the legal terms throug the `front.disagreeLegal` method
 * @event       s-front.legal.change             Dispatched when the user legal has been changed
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISFrontLegalSettings {
    cookieName: string;
    defaultMetas: any;
}

export interface ISFrontPartytownSettings {
    enabled: boolean;
    [key: string]: any;
}

export interface ISFrontInitSettings {
    id: string;
    gtm: string;
    lod: Partial<ISFrontLodSettings>;
    partytown: Partial<ISFrontPartytownSettings>;
    legal: Partial<ISFrontLegalSettings>;
    theme: __STheme | Partial<ISThemeInitSettings>;
    // classmap: Partial<ISFrontClassmapSettings>;
}

// export interface ISFrontClassmapSettings {
//     enabled: boolean;
//     url: string;
// }

export interface ISFrontSettings extends ISFrontInitSettings {}

export interface ISThemeSetLodSettings {
    enabled: boolean;
    $context: HTMLElement;
}

export default class SFront extends __SClass {
    /**
     * @name        _defaultInstance
     * @type        SFront
     * @static
     * @private
     *
     * Store the default inited SFront instance when using the SFront.init() method
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private static _defaultInstance;

    /**
     * @name            init
     * @type            Function
     * @static
     *
     * This method allows you to init the your SFront instance, restore savec updated if their some, etc...
     *
     * @return          {SFront}                                    The SFront instance that represent the current applied front
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static init(settings?: Partial<ISFrontInitSettings>): SFront {
        const finalSettings = <ISFrontInitSettings>{
            id: 'default',
            lod: {},
            legal: {},
            partytown: {},
            theme: {},
            ...(settings ?? {}),
        };

        let frontInstance = new this(finalSettings);

        // set the front in the env.SUGAR.front property
        if (!document.env) document.env = {};
        if (!document.env.SUGAR) document.env.SUGAR = {};
        document.env.SUGAR.front = frontInstance;

        // return the current front
        return frontInstance;
    }

    /**
     * @name            ensureIsInited
     * @type            Function
     * @static
     *
     * This method allows you to make sure the front has been inited using the `__SFront.init()` static method.
     * If it's not the case, it will throw an error to make sure the developer knows why it's not working...
     *
     * @param           {Boolean}               [throwError=true]               Specify if you want this method to throw an error when the front is not correctly inited
     * @return          {Boolean}                                    True if inited, false if not (and will thro)
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static ensureIsInited(throwError = true): boolean {
        // @ts-ignore
        if (!document.env?.SUGAR?.front) {
            if (throwError) {
                throw new Error(
                    `<red>[SFront]</red> You must init your front using the __SFront.init() static method...`,
                );
            }
            return false;
        }
        return true;
    }

    /**
     * @name        instance
     * @type        SFront
     * @static
     *
     * Access the default inited instance of the SFront class
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get instance(): SFront {
        return this._defaultInstance;
    }

    /**
     * @name        theme
     * @type        STheme
     *
     * Store the current theme instance
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    theme;

    /**
     * @name        frontspec
     * @type        Sfrontspec
     *
     * Store the current frontspec instance
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    frontspec;

    /**
     * @name        state
     * @type        Object
     *
     * Store the current front state
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _originalState = {
        lod: {
            level: undefined,
        },
    };
    state = Object.assign({}, this._originalState);

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
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISFrontSettings>) {
        // Stdio
        const stdio = new __SStdio(
            'default',
            new __SStdioConsoleSource(),
            new __SStdioBasicAdapter(),
        );

        if (!__SEnv.is('production')) {
            const color =
                __SEnv.env.ENV === 'production'
                    ? 'red'
                    : __SEnv.env.ENV === 'staging'
                    ? 'cyan'
                    : 'green';

            console.log(
                `<yellow>[SFront]</yellow> Current environment is "<${color}>${__SEnv.env.ENV}</${color}>"`,
            );

            if (document.env?.PACKAGE) {
                console.log(
                    `<yellow>[SFront]</yellow> Project "<cyan>${document.env.PACKAGE.name}</cyan>" in version "<yellow>${document.env.PACKAGE.version}</yellow>"`,
                );
            }
        }

        // init frontspec and theme
        let frontspec, theme;

        // init frontspec
        if (settings?.frontspec instanceof __SFrontspec) {
            frontspec = settings?.frontspec;
        } else {
            frontspec = __SFrontspec.init(settings?.frontspec);
        }

        // init theme
        if (settings?.theme instanceof __STheme) {
            theme = settings?.theme;
        } else {
            theme = __STheme.init(settings?.theme);
        }

        super(
            __deepMerge(
                {
                    id: 'default',
                    google: frontspec.get('google') ?? {},
                    partytown: frontspec.get('partytown') ?? {},
                    lod: {
                        stylesheet: 'link#global',
                        ...(frontspec.get('lod') ?? {}),
                    },
                    legal: {
                        cookieName: 's-legal',
                        defaultMetas: {},
                    },
                },
                settings ?? {},
            ),
        );

        // save the default instance to access it using the SFront.instance static property
        if (
            this.settings.id === 'default' &&
            !this.constructor._defaultInstance
        ) {
            this.constructor._defaultInstance = this;
        }

        // save frontspec and theme in class property
        this.frontspec = frontspec;
        this.theme = theme;

        // listen for legal changes
        document.addEventListener('s-front.legal.agree', () => {
            // init tracking when the user agree with the terms
            if (this.isLegalAgree()) {
                this._initTracking();
            }
        });

        // restore the front state
        this.restore();

        // handle lod
        if (this.settings.lod.enabled) {
            this._initLod();
        }

        // init the tracking
        this._initTracking();
    }

    /**
     * @name      lod
     * @type      { level: number }
     *
     * Get the current lod (level of details)
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get lod(): {
        level: number;
    } {
        return {
            level:
                this.state.lod?.level || this.frontspec.get('lod.defaultLevel'),
        };
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
    ): void {
        const finalSettings = <ISThemeSetLodSettings>{
            $context: document.querySelector('html'),
            ...(settings ?? {}),
        };

        console.verbose?.(
            `<yellow>[lod]</yellow> Set lod (level of details) to <cyan>${level}</cyan>`,
        );

        const cssSettings = __STheme.cssSettings;

        // @ts-ignore
        level = parseInt(`${level}`);

        // save in state
        this.state.lod.level = level;
        this.save();

        if (cssSettings.lod?.method === 'file') {
            const lodStylesheets = Array.from(
                document.querySelectorAll('link[s-lod]'),
            );

            let $stylesheet;
            if (this.settings.lod.stylesheet instanceof HTMLLinkElement) {
                $stylesheet = this.settings.lod.stylesheet;
            } else if (typeof this.settings.lod.stylesheet === 'string') {
                $stylesheet = document.querySelector(
                    this.settings.lod.stylesheet,
                );
            }

            // remove all none used stylesheets
            lodStylesheets.forEach(($link) => {
                const l = parseInt($link.getAttribute('s-lod'));
                if (l > level) {
                    $link.remove();
                }
            });
        }

        // remove all the lod classes above the wanted level
        for (let i = 0; i <= 10; i++) {
            if (i > level) {
                finalSettings.$context.classList.remove(`s-lod--${i}`);
            }
        }

        // add the new classes
        for (let i = 0; i <= level; i++) {
            finalSettings.$context.classList.add('s-lod', `s-lod--${i}`);

            if (cssSettings.lod?.method === 'file') {
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
        }

        // dispatch a change event
        document.dispatchEvent(
            new CustomEvent('s-front.lod.change', {
                detail: {
                    level,
                    theme: this,
                },
            }),
        );
    }

    /**
     * @name      lodConfig
     * @type      Number
     *
     * Get the current front lod (level of details) config
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _lodConfig: any;
    get lodConfig(): any {
        if (!this._lodConfig) {
            this._lodConfig = this.frontspec.get('lod');
        }
        return this._lodConfig;
    }

    /**
     * This method takes care of initializing the lod (level of details) features
     * like the "botLevel", lod by speedIndex, etc...
     */
    private _initLod() {
        // setTimeout(() => {
        if (!__SEnv.is('production')) {
            console.log(
                '<yellow>[SFront]</yellow> Initializing <magenta>lod</magenta> (level of details) with these settings',
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
        if (this.state.lod.level !== undefined) {
            this.setLod(this.state.lod.level);
            return;
        }

        // set lod level
        this.setLod(this.settings.lod.level);

        // if the user does not have selected a specific lod
        // we check which lod is the most suited for his
        // computer using the "speedIndex" calculated value
        if (
            !isCrawler &&
            this.state.lod.level === undefined &&
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
     * Check if the tracking has been inited or not
     */
    private _isTrackingInited(): boolean {
        return document.querySelector('script#s-front-gtm') !== null;
    }

    /**
     * Init the tracking (google, partytown, etc...)
     */
    private _initTracking() {
        // make sure the user has agreed the legal terms
        if (!this.isLegalAgree()) {
            if (!__SEnv.is('production')) {
                console.log(
                    `<yellow>[SFront]</yellow> You have a <magenta>google tag manager (gtm)</magenta> setted but the <cyan>legal terms</cyan> are not agreed. Tracking <red>disabled</red>.`,
                );
            }
            return;
        }

        if (this._isTrackingInited()) {
            if (!__SEnv.is('production')) {
                console.log(
                    `<yellow>[SFront]</yellow> Tracking <magenta>google tag manager</magenta> already inited.`,
                );
            }
            return;
        }

        // init google tag manager
        if (this.settings.google?.gtm) {
            this._initGtm();
        }

        // partytown
        if (this.settings.partytown?.enabled) {
            this._initPartytown();
        }
    }

    /**
     * Init google tag manager
     */
    private _initGtm() {
        if (!__SEnv.is('production')) {
            console.log(
                `<yellow>[SFront]</yellow> Initializing tracking through the <magenta>google tag manager</magenta> with this id "<cyan>${this.settings.google.gtm}</cyan>"`,
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
        $script.setAttribute('id', 's-front-gtm');
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
                    `<yellow>[SFront]</yellow> You have enabled <magenta>partytown</magenta> but you don't have specified any "<cyan>settings.google.gtm</cyan>" tag manager id...'`,
                );
                return;
            }
        }

        // set the partytown settings
        // @ts-ignore
        window.partytown = this.settings.partytown;

        if (!__SEnv.is('production')) {
            console.log(
                '<yellow>[SFront]</yellow> Initializing <magenta>partytown</magenta> with these settings',
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
     * @name            agreeLegal
     * @type            Function
     *
     * This method alows you to agree the legal of the website (cookies, etc...)
     * It will flag the state.legal.agree to "true" and save some legals settings
     * in the state.legal.metas object
     *
     * @event       s-front.legal.agree             Dispatched when the user agree the legal terms
     * @event       s-front.legal.change             Dispatched when the user legal has been changed
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
            new CustomEvent('s-front.legal.agree', {
                detail: this.legal,
            }),
        );
        document.dispatchEvent(
            new CustomEvent('s-front.legal.change', {
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
     * @event       s-front.legal.disagree             Dispatched when the user agree the legal terms
     * @event       s-front.legal.change             Dispatched when the user legal has been changed
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
            new CustomEvent('s-front.legal.disagree', {
                detail: {
                    front: this,
                },
            }),
        );
        document.dispatchEvent(
            new CustomEvent('s-front.legal.change', {
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
     * @event       s-front.legal.change             Dispatched when the user legal has been changed
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
            new CustomEvent('s-front.legal.change', {
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
     * @name            save
     * @type            Function
     *
     * This method allows you to save locally the current front with the changes applied using the `set` method.
     * The front will be saved in localStorage and restored on page load to apply updates correctly
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _saveTimeout;
    save(): SFront {
        clearTimeout(this._saveTimeout);
        this._saveTimeout = setTimeout(() => {
            // save in localStorage
            localStorage.setItem(
                `s-front-${this.settings.id}`,
                JSON.stringify(this.state),
            );
        }, 500);
    }

    /**
     * @name            restore
     * @type            Function
     *
     * This method allows you to restore locally the current front with the changes applied using the `set` method.
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    restore(): void {
        // get from localStorage
        try {
            const savedState = JSON.parse(
                // @ts-ignore
                localStorage.getItem(`s-front-${this.settings.id}`),
            );
            // @ts-ignore
            this.state = savedState ?? Object.assign({}, this._originalState);
        } catch (e) {
            this.state = Object.assign({}, this._originalState);
        }
        console.log('STate', this.state);
    }

    /**
     * @name            clear
     * @type            Function
     *
     * This method allows you to clear locally the current front with the changes applied using the `set` method.
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    clear(): SFront {
        // delete the local storage
        localStorage.removeItem(`s-front-${this.settings.id}`);
        // clear the state
        // @ts-ignore
        this.state = Object.assign({}, this._originalState);
    }
}
