"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const SVite_1 = __importDefault(require("../SVite"));
const SViteStartInterface_1 = __importDefault(require("./interface/SViteStartInterface"));
function start(stringArgs = '') {
    const vite = new SVite_1.default();
    const pro = s_process_1.default.from(vite.start.bind(vite), {
        process: {
            interface: SViteStartInterface_1.default
        }
    });
    pro.run(stringArgs);
}
exports.default = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RhcnQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELHFEQUErQjtBQUMvQiwwRkFBb0U7QUFFcEUsU0FBd0IsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQzNDLE1BQU0sSUFBSSxHQUFHLElBQUksZUFBTyxFQUFFLENBQUM7SUFDM0IsTUFBTSxHQUFHLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDakQsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLDZCQUFxQjtTQUNqQztLQUNGLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQVJELHdCQVFDIn0=