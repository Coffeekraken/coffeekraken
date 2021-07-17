// @ts-nocheck
import { createApp, h } from 'vue';
import wrapper from "vue3-webcomponent-wrapper";
import __component from './docNav.vue';
export function webcomponent(tagName = 'doc-nav') {
    const webComponent = wrapper(__component, createApp, h);
    window.customElements.define(tagName, webComponent);
}
export default __component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jTmF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jTmF2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUNuQyxPQUFPLE9BQU8sTUFBTSwyQkFBMkIsQ0FBQztBQUNoRCxPQUFPLFdBQVcsTUFBTSxjQUFjLENBQUM7QUFFdkMsTUFBTSxVQUFVLFlBQVksQ0FBQyxPQUFPLEdBQUcsU0FBUztJQUM1QyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVELGVBQWUsV0FBVyxDQUFDIn0=