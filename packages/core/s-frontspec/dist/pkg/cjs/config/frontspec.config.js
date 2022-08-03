"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepare = void 0;
const readJson_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJson"));
const ipAddress_1 = __importDefault(require("@coffeekraken/sugar/node/network/utils/ipAddress"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
function prepare(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const potentialFrontspecJsonFilePath = `${(0, packageRoot_1.default)()}/frontspec.json`;
        if (!fs_1.default.existsSync(potentialFrontspecJsonFilePath))
            return config;
        const json = yield (0, readJson_1.default)(potentialFrontspecJsonFilePath);
        return (0, deepMerge_1.default)(config, json);
    });
}
exports.prepare = prepare;
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        assets: {
            /**
             * @name      viteClient
             * @namespace     config.frontspec.assets
             * @type      Object
             * @default     vite client script
             *
             * Specify some items you want to integrate to the head tag. It can be everything you want
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            viteClient: {
                src: api.env.env === 'development'
                    ? `
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            var $script = document.createElement("script");
            var ip = "${(0, ipAddress_1.default)()}";
            $script.setAttribute("type", "module");
            $script.setAttribute("src", "[config.vite.server.hostname]/@vite/client");
            document.body.appendChild($script);
          });
        </script>
      `
                    : '',
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE4RDtBQUM5RCxpR0FBMkU7QUFDM0UsNEZBQXNFO0FBQ3RFLDRGQUFzRTtBQUN0RSw0Q0FBc0I7QUFFdEIsU0FBc0IsT0FBTyxDQUFDLE1BQU07O1FBQ2hDLE1BQU0sOEJBQThCLEdBQUcsR0FBRyxJQUFBLHFCQUFhLEdBQUUsaUJBQWlCLENBQUM7UUFDM0UsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUM7WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUNwRSxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsa0JBQVUsRUFBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzlELE9BQU8sSUFBQSxtQkFBVyxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQUE7QUFMRCwwQkFLQztBQUVELG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDeEMsT0FBTztRQUNILE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUU7Z0JBQ1IsR0FBRyxFQUNDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLGFBQWE7b0JBQ3pCLENBQUMsQ0FBQzs7Ozt3QkFJRixJQUFBLG1CQUFXLEdBQUU7Ozs7OztPQU05QjtvQkFDaUIsQ0FBQyxDQUFDLEVBQUU7YUFDZjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFqQ0QsNEJBaUNDIn0=