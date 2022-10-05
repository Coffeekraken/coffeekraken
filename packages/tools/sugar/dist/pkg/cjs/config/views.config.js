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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbURBQTREO0FBQzVELGdEQUEwQjtBQUUxQixtQkFBeUIsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFO0lBQ3BDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0gsUUFBUSxFQUFFO1lBQ04sSUFBSSxFQUFFO2dCQUNGLEtBQUssY0FBTSxDQUFDLFFBQVEsQ0FDaEIsSUFBQSx1QkFBZ0IsR0FBRSxFQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQzlCLEVBQUU7Z0JBQ0gsbURBQW1EO2FBQ3REO1lBQ0QsS0FBSyxFQUFFO2dCQUNILEtBQUssY0FBTSxDQUFDLFFBQVEsQ0FDaEIsSUFBQSx1QkFBZ0IsR0FBRSxFQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQzlCLEVBQUU7Z0JBQ0gsb0RBQW9EO2FBQ3ZEO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQztBQXJCRCw0QkFxQkMifQ==