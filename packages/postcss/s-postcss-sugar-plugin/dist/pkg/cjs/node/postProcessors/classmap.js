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
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const path_1 = require("@coffeekraken/sugar/path");
const fs_1 = __importDefault(require("fs"));
function default_1({ root, sharedData, settings, cacheDir, applyClassmap, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const duration = new s_duration_1.default();
        const map = applyClassmap(root);
        fs_1.default.writeFileSync(`${(0, path_1.__packageRootDir)()}/classmap.json`, JSON.stringify(map));
        console.log(`<green>[classmap]</green> "<cyan>classmap.json</cyan>" generated <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEVBQW1EO0FBQ25ELG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFFdEIsbUJBQStCLEVBQzNCLElBQUksRUFDSixVQUFVLEVBQ1YsUUFBUSxFQUNSLFFBQVEsRUFDUixhQUFhLEdBQ2hCOztRQUNHLE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1FBRW5DLE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxZQUFJLENBQUMsYUFBYSxDQUNkLEdBQUcsSUFBQSx1QkFBZ0IsR0FBRSxnQkFBZ0IsRUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FDdEIsQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQ1AseUdBQ0ksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixTQUFTLENBQ1osQ0FBQztJQUNOLENBQUM7Q0FBQTtBQW5CRCw0QkFtQkMifQ==