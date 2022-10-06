"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("@coffeekraken/sugar/path");
const path_2 = __importDefault(require("path"));
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        namespaces: {
            'sugar.views': [`./node_modules/@coffeekraken/sugar/src/views`],
            views: [
                `./${path_2.default.relative((0, path_1.__packageRootDir)(), api.config.storage.src.viewsDir)}`,
            ],
            bare: [
                `./${path_2.default.relative((0, path_1.__packageRootDir)(), api.config.storage.src.viewsDir)}/bare`,
            ],
            sections: [
                `./${path_2.default.relative((0, path_1.__packageRootDir)(), api.config.storage.src.viewsDir)}/sections`,
            ],
            components: [
                `./${path_2.default.relative((0, path_1.__packageRootDir)(), api.config.storage.src.viewsDir)}/components`,
            ],
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbURBQTREO0FBQzVELGdEQUEwQjtBQUUxQixtQkFBeUIsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxVQUFVLEVBQUU7WUFDUixhQUFhLEVBQUUsQ0FBQyw4Q0FBOEMsQ0FBQztZQUMvRCxLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxjQUFNLENBQUMsUUFBUSxDQUNoQixJQUFBLHVCQUFnQixHQUFFLEVBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQ2xDLEVBQUU7YUFDTjtZQUNELElBQUksRUFBRTtnQkFDRixLQUFLLGNBQU0sQ0FBQyxRQUFRLENBQ2hCLElBQUEsdUJBQWdCLEdBQUUsRUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDbEMsT0FBTzthQUNYO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLEtBQUssY0FBTSxDQUFDLFFBQVEsQ0FDaEIsSUFBQSx1QkFBZ0IsR0FBRSxFQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUNsQyxXQUFXO2FBQ2Y7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsS0FBSyxjQUFNLENBQUMsUUFBUSxDQUNoQixJQUFBLHVCQUFnQixHQUFFLEVBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQ2xDLGFBQWE7YUFDakI7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDO0FBaENELDRCQWdDQyJ9