"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const SCarpenterComponent_1 = __importDefault(require("./SCarpenterComponent"));
function define(props = {}, tagName = 's-carpenter') {
    // carpenter cannot be inited into an iframe
    if ((0, dom_1.__isInIframe)()) {
        console.log(`<yellow>[SCarpenterComponent]</yellow> Carpenter component will not be registered into an iframe...`);
        return;
    }
    // __SLitComponent.setDefaultProps(`s-carpenter-app`, {
    //     ...(props ?? {}),
    // });
    SCarpenterComponent_1.default.define(tagName, SCarpenterComponent_1.default, props);
}
exports.default = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQXVEO0FBRXZELGdGQUEwRDtBQUUxRCxTQUF3QixNQUFNLENBQzFCLFFBQTRDLEVBQUUsRUFDOUMsT0FBTyxHQUFHLGFBQWE7SUFFdkIsNENBQTRDO0lBQzVDLElBQUksSUFBQSxrQkFBWSxHQUFFLEVBQUU7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FDUCxxR0FBcUcsQ0FDeEcsQ0FBQztRQUNGLE9BQU87S0FDVjtJQUVELHVEQUF1RDtJQUN2RCx3QkFBd0I7SUFDeEIsTUFBTTtJQUNOLDZCQUFxQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsNkJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQWhCRCx5QkFnQkMifQ==