"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = __importDefault(require("path"));
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        namespaces: {
            'sugar.views': [
                path_1.default.resolve((0, fs_1.__dirname)(), '../../../../src/views/_specs'),
            ],
            'sugar.blade': [
                path_1.default.resolve((0, fs_1.__dirname)(), '../../../../src/views/blade/@sugar'),
            ],
            'sugar.twig': [
                path_1.default.resolve((0, fs_1.__dirname)(), '../../../../src/views/twig'),
            ],
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQW1EO0FBQ25ELGdEQUEwQjtBQUUxQixtQkFBeUIsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxVQUFVLEVBQUU7WUFDUixhQUFhLEVBQUU7Z0JBQ1gsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFBLGNBQVMsR0FBRSxFQUFFLDhCQUE4QixDQUFDO2FBQzlEO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLGNBQU0sQ0FBQyxPQUFPLENBQ1YsSUFBQSxjQUFTLEdBQUUsRUFDWCxvQ0FBb0MsQ0FDdkM7YUFDSjtZQUNELFlBQVksRUFBRTtnQkFDVixjQUFNLENBQUMsT0FBTyxDQUFDLElBQUEsY0FBUyxHQUFFLEVBQUUsNEJBQTRCLENBQUM7YUFDNUQ7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDO0FBbkJELDRCQW1CQyJ9