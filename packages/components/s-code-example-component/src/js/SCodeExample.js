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
import { css, html, property, query, queryAssignedNodes, unsafeCSS } from 'lit-element';
import __hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
__hljs.registerLanguage('javascript', javascript);
// @ts-ignore
import __css from '../css/s-code-example.css';
import { webcomponent as __SClipboardCopy } from '@coffeekraken/s-clipboard-copy-component';
import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface';
__SClipboardCopy();
export default class SCodeExample extends SLitElement {
    constructor() {
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
    }
    // createRenderRoot() {
    //     return this;
    // }
    render() {
        var _a, _b, _c, _d, _e;
        return html `
            <div class="${(_a = this._component) === null || _a === void 0 ? void 0 : _a.className()}" toolbar-position="${(_b = this._component) === null || _b === void 0 ? void 0 : _b.props.toolbarPosition}">
                <div class="templates">
                    <slot></slot>
                </div>

                ${this._component
            ? html `<header class="${this._component.className('__nav')}">
                          <ol
                              class="${this._component.className('__tabs', this._component.props.defaultStyleClasses.main)}"
                          >
                              ${((_c = this._items) !== null && _c !== void 0 ? _c : []).map((item) => html `
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
                          ${this._component.props.toolbarPosition === 'nav'
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
                              ${this._component.props.toolbarPosition !== 'nav'
                ? html `
                                        <div class="${(_d = this._component) === null || _d === void 0 ? void 0 : _d.className('__toolbar')}">
                                            <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                                        </div>
                                    `
                : ''}
                              ${((_e = this._items) !== null && _e !== void 0 ? _e : []).map((item) => {
                var _a, _b, _c;
                return html `
                                      <pre
                                          class="${this._component.className('__code')}"
                                          style="line-height:0;"
                                          id="${(_a = item.id) !== null && _a !== void 0 ? _a : item.lang}"
                                          ?active="${this._activeTabId === ((_b = item.id) !== null && _b !== void 0 ? _b : item.lang)}"
                                      >
                            <code class="language-${item.lang} ${item.lang} ${((_c = this._component) === null || _c === void 0 ? void 0 : _c.props.defaultStyle)
                    ? 'hljs'
                    : ''}">
                                
                                ${
                // @ts-ignore
                item.code}
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
        const highlightedCode = __hljs.highlight($content === null || $content === void 0 ? void 0 : $content.innerHTML, { language: 'js' }).value.trim();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8saUJBQWlCLEVBQUUsRUFBRSxXQUFXLEVBQWdDLE1BQU0saUNBQWlDLENBQUM7QUFDL0csT0FBTyxNQUFNLE1BQU0sc0NBQXNDLENBQUM7QUFDMUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFeEYsT0FBTyxNQUFNLE1BQU0sdUJBQXVCLENBQUM7QUFDM0MsT0FBTyxVQUFVLE1BQU0sdUNBQXVDLENBQUM7QUFDL0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztBQUVsRCxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sMkJBQTJCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksSUFBSSxnQkFBZ0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzVGLE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFFMUYsZ0JBQWdCLEVBQUUsQ0FBQztBQVVuQixNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxXQUFXO0lBcUNqRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBMUJaLFdBQU0sR0FBRyxTQUFTLENBQUM7UUFHbkIsV0FBTSxHQUFrQixFQUFFLENBQUM7UUFHM0IsaUJBQVksR0FBRyxTQUFTLENBQUM7UUFxQnJCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3ZGLGNBQWMsRUFBRTtnQkFDWixTQUFTLEVBQUUsZ0NBQWdDO2dCQUMzQyxZQUFZLEVBQUUsRUFBRTthQUNu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