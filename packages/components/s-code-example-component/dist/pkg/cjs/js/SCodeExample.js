"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_clipboard_copy_component_1 = require("@coffeekraken/s-clipboard-copy-component");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
const object_1 = require("@coffeekraken/sugar/object");
const core_1 = __importDefault(require("highlight.js/lib/core"));
const bash_1 = __importDefault(require("highlight.js/lib/languages/bash"));
const css_1 = __importDefault(require("./languages/css"));
// import __langCss from 'highlight.js/lib/languages/css';
const dom_1 = require("@coffeekraken/sugar/dom");
const string_1 = require("@coffeekraken/sugar/string");
const javascript_1 = __importDefault(require("highlight.js/lib/languages/javascript"));
const php_1 = __importDefault(require("highlight.js/lib/languages/php"));
const xml_1 = __importDefault(require("highlight.js/lib/languages/xml"));
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
const SCodeExampleComponentInterface_1 = __importDefault(require("./interface/SCodeExampleComponentInterface"));
// // @ts-ignore
const standalone_mjs_1 = __importDefault(require("prettier/esm/standalone.mjs"));
// @ts-ignore
const parser_babel_mjs_1 = __importDefault(require("prettier/esm/parser-babel.mjs"));
// @ts-ignore
const parser_html_mjs_1 = __importDefault(require("prettier/esm/parser-html.mjs"));
// @ts-ignore
const standalone_1 = __importDefault(require("@prettier/plugin-php/standalone"));
const parser_postcss_mjs_1 = __importDefault(require("prettier/esm/parser-postcss.mjs"));
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
// @ts-ignore
const s_code_example_css_1 = __importDefault(require("../../../../src/css/s-code-example.css")); // relative to /dist/pkg/esm/js
(0, s_clipboard_copy_component_1.define)();
/**
 * @name                SCodeExampleComponent
 * @as                  Code example
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SCodeExampleComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-code-example
 * @platform            html
 * @status              beta
 *
 * This component represent a code example that make sure your passed code(s) is displayed well using under the hood the AMAZING [highlightjs](https://highlightjs.org/) library.
 *
 * @feature           Can display out of the bos codes like `bash`, `shell`, `css`, `js`, `php` and `html`
 * @feature           Possibility to add some languages through the property `languages`
 * @feature           Full support for sugar theming system for easy integration
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install           shell
 * npm i @coffeekraken/s-code-example-component
 *
 * @install           js
 * import { define } from '@coffeekraken/s-code-example-component';
 * define();
 *
 * @example         html
 * <s-code-example>
 *      <template lang="js">
 * function $initHighlight(block, cls) {
 * try {
 *   if (cls.search(/\bno\-highlight\b/) != -1)
 *     return process(block, true, 0x0F) +
 *            ` class="${cls}"`;
 * } catch (e) {
 * }
 * for (var i = 0 / 2; i < classes.length; i++) {
 *   if (checkCondition(classes[i]) === undefined)
 *     console.log('undefined');
 * }
 *      </template>
 * </s-code-example>
 *
 * @example         js
 * import { define } from '@coffeekraken/s-code-example-component';
 * define();
 *
 * @see             https://highlightjs.org/
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SCodeExample extends s_lit_component_1.default {
    constructor() {
        super((0, object_1.__deepMerge)({
            name: 's-code-example',
            interface: SCodeExampleComponentInterface_1.default,
        }));
        this._$copy = undefined;
        this.state = {
            activeTabId: undefined,
            more: false,
        };
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SCodeExampleComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_code_example_css_1.default)}
        `;
    }
    mount() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const languages = Object.assign({ html: xml_1.default, javascript: javascript_1.default, js: javascript_1.default, php: php_1.default, bash: bash_1.default, shell: bash_1.default, css: css_1.default, scss: css_1.default }, ((_a = this.props.languages) !== null && _a !== void 0 ? _a : {}));
            Object.keys(languages).forEach((lang) => {
                core_1.default.registerLanguage(lang, languages[lang]);
            });
            // @ts-ignore
            this.$templates = this.querySelectorAll('template,code');
            this.$templates.forEach(($template) => {
                var _a, _b, _c, _d, _e, _f, _g;
                if (!$template.getAttribute)
                    return;
                let parser = 'babel';
                switch ((_b = (_a = $template.getAttribute('id')) !== null && _a !== void 0 ? _a : $template.getAttribute('language')) !== null && _b !== void 0 ? _b : $template.getAttribute('lang')) {
                    case 'html':
                    case 'xml':
                        parser = 'html';
                        break;
                    case 'css':
                    case 'scss':
                    case 'postcss':
                        parser = 'css';
                        break;
                }
                let rawCode = (0, string_1.__decodeHtmlEntities)($template.tagName.toLowerCase() === 'textarea' &&
                    // @ts-ignore
                    $template.value
                    ? // @ts-ignore
                        $template.value
                    : $template.innerHTML);
                let formatedCode = rawCode;
                try {
                    formatedCode = standalone_mjs_1.default.format(rawCode, {
                        parser,
                        plugins: [
                            parser_postcss_mjs_1.default,
                            parser_html_mjs_1.default,
                            parser_babel_mjs_1.default,
                            standalone_1.default,
                        ],
                    });
                }
                catch (e) { }
                this.props.items = [
                    ...this.props.items,
                    {
                        id: (_e = (_d = (_c = $template.getAttribute('id')) !== null && _c !== void 0 ? _c : $template.getAttribute('language')) !== null && _d !== void 0 ? _d : $template.getAttribute('lang')) !== null && _e !== void 0 ? _e : 'html',
                        lang: (_g = (_f = $template.getAttribute('language')) !== null && _f !== void 0 ? _f : $template.getAttribute('lang')) !== null && _g !== void 0 ? _g : 'html',
                        // @ts-ignore
                        code: formatedCode,
                        lines: formatedCode.trim().split('\n').length,
                    },
                ];
                $template.remove();
            });
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            // active idx
            if (this.props.active) {
                this.setActiveTab(this.props.active);
            }
            else {
                if (this.props.items[0]) {
                    this.setActiveTab(this.props.items[0].id);
                }
            }
            // await __wait(500);
            // this._$content = this.shadowRoot?.querySelector(
            //     '.s-code-example__content',
            // );
            this._$pre = this.querySelector('.s-code-example__code');
            this._$root = this.querySelector('.s-code-example__root');
            return true;
        });
    }
    setActiveTabByTab(e) {
        this.setActiveTab(e.target.id);
    }
    get currentItem() {
        if (!this.state.activeTabId)
            return {};
        return this.props.items.find((i) => i.id === this.state.activeTabId);
    }
    setActiveTab(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, datetime_1.__wait)();
            this.state.activeTabId = id;
            this.highlight(id);
            this.requestUpdate();
        });
    }
    setMoreClass() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state.more) {
                this._$root.classList.add('s-code-example--more');
            }
            else {
                this._$root.classList.remove('s-code-example--more');
            }
        });
    }
    toggleMore() {
        var _a;
        this.state.more = !this.state.more;
        this.setMoreClass();
        (0, dom_1.__scrollTo)(this, Object.assign({}, ((_a = this.props.scrollToSettings) !== null && _a !== void 0 ? _a : {})));
    }
    highlight(id) {
        var _a;
        const $content = this.querySelector(`pre#${id} code`);
        const item = this.props.items.find((i) => i.id === id);
        if ($content.hasAttribute('inited')) {
            this.setMoreClass();
            return;
        }
        $content.setAttribute('inited', 'true');
        let code;
        try {
            const codeToHighlight = (0, string_1.__decodeHtmlEntities)($content.innerHTML.replace(/(<|&lt;)!\s?--\?lit.*--\s?(>|&gt;)/, ''));
            code = core_1.default.highlight(codeToHighlight, {
                language: $content.getAttribute('lang'),
            });
        }
        catch (e) {
            console.log(e);
        }
        // @ts-ignore
        item.highlightedCode = (_a = code === null || code === void 0 ? void 0 : code.value) !== null && _a !== void 0 ? _a : '';
        this.setMoreClass();
    }
    copy() {
        const id = this.state.activeTabId;
        const item = this.props.items.filter((i) => i.id === id)[0];
        // @ts-ignore
        this.$copy.copy(item.code);
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        const currentItem = this.currentItem;
        return (0, lit_1.html) `
            <div
                class="${this.componentUtils.className('__root')} ${this.props
            .more
            ? this.componentUtils.className('more')
            : ''}"
                ?lines="${
        // @ts-ignore
        this.props.lines}"
                ?bare="${
        // @ts-ignore
        this.props.bare}"
                toolbar-position="${
        // @ts-ignore
        this.props.toolbarPosition}"
            >
                <div class="templates"></div>

                <header class="${this.componentUtils.className('__nav')}">
                    <div
                        class="${this.componentUtils.className('__tabs', 's-tabs')}"
                    >
                        ${((_a = this.props.items) !== null && _a !== void 0 ? _a : []).map((item) => (0, lit_1.html) `
                                <div
                                    class="${this.componentUtils.className('__tab')}"
                                    id="${item.id}"
                                    ?active="${this.state.activeTabId ===
            item.id}"
                                    @click="${this.setActiveTabByTab}"
                                >
                                    ${item.lang}
                                </div>
                            `)}
                    </div>
                    ${
        // @ts-ignore
        this.toolbarPosition === 'nav'
            ? (0, lit_1.html) `
                                  <div
                                      class="${this.componentUtils.className('__toolbar')}"
                                  >
                                      <s-clipboard-copy
                                          @click="${this.copy}"
                                      ></s-clipboard-copy>
                                  </div>
                              `
            : ''}
                </header>
                <div
                    class="${this.componentUtils.className('__content')}"
                    style="--max-lines: ${(_b = this.props.lines) !== null && _b !== void 0 ? _b : 99999999};"
                >
                    ${
        // @ts-ignore
        this.toolbarPosition !== 'nav'
            ? (0, lit_1.html) `
                                  <div
                                      class="${this.componentUtils.className('__toolbar')}"
                                  >
                                      <s-clipboard-copy
                                          @click="${this.copy}"
                                      ></s-clipboard-copy>
                                  </div>
                              `
            : ''}
                    ${((_c = this.props.items) !== null && _c !== void 0 ? _c : []).map((item) => {
            var _a, _b, _c;
            return (0, lit_1.html) `
                            <pre
                                class="${this.componentUtils.className('__code')}"
                                style="line-height:0;"
                                id="${(_a = item.id) !== null && _a !== void 0 ? _a : item.lang}"
                                ?active="${this.state.activeTabId ===
                ((_b = item.id) !== null && _b !== void 0 ? _b : item.lang)}"
                            >
                            <code lang="${(_c = item.lang) !== null && _c !== void 0 ? _c : item.id}" class="language-${item.lang} ${item.lang} ${this
                .props.bare
                ? ''
                : 'hljs'}">${
            // @ts-ignore
            item.highlightedCode
                ? (0, unsafe_html_js_1.unsafeHTML)(item.highlightedCode)
                : item.code.trim()}</code>
                        </pre>
                        `;
        })}
                    ${this.props.lines && currentItem.lines > this.props.lines
            ? (0, lit_1.html) `
                        <div class="${this.componentUtils.className('__more-bar')}">
                            ${
            // @ts-ignore
            this.moreAction === 'toggle'
                ? (0, lit_1.html) `
                                          <a
                                              class="${this.componentUtils.className('__more-button', 's-btn')}"
                                              @click="${() => this.toggleMore()}"
                                          >
                                              ${
                // @ts-ignore
                this.state.more
                    ? (0, lit_1.html) `
                                                            ${(_d = this.props
                        .lessLabel) !== null && _d !== void 0 ? _d : 'Show less'}
                                                        `
                    : (0, lit_1.html) `
                                                            ${(_e = this.props
                        .moreLabel) !== null && _e !== void 0 ? _e : 'Show more'}
                                                        `}
                                          </a>
                                      `
                : (0, lit_1.html) `
                                          <a
                                              class="${this.componentUtils.className('__more-button', 's-btn s-color--accent')}"
                                              href="${
                // @ts-ignore
                this.moreAction}"
                                          >
                                              ${
                // @ts-ignore
                this.state.more
                    ? (0, lit_1.html) `
                                                            ${(_f = this.props
                        .lessLabel) !== null && _f !== void 0 ? _f : 'Show less'}
                                                        `
                    : (0, lit_1.html) `
                                                            ${(_g = this.props
                        .moreLabel) !== null && _g !== void 0 ? _g : 'Show more'}
                                                        `}
                                          </a>
                                      `}                        
                            </a>
                        </div>
                    `
            : ''}
                </div>
            </div>
        `;
    }
}
__decorate([
    (0, decorators_js_1.query)('s-clipboard-copy')
], SCodeExample.prototype, "$copy", void 0);
__decorate([
    (0, decorators_js_1.query)('.templates')
], SCodeExample.prototype, "$templatesContainer", void 0);
exports.default = SCodeExample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlGQUFzRjtBQUN0RixvRkFBNEQ7QUFDNUQsMkRBQXNEO0FBQ3RELHVEQUF5RDtBQUN6RCxpRUFBMkM7QUFDM0MsMkVBQXlEO0FBQ3pELDBEQUF3QztBQUN4QywwREFBMEQ7QUFDMUQsaURBQXFEO0FBRXJELHVEQUFrRTtBQUNsRSx1RkFBcUU7QUFDckUseUVBQXVEO0FBQ3ZELHlFQUF3RDtBQUN4RCw2QkFBMkM7QUFDM0MscURBQTBDO0FBQzFDLGtFQUEyRDtBQUMzRCxnSEFBMEY7QUFFMUYsZ0JBQWdCO0FBQ2hCLGlGQUFxRDtBQUNyRCxhQUFhO0FBQ2IscUZBQXlEO0FBQ3pELGFBQWE7QUFDYixtRkFBMEQ7QUFDMUQsYUFBYTtBQUNiLGlGQUE0RDtBQUM1RCx5RkFBNEQ7QUFFNUQsc0RBQWdDO0FBbWNYLGlCQW5jZCxnQkFBUSxDQW1jWTtBQWpjM0IsYUFBYTtBQUNiLGdHQUEyRCxDQUFDLCtCQUErQjtBQUUzRixJQUFBLG1DQUFnQixHQUFFLENBQUM7QUFpQm5COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0RHO0FBQ0gsTUFBcUIsWUFBYSxTQUFRLHlCQUFlO0lBaUNyRDtRQUNJLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQUM7WUFDUixJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLFNBQVMsRUFBRSx3Q0FBZ0M7U0FDOUMsQ0FBQyxDQUNMLENBQUM7UUF6Qk4sV0FBTSxHQUFHLFNBQVMsQ0FBQztRQVduQixVQUFLLEdBQUc7WUFDSixXQUFXLEVBQUUsU0FBUztZQUN0QixJQUFJLEVBQUUsS0FBSztTQUNkLENBQUM7SUFZRixDQUFDO0lBdkNELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMs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