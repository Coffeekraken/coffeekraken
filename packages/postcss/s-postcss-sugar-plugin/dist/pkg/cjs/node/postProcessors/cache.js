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
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
function default_1({ root, sharedData, settings, cacheDir }) {
    return __awaiter(this, void 0, void 0, function* () {
        const duration = new s_duration_1.default();
        const css = root.toString();
        const cacheMatches = [
            ...css.matchAll(/\/\*\!\sSCACHE:([a-zA-Z0-9_=-]+)\s\*\/([\s\S]*)\/\*\!\sSENDCACHE:[a-zA-Z0-9_=-]+\s\*\//g),
        ];
        cacheMatches.forEach((match) => {
            const cacheId = match[1], cacheContent = match[2], humanId = cacheId.split('=')[3];
            console.log(`<yellow>[cache]</yellow> Saving cache "<cyan>${humanId !== null && humanId !== void 0 ? humanId : cacheId}</cyan>"`);
            (0, writeFileSync_1.default)(`${cacheDir}/${cacheId}.css`, cacheContent);
        });
        if (cacheMatches.length) {
            console.log(`<green>[cache]</green> Cache generated <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEVBQW1EO0FBQ25ELDhGQUF3RTtBQUV4RSxtQkFBK0IsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7O1FBQ25FLE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1FBRW5DLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU1QixNQUFNLFlBQVksR0FBRztZQUNqQixHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQ1gseUZBQXlGLENBQzVGO1NBQ0osQ0FBQztRQUVGLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMzQixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ3BCLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ3ZCLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBDLE9BQU8sQ0FBQyxHQUFHLENBQ1AsZ0RBQ0ksT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksT0FDZixVQUFVLENBQ2IsQ0FBQztZQUVGLElBQUEsdUJBQWUsRUFBQyxHQUFHLFFBQVEsSUFBSSxPQUFPLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUNQLCtFQUNJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFDbkIsU0FBUyxDQUNaLENBQUM7U0FDTDtJQUNMLENBQUM7Q0FBQTtBQWhDRCw0QkFnQ0MifQ==