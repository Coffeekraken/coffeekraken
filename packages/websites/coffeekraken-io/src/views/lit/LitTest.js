var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
export default class LitTest extends LitElement {
    constructor() {
        super(...arguments);
        // title = 'HWLLO lit';
        // createRenderRoot() {
        //     return this;
        // }
        this.title = 'hello';
    }
    render() {
        return html `
            <h1 class="s-typoh1">
                YYY
            </h1>
        `;
    }
}
__decorate([
    property()
], LitTest.prototype, "title", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU3QyxNQUFNLENBQUMsT0FBTyxPQUFPLE9BQVEsU0FBUSxVQUFVO0lBQS9DOztRQUNJLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIsbUJBQW1CO1FBQ25CLElBQUk7UUFFSixVQUFLLEdBQUcsT0FBTyxDQUFDO0lBU3BCLENBQUM7SUFQRyxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7Ozs7U0FJVixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBVEc7SUFEQyxRQUFRLEVBQUU7c0NBQ0sifQ==