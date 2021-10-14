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
import { define as __SClipboardCopy } from '@coffeekraken/s-clipboard-copy-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __hljs from 'highlight.js/lib/core';
import __langBash from 'highlight.js/lib/languages/bash';
import __langCss from 'highlight.js/lib/languages/css';
import __langJavascript from 'highlight.js/lib/languages/javascript';
import __langPhp from 'highlight.js/lib/languages/php';
import __langHtml from 'highlight.js/lib/languages/xml';
import { css, html, unsafeCSS } from 'lit';
import { property, query, queryAssignedNodes } from 'lit/decorators.js';
import __decodeHtmlEntities from '@coffeekraken/sugar/js/html/decodeHtmlEntities';
// @ts-ignore
import __css from '../css/s-code-example.css';
import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface';
import __prettier from 'prettier/esm/standalone.mjs';
import __prettierJs from 'prettier/esm/parser-babel.mjs';
import __prettierHtml from 'prettier/esm/parser-html.mjs';
import __prettierCss from 'prettier/esm/parser-postcss.mjs';
__SClipboardCopy();
export default class SCodeExample extends __SLitComponent {
    constructor() {
        var _a;
        super(__deepMerge({
            componentUtils: {
                interface: __SCodeExampleComponentInterface,
            },
        }));
        this._$copy = undefined;
        this._items = [];
        this._activeTabId = undefined;
        const languages = Object.assign({ html: __langHtml, javascript: __langJavascript, js: __langJavascript, php: __langPhp, bash: __langBash, shell: __langBash, css: __langCss }, ((_a = this.props.languages) !== null && _a !== void 0 ? _a : {}));
        Object.keys(languages).forEach((lang) => {
            __hljs.registerLanguage(lang, languages[lang]);
        });
    }
    static get properties() {
        return __SLitComponent.properties({}, __SCodeExampleComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    firstUpdated() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
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
                    case 'postcss':
                        parser = 'postcss';
                        break;
                }
                let rawCode = __decodeHtmlEntities($template.innerHTML);
                const formatedCode = __prettier.format(rawCode, {
                    parser,
                    plugins: [__prettierCss, __prettierHtml, __prettierJs],
                });
                this._items = [
                    ...this._items,
                    {
                        id: (_e = (_d = (_c = $template.getAttribute('id')) !== null && _c !== void 0 ? _c : $template.getAttribute('language')) !== null && _d !== void 0 ? _d : $template.getAttribute('lang')) !== null && _e !== void 0 ? _e : 'html',
                        lang: (_g = (_f = $template.getAttribute('language')) !== null && _f !== void 0 ? _f : $template.getAttribute('lang')) !== null && _g !== void 0 ? _g : 'html',
                        // @ts-ignore
                        code: formatedCode,
                    },
                ];
                $template.remove();
            });
            // active idx
            if (this.active) {
                this.setActiveTab(this.active);
            }
            else {
                if (this._items[0]) {
                    this.setActiveTab(this._items[0].id);
                }
            }
            yield __wait(500);
            this._$content = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.s-code-example__content');
            this._$pre = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.s-code-example__code');
            this._$root = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('.s-code-example');
            return true;
        });
    }
    setActiveTabByTab(e) {
        this.setActiveTab(e.target.id);
    }
    setActiveTab(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __wait();
            this._activeTabId = id;
            this.initPrismOnTab(id);
        });
    }
    setMoreClass() {
        return __awaiter(this, void 0, void 0, function* () {
            yield __wait(500);
            if (this._more) {
                this._$root.classList.add('s-code-example--more');
            }
            else {
                this._$root.classList.remove('s-code-example--more');
            }
        });
    }
    toggleMore() {
        this._more = !this._more;
        this.setMoreClass();
    }
    initPrismOnTab(id) {
        var _a;
        const $content = ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`pre#${id} code`));
        if ($content.hasAttribute('inited')) {
            this.setMoreClass();
            return;
        }
        $content.setAttribute('inited', 'true');
        __hljs.highlightElement($content);
        this.setMoreClass();
    }
    copy() {
        const id = this._activeTabId;
        const item = this._items.filter((i) => i.id === id)[0];
        // @ts-ignore
        this.$copy.copy(item.code);
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        return html `
            <div
                class="${this.componentUtils.className()} ${this.props.more ? this.componentUtils.className('more') : ''}"
                ?lines="${
        // @ts-ignore
        this.lines}"
                ?mounted="${
        // @ts-ignore
        this.mounted}"
                ?default-style="${
        // @ts-ignore
        this.defaultStyle}"
                toolbar-position="${
        // @ts-ignore
        this.toolbarPosition}"
            >
                <div class="templates">
                    <slot></slot>
                </div>

                <header class="${this.componentUtils.className('__nav')}">
                    <ol class="${this.componentUtils.className('__tabs', 's-tabs')}">
                        ${((_a = this._items) !== null && _a !== void 0 ? _a : []).map((item) => html `
                                <li
                                    class="${this.componentUtils.className('__tab')}"
                                    id="${item.id}"
                                    ?active="${this._activeTabId === item.id}"
                                    @click="${this.setActiveTabByTab}"
                                >
                                    ${item.lang}
                                </li>
                            `)}
                    </ol>
                    ${
        // @ts-ignore
        this.toolbarPosition === 'nav'
            ? html `
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
            ? html `
                                  <div
                                      class="${this.componentUtils.className('__toolbar')}"
                                  >
                                      <s-clipboard-copy
                                          @click="${this.copy}"
                                      ></s-clipboard-copy>
                                  </div>
                              `
            : ''}
                    ${((_c = this._items) !== null && _c !== void 0 ? _c : []).map((item) => {
            var _a, _b, _c;
            return html `
                            <pre
                                class="${this.componentUtils.className('__code')}"
                                style="line-height:0;"
                                id="${(_a = item.id) !== null && _a !== void 0 ? _a : item.lang}"
                                ?active="${this._activeTabId ===
                ((_b = item.id) !== null && _b !== void 0 ? _b : item.lang)}"
                            >
                            <code lang="${(_c = item.lang) !== null && _c !== void 0 ? _c : item.id}" class="language-${item.lang} ${item.lang} ${this
                .props.defaultStyle
                ? 'hljs'
                : ''}">${
            // @ts-ignore
            item.code.trim()}</code>
                        </pre>
                        `;
        })}
                    <div class="${this.componentUtils.className('__more-bar')}">
                        ${
        // @ts-ignore
        this._moreAction === 'toggle'
            ? html `
                                      <a
                                          class="${this.componentUtils.className('__more-button', 's-btn')}"
                                          @click="${this.toggleMore}"
                                      >
                                          ${
            // @ts-ignore
            this._more
                ? html `
                                                        ${(_d = this.props
                    .lessLabel) !== null && _d !== void 0 ? _d : 'Show less'}
                                                    `
                : html `
                                                        ${(_e = this.props
                    .moreLabel) !== null && _e !== void 0 ? _e : 'Show more'}
                                                    `}
                                      </a>
                                  `
            : html `
                                      <a
                                          class="${this.componentUtils.className('__more-button', 's-btn s-color--accent')}"
                                          href="${
            // @ts-ignore
            this._moreAction}"
                                      >
                                          ${
            // @ts-ignore
            this._more
                ? html `
                                                        ${(_f = this.props
                    .lessLabel) !== null && _f !== void 0 ? _f : 'Show less'}
                                                    `
                : html `
                                                        ${(_g = this.props
                    .moreLabel) !== null && _g !== void 0 ? _g : 'Show more'}
                                                    `}
                                      </a>
                                  `}                        
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}
__decorate([
    property()
], SCodeExample.prototype, "_items", void 0);
__decorate([
    property()
], SCodeExample.prototype, "_activeTabId", void 0);
__decorate([
    property({
        type: String,
    })
], SCodeExample.prototype, "active", void 0);
__decorate([
    property()
], SCodeExample.prototype, "props", void 0);
__decorate([
    query('s-clipboard-copy')
], SCodeExample.prototype, "$copy", void 0);
__decorate([
    query('.templates')
], SCodeExample.prototype, "$templatesContainer", void 0);
__decorate([
    queryAssignedNodes()
], SCodeExample.prototype, "$templates", void 0);
export function define(props = {}, tagName = 's-code-example') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SCodeExample);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLE1BQU0sTUFBTSx1QkFBdUIsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RCxPQUFPLFNBQVMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RCxPQUFPLGdCQUFnQixNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sU0FBUyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZELE9BQU8sVUFBVSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hFLE9BQU8sb0JBQW9CLE1BQU0sZ0RBQWdELENBQUM7QUFDbEYsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLDJCQUEyQixDQUFDO0FBQzlDLE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFFMUYsT0FBTyxVQUFVLE1BQU0sNkJBQTZCLENBQUM7QUFDckQsT0FBTyxZQUFZLE1BQU0sK0JBQStCLENBQUM7QUFDekQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxhQUFhLE1BQU0saUNBQWlDLENBQUM7QUFFNUQsZ0JBQWdCLEVBQUUsQ0FBQztBQWVuQixNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEs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