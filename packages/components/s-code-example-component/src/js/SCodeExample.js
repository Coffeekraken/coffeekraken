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
import { LitElement, html, property, css, unsafeCSS, query, queryAssignedNodes } from 'lit-element';
import prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-markup-templating';
import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface.ts';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __css from '../css/s-code-example.css';
export default class MyElement extends LitElement {
    constructor() {
        super();
        this._component = undefined;
        this._$copy = undefined;
        this._items = [];
        this._activeTabId = undefined;
        this._component = new __SComponentUtils('s-code-example', this, this.attributes, {
            interface: __SCodeExampleComponentInterface,
            defaultProps: {}
        });
    }
    static get styles() {
        return css `${unsafeCSS(__css)}`;
    }
    shouldUpdate() {
        var _a;
        return (_a = this._component) === null || _a === void 0 ? void 0 : _a.shouldUpdate;
    }
    firstUpdated() {
        this.$templates.forEach($template => {
            var _a, _b, _c;
            if (!$template.getAttribute)
                return;
            this._items = [...this._items, {
                    id: (_b = (_a = $template.getAttribute('id')) !== null && _a !== void 0 ? _a : this._component.getAttributeSafely($template, 'language')) !== null && _b !== void 0 ? _b : this._component.getAttributeSafely($template, 'lang'),
                    lang: (_c = this._component.getAttributeSafely($template, 'language')) !== null && _c !== void 0 ? _c : this._component.getAttributeSafely($template, 'lang'),
                    code: this._component.getDomPropertySafely($template, 'innerHTML')
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
            </header>` : ''}
            ${this._component ? html `
                <div class="${this._component.className('__content')}">
                    <div class="${this._component.className('__toolbar')}">
                    <s-clipboard-copy ref="copy" @click="copy"></s-clipboard-copy>
                    </div>
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
        prism.highlightElement($content);
    }
    copy() {
        const id = this._activeTabId;
        const item = this._items.filter(i => i.id === id)[0];
        this._$copy.copy(item.code);
    }
}
__decorate([
    property()
], MyElement.prototype, "_items", void 0);
__decorate([
    property()
], MyElement.prototype, "_activeTabId", void 0);
__decorate([
    property({
        type: String
    })
], MyElement.prototype, "active", void 0);
__decorate([
    property()
], MyElement.prototype, "props", void 0);
__decorate([
    query('s-clipboard-copy')
], MyElement.prototype, "$copy", void 0);
__decorate([
    query('.templates')
], MyElement.prototype, "$templatesContainer", void 0);
__decorate([
    queryAssignedNodes()
], MyElement.prototype, "$templates", void 0);
export function webcomponent(tagName = 's-code-example') {
    customElements.define(tagName, MyElement);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlCQUFpQjtBQUNqQixzQ0FBc0M7QUFDdEMsbURBQW1EO0FBQ25ELGdEQUFnRDs7Ozs7Ozs7Ozs7Ozs7OztBQUVoRCw2REFBNkQ7QUFDN0QsK0RBQStEO0FBQy9ELDJEQUEyRDtBQUMzRCxJQUFJO0FBRUosOEJBQThCO0FBRTlCLE9BQU8sRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUVsRyxPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUFDNUIsT0FBTyxxQ0FBcUMsQ0FBQztBQUM3QyxPQUFPLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8saUNBQWlDLENBQUM7QUFDekMsT0FBTywrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sNENBQTRDLENBQUM7QUFFcEQsT0FBTyxnQ0FBZ0MsTUFBTSwrQ0FBK0MsQ0FBQztBQUM3RixPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBRWhFLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLDJCQUEyQixDQUFDO0FBRTlDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBVSxTQUFRLFVBQVU7SUFnQzdDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUEzQlosZUFBVSxHQUFHLFNBQVMsQ0FBQztRQUN2QixXQUFNLEdBQUcsU0FBUyxDQUFDO1FBR25CLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFHWixpQkFBWSxHQUFHLFNBQVMsQ0FBQztRQXFCckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFF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