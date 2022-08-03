"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const linkPackages_1 = __importDefault(require("../../node/monorepo/linkPackages"));
exports.default = (stringArgs = '') => {
    let individual = false;
    if (stringArgs.match(/\s?--individual\s?/) || stringArgs.match(/\s?-i\s?/))
        individual = true;
    (0, linkPackages_1.default)({
        individual
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLG9GQUE4RDtBQUU5RCxrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUNqQyxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDdkIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDeEUsVUFBVSxHQUFHLElBQUksQ0FBQztJQUNwQixJQUFBLHNCQUFjLEVBQUM7UUFDYixVQUFVO0tBQ1gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=