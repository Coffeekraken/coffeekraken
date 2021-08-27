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
            <div
                class="${(_a = this._component) === null || _a === void 0 ? void 0 : _a.className()}"
                ?ready="${this.ready}"
                toolbar-position="${(_b = this._component) === null || _b === void 0 ? void 0 : _b.props.toolbarPosition}"
            >
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
    const $tags = document.querySelectorAll(tagName);
    console.log($tags);
    customElements.define(tagName, SCodeExample);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8saUJBQWlCLEVBQUUsRUFBRSxXQUFXLEVBQWdDLE1BQU0saUNBQWlDLENBQUM7QUFDL0csT0FBTyxNQUFNLE1BQU0sc0NBQXNDLENBQUM7QUFDMUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFeEYsT0FBTyxNQUFNLE1BQU0sdUJBQXVCLENBQUM7QUFDM0MsT0FBTyxVQUFVLE1BQU0sdUNBQXVDLENBQUM7QUFDL0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztBQUVsRCxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sMkJBQTJCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksSUFBSSxnQkFBZ0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzVGLE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFFMUYsZ0JBQWdCLEVBQUUsQ0FBQztBQVVuQixNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxXQUFXO0lBcUNqRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBMUJaLFdBQU0sR0FBRyxTQUFTLENBQUM7UUFHbkIsV0FBTSxHQUFrQixFQUFFLENBQUM7UUFHM0IsaUJBQVksR0FBRyxTQUFTLENBQUM7UUFxQnJCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3ZGLGNBQWMsRUFBRTtnQkFDWixTQUFTLEVBQUUsZ0NBQWdDO2dCQUMzQyxZQUFZLEVBQUUsRUFBRTthQUNu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