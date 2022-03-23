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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/node/network/utils/ipAddress", "fs", "@coffeekraken/sugar/node/path/packageRoot", "@coffeekraken/sugar/shared/object/deepMerge", "@coffeekraken/sugar/node/fs/readJson"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.prepare = void 0;
    const ipAddress_1 = __importDefault(require("@coffeekraken/sugar/node/network/utils/ipAddress"));
    const fs_1 = __importDefault(require("fs"));
    const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const readJson_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJson"));
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
    function default_1(env, config) {
        if (env.platform !== 'node')
            return;
        return {
            head: {
                /**
                 * @name      viteClient
                 * @namespace     config.frontspec.head
                 * @type      Object
                 * @default     vite client script
                 *
                 * Specify some items you want to integrate to the head tag. It can be everything you want
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                viteClient: env.env === 'development' ? `
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            var $script = document.createElement("script");
            var ip = "${(0, ipAddress_1.default)()}";
            $script.setAttribute("type", "module");
            $script.setAttribute("src", "[config.vite.server.hostname]/@vite/client");
            document.body.appendChild($script);
          });
        </script>
      ` : '',
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzcGVjLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyb250c3BlYy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsaUdBQTJFO0lBQzNFLDRDQUFzQjtJQUN0Qiw0RkFBc0U7SUFDdEUsNEZBQXNFO0lBQ3RFLG9GQUE4RDtJQUU5RCxTQUFzQixPQUFPLENBQUMsTUFBTTs7WUFDaEMsTUFBTSw4QkFBOEIsR0FBRyxHQUFHLElBQUEscUJBQWEsR0FBRSxpQkFBaUIsQ0FBQztZQUMzRSxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQztnQkFBRSxPQUFPLE1BQU0sQ0FBQztZQUNwRSxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsa0JBQVUsRUFBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQzlELE9BQU8sSUFBQSxtQkFBVyxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDO0tBQUE7SUFMRCwwQkFLQztJQUVELG1CQUF5QixHQUFHLEVBQUUsTUFBTTtRQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUFFLE9BQU87UUFDcEMsT0FBTztZQUNILElBQUksRUFBRTtnQkFDQTs7Ozs7Ozs7OzttQkFVRztnQkFDSCxVQUFVLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDOzs7O3dCQUk5QixJQUFBLG1CQUFXLEdBQUU7Ozs7OztPQU05QixDQUFDLENBQUMsQ0FBQyxFQUFFO2FBQ0g7U0FDSixDQUFDO0lBQ04sQ0FBQztJQTVCRCw0QkE0QkMifQ==