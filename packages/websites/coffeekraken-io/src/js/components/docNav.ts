// @ts-nocheck
import { createApp, h } from 'vue';
import wrapper from "vue3-webcomponent-wrapper";
import __component from './docNav.vue';

export function webcomponent(tagName = 'doc-nav') {
    const webComponent = wrapper(__component, createApp, h);
    window.customElements.define(tagName, webComponent);
}

export default __component;