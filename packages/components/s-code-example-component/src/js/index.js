// @ts-nocheck
import { createApp, h } from 'vue';
import wrapper from "vue3-webcomponent-wrapper";
import __component from './SCodeExample.vue';
export function webcomponent(tagName = 's-code-example') {
    const webComponent = wrapper(__component, createApp, h);
    window.customElements.define(tagName, webComponent);
}
export default __component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDbkMsT0FBTyxPQUFPLE1BQU0sMkJBQTJCLENBQUM7QUFDaEQsT0FBTyxXQUFXLE1BQU0sb0JBQW9CLENBQUM7QUFFN0MsTUFBTSxVQUFVLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCO0lBQ25ELE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRUQsZUFBZSxXQUFXLENBQUMifQ==