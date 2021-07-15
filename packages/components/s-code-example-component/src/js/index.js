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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUNuQywwQ0FBMEM7QUFDMUMsT0FBTyxXQUFXLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sMkJBQTJCLENBQUM7QUFFaEQsTUFBTSxVQUFVLE1BQU07SUFFbEIsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFFekQsb0RBQW9EO0lBQ3BELDBDQUEwQztJQUMxQyx1QkFBdUI7SUFDdkIsTUFBTTtBQUNWLENBQUM7QUFFRCxlQUFlLFdBQVcsQ0FBQyJ9