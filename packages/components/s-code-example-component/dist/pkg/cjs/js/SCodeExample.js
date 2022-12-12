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
const twig_1 = __importDefault(require("highlight.js/lib/languages/twig"));
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
            const languages = Object.assign({ html: xml_1.default, twig: twig_1.default, javascript: javascript_1.default, js: javascript_1.default, php: php_1.default, bash: bash_1.default, shell: bash_1.default, css: css_1.default, scss: css_1.default }, ((_a = this.props.languages) !== null && _a !== void 0 ? _a : {}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlGQUFzRjtBQUN0RixvRkFBNEQ7QUFDNUQsMkRBQXNEO0FBQ3RELHVEQUF5RDtBQUN6RCxpRUFBMkM7QUFDM0MsMkVBQXlEO0FBQ3pELDJFQUF5RDtBQUN6RCwwREFBd0M7QUFDeEMsMERBQTBEO0FBQzFELGlEQUFxRDtBQUVyRCx1REFBa0U7QUFDbEUsdUZBQXFFO0FBQ3JFLHlFQUF1RDtBQUN2RCx5RUFBd0Q7QUFDeEQsNkJBQTJDO0FBQzNDLHFEQUEwQztBQUMxQyxrRUFBMkQ7QUFDM0QsZ0hBQTBGO0FBRTFGLGdCQUFnQjtBQUNoQixpRkFBcUQ7QUFDckQsYUFBYTtBQUNiLHFGQUF5RDtBQUN6RCxhQUFhO0FBQ2IsbUZBQTBEO0FBQzFELGFBQWE7QUFDYixpRkFBNEQ7QUFDNUQseUZBQTREO0FBRTVELHNEQUFnQztBQW9jWCxpQkFwY2QsZ0JBQVEsQ0FvY1k7QUFsYzNCLGFBQWE7QUFDYixnR0FBMkQsQ0FBQywrQkFBK0I7QUFFM0YsSUFBQSxtQ0FBZ0IsR0FBRSxDQUFDO0FBaUJuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9ERztBQUNILE1BQXFCLFlBQWEsU0FBUSx5QkFBZTtJQWlDckQ7UUFDSSxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUFDO1lBQ1IsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixTQUFTLEVBQUUsd0NBQWdDO1NBQzlDLENBQUMsQ0FDTCxDQUFDO1FBekJOLFdBQU0sR0FBRyxTQUFTLENBQUM7UUFXbkIsVUFBSyxHQUFHO1lBQ0osV0FBVyxFQUFFLFNBQVM7WUFDdEIsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFDO0lBWUYsQ0FBQztJQXZDRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMs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