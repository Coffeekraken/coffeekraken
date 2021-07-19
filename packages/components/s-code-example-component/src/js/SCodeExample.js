// // @ts-nocheck
// import { createApp, h } from 'vue';
// import wrapper from "vue3-webcomponent-wrapper";
// import __component from './SCodeExample.vue';
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
// export function webcomponent(tagName = 's-code-example') {
//     const webComponent = wrapper(__component, createApp, h);
//     window.customElements.define(tagName, webComponent);
// }
// export default __component;
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import { css, html, LitElement, property, query, queryAssignedNodes, unsafeCSS } from 'lit-element';
import __hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
__hljs.registerLanguage('javascript', javascript);
import __css from '../css/s-code-example.css';
import { webcomponent as __SClipboardCopy } from '@coffeekraken/s-clipboard-copy-component';
import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface.ts';
__SClipboardCopy();
export default class SCodeExample extends LitElement {
    constructor() {
        super();
        this._component = undefined;
        this._$copy = undefined;
        this._items = [];
        this._activeTabId = undefined;
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            interface: __SCodeExampleComponentInterface,
            defaultProps: {}
        });
    }
    static get styles() {
        return css `${unsafeCSS(__css)}`;
    }
    firstUpdated() {
        this.$templates.forEach($template => {
            var _a, _b, _c;
            if (!$template.getAttribute)
                return;
            this._items = [...this._items, {
                    id: (_b = (_a = $template.getAttribute('id')) !== null && _a !== void 0 ? _a : $template.getAttribute('language')) !== null && _b !== void 0 ? _b : $template.getAttribute('lang'),
                    lang: (_c = $template.getAttribute('language')) !== null && _c !== void 0 ? _c : $template.getAttribute('lang'),
                    code: $template.innerHTML
                }];
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
    render() {
        var _a, _b, _c, _d;
        return html `
            <div class="${(_a = this._component) === null || _a === void 0 ? void 0 : _a.className()}" toolbar-position="${(_b = this._component) === null || _b === void 0 ? void 0 : _b.props.toolbarPosition}">

            <div class="templates">
                <slot></slot>
            </div>

            ${this._component ? html `<header class="${this._component.className('__nav')}">
                <ol class="${this._component.className('__tabs', this._component.props.defaultStyleClasses.main)}">
                    ${((_c = this._items) !== null && _c !== void 0 ? _c : []).map(item => html `
                        <li class="${this._component.className('__tab')}"
                            id="${item.id}"
                            ?active="${this._activeTabId === item.id}"
                            @click="${this.setActiveTabByTab}">
                            ${item.lang}
                        </li>
                    `)}
                </ol>
                ${this._component.props.toolbarPosition === 'nav' ? html `
                    <div class="${this._component.className('__toolbar')}">
                        <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                    </div>
                ` : ''}
            </header>` : ''}
            ${this._component ? html `
                <div class="${this._component.className('__content')}">
                    ${this._component.props.toolbarPosition !== 'nav' ? html `
                        <div class="${this._component.className('__toolbar')}">
                            <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                        </div>
                    ` : ''}
                    ${((_d = this._items) !== null && _d !== void 0 ? _d : []).map(item => {
            var _a, _b;
            return html `
                        <pre class="${this._component.className('__code')}"   
                            id="${(_a = item.id) !== null && _a !== void 0 ? _a : item.lang}"
                            ?active="${this._activeTabId === ((_b = item.id) !== null && _b !== void 0 ? _b : item.lang)}">
                            <code class="language-${item.lang}">
                                ${item.code}
                            </code>
                        </pre>
                    `;
        })}
                </div>
            ` : ''}
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
        const $content = this.shadowRoot.querySelector(`pre#${id} code`);
        if ($content.hasAttribute('inited'))
            return;
        $content.setAttribute('inited', true);
        const highlightedCode = __hljs.highlight($content === null || $content === void 0 ? void 0 : $content.innerHTML, { language: 'js' }).value.trim();
        $content === null || $content === void 0 ? void 0 : $content.classList.add('hljs');
        $content === null || $content === void 0 ? void 0 : $content.innerHTML = highlightedCode;
    }
    copy() {
        const id = this._activeTabId;
        const item = this._items.filter(i => i.id === id)[0];
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
        type: String
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
export function webcomponent(tagName = 's-code-example') {
    customElements.define(tagName, SCodeExample);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlCQUFpQjtBQUNqQixzQ0FBc0M7QUFDdEMsbURBQW1EO0FBQ25ELGdEQUFnRDs7Ozs7Ozs7Ozs7Ozs7OztBQUVoRCw2REFBNkQ7QUFDN0QsK0RBQStEO0FBQy9ELDJEQUEyRDtBQUMzRCxJQUFJO0FBRUosOEJBQThCO0FBRTlCLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxNQUFNLE1BQU0sc0NBQXNDLENBQUM7QUFDMUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXBHLE9BQU8sTUFBTSxNQUFNLHVCQUF1QixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9ELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFFbEQsT0FBTyxLQUFLLE1BQU0sMkJBQTJCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksSUFBSSxnQkFBZ0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzVGLE9BQU8sZ0NBQWdDLE1BQU0sK0NBQStDLENBQUM7QUFFN0YsZ0JBQWdCLEVBQUUsQ0FBQztBQUVuQixNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxVQUFVO0lBZ0NoRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBM0JaLGVBQVUsR0FBRyxTQUFTLENBQUM7UUFDdkIsV0FBTSxHQUFHLFNBQVMsQ0FBQztRQUduQixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBR1osaUJBQVksR0FBRyxTQUFTLENBQUM7UUFxQnJCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FB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