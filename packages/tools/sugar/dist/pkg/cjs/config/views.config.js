"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const packageRootDir_js_1 = __importDefault(require("../node/path/packageRootDir.js"));
function default_1({ env, config }) {
    if (env.platform !== 'node')
        return;
    return {
        layouts: {
            main: {
                name: 'Default (main)',
                viewDotPath: 'layouts.main',
            },
        },
        rootDirs: [
            `./${path_1.default.relative((0, packageRootDir_js_1.default)(), config.storage.src.viewsDir)}`,
            `./node_modules/@coffeekraken/sugar/src/views`,
        ],
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQTBCO0FBQzFCLHVGQUE4RDtBQUU5RCxtQkFBeUIsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFO0lBQ3BDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0wsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLFdBQVcsRUFBRSxjQUFjO2FBQzlCO1NBQ0o7UUFDRCxRQUFRLEVBQUU7WUFDTixLQUFLLGNBQU0sQ0FBQyxRQUFRLENBQ2hCLElBQUEsMkJBQWdCLEdBQUUsRUFDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUM5QixFQUFFO1lBQ0gsOENBQThDO1NBQ2pEO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFsQkQsNEJBa0JDIn0=