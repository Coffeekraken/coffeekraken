// // @ts-nocheck
// import { createApp, h } from 'vue';
// import wrapper from "vue3-webcomponent-wrapper";
// import __component from './SCodeExample.vue';

// export function webcomponent(tagName = 's-code-example') {
//     const webComponent = wrapper(__component, createApp, h);
//     window.customElements.define(tagName, webComponent);
// }

// export default __component;

import {LitElement, html, property, internalProperty, query, queryAssignedNodes} from 'lit-element';

import prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-markup-templating';
import __SClipboardCopyComponent from '@coffeekraken/s-clipboard-copy-component';
import __SCodeExampleComponentInterface from './interface/SCodeExampleComponentInterface.ts';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __whenInViewport from '@coffeekraken/sugar/js/dom/detect/whenInViewport';
import __wait from '@coffeekraken/sugar/shared/time/wait';

export default class MyElement extends LitElement {
    _component = undefined;
    _$copy = undefined;

    @property()
    _items = [];

    @property()
    _activeTabId = undefined;

    @property({
        type: String
    })
    active;
    
    @query('s-clipboard-copy')
    $copy;

    @query('.templates')
    $templatesContainer;

    @queryAssignedNodes()
    $templates;

    constructor() {
        super();

        this._component = new __SComponentUtils('s-code-example', this, {}, {
            interface: __SCodeExampleComponentInterface,
            display: 'block'
        });

    }
    firstUpdated() {
        this.$templates.forEach($template => {
            if (!$template.getAttribute) return;
            this._items = [...this._items, {
                id: $template.getAttribute('id') ?? this._component.getAttributeSafely($template, 'language') ?? this._component.getAttributeSafely($template, 'lang'),
                lang: this._component.getAttributeSafely($template, 'language') ?? this._component.getAttributeSafely($template, 'lang'),
                code: this._component.getDomPropertySafely($template, 'innerHTML')
            }];
            // $template.remove();
        });

          // active idx
          if (this.active) {
            this.setActiveTab(this.active);
          } else {
            this.setActiveTab(this._items[0].id);
          }

    }
    render() {
        return html`
            <div class="${this._component?.className()}" toolbar-position="${this._component?.props.toolbarPosition}">

            <div class="templates">
                <slot></slot>
            </div>

            ${this._component ? html`<header class="${this._component.className('__nav')}">
                <ol class="${this._component.className('__tabs', this._component.props.defaultStyleClasses.main)}">
                ${(this._items ?? []).map(item => html`
                    <li class="${this._component.className('__tab')}"
                        id="${item.id}"
                        ?active="${this._activeTabId === item.id}"
                        @click="${this.setActiveTabByTab}">
                        ${item.lang}
                    </li>
                `)}
                </ol>
            </header>` : ''}
            ${this._component ? html`
                <div class="${this._component.className('__content')}">
                    <div class="${this._component.className('__toolbar')}">
                    <s-clipboard-copy ref="copy" @click="copy"></s-clipboard-copy>
                    </div>
                    ${(this._items ?? []).map(item => html`
                        <pre class="${this._component.className('__code')}"   
                            id="${item.id ?? item.lang}"
                            ?active="${this._activeTabId === (item.id ?? item.lang)}">
                            <code class="language-${ item.lang }">
                                ${item.code }
                            </code>
                        </pre>
                    `)}
                </div>
            ` : ''}
        </div>
        `;
    }
    setActiveTabByTab(e) {
        this.setActiveTab(e.target.id);
    }
    async setActiveTab(id) {
        await __wait();
        this._activeTabId = id;
        this.initPrismOnTab(id);
    }
    initPrismOnTab(id) {

        console.log('oid', id);

        const $content = this.shadowRoot.querySelector(`pre#${id} code`);

        console.log($content);

        if ($content.hasAttribute('inited')) return;
        $content.setAttribute('inited', true);
        prism.highlightElement($content);
    }
    copy() {
        const id = this._activeTabId;
        const item = this._items.filter(i => i.id === id)[0];
        this._$copy.copy(item.code);
    }
}

export function webcomponent(tagName = 's-code-example') {
    customElements.define(tagName, MyElement);
}