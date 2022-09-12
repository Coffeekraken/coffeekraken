"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name            configFiles
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to get the SFile object representation of each config files that correspond to the passed configId
 *
 * @param       {String}        configId            The config id like "frontendServer", etc...
 * @return      {String}                    The .config.js filename
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function configFiles(configId, simplify = false) {
    const paths = s_sugar_config_1.default.filesPaths
        .filter((path) => {
        return path.includes(`/${configId}.config.js`);
    })
        .map((path) => {
        const obj = s_file_1.default.new(path).toObject();
        if (simplify) {
            // obj.content = __stripDocblocks(obj.content);
            obj.content = (0, string_1.__stripSourcemap)(obj.content);
        }
        return obj;
    });
    return paths;
}
exports.default = configFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLGtGQUEwRDtBQUMxRCx1REFBZ0Y7QUFFaEY7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsU0FBd0IsV0FBVyxDQUFDLFFBQWdCLEVBQUUsUUFBUSxHQUFHLEtBQUs7SUFDbEUsTUFBTSxLQUFLLEdBQUcsd0JBQWMsQ0FBQyxVQUFVO1NBQ2xDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxZQUFZLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUM7U0FDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNWLE1BQU0sR0FBRyxHQUFHLGdCQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pDLElBQUksUUFBUSxFQUFFO1lBQ1YsK0NBQStDO1lBQy9DLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBQSx5QkFBZ0IsRUFBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDL0M7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ1AsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQWRELDhCQWNDIn0=