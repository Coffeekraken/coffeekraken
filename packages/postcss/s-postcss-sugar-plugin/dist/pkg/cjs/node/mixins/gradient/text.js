"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const gradient_js_1 = require("./gradient.js");
Object.defineProperty(exports, "interface", { enumerable: true, get: function () { return gradient_js_1.interface; } });
function default_1({ params, atRule, replaceWith, }) {
    const vars = [
        `
        background-size: 100%;
        background-clip: text;
        color: transparent;
        @s.gradient ${atRule.params};
    `,
    ];
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUFpRjtBQXlCakMsMEZBekIxQix1QkFBbUMsT0F5QkE7QUFFekQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxJQUFJLEdBQWE7UUFDbkI7Ozs7c0JBSWMsTUFBTSxDQUFDLE1BQU07S0FDOUI7S0FDQSxDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQW5CRCw0QkFtQkMifQ==