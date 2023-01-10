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
// // // @ts-ignore
// import __prettier from 'prettier/esm/standalone.mjs';
// // @ts-ignore
// import __prettierJs from 'prettier/esm/parser-babel.mjs';
// // @ts-ignore
// import __prettierHtml from 'prettier/esm/parser-html.mjs';
// // @ts-ignore
// import __prettierPhp from '@prettier/plugin-php/standalone';
// import __prettierCss from 'prettier/esm/parser-postcss.mjs';
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
                    // formatedCode = __prettier.format(rawCode, {
                    //     parser,
                    //     plugins: [
                    //         __prettierCss,
                    //         __prettierHtml,
                    //         __prettierJs,
                    //         __prettierPhp,
                    //     ],
                    // });
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
                class="${this.cu.cls('__root')} ${this.props.more
            ? this.cu.cls('more')
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

                <header class="${this.cu.cls('__nav')}">
                    <div class="${this.cu.cls('__tabs', 's-tabs')}">
                        ${((_a = this.props.items) !== null && _a !== void 0 ? _a : []).map((item) => (0, lit_1.html) `
                                <div
                                    class="${this.cu.cls('__tab')}"
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
                                  <div class="${this.cu.cls('__toolbar')}">
                                      <s-clipboard-copy
                                          @click="${this.copy}"
                                      ></s-clipboard-copy>
                                  </div>
                              `
            : ''}
                </header>
                <div
                    class="${this.cu.cls('__content')}"
                    style="--max-lines: ${(_b = this.props.lines) !== null && _b !== void 0 ? _b : 99999999};"
                >
                    ${
        // @ts-ignore
        this.toolbarPosition !== 'nav'
            ? (0, lit_1.html) `
                                  <div class="${this.cu.cls('__toolbar')}">
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
                                class="${this.cu.cls('__code')}"
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
                        <div class="${this.cu.cls('__more-bar')}">
                            ${
            // @ts-ignore
            this.moreAction === 'toggle'
                ? (0, lit_1.html) `
                                          <a
                                              class="${this.cu.cls('__more-button', 's-btn')}"
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
                                              class="${this.cu.cls('__more-button', 's-btn s-color--accent')}"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlGQUFzRjtBQUN0RixvRkFBNEQ7QUFDNUQsMkRBQXNEO0FBQ3RELHVEQUF5RDtBQUN6RCxpRUFBMkM7QUFDM0MsMkVBQXlEO0FBQ3pELDJFQUF5RDtBQUN6RCwwREFBd0M7QUFDeEMsMERBQTBEO0FBQzFELGlEQUFxRDtBQUVyRCx1REFBa0U7QUFDbEUsdUZBQXFFO0FBQ3JFLHlFQUF1RDtBQUN2RCx5RUFBd0Q7QUFDeEQsNkJBQTJDO0FBQzNDLHFEQUEwQztBQUMxQyxrRUFBMkQ7QUFDM0QsZ0hBQTBGO0FBRTFGLG1CQUFtQjtBQUNuQix3REFBd0Q7QUFDeEQsZ0JBQWdCO0FBQ2hCLDREQUE0RDtBQUM1RCxnQkFBZ0I7QUFDaEIsNkRBQTZEO0FBQzdELGdCQUFnQjtBQUNoQiwrREFBK0Q7QUFDL0QsK0RBQStEO0FBRS9ELHNEQUFnQztBQWdiWCxpQkFoYmQsZ0JBQVEsQ0FnYlk7QUE5YTNCLGFBQWE7QUFDYixnR0FBMkQsQ0FBQywrQkFBK0I7QUFFM0YsSUFBQSxtQ0FBZ0IsR0FBRSxDQUFDO0FBaUJuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9ERztBQUNILE1BQXFCLFlBQWEsU0FBUSx5QkFBZTtJQWlDckQ7UUFDSSxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUFDO1lBQ1IsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixTQUFTLEVBQUUsd0NBQWdDO1NBQzlDLENBQUMsQ0FDTCxDQUFDO1FBekJOLFdBQU0sR0FBRyxTQUFTLENBQUM7UUFXbkIsVUFBSyxHQUFHO1lBQ0osV0FBVyxFQUFFLFNBQVM7WUFDdEIsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFDO0lBWUYsQ0FBQztJQXZDRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlC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