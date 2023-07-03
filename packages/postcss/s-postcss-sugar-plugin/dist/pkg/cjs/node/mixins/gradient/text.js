"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const gradient_1 = require("./gradient");
Object.defineProperty(exports, "interface", { enumerable: true, get: function () { return gradient_1.interface; } });
function default_1({ params, atRule, replaceWith, }) {
    const vars = [
        `
        background-size: 100%;
        background-clip: text;
        color: transparent;
        @sugar.gradient ${atRule.params};
    `,
    ];
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQUE4RTtBQXlCOUIsMEZBekIxQixvQkFBbUMsT0F5QkE7QUFFekQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxJQUFJLEdBQWE7UUFDbkI7Ozs7MEJBSWtCLE1BQU0sQ0FBQyxNQUFNO0tBQ2xDO0tBQ0EsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFuQkQsNEJBbUJDIn0=