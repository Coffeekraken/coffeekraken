var _a;
import { partytownSnippet } from '@builder.io/partytown/integration';
import __SClass from '@coffeekraken/s-class';
import __SEnv from '@coffeekraken/s-env';
import __SLog from '@coffeekraken/s-log';
import { __getCookie, __setCookie } from '@coffeekraken/sugar/cookie';
import { __isInIframe, __reloadStylesheets } from '@coffeekraken/sugar/dom';
import { __isCrawler } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SClassmap from '@coffeekraken/s-classmap';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __SStdio, { __SStdioBasicAdapter, __SStdioConsoleSource, } from '@coffeekraken/s-stdio';
import { __speedIndex } from '@coffeekraken/sugar/perf';
import __STheme from '@coffeekraken/s-theme';
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
        const finalSettings = Object.assign({ id: 'default', lod: {}, wireframe: {}, legal: {}, partytown: {}, theme: {} }, (settings !== null && settings !== void 0 ? settings : {}));
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
        var _a, _b, _c, _d, _e, _f;
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
        const stdio = new __SStdio('default', new __SStdioConsoleSource(), new __SStdioBasicAdapter());
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
        // init frontspec and theme
        let frontspec;
        if ((settings === null || settings === void 0 ? void 0 : settings.frontspec) instanceof __SFrontspec) {
            frontspec = settings === null || settings === void 0 ? void 0 : settings.frontspec;
        }
        else {
            frontspec = __SFrontspec.init(settings === null || settings === void 0 ? void 0 : settings.frontspec);
        }
        // classmap
        let classmap;
        if (settings.classmap instanceof __SClassmap) {
            classmap = settings.classmap;
        }
        else if ((_b = document.env) === null || _b === void 0 ? void 0 : _b.CLASSMAP) {
            classmap = __SClassmap.init(settings.classmap);
        }
        // init theme
        let theme;
        if ((settings === null || settings === void 0 ? void 0 : settings.theme) instanceof __STheme) {
            theme = settings === null || settings === void 0 ? void 0 : settings.theme;
        }
        else {
            theme = __STheme.init(settings === null || settings === void 0 ? void 0 : settings.theme);
        }
        super(__deepMerge({
            id: 'default',
            google: (_c = frontspec.get('google')) !== null && _c !== void 0 ? _c : {},
            partytown: (_d = frontspec.get('partytown')) !== null && _d !== void 0 ? _d : {},
            lod: Object.assign({ stylesheet: 'link#global' }, ((_e = frontspec.get('lod')) !== null && _e !== void 0 ? _e : {})),
            wireframe: {
                enabled: undefined,
            },
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
            wireframe: {
                enabled: undefined,
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
        this.classmap = classmap;
        this.frontspec = frontspec;
        this.theme = theme;
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
        // handle wireframe
        if (((_f = this.state.wireframe) === null || _f === void 0 ? void 0 : _f.enabled) ||
            (this.settings.wireframe.enabled &&
                this.state.wireframe.enabled === undefined)) {
            this.setWireframe(true);
        }
        // init the tracking
        this._initTracking();
    }
    /**
     * @name      wireframe
     * @type      { active: boolean }
     *
     * Get the current wireframe state
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get wireframe() {
        var _a;
        return {
            enabled: ((_a = this.state.wireframe) === null || _a === void 0 ? void 0 : _a.enabled) !== undefined
                ? this.state.wireframe.enabled
                : this.settings.wireframe.enabled,
        };
    }
    /**
     * @name            setWireframe
     * @type            Function
     *
     * This method allows you to apply the wireframe mode
     *
     * @param              {Boolean}            enabled              true if want to activate the wireframe mode, false if want to desactivate it
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setWireframe(enabled) {
        var _a, _b;
        if (((_a = this.state.wireframe) === null || _a === void 0 ? void 0 : _a.enabled) !== enabled) {
            (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, `<yellow>[wireframe]</yellow> ${enabled
                ? '<green>Activate</green>'
                : '<red>Desactivate</red>'} the wireframe mode`);
            // save in state
            if (!this.state.wireframe) {
                this.state.wireframe = {};
            }
            this.state.wireframe.enabled = enabled;
            this.save();
            // dispatch a change event
            document.dispatchEvent(new CustomEvent('s-front.wireframe.change', {
                detail: {
                    enabled,
                    theme: this,
                },
            }));
        }
        // update the dom
        document
            .querySelector('html')
            .classList[enabled ? 'add' : 'remove']('s-wireframe');
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
     * @param               {Partial<ISThemeSetLodSettings>}        Some settings to configure your action
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setLod(level, settings) {
        var _a, _b, _c, _d;
        const finalSettings = Object.assign({ $context: document.querySelector('html') }, (settings !== null && settings !== void 0 ? settings : {}));
        (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[lod]</yellow> Set lod (level of details) to <cyan>${level}</cyan>`);
        const cssSettings = __STheme.cssSettings;
        // @ts-ignore
        level = parseInt(`${level}`);
        // save in state
        this.state.lod.level = level;
        this.save();
        let lodStylesheets = [], $stylesheet;
        if (((_b = cssSettings.lod) === null || _b === void 0 ? void 0 : _b.method) === 'file') {
            lodStylesheets = Array.from(document.querySelectorAll('link[s-lod]'));
            const lod = (_c = this.frontspec.get('lod')) !== null && _c !== void 0 ? _c : {};
            if (lod.stylesheet instanceof HTMLLinkElement) {
                $stylesheet = lod.stylesheet;
            }
            else if (typeof lod.stylesheet === 'string') {
                $stylesheet = document.querySelector(lod.stylesheet);
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
            if (((_d = cssSettings.lod) === null || _d === void 0 ? void 0 : _d.method) === 'file' && $stylesheet) {
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
                theme: this,
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
                console.log(`<yellow>[SFront]</yellow> You have a <magenta>google tag manager (gtm)</magenta> setted but the <cyan>legal terms</cyan> are not agreed. Tracking <red>disabled</red>.`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBS3pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sUUFBUSxFQUFFLEVBQ2Isb0JBQW9CLEVBQ3BCLHFCQUFxQixHQUN4QixNQUFNLHVCQUF1QixDQUFDO0FBRS9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUd4RCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxhQUFhO0FBQ2IsSUFBSSxNQUFBLE1BQU0sQ0FBQyxJQUFJLDBDQUFFLEdBQUcsRUFBRTtJQUNsQixhQUFhO0lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7O1FBQzVDLGFBQWE7UUFDYixNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLDJCQUEyQixNQUFBLElBQUksQ0FBQyxVQUFVLG1DQUFJLElBQUksR0FBRyxDQUN4RCxDQUFDO1FBQ0Ysd0JBQXdCO1FB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