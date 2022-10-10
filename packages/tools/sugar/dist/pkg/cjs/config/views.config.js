"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("@coffeekraken/sugar/path");
const path_2 = __importDefault(require("path"));
function default_1({ env, config }) {
    if (env.platform !== 'node')
        return;
    return {
        layouts: {
            main: {
                name: 'Default (main)',
                viewPath: {
                    twig: 'layouts/main.twig',
                    blade: null,
                },
            },
        },
        rootDirs: {
            twig: [
                `./${path_2.default.relative((0, path_1.__packageRootDir)(), config.storage.src.viewsDir)}`,
                `./node_modules/@coffeekraken/sugar/src/views/twig`,
            ],
            blade: [
                `./${path_2.default.relative((0, path_1.__packageRootDir)(), config.storage.src.viewsDir)}`,
                `./node_modules/@coffeekraken/sugar/src/views/blade`,
            ],
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbURBQTREO0FBQzVELGdEQUEwQjtBQUUxQixtQkFBeUIsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFO0lBQ3BDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0wsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLFFBQVEsRUFBRTtvQkFDTixJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixLQUFLLEVBQUUsSUFBSTtpQkFDZDthQUNKO1NBQ0o7UUFDRCxRQUFRLEVBQUU7WUFDTixJQUFJLEVBQUU7Z0JBQ0YsS0FBSyxjQUFNLENBQUMsUUFBUSxDQUNoQixJQUFBLHVCQUFnQixHQUFFLEVBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDOUIsRUFBRTtnQkFDSCxtREFBbUQ7YUFDdEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxjQUFNLENBQUMsUUFBUSxDQUNoQixJQUFBLHVCQUFnQixHQUFFLEVBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDOUIsRUFBRTtnQkFDSCxvREFBb0Q7YUFDdkQ7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDO0FBOUJELDRCQThCQyJ9