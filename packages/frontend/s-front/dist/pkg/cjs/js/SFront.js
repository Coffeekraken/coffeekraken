"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const integration_1 = require("@builder.io/partytown/integration");
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const cookie_1 = require("@coffeekraken/sugar/cookie");
const dom_1 = require("@coffeekraken/sugar/dom");
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const s_stdio_1 = __importStar(require("@coffeekraken/s-stdio"));
const perf_1 = require("@coffeekraken/sugar/perf");
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
// @ts-ignore
if ((_a = import.meta) === null || _a === void 0 ? void 0 : _a.hot) {
    // @ts-ignore
    import.meta.hot.on('sugar.update.css', (data) => {
        var _a, _b;
        // @ts-ignore
        (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `[SFront] Reloading css "${(_b = data.srcRelPath) !== null && _b !== void 0 ? _b : data}"`);
        // perform custom update
        (0, dom_1.__reloadStylesheets)();
    });
}
class SFront extends s_class_1.default {
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
        var _a, _b, _c, _d, _e;
        // filter logs
        s_log_1.default.filter((log) => {
            if (settings.logs)
                return true;
            if (settings.logs === false)
                return false;
            if ((0, dom_1.__isInIframe)() && ['log', 'verbose'].includes(log.type))
                return false;
            return true;
        });
        // Stdio
        const stdio = new s_stdio_1.default('default', new s_stdio_1.__SStdioConsoleSource(), new s_stdio_1.__SStdioBasicAdapter());
        if (!s_env_1.default.is('production') && !(0, dom_1.__isInIframe)()) {
            const color = s_env_1.default.env.ENV === 'production'
                ? 'red'
                : s_env_1.default.env.ENV === 'staging'
                    ? 'cyan'
                    : 'green';
            console.log(`<yellow>[SFront]</yellow> Current environment is "<${color}>${s_env_1.default.env.ENV}</${color}>"`);
            if ((_a = document.env) === null || _a === void 0 ? void 0 : _a.PACKAGE) {
                console.log(`<yellow>[SFront]</yellow> Project "<cyan>${document.env.PACKAGE.name}</cyan>" in version "<yellow>${document.env.PACKAGE.version}</yellow>"`);
            }
        }
        // init frontspec and theme
        let frontspec;
        if ((settings === null || settings === void 0 ? void 0 : settings.frontspec) instanceof s_frontspec_1.default) {
            frontspec = settings === null || settings === void 0 ? void 0 : settings.frontspec;
        }
        else {
            frontspec = s_frontspec_1.default.init(settings === null || settings === void 0 ? void 0 : settings.frontspec);
        }
        // init theme
        let theme;
        if ((settings === null || settings === void 0 ? void 0 : settings.theme) instanceof s_theme_1.default) {
            theme = settings === null || settings === void 0 ? void 0 : settings.theme;
        }
        else {
            theme = s_theme_1.default.init(settings === null || settings === void 0 ? void 0 : settings.theme);
        }
        super((0, object_1.__deepMerge)({
            id: 'default',
            google: (_b = frontspec.get('google')) !== null && _b !== void 0 ? _b : {},
            partytown: (_c = frontspec.get('partytown')) !== null && _c !== void 0 ? _c : {},
            lod: Object.assign({ stylesheet: 'link#global' }, ((_d = frontspec.get('lod')) !== null && _d !== void 0 ? _d : {})),
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
        if (((_e = this.state.wireframe) === null || _e === void 0 ? void 0 : _e.enabled) ||
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
        const cssSettings = s_theme_1.default.cssSettings;
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
        if (!s_env_1.default.is('production') && !(0, dom_1.__isInIframe)()) {
            console.log('<yellow>[SFront]</yellow> Initializing <magenta>lod</magenta> (level of details) with these settings', this.frontspec.get('lod'));
        }
        // check if is a crawler
        const isCrawler = (0, is_1.__isCrawler)();
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
            const speedIndex = (0, perf_1.__speedIndex)();
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
            if (!s_env_1.default.is('production') && !(0, dom_1.__isInIframe)()) {
                console.log(`<yellow>[SFront]</yellow> You have a <magenta>google tag manager (gtm)</magenta> setted but the <cyan>legal terms</cyan> are not agreed. Tracking <red>disabled</red>.`);
            }
            return;
        }
        if (this._isTrackingInited()) {
            if (!s_env_1.default.is('production') && !(0, dom_1.__isInIframe)()) {
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
        if (!s_env_1.default.is('production') && !(0, dom_1.__isInIframe)()) {
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
            if (!s_env_1.default.is('production') && !(0, dom_1.__isInIframe)()) {
                console.log(`<yellow>[SFront]</yellow> You have enabled <magenta>partytown</magenta> but you don't have specified any "<cyan>settings.frontspec.google.gtm</cyan>" tag manager id...'`);
                return;
            }
        }
        // set the partytown settings
        // @ts-ignore
        window.partytown = this.frontspec.partytown;
        if (!s_env_1.default.is('production') && !(0, dom_1.__isInIframe)()) {
            console.log('<yellow>[SFront]</yellow> Initializing <magenta>partytown</magenta> with these settings', this.frontspec.partytown);
        }
        // create and inject the partytown snippet
        const snippetText = (0, integration_1.partytownSnippet)();
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
        (0, cookie_1.__setCookie)(this.settings.legal.cookieName, Object.assign({}, this.legal));
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
        (0, cookie_1.__setCookie)(this.settings.legal.cookieName, Object.assign({}, this.legal));
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
        this.legal.metas = (0, object_1.__deepMerge)(this.legal.metas, metas);
        // save the cookie
        (0, cookie_1.__setCookie)(this.settings.legal.cookieName, Object.assign({}, this.legal));
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
        return (_b = (_a = (0, cookie_1.__getCookie)(this.settings.legal.cookieName)) === null || _a === void 0 ? void 0 : _a.metas) !== null && _b !== void 0 ? _b : {};
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
        return (_a = (0, cookie_1.__getCookie)(this.settings.legal.cookieName)) === null || _a === void 0 ? void 0 : _a.agree;
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
exports.default = SFront;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUVBQXFFO0FBQ3JFLG9FQUE2QztBQUM3QyxnRUFBeUM7QUFDekMsZ0VBQXlDO0FBQ3pDLHVEQUFzRTtBQUN0RSxpREFBNEU7QUFDNUUsK0NBQXFEO0FBQ3JELHVEQUF5RDtBQUl6RCw0RUFBcUQ7QUFFckQsaUVBRytCO0FBRS9CLG1EQUF3RDtBQUd4RCxvRUFBNkM7QUFFN0MsYUFBYTtBQUNiLElBQUksTUFBQSxNQUFNLENBQUMsSUFBSSwwQ0FBRSxHQUFHLEVBQUU7SUFDbEIsYUFBYTtJQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFOztRQUM1QyxhQUFhO1FBQ2IsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCwyQkFBMkIsTUFBQSxJQUFJLENBQUMsVUFBVSxtQ0FBSSxJQUFJLEdBQUcsQ0FDeEQsQ0FBQztRQUNGLHdCQUF3QjtRQUN4QixJQUFBLHlCQUFtQixHQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7Q0FDTjtBQTRERCxNQUFxQixNQUFPLFNBQVEsaUJBQVE7SUFjeEM7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQXVDO1FBQy9DLE1BQU0sYUFBYSxHQUFHLGdCQUNsQixFQUFFLEVBQUUsU0FBUyxFQUNiLEdBQUcsRUFBRSxFQUFFLEVBQ1AsU0FBUyxFQUFFLEVBQUUsRUFDYixLQUFLLEVBQUUsRUFBRSxFQUNULFNBQVMsRUFBRSxFQUFFLEVBQ2IsS0FBSyxFQUFFLEVBQUUsSUFDTixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsSUFBSSxhQUFhLEdBQUcsSUFBSSxJQUFJ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