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
import { LitElement, html, property, query, queryAssignedNodes } from 'lit-element';
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
export default class MyElement extends LitElement {
    constructor() {
        super();
        this._component = undefined;
        this._$copy = undefined;
        this._items = [];
        this._activeTabId = undefined;
        this._component = new __SComponentUtils('s-code-example', this, {}, {
            interface: __SCodeExampleComponentInterface,
            display: 'block'
        });
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
            // $template.remove();
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
        console.log('oid', id);
        const $content = this.shadowRoot.querySelector(`pre#${id} code`);
        console.log($content);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQkFBaUI7QUFDakIsc0NBQXNDO0FBQ3RDLG1EQUFtRDtBQUNuRCxnREFBZ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFaEQsNkRBQTZEO0FBQzdELCtEQUErRDtBQUMvRCwyREFBMkQ7QUFDM0QsSUFBSTtBQUVKLDhCQUE4QjtBQUU5QixPQUFPLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQW9CLEtBQUssRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUVwRyxPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUFDNUIsT0FBTyxxQ0FBcUMsQ0FBQztBQUM3QyxPQUFPLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8saUNBQWlDLENBQUM7QUFDekMsT0FBTywrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sNENBQTRDLENBQUM7QUFFcEQsT0FBTyxnQ0FBZ0MsTUFBTSwrQ0FBK0MsQ0FBQztBQUM3RixPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBRWhFLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBVSxTQUFRLFVBQVU7SUF3QjdDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUF4QlosZUFBVSxHQUFHLFNBQVMsQ0FBQztRQUN2QixXQUFNLEdBQUcsU0FBUyxDQUFDO1FBR25CLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFHWixpQkFBWSxHQUFHLFNBQVMsQ0FBQztRQW1CckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDaEUsU0FBUyxFQUFFLGdDQUFnQztZQUMzQyxPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFDLENBQUM7SUFFUCxDQUFDO0lBQ0Qs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