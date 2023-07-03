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
        const finalSettings = Object.assign({ id: 'default', lod: {}, classmap: {}, wireframe: {}, legal: {}, partytown: {}, theme: {} }, (settings !== null && settings !== void 0 ? settings : {}));
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
        var _a, _b, _c, _d, _e, _f, _g;
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
            if ((_b = document.env) === null || _b === void 0 ? void 0 : _b.CLASSMAP) {
                console.log(`<yellow>[SFront]</yellow> Using <yellow>classmap</yellow>"`);
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
        else if (frontspec.get('classmap.enabled')) {
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
            classmap: (_e = frontspec.get('classmap')) !== null && _e !== void 0 ? _e : {},
            lod: Object.assign({ stylesheet: 'link#global' }, ((_f = frontspec.get('lod')) !== null && _f !== void 0 ? _f : {})),
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
        if (((_g = this.state.wireframe) === null || _g === void 0 ? void 0 : _g.enabled) ||
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
        if (!this.frontspec.get('lod.enabled')) {
            return;
        }
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