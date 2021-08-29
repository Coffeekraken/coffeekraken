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
import __SComponentUtils, { SLitElement } from '@coffeekraken/s-component-utils';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import { css, html, unsafeCSS } from 'lit';
import { html as __unsafeHTML } from 'lit/static-html.js';
import { property, query, queryAssignedNodes } from 'lit/decorators.js';
import __hljs from 'highlight.js/lib/core';
import __langJavascript from 'highlight.js/lib/languages/javascript';
import __langHtml from 'highlight.js/lib/languages/xml';
import __langBash from 'highlight.js/lib/languages/bash';
import __langPhp from 'highlight.js/lib/languages/php';
import __langCss from 'highlight.js/lib/languages/css';
// @ts-ignore
import __css from '../css/s-code-example.css';
import { webcomponent as __SClipboardCopy } from '@coffeekraken/s-clipboard-copy-component';
import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface';
__SClipboardCopy();
export default class SCodeExample extends SLitElement {
    constructor() {
        var _a;
        super();
        this._$copy = undefined;
        this._items = [];
        this._activeTabId = undefined;
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            componentUtils: {
                interface: __SCodeExampleComponentInterface,
                defaultProps: {},
            },
        });
        const languages = Object.assign({ html: __langHtml, javascript: __langJavascript, js: __langJavascript, php: __langPhp, bash: __langBash, shell: __langBash, css: __langCss }, ((_a = this._component.props.languages) !== null && _a !== void 0 ? _a : {}));
        Object.keys(languages).forEach((lang) => {
            __hljs.registerLanguage(lang, languages[lang]);
        });
    }
    static get properties() {
        return __SComponentUtils.properties({}, __SCodeExampleComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this.$templates.forEach(($template) => {
                var _a, _b, _c, _d, _e;
                if (!$template.getAttribute)
                    return;
                this._items = [
                    ...this._items,
                    {
                        id: (_c = (_b = (_a = $template.getAttribute('id')) !== null && _a !== void 0 ? _a : $template.getAttribute('language')) !== null && _b !== void 0 ? _b : $template.getAttribute('lang')) !== null && _c !== void 0 ? _c : 'html',
                        lang: (_e = (_d = $template.getAttribute('language')) !== null && _d !== void 0 ? _d : $template.getAttribute('lang')) !== null && _e !== void 0 ? _e : 'html',
                        // @ts-ignore
                        code: $template.innerHTML,
                    },
                ];
                $template.remove();
            });
            // active idx
            if (this.active) {
                this.setActiveTab(this.active);
            }
            else {
                this.setActiveTab(this._items[0].id);
            }
            yield __wait(500);
            return true;
        });
    }
    // createRenderRoot() {
    //     return this;
    // }
    render() {
        var _a, _b, _c, _d;
        return html `
            <div
                class="${(_a = this._component) === null || _a === void 0 ? void 0 : _a.className()}"
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

                ${this._component
            ? html `<header class="${this._component.className('__nav')}">
                          <ol class="${this._component.className('__tabs', 's-tabs')}">
                              ${((_b = this._items) !== null && _b !== void 0 ? _b : []).map((item) => html `
                                      <li
                                          class="${this._component.className('__tab')}"
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
                                        <div class="${this._component.className('__toolbar')}">
                                            <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                                        </div>
                                    `
                : ''}
                      </header>`
            : ''}
                ${this._component
            ? html `
                          <div class="${this._component.className('__content')}">
                              ${
            // @ts-ignore
            this.toolbarPosition !== 'nav'
                ? html `
                                            <div class="${(_c = this._component) === null || _c === void 0 ? void 0 : _c.className('__toolbar')}">
                                                <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                                            </div>
                                        `
                : ''}
                              ${((_d = this._items) !== null && _d !== void 0 ? _d : []).map((item) => {
                var _a, _b, _c;
                return html `
                                      <pre
                                          class="${this._component.className('__code')}"
                                          style="line-height:0;"
                                          id="${(_a = item.id) !== null && _a !== void 0 ? _a : item.lang}"
                                          ?active="${this._activeTabId === ((_b = item.id) !== null && _b !== void 0 ? _b : item.lang)}"
                                      >
                            <code lang="${(_c = item.lang) !== null && _c !== void 0 ? _c : item.id}" class="language-${item.lang} ${item.lang} ${this
                    ._component.props.defaultStyle
                    ? 'hljs'
                    : ''}">
                                
                                ${
                // @ts-ignore
                __unsafeHTML([item.code])}
                            </code>
                        </pre>
                                  `;
            })}
                          </div>
                      `
            : ''}
            </div>
        `;
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
    initPrismOnTab(id) {
        var _a;
        const $content = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`pre#${id} code`);
        if ($content.hasAttribute('inited'))
            return;
        $content.setAttribute('inited', 'true');
        const highlightedCode = __hljs
            .highlight($content === null || $content === void 0 ? void 0 : $content.innerHTML.replace(/\<\!\-\-\?lit\$.*\$\-\-\>/g, ''), {
            language: $content.getAttribute('lang'),
        })
            .value.trim();
        $content.innerHTML = highlightedCode;
    }
    copy() {
        const id = this._activeTabId;
        const item = this._items.filter((i) => i.id === id)[0];
        // @ts-ignore
        this.$copy.copy(item.code);
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
export function webcomponent(props = {}, tagName = 's-code-example') {
    __SComponentUtils.setDefaultProps(tagName, props);
    customElements.define(tagName, SCodeExample);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8saUJBQWlCLEVBQUUsRUFBRSxXQUFXLEVBQWdDLE1BQU0saUNBQWlDLENBQUM7QUFDL0csT0FBTyxNQUFNLE1BQU0sc0NBQXNDLENBQUM7QUFDMUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLElBQUksWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV4RSxPQUFPLE1BQU0sTUFBTSx1QkFBdUIsQ0FBQztBQUMzQyxPQUFPLGdCQUFnQixNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sVUFBVSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sVUFBVSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pELE9BQU8sU0FBUyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZELE9BQU8sU0FBUyxNQUFNLGdDQUFnQyxDQUFDO0FBRXZELGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSwyQkFBMkIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxJQUFJLGdCQUFnQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDNUYsT0FBTyxnQ0FBZ0MsTUFBTSw0Q0FBNEMsQ0FBQztBQUUxRixnQkFBZ0IsRUFBRSxDQUFDO0FBVW5CLE1BQU0sQ0FBQyxPQUFPLE9BQU8sWUFBYSxTQUFRLFdBQVc7SUFxQ2pEOztRQUNJLEtBQUssRUFBRSxDQUFDO1FBMUJaLFdBQU0sR0FBRyxTQUFTLENBQUM7UUFHbkIsV0FBTSxHQUFrQixFQUFFLENBQUM7UUFHM0IsaUJBQVksR0FBRyxTQUFTLENBQUM7UUFxQnJC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