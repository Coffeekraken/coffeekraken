"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SView_1 = __importDefault(require("../SView"));
function page404(data) {
    const engine = new SView_1.default('pages.404', {
        view: {
            engine: 'blade'
        }
    });
    const result = engine.render(data);
    return result;
}
exports.default = page404;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDA0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiNDA0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscURBQXVEO0FBNkJ2RCxTQUF3QixPQUFPLENBQUMsSUFBYztJQUM1QyxNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQU8sQ0FBQyxXQUFXLEVBQUU7UUFDdEMsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLE9BQU87U0FDaEI7S0FDRixDQUFDLENBQUM7SUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFSRCwwQkFRQyJ9