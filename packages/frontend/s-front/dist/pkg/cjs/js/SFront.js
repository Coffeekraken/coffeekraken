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
Object.defineProperty(exports, "__esModule", { value: true });
const integration_1 = require("@builder.io/partytown/integration");
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const cookie_1 = require("@coffeekraken/sugar/cookie");
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const s_stdio_1 = __importStar(require("@coffeekraken/s-stdio"));
const perf_1 = require("@coffeekraken/sugar/perf");
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
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
        // Stdio
        const stdio = new s_stdio_1.default('default', new s_stdio_1.__SStdioConsoleSource(), new s_stdio_1.__SStdioBasicAdapter());
        if (!s_env_1.default.is('production')) {
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
        let frontspec, theme;
        // init frontspec
        if ((settings === null || settings === void 0 ? void 0 : settings.frontspec) instanceof s_frontspec_1.default) {
            frontspec = settings === null || settings === void 0 ? void 0 : settings.frontspec;
        }
        else {
            frontspec = s_frontspec_1.default.init(settings === null || settings === void 0 ? void 0 : settings.frontspec);
        }
        // init theme
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
        // save the default instance to access it using the SFront.instance static property
        if (this.settings.id === 'default' &&
            !this.constructor._defaultInstance) {
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
        // handle wireframe
        if (((_e = this.state.wireframe) === null || _e === void 0 ? void 0 : _e.enabled) ||
            (this.settings.wireframe.enabled &&
                this.state.wireframe.enabled === undefined)) {
            console.log('Activate');
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
            level: ((_a = this.state.lod) === null || _a === void 0 ? void 0 : _a.level) || this.frontspec.get('lod.defaultLevel'),
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
        var _a, _b, _c;
        const finalSettings = Object.assign({ $context: document.querySelector('html') }, (settings !== null && settings !== void 0 ? settings : {}));
        (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[lod]</yellow> Set lod (level of details) to <cyan>${level}</cyan>`);
        const cssSettings = s_theme_1.default.cssSettings;
        // @ts-ignore
        level = parseInt(`${level}`);
        // save in state
        this.state.lod.level = level;
        this.save();
        if (((_b = cssSettings.lod) === null || _b === void 0 ? void 0 : _b.method) === 'file') {
            const lodStylesheets = Array.from(document.querySelectorAll('link[s-lod]'));
            let $stylesheet;
            if (this.settings.lod.stylesheet instanceof HTMLLinkElement) {
                $stylesheet = this.settings.lod.stylesheet;
            }
            else if (typeof this.settings.lod.stylesheet === 'string') {
                $stylesheet = document.querySelector(this.settings.lod.stylesheet);
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
            if (((_c = cssSettings.lod) === null || _c === void 0 ? void 0 : _c.method) === 'file') {
                // check if already have the stylesheet in the dom
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
        if (!s_env_1.default.is('production')) {
            console.log('<yellow>[SFront]</yellow> Initializing <magenta>lod</magenta> (level of details) with these settings', this.settings.lod);
        }
        // check if is a crawler
        const isCrawler = (0, is_1.__isCrawler)();
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
        if (!isCrawler &&
            this.state.lod.level === undefined &&
            this.settings.lod.level === undefined) {
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
        var _a, _b;
        // make sure the user has agreed the legal terms
        if (!this.isLegalAgree()) {
            if (!s_env_1.default.is('production')) {
                console.log(`<yellow>[SFront]</yellow> You have a <magenta>google tag manager (gtm)</magenta> setted but the <cyan>legal terms</cyan> are not agreed. Tracking <red>disabled</red>.`);
            }
            return;
        }
        if (this._isTrackingInited()) {
            if (!s_env_1.default.is('production')) {
                console.log(`<yellow>[SFront]</yellow> Tracking <magenta>google tag manager</magenta> already inited.`);
            }
            return;
        }
        // init google tag manager
        if ((_a = this.settings.google) === null || _a === void 0 ? void 0 : _a.gtm) {
            this._initGtm();
        }
        // partytown
        if ((_b = this.settings.partytown) === null || _b === void 0 ? void 0 : _b.enabled) {
            // this._initPartytown();
        }
    }
    /**
     * Init google tag manager
     */
    _initGtm() {
        var _a;
        if (!s_env_1.default.is('production')) {
            console.log(`<yellow>[SFront]</yellow> Initializing tracking through the <magenta>google tag manager</magenta> with this id "<cyan>${this.settings.google.gtm}</cyan>"`);
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
        $script.setAttribute('type', ((_a = this.settings.partytown) === null || _a === void 0 ? void 0 : _a.enabled)
            ? 'text/partytown'
            : 'text/javascript');
        document.head.appendChild($script);
    }
    /**
     * This method takes care of initializing the partytoen feature.
     */
    _initPartytown() {
        // make sure we have all we need for partytown
        if (!this.settings.google.gtm) {
            if (!s_env_1.default.is('production')) {
                console.log(`<yellow>[SFront]</yellow> You have enabled <magenta>partytown</magenta> but you don't have specified any "<cyan>settings.google.gtm</cyan>" tag manager id...'`);
                return;
            }
        }
        // set the partytown settings
        // @ts-ignore
        window.partytown = this.settings.partytown;
        if (!s_env_1.default.is('production')) {
            console.log('<yellow>[SFront]</yellow> Initializing <magenta>partytown</magenta> with these settings', this.settings.partytown);
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
    clear() {
        // delete the local storage
        localStorage.removeItem(`s-front-${this.settings.id}`);
        // clear the state
        // @ts-ignore
        this.state = Object.assign({}, this._originalState);
    }
}
exports.default = SFront;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtRUFBcUU7QUFDckUsb0VBQTZDO0FBQzdDLGdFQUF5QztBQUN6Qyx1REFBc0U7QUFDdEUsK0NBQXFEO0FBQ3JELHVEQUF5RDtBQUV6RCxpRUFHK0I7QUFFL0IsbURBQXdEO0FBRXhELDRFQUFxRDtBQUVyRCxvRUFBNkM7QUFrRTdDLE1BQXFCLE1BQU8sU0FBUSxpQkFBUTtJQWN4Qzs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBdUM7UUFDL0MsTUFBTSxhQUFhLEdBQUcsZ0JBQ2xCLEVBQUUsRUFBRSxTQUFTLEVBQ2IsR0FBRyxFQUFFLEVBQUUsRUFDUCxTQUFTLEVBQUUsRUFBRSxFQUNiLEtBQUssRUFBRSxFQUFFLEVBQ1QsU0FBUyxFQUFFLEVBQUUsRUFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7UUFFRixJQUFJLGFBQWEsR0FBRyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1QyxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHO1lBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSztZQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqRCxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO1FBRXpDLDJCQUEyQjtRQUMzQixPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxjQUFjLENBQUMs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