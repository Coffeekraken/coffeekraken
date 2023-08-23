import { __isInIframe } from '@coffeekraken/sugar/dom';
import __SCarpenterComponent from './SCarpenterComponent.js';
export default function define(props = {}, tagName = 's-carpenter') {
    // carpenter cannot be inited into an iframe
    if (__isInIframe()) {
        console.log(`<yellow>[SCarpenterComponent]</yellow> Carpenter component will not be registered into an iframe...`);
        return;
    }
    if (!document.env) {
        document.env = {};
    }
    document.env.CARPENTER = true;
    __SCarpenterComponent.define(tagName, __SCarpenterComponent, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RCxPQUFPLHFCQUFxQixNQUFNLDBCQUEwQixDQUFDO0FBRTdELE1BQU0sQ0FBQyxPQUFPLFVBQVUsTUFBTSxDQUMxQixRQUE0QyxFQUFFLEVBQzlDLE9BQU8sR0FBRyxhQUFhO0lBRXZCLDRDQUE0QztJQUM1QyxJQUFJLFlBQVksRUFBRSxFQUFFO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQ1AscUdBQXFHLENBQ3hHLENBQUM7UUFDRixPQUFPO0tBQ1Y7SUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtRQUNmLFFBQVEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0tBQ3JCO0lBQ0QsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBRTlCLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDeEUsQ0FBQyJ9