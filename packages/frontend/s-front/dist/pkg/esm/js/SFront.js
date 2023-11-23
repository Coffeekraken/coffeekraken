var _a;
import { partytownSnippet } from '@builder.io/partytown/integration';
import __SClass from '@coffeekraken/s-class';
import __SEnv from '@coffeekraken/s-env';
import __SLog from '@coffeekraken/s-log';
import { __getCookie, __setCookie } from '@coffeekraken/sugar/cookie';
import { __isInIframe, __reloadStylesheets } from '@coffeekraken/sugar/dom';
import { __isCrawler } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __SStdio, { __SStdioBasicAdapter, __SStdioConsoleSource, } from '@coffeekraken/s-stdio';
import { __speedIndex } from '@coffeekraken/sugar/perf';
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
        const finalSettings = Object.assign({ id: 'default', lod: {}, legal: {}, partytown: {} }, (settings !== null && settings !== void 0 ? settings : {}));
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
        var _a, _b, _c, _d;
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
            frontspec = __SFrontspec.init(settings === null || settings === void 0 ? void 0 : settings.frontspec);
        }
        super(__deepMerge({
            id: 'default',
            google: (_b = frontspec.get('google')) !== null && _b !== void 0 ? _b : {},
            partytown: (_c = frontspec.get('partytown')) !== null && _c !== void 0 ? _c : {},
            lod: Object.assign({ stylesheet: 'link#global' }, ((_d = frontspec.get('lod')) !== null && _d !== void 0 ? _d : {})),
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
            lod: {
                level: undefined,
            },
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
        if (this.frontspec.get('lod.enabled')) {
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
    get lod() {
        var _a;
        return {
            level: ((_a = this.state.lod) === null || _a === void 0 ? void 0 : _a.level) !== undefined
                ? this.state.lod.level
                : this.frontspec.get('lod.defaultLevel'),
        };
    }
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
    setLod(level, settings) {
        var _a;
        const lodSettings = this.frontspec.get('lod');
        if (!(lodSettings === null || lodSettings === void 0 ? void 0 : lodSettings.enabled)) {
            return;
        }
        const finalSettings = Object.assign({ $context: document.querySelector('html') }, (settings !== null && settings !== void 0 ? settings : {}));
        (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[lod]</yellow> Set lod (level of details) to <cyan>${level}</cyan>`);
        // @ts-ignore
        level = parseInt(`${level}`);
        // save in state
        this.state.lod.level = level;
        this.save();
        let lodStylesheets = [], $stylesheet;
        if ((lodSettings === null || lodSettings === void 0 ? void 0 : lodSettings.method) === 'file') {
            lodStylesheets = Array.from(document.querySelectorAll('link[s-lod]'));
            if (lodSettings.stylesheet instanceof HTMLLinkElement) {
                $stylesheet = lodSettings.stylesheet;
            }
            else if (typeof lodSettings.stylesheet === 'string') {
                $stylesheet = document.querySelector(lodSettings.stylesheet);
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
                finalSettings.$context.classList.remove(`s-lod-${i}`);
            }
        }
        // add the new classes
        for (let i = 0; i <= level; i++) {
            finalSettings.$context.classList.add('s-lod', `s-lod-${i}`);
            if ((lodSettings === null || lodSettings === void 0 ? void 0 : lodSettings.method) === 'file' && $stylesheet) {
                if (i > 0 &&
                    !lodStylesheets.filter(($link) => {
                        const l = parseInt($link.getAttribute('s-lod'));
                        return l === i;
                    }).length) {
                    const $lodLink = $stylesheet.cloneNode();
                    $lodLink.setAttribute('href', $stylesheet
                        .getAttribute('href')
                        .replace(/([a-zA-Z0-9_-]+)\.css(\?.*)?/, `lod/$1.lod-${i}.css`));
                    $lodLink.setAttribute('s-lod', i);
                    document.head.appendChild($lodLink);
                }
            }
        }
        // dispatch a change event
        document.dispatchEvent(new CustomEvent('s-front.lod.change', {
            detail: {
                level,
            },
        }));
    }
    get lodConfig() {
        if (!this._lodConfig) {
            this._lodConfig = this.frontspec.get('lod');
        }
        return this._lodConfig;
    }
    /**
     * This method takes care of initializing the lod (level of details) features
     * like the "botLevel", lod by speedIndex, etc...
     */
    _initLod() {
        var _a;
        // setTimeout(() => {
        if (!__SEnv.is('production') && !__isInIframe()) {
            console.log('<yellow>[SFront]</yellow> Initializing <magenta>lod</magenta> (level of details) with these settings', this.frontspec.get('lod'));
        }
        // check if is a crawler
        const isCrawler = __isCrawler();
        // check if is a crawler and that we have a botLevel config
        if (isCrawler && this.lodConfig.botLevel !== undefined) {
            this.setLod(this.lodConfig.botLevel);
        }
        // is a lod is saved in state
        if (this.state.lod.level !== undefined &&
            this.state.lod.level !== null) {
            this.setLod(this.state.lod.level);
            return;
        }
        // set lod level
        this.setLod(this.frontspec.lod.defaultLevel);
        // if the user does not have selected a specific lod
        // we check which lod is the most suited for his
        // computer using the "speedIndex" calculated value
        if (!isCrawler &&
            this.state.lod.level === undefined &&
            this.frontspec.lod.defaultLevel === undefined) {
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
            return;
        }
        // });
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSXpELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sUUFBUSxFQUFFLEVBQ2Isb0JBQW9CLEVBQ3BCLHFCQUFxQixHQUN4QixNQUFNLHVCQUF1QixDQUFDO0FBRS9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV4RCxhQUFhO0FBQ2IsSUFBSSxNQUFBLE1BQU0sQ0FBQyxJQUFJLDBDQUFFLEdBQUcsRUFBRTtJQUNsQixhQUFhO0lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7O1FBQzVDLGFBQWE7UUFDYixNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLDJCQUEyQixNQUFBLElBQUksQ0FBQyxVQUFVLG1DQUFJLElBQUksR0FBRyxDQUN4RCxDQUFDO1FBQ0Ysd0JBQXdCO1FBQ3hCLG1CQUFtQixFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7Q0FDTjtBQStDRCxNQUFNLENBQUMsT0FB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