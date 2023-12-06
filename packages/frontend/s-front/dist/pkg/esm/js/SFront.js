var _a;
import { partytownSnippet } from '@builder.io/partytown/integration';
import __SClass from '@coffeekraken/s-class';
import __SEnv from '@coffeekraken/s-env';
import __SLog from '@coffeekraken/s-log';
import { __getCookie, __setCookie } from '@coffeekraken/sugar/cookie';
import { __isInIframe, __reloadStylesheets } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __SStdio, { __SStdioBasicAdapter, __SStdioConsoleSource, } from '@coffeekraken/s-stdio';
// @ts-ignore
if ((_a = import.meta) === null || _a === void 0 ? void 0 : _a.hot) {
    // @ts-ignore
    import.meta.hot.on('sugar.update.css', (data) => {
        var _a, _b;
        // @ts-ignore
        (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `[SFront] Reloading css "${(_b = data.srcRelPath) !== null && _b !== void 0 ? _b : data}"`);
        // perform custom update
        __reloadStylesheets();
    });
}
// export interface ISFrontSetLodSettings {
//     enabled: boolean;
//     $context: HTMLElement;
// }
export default class SFront extends __SClass {
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
    static init(settings) {
        const finalSettings = Object.assign({ id: 'default', 
            // lod: {},
            legal: {}, partytown: {} }, (settings !== null && settings !== void 0 ? settings : {}));
        let frontInstance = new this(finalSettings);
        // set the front in the env.SUGAR.front property
        if (!document.env)
            document.env = {};
        if (!document.env.SUGAR)
            document.env.SUGAR = {};
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
    static ensureIsInited(throwError = true) {
        var _a, _b;
        // @ts-ignore
        if (!((_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.front)) {
            if (throwError) {
                throw new Error(`<red>[SFront]</red> You must init your front using the __SFront.init() static method...`);
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
    static get instance() {
        return this._defaultInstance;
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
    constructor(settings) {
        var _a, _b, _c;
        // filter logs
        __SLog.filter((log) => {
            if (settings.logs)
                return true;
            if (settings.logs === false)
                return false;
            if (__isInIframe() && ['log', 'verbose'].includes(log.type))
                return false;
            return true;
        });
        // Stdio
        new __SStdio('default', new __SStdioConsoleSource(), new __SStdioBasicAdapter());
        if (!__SEnv.is('production') && !__isInIframe()) {
            const color = __SEnv.env.ENV === 'production'
                ? 'red'
                : __SEnv.env.ENV === 'staging'
                    ? 'cyan'
                    : 'green';
            console.log(`<yellow>[SFront]</yellow> Current environment is "<${color}>${__SEnv.env.ENV}</${color}>"`);
            if ((_a = document.env) === null || _a === void 0 ? void 0 : _a.PACKAGE) {
                console.log(`<yellow>[SFront]</yellow> Project "<cyan>${document.env.PACKAGE.name}</cyan>" in version "<yellow>${document.env.PACKAGE.version}</yellow>"`);
            }
        }
        // init frontspec
        let frontspec;
        if ((settings === null || settings === void 0 ? void 0 : settings.frontspec) instanceof __SFrontspec) {
            frontspec = settings === null || settings === void 0 ? void 0 : settings.frontspec;
        }
        else {
            frontspec = new __SFrontspec(settings === null || settings === void 0 ? void 0 : settings.frontspec);
        }
        super(__deepMerge({
            id: 'default',
            google: (_b = frontspec.get('google')) !== null && _b !== void 0 ? _b : {},
            partytown: (_c = frontspec.get('partytown')) !== null && _c !== void 0 ? _c : {},
            // lod: {
            //     stylesheet: 'link#global',
            //     ...(frontspec.get('lod') ?? {}),
            // },
            legal: {
                cookieName: 's-legal',
                defaultMetas: {},
            },
        }, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name        state
         * @type        Object
         *
         * Store the current front state
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._originalState = {
        // lod: {
        //     level: undefined,
        // },
        };
        this.state = Object.assign({}, this._originalState);
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
        this.legal = {
            agree: false,
            metas: {},
        };
        this.frontspec = frontspec;
        // save the default instance to access it using the SFront.instance static property
        if (this.settings.id === 'default' &&
            !this.constructor._defaultInstance) {
            this.constructor._defaultInstance = this;
        }
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
        // if (this.frontspec.get('lod.enabled')) {
        //     this._initLod();
        // }
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
    // get lod(): {
    //     level: number;
    // } {
    //     return {
    //         level:
    //             this.state.lod?.level !== undefined
    //                 ? this.state.lod.level
    //                 : this.frontspec.get('lod.defaultLevel'),
    //     };
    // }
    /**
     * @name            setLod
     * @type            Function
     *
     * This method allows you to set the level of details you want on any HTMLElement context
     *
     * @param               {String|Number}     level           The level you want to set
     * @param               {Partial<ISFrontSetLodSettings>}        Some settings to configure your action
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    // setLod(
    //     level: string | number,
    //     settings?: Partial<ISFrontSetLodSettings>,
    // ): void {
    //     const lodSettings = this.frontspec.get('lod');
    //     if (!lodSettings?.enabled) {
    //         return;
    //     }
    //     const finalSettings = <ISFrontSetLodSettings>{
    //         $context: document.querySelector('html'),
    //         ...(settings ?? {}),
    //     };
    //     console.verbose?.(
    //         `<yellow>[lod]</yellow> Set lod (level of details) to <cyan>${level}</cyan>`,
    //     );
    //     // @ts-ignore
    //     level = parseInt(`${level}`);
    //     // save in state
    //     this.state.lod.level = level;
    //     this.save();
    //     let lodStylesheets = [],
    //         $stylesheet;
    //     if (lodSettings?.method === 'file') {
    //         lodStylesheets = Array.from(
    //             document.querySelectorAll('link[s-lod]'),
    //         );
    //         if (lodSettings.stylesheet instanceof HTMLLinkElement) {
    //             $stylesheet = lodSettings.stylesheet;
    //         } else if (typeof lodSettings.stylesheet === 'string') {
    //             $stylesheet = document.querySelector(lodSettings.stylesheet);
    //         }
    //         // remove all none used stylesheets
    //         lodStylesheets.forEach(($link) => {
    //             const l = parseInt($link.getAttribute('s-lod'));
    //             if (l > <number>level) {
    //                 $link.remove();
    //             }
    //         });
    //     }
    //     // remove all the lod classes above the wanted level
    //     for (let i = 0; i <= 10; i++) {
    //         if (i > level) {
    //             finalSettings.$context.classList.remove(`s-lod-${i}`);
    //         }
    //     }
    //     // add the new classes
    //     for (let i = 0; i <= level; i++) {
    //         finalSettings.$context.classList.add('s-lod', `s-lod-${i}`);
    //         if (lodSettings?.method === 'file' && $stylesheet) {
    //             if (
    //                 i > 0 &&
    //                 !lodStylesheets.filter(($link) => {
    //                     const l = parseInt($link.getAttribute('s-lod'));
    //                     return l === i;
    //                 }).length
    //             ) {
    //                 const $lodLink = $stylesheet.cloneNode();
    //                 $lodLink.setAttribute(
    //                     'href',
    //                     $stylesheet
    //                         .getAttribute('href')
    //                         .replace(
    //                             /([a-zA-Z0-9_-]+)\.css(\?.*)?/,
    //                             `lod/$1.lod-${i}.css`,
    //                         ),
    //                 );
    //                 $lodLink.setAttribute('s-lod', i);
    //                 document.head.appendChild($lodLink);
    //             }
    //         }
    //     }
    //     // dispatch a change event
    //     document.dispatchEvent(
    //         new CustomEvent('s-front.lod.change', {
    //             detail: {
    //                 level,
    //             },
    //         }),
    //     );
    // }
    /**
     * @name      lodConfig
     * @type      Number
     *
     * Get the current front lod (level of details) config
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    // _lodConfig: any;
    // get lodConfig(): any {
    //     if (!this._lodConfig) {
    //         this._lodConfig = this.frontspec.get('lod');
    //     }
    //     return this._lodConfig;
    // }
    /**
     * This method takes care of initializing the lod (level of details) features
     * like the "botLevel", lod by speedIndex, etc...
     */
    // private _initLod() {
    //     // setTimeout(() => {
    //     if (!__SEnv.is('production') && !__isInIframe()) {
    //         console.log(
    //             '<yellow>[SFront]</yellow> Initializing <magenta>lod</magenta> (level of details) with these settings',
    //             this.frontspec.get('lod'),
    //         );
    //     }
    //     // check if is a crawler
    //     const isCrawler = __isCrawler();
    //     // check if is a crawler and that we have a botLevel config
    //     if (isCrawler && this.lodConfig.botLevel !== undefined) {
    //         this.setLod(this.lodConfig.botLevel);
    //     }
    //     // is a lod is saved in state
    //     if (
    //         this.state.lod.level !== undefined &&
    //         this.state.lod.level !== null
    //     ) {
    //         this.setLod(this.state.lod.level);
    //         return;
    //     }
    //     // set lod level
    //     this.setLod(this.frontspec.lod.defaultLevel);
    //     // if the user does not have selected a specific lod
    //     // we check which lod is the most suited for his
    //     // computer using the "speedIndex" calculated value
    //     if (
    //         !isCrawler &&
    //         this.state.lod.level === undefined &&
    //         this.frontspec.lod.defaultLevel === undefined
    //     ) {
    //         const speedIndex = __speedIndex();
    //         let suitedLod = 0;
    //         // get the higher lod depending on the speedIndex
    //         for (let [lod, lodObj] of Object.entries(
    //             this.lodConfig.levels ?? {},
    //         )) {
    //             if (lodObj.speedIndex > speedIndex) {
    //                 break;
    //             }
    //             suitedLod = parseInt(lod);
    //         }
    //         // set the suited calculated lod
    //         this.setLod(suitedLod);
    //         return;
    //     }
    //     // });
    // }
    /**
     * Check if the tracking has been inited or not
     */
    _isTrackingInited() {
        return document.querySelector('script#s-front-gtm') !== null;
    }
    /**
     * Init the tracking (google, partytown, etc...)
     */
    _initTracking() {
        var _a, _b, _c, _d;
        // make sure the user has agreed the legal terms
        if (!this.isLegalAgree()) {
            if (!__SEnv.is('production') && !__isInIframe()) {
                console.log(`<yellow>[SFront]</yellow> You have a <magenta>google tag manager (gtm)</magenta> setted but the <cyan>legal terms</cyan> are not agreed.`, `<yellow>[SFront]</yellow> Tracking <red>disabled</red>`);
            }
            return;
        }
        if (this._isTrackingInited()) {
            if (!__SEnv.is('production') && !__isInIframe()) {
                console.log(`<yellow>[SFront]</yellow> Tracking <magenta>google tag manager</magenta> already inited.`);
            }
            return;
        }
        // init google tag manager
        if ((_b = (_a = this.frontspec) === null || _a === void 0 ? void 0 : _a.google) === null || _b === void 0 ? void 0 : _b.gtm) {
            this._initGtm();
        }
        // partytown
        if ((_d = (_c = this.frontspec) === null || _c === void 0 ? void 0 : _c.partytown) === null || _d === void 0 ? void 0 : _d.enabled) {
            this._initPartytown();
        }
    }
    /**
     * Init google tag manager
     */
    _initGtm() {
        var _a;
        if (!__SEnv.is('production') && !__isInIframe()) {
            console.log(`<yellow>[SFront]</yellow> Initializing tracking through the <magenta>google tag manager</magenta> with this id "<cyan>${this.frontspec.google.gtm}</cyan>"`);
        }
        const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${this.frontspec.google.gtm}');`;
        // create the actual script tag
        const $script = document.createElement('script');
        $script.innerHTML = gtmScript;
        $script.setAttribute('id', 's-front-gtm');
        // @ts-ignore
        $script.setAttribute('type', ((_a = this.frontspec.partytown) === null || _a === void 0 ? void 0 : _a.enabled)
            ? 'text/partytown'
            : 'text/javascript');
        document.head.appendChild($script);
    }
    /**
     * This method takes care of initializing the partytoen feature.
     */
    _initPartytown() {
        var _a, _b;
        // make sure we have all we need for partytown
        if (!((_b = (_a = this.frontspec) === null || _a === void 0 ? void 0 : _a.google) === null || _b === void 0 ? void 0 : _b.gtm)) {
            if (!__SEnv.is('production') && !__isInIframe()) {
                console.log(`<yellow>[SFront]</yellow> You have enabled <magenta>partytown</magenta> but you don't have specified any "<cyan>settings.frontspec.google.gtm</cyan>" tag manager id...'`);
                return;
            }
        }
        // set the partytown settings
        // @ts-ignore
        window.partytown = this.frontspec.partytown;
        if (!__SEnv.is('production') && !__isInIframe()) {
            console.log('<yellow>[SFront]</yellow> Initializing <magenta>partytown</magenta> with these settings', this.frontspec.partytown);
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
    agreeLegal(metas) {
        // set the agree flag to true
        this.legal.agree = true;
        // save the metas if some
        if (metas) {
            this.legal.metas = metas;
        }
        // save the cookie
        __setCookie(this.settings.legal.cookieName, Object.assign({}, this.legal));
        // dispatch an event
        document.dispatchEvent(new CustomEvent('s-front.legal.agree', {
            detail: this.legal,
        }));
        document.dispatchEvent(new CustomEvent('s-front.legal.change', {
            detail: Object.assign({ prop: 'agree' }, this.legal),
        }));
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
    disagreeLegal() {
        // set the agree flag to false
        this.legal.agree = false;
        // save the cookie
        __setCookie(this.settings.legal.cookieName, Object.assign({}, this.legal));
        // dispatch an event
        document.dispatchEvent(new CustomEvent('s-front.legal.disagree', {
            detail: {
                front: this,
            },
        }));
        document.dispatchEvent(new CustomEvent('s-front.legal.change', {
            detail: Object.assign({ prop: 'agree' }, this.legal),
        }));
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
    setLegalMetas(metas) {
        // save the metas if some
        this.legal.metas = __deepMerge(this.legal.metas, metas);
        // save the cookie
        __setCookie(this.settings.legal.cookieName, Object.assign({}, this.legal));
        document.dispatchEvent(new CustomEvent('s-front.legal.change', {
            detail: Object.assign({ prop: 'metas' }, this.legal),
        }));
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
    getLegalMetas() {
        var _a, _b;
        return (_b = (_a = __getCookie(this.settings.legal.cookieName)) === null || _a === void 0 ? void 0 : _a.metas) !== null && _b !== void 0 ? _b : {};
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
    isLegalAgree() {
        var _a;
        return (_a = __getCookie(this.settings.legal.cookieName)) === null || _a === void 0 ? void 0 : _a.agree;
    }
    save() {
        clearTimeout(this._saveTimeout);
        this._saveTimeout = setTimeout(() => {
            // save in localStorage
            localStorage.setItem(`s-front-${this.settings.id}`, JSON.stringify(this.state));
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
    restore() {
        // get from localStorage
        try {
            const savedState = JSON.parse(
            // @ts-ignore
            localStorage.getItem(`s-front-${this.settings.id}`));
            // @ts-ignore
            this.state = savedState !== null && savedState !== void 0 ? savedState : Object.assign({}, this._originalState);
        }
        catch (e) {
            this.state = Object.assign({}, this._originalState);
        }
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
    clear() {
        // delete the local storage
        localStorage.removeItem(`s-front-${this.settings.id}`);
        // clear the state
        // @ts-ignore
        this.state = Object.assign({}, this._originalState);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJekQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxRQUFRLEVBQUUsRUFDYixvQkFBb0IsRUFDcEIscUJBQXFCLEdBQ3hCLE1BQU0sdUJBQXVCLENBQUM7QUFFL0IsYUFBYTtBQUNiLElBQUksTUFBQSxNQUFNLENBQUMsSUFBSSwwQ0FBRSxHQUFHLEVBQUU7SUFDbEIsYUFBYTtJQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFOztRQUM1QyxhQUFhO1FBQ2IsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCwyQkFBMkIsTUFBQSxJQUFJLENBQUMsVUFBVSxtQ0FBSSxJQUFJLEdBQUcsQ0FDeEQsQ0FBQztRQUNGLHdCQUF3QjtRQUN4QixtQkFBbUIsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0NBQ047QUF3Q0QsMkNBQTJDO0FBQzNDLHdCQUF3QjtBQUN4Qiw2QkFBNkI7QUFDN0IsSUFBSTtBQUVKLE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLFFBQVE7SUFjeEM7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQXVDO1FBQy9DLE1BQU0sYUFBYSxHQUFHLGdCQUNsQixFQUFFLEVBQUUsU0FBUztZQUNiLFdBQVc7WUFDWCxLQUFLLEVBQUUsRUFBRSxFQUNULFNBQVMsRUFBRSxFQUFFLElBQ1YsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLElBQUksYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTVDLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUc7WUFBRSxRQUFRLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLO1lBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pELFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7UUFFekMsMkJBQTJCO1FBQzNCLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEdBQUcsSUFBSTs7UUFDbkMsYUFBYTtRQUNiLElBQUksQ0FBQyxDQUFBLE1BQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLEtBQUssQ0FBQSxFQUFFO1lBQzdCLElBQUksVUFBVSxFQUFFO2dCQUNaLE1BQU0sSUFBSSxLQUFLLENBQ1gseUZBQXlGLENBQzVGLENBQUM7YUFDTDtZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sS0FBSyxRQUFRO1FBQ2YsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDakMsQ0FBQztJQTRDRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQW1DOztRQUMzQyxjQUFjO1FBQ2QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2xCLElBQUksUUFBUSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDL0IsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLEtBQUs7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDMUMsSUFBSSxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDdkQsT0FBTyxLQUFLLENBQUM7WUFDakIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRO1FBQ1IsSUFBSSxRQUFRLENBQ1IsU0FBUyxFQUNULElBQUkscUJBQXFCLEVBQUUsRUFDM0IsSUFBSSxvQkFBb0IsRUFBRSxDQUM3QixDQUFDO1FBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUM3QyxNQUFNLEtBQUssR0FDUCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxZQUFZO2dCQUMzQixDQUFDLENBQUMsS0FBSztnQkFDUCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssU0FBUztvQkFDOUIsQ0FBQyxDQUFDLE1BQU07b0JBQ1IsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUVsQixPQUFPLENBQUMsR0FBRyxDQUNQLHNEQUFzRCxLQUFLLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssS0FBSyxJQUFJLENBQzlGLENBQUM7WUFFRixJQUFJLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsT0FBTyxFQUFFO2dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUNQLDRDQUE0QyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdDQUFnQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLFlBQVksQ0FDaEosQ0FBQzthQUNMO1NBQ0o7UUFFRCxpQkFBaUI7UUFDakIsSUFBSSxTQUFTLENBQUM7UUFDZCxJQUFJLENBQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFNBQVMsYUFBWSxZQUFZLEVBQUU7WUFDN0MsU0FBUyxHQUFHLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxTQUFTLENBQUM7U0FDbkM7YUFBTTtZQUNILFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsU0FBUyxDQUFDLENBQUM7U0FDckQ7UUFFRCxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksRUFBRSxFQUFFLFNBQVM7WUFDYixNQUFNLEVBQUUsTUFBQSxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxtQ0FBSSxFQUFFO1lBQ3JDLFNBQVMsRUFBRSxNQUFBLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLG1DQUFJLEVBQUU7WUFDM0MsU0FBUztZQUNULGlDQUFpQztZQUNqQyx1Q0FBdUM7WUFDdkMsS0FBSztZQUNMLEtBQUssRUFBRTtnQkFDSCxVQUFVLEVBQUUsU0FBUztnQkFDckIsWUFBWSxFQUFFLEVBQUU7YUFDbkI7U0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBdEdOOzs7Ozs7OztXQVFHO1FBQ0gsbUJBQWMsR0FBRztRQUNiLFNBQVM7UUFDVCx3QkFBd0I7UUFDeEIsS0FBSztTQUNSLENBQUM7UUFDRixVQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRS9DOzs7Ozs7Ozs7V0FTRztRQUNILFVBQUssR0FBRztZQUNKLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFDO1FBMkVFLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBRTNCLG1GQUFtRjtRQUNuRixJQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLFNBQVM7WUFDOUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUNwQztZQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1NBQzVDO1FBRUQsMkJBQTJCO1FBQzNCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7WUFDbEQsbURBQW1EO1lBQ25ELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDeEI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILDBCQUEwQjtRQUMxQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZixhQUFhO1FBQ2IsMkNBQTJDO1FBQzNDLHVCQUF1QjtRQUN2QixJQUFJO1FBRUosb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxlQUFlO0lBQ2YscUJBQXFCO0lBQ3JCLE1BQU07SUFDTixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLGtEQUFrRDtJQUNsRCx5Q0FBeUM7SUFDekMsNERBQTREO0lBQzVELFNBQVM7SUFDVCxJQUFJO0lBRUo7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxVQUFVO0lBQ1YsOEJBQThCO0lBQzlCLGlEQUFpRDtJQUNqRCxZQUFZO0lBQ1oscURBQXFEO0lBRXJELG1DQUFtQztJQUNuQyxrQkFBa0I7SUFDbEIsUUFBUTtJQUVSLHFEQUFxRDtJQUNyRCxvREFBb0Q7SUFDcEQsK0JBQStCO0lBQy9CLFNBQVM7SUFFVCx5QkFBeUI7SUFDekIsd0ZBQXdGO0lBQ3hGLFNBQVM7SUFFVCxvQkFBb0I7SUFDcEIsb0NBQW9DO0lBRXBDLHVCQUF1QjtJQUN2QixvQ0FBb0M7SUFDcEMsbUJBQW1CO0lBRW5CLCtCQUErQjtJQUMvQix1QkFBdUI7SUFFdkIsNENBQTRDO0lBQzVDLHVDQUF1QztJQUN2Qyx3REFBd0Q7SUFDeEQsYUFBYTtJQUViLG1FQUFtRTtJQUNuRSxvREFBb0Q7SUFDcEQsbUVBQW1FO0lBQ25FLDRFQUE0RTtJQUM1RSxZQUFZO0lBRVosOENBQThDO0lBQzlDLDhDQUE4QztJQUM5QywrREFBK0Q7SUFDL0QsdUNBQXVDO0lBQ3ZDLGtDQUFrQztJQUNsQyxnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLFFBQVE7SUFFUiwyREFBMkQ7SUFDM0Qsc0NBQXNDO0lBQ3RDLDJCQUEyQjtJQUMzQixxRUFBcUU7SUFDckUsWUFBWTtJQUNaLFFBQVE7SUFFUiw2QkFBNkI7SUFDN0IseUNBQXlDO0lBQ3pDLHVFQUF1RTtJQUV2RSwrREFBK0Q7SUFDL0QsbUJBQW1CO0lBQ25CLDJCQUEyQjtJQUMzQixzREFBc0Q7SUFDdEQsdUVBQXVFO0lBQ3ZFLHNDQUFzQztJQUN0Qyw0QkFBNEI7SUFDNUIsa0JBQWtCO0lBQ2xCLDREQUE0RDtJQUM1RCx5Q0FBeUM7SUFDekMsOEJBQThCO0lBQzlCLGtDQUFrQztJQUNsQyxnREFBZ0Q7SUFDaEQsb0NBQW9DO0lBQ3BDLDhEQUE4RDtJQUM5RCxxREFBcUQ7SUFDckQsNkJBQTZCO0lBQzdCLHFCQUFxQjtJQUNyQixxREFBcUQ7SUFDckQsdURBQXVEO0lBQ3ZELGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osUUFBUTtJQUVSLGlDQUFpQztJQUNqQyw4QkFBOEI7SUFDOUIsa0RBQWtEO0lBQ2xELHdCQUF3QjtJQUN4Qix5QkFBeUI7SUFDekIsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxTQUFTO0lBQ1QsSUFBSTtJQUVKOzs7Ozs7OztPQVFHO0lBQ0gsbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6Qiw4QkFBOEI7SUFDOUIsdURBQXVEO0lBQ3ZELFFBQVE7SUFDUiw4QkFBOEI7SUFDOUIsSUFBSTtJQUVKOzs7T0FHRztJQUNILHVCQUF1QjtJQUN2Qiw0QkFBNEI7SUFDNUIseURBQXlEO0lBQ3pELHVCQUF1QjtJQUN2QixzSEFBc0g7SUFDdEgseUNBQXlDO0lBQ3pDLGFBQWE7SUFDYixRQUFRO0lBRVIsK0JBQStCO0lBQy9CLHVDQUF1QztJQUV2QyxrRUFBa0U7SUFDbEUsZ0VBQWdFO0lBQ2hFLGdEQUFnRDtJQUNoRCxRQUFRO0lBRVIsb0NBQW9DO0lBQ3BDLFdBQVc7SUFDWCxnREFBZ0Q7SUFDaEQsd0NBQXdDO0lBQ3hDLFVBQVU7SUFDViw2Q0FBNkM7SUFDN0Msa0JBQWtCO0lBQ2xCLFFBQVE7SUFFUix1QkFBdUI7SUFDdkIsb0RBQW9EO0lBRXBELDJEQUEyRDtJQUMzRCx1REFBdUQ7SUFDdkQsMERBQTBEO0lBQzFELFdBQVc7SUFDWCx3QkFBd0I7SUFDeEIsZ0RBQWdEO0lBQ2hELHdEQUF3RDtJQUN4RCxVQUFVO0lBQ1YsNkNBQTZDO0lBQzdDLDZCQUE2QjtJQUU3Qiw0REFBNEQ7SUFDNUQsb0RBQW9EO0lBQ3BELDJDQUEyQztJQUMzQyxlQUFlO0lBQ2Ysb0RBQW9EO0lBQ3BELHlCQUF5QjtJQUN6QixnQkFBZ0I7SUFDaEIseUNBQXlDO0lBQ3pDLFlBQVk7SUFFWiwyQ0FBMkM7SUFDM0Msa0NBQWtDO0lBQ2xDLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsYUFBYTtJQUNiLElBQUk7SUFFSjs7T0FFRztJQUNLLGlCQUFpQjtRQUNyQixPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsS0FBSyxJQUFJLENBQUM7SUFDakUsQ0FBQztJQUVEOztPQUVHO0lBQ0ssYUFBYTs7UUFDakIsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQkFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FDUCwwSUFBMEksRUFDMUksd0RBQXdELENBQzNELENBQUM7YUFDTDtZQUNELE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQkFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FDUCwwRkFBMEYsQ0FDN0YsQ0FBQzthQUNMO1lBQ0QsT0FBTztTQUNWO1FBRUQsMEJBQTBCO1FBQzFCLElBQUksTUFBQSxNQUFBLElBQUksQ0FBQyxTQUFTLDBDQUFFLE1BQU0sMENBQUUsR0FBRyxFQUFFO1lBQzdCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtRQUVELFlBQVk7UUFDWixJQUFJLE1BQUEsTUFBQSxJQUFJLENBQUMsU0FBUywwQ0FBRSxTQUFTLDBDQUFFLE9BQU8sRUFBRTtZQUNwQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxRQUFROztRQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FDUCx5SEFBeUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxVQUFVLENBQy9KLENBQUM7U0FDTDtRQUVELE1BQU0sU0FBUyxHQUFHOzs7OzJDQUlpQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUVsRSwrQkFBK0I7UUFDL0IsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUM5QixPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUMxQyxhQUFhO1FBQ2IsT0FBTyxDQUFDLFlBQVksQ0FDaEIsTUFBTSxFQUNOLENBQUEsTUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsMENBQUUsT0FBTztZQUM3QixDQUFDLENBQUMsZ0JBQWdCO1lBQ2xCLENBQUMsQ0FBQyxpQkFBaUIsQ0FDMUIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRztJQUNLLGNBQWM7O1FBQ2xCLDhDQUE4QztRQUM5QyxJQUFJLENBQUMsQ0FBQSxNQUFBLE1BQUEsSUFBSSxDQUFDLFNBQVMsMENBQUUsTUFBTSwwQ0FBRSxHQUFHLENBQUEsRUFBRTtZQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUM3QyxPQUFPLENBQUMsR0FBRyxDQUNQLDBLQUEwSyxDQUM3SyxDQUFDO2dCQUNGLE9BQU87YUFDVjtTQUNKO1FBRUQsNkJBQTZCO1FBQzdCLGFBQWE7UUFDYixNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBRTVDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FDUCx5RkFBeUYsRUFDekYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQzNCLENBQUM7U0FDTDtRQUVELDBDQUEwQztRQUMxQyxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRCxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1FBQ3pDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN6RCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxVQUFVLENBQUMsS0FBVztRQUNsQiw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLHlCQUF5QjtRQUN6QixJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUM1QjtRQUNELGtCQUFrQjtRQUNsQixXQUFXLENBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUM7UUFFRixvQkFBb0I7UUFDcEIsUUFBUSxDQUFDLGFBQWEsQ0FDbEIsSUFBSSxXQUFXLENBQUMscUJBQXFCLEVBQUU7WUFDbkMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ3JCLENBQUMsQ0FDTCxDQUFDO1FBQ0YsUUFBUSxDQUFDLGFBQWEsQ0FDbEIsSUFBSSxXQUFXLENBQUMsc0JBQXNCLEVBQUU7WUFDcEMsTUFBTSxrQkFDRixJQUFJLEVBQUUsT0FBTyxJQUNWLElBQUksQ0FBQyxLQUFLLENBQ2hCO1NBQ0osQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILGFBQWE7UUFDVCw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLGtCQUFrQjtRQUNsQixXQUFXLENBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUM7UUFFRixvQkFBb0I7UUFDcEIsUUFBUSxDQUFDLGFBQWEsQ0FDbEIsSUFBSSxXQUFXLENBQUMsd0JBQXdCLEVBQUU7WUFDdEMsTUFBTSxFQUFFO2dCQUNKLEtBQUssRUFBRSxJQUFJO2FBQ2Q7U0FDSixDQUFDLENBQ0wsQ0FBQztRQUNGLFFBQVEsQ0FBQyxhQUFhLENBQ2xCLElBQUksV0FBVyxDQUFDLHNCQUFzQixFQUFFO1lBQ3BDLE1BQU0sa0JBQ0YsSUFBSSxFQUFFLE9BQU8sSUFDVixJQUFJLENBQUMsS0FBSyxDQUNoQjtTQUNKLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxhQUFhLENBQUMsS0FBVTtRQUNwQix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hELGtCQUFrQjtRQUNsQixXQUFXLENBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUM7UUFDRixRQUFRLENBQUMsYUFBYSxDQUNsQixJQUFJLFdBQVcsQ0FBQyxzQkFBc0IsRUFBRTtZQUNwQyxNQUFNLGtCQUNGLElBQUksRUFBRSxPQUFPLElBQ1YsSUFBSSxDQUFDLEtBQUssQ0FDaEI7U0FDSixDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsYUFBYTs7UUFDVCxPQUFPLE1BQUEsTUFBQSxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLDBDQUFFLEtBQUssbUNBQUksRUFBRSxDQUFDO0lBQ3BFLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsWUFBWTs7UUFDUixPQUFPLE1BQUEsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQywwQ0FBRSxLQUFLLENBQUM7SUFDOUQsQ0FBQztJQWFELElBQUk7UUFDQSxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNoQyx1QkFBdUI7WUFDdkIsWUFBWSxDQUFDLE9BQU8sQ0FDaEIsV0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDN0IsQ0FBQztRQUNOLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILE9BQU87UUFDSCx3QkFBd0I7UUFDeEIsSUFBSTtZQUNBLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLO1lBQ3pCLGFBQWE7WUFDYixZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUN0RCxDQUFDO1lBQ0YsYUFBYTtZQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3JFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUN2RDtJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILEtBQUs7UUFDRCwyQkFBMkI7UUFDM0IsWUFBWSxDQUFDLFVBQVUsQ0FBQyxXQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2RCxrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDSiJ9