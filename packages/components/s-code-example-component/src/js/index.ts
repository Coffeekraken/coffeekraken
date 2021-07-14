// @ts-nocheck
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
import { createApp } from 'vue';
import __component from './SCodeExample.vue';

export function define() {
    __querySelectorLive('s-code-example', ($elm) => {
        const app = createApp(__component);
        app.mount($elm);
    });
}
export default __component;