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
// @ts-ignore
import __css from '../css/s-code-example.css';
import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface';
__SClipboardCopy();
export default class SCodeExample extends __SLitComponent {
    constructor() {
        var _a;
        super(__deepMerge({
            sComponentUtils: {
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
                if (this._items[0]) {
                    this.setActiveTab(this._items[0].id);
                }
            }
            yield __wait(500);
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
    initPrismOnTab(id) {
        var _a;
        const $content = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`pre#${id} code`);
        if ($content.hasAttribute('inited'))
            return;
        $content.setAttribute('inited', 'true');
        __hljs.highlightElement($content);
    }
    copy() {
        const id = this._activeTabId;
        const item = this._items.filter((i) => i.id === id)[0];
        // @ts-ignore
        this.$copy.copy(item.code);
    }
    render() {
        var _a, _b;
        return html `
            <div
                class="${this.componentUtils.className()}"
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
                                  <div class="${this.componentUtils.className('__toolbar')}">
                                      <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                                  </div>
                              `
            : ''}
                </header>
                <div class="${this.componentUtils.className('__content')}">
                    ${
        // @ts-ignore
        this.toolbarPosition !== 'nav'
            ? html `
                                  <div class="${this.componentUtils.className('__toolbar')}">
                                      <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                                  </div>
                              `
            : ''}
                    ${((_b = this._items) !== null && _b !== void 0 ? _b : []).map((item) => {
            var _a, _b, _c;
            return html `
                            <pre
                                class="${this.componentUtils.className('__code')}"
                                style="line-height:0;"
                                id="${(_a = item.id) !== null && _a !== void 0 ? _a : item.lang}"
                                ?active="${this._activeTabId === ((_b = item.id) !== null && _b !== void 0 ? _b : item.lang)}"
                            >
                            <code lang="${(_c = item.lang) !== null && _c !== void 0 ? _c : item.id}" class="language-${item.lang} ${item.lang} ${this.props
                .defaultStyle
                ? 'hljs'
                : ''}">${
            // @ts-ignore
            item.code.trim()}</code>
                        </pre>
                        `;
        })}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLE1BQU0sTUFBTSx1QkFBdUIsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RCxPQUFPLFNBQVMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RCxPQUFPLGdCQUFnQixNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sU0FBUyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZELE9BQU8sVUFBVSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hFLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSwyQkFBMkIsQ0FBQztBQUM5QyxPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBRTFGLGdCQUFnQixFQUFFLENBQUM7QUFVbkIsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFhLFNBQVEsZUFBZTtJQW9DckQ7O1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLGVBQWUsRUFBRTtnQkFDYixTQUFTLEVBQUUsZ0NBQWdDO2FBQzlDO1NBQ0osQ0FBQyxDQUNMLENBQUM7UUFoQ04sV0FBTSxHQUFHLFNBQVMsQ0FBQztRQUduQixXQUFNLEdBQWtCLEVBQUUsQ0FBQztRQUczQixp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