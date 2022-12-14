"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const gradient_1 = require("./gradient");
Object.defineProperty(exports, "interface", { enumerable: true, get: function () { return gradient_1.interface; } });
function default_1({ params, atRule, replaceWith, }) {
    const vars = [
        `
        background-size: 100%;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent; 
        -moz-text-fill-color: transparent;
        @sugar.gradient ${atRule.params};
    `,
    ];
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQUE4RTtBQXNCOUIsMEZBdEIxQixvQkFBbUMsT0FzQkE7QUFFekQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxJQUFJLEdBQWE7UUFDbkI7Ozs7OzswQkFNa0IsTUFBTSxDQUFDLE1BQU07S0FDbEM7S0FDQSxDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXJCRCw0QkFxQkMifQ==