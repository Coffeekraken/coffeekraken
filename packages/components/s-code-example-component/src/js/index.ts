// @ts-nocheck
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
import { createApp, h } from 'vue';
// import __component from './index.riot';
import __component from './SCodeExample.vue';
import wrapper from "vue3-webcomponent-wrapper";

export function define() {

    const webComponent = wrapper(__component, createApp, h);
window.customElements.define("s-code-example", webComponent);

    // __querySelectorLive('s-code-example', ($elm) => {
    //     const app = createApp(__component);
    //     app.mount($elm);
    // });
}

export default __component;