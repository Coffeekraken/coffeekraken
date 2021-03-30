"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../../shared/config/sugar"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
function tsconfigJson(stackOrPath, settings) {
    const set = Object.assign({ clean: true }, (settings !== null && settings !== void 0 ? settings : {}));
    let json;
    // stacks
    const stacks = sugar_1.default('ts.stacks');
    if (stacks[stackOrPath]) {
        if (!fs_1.default.existsSync(stacks[stackOrPath]))
            throw new Error(`<red>[sugar.node.ts.tsconfigJson]</red> Sorry but the requested stacks "<yellow>${stackOrPath}</yellow>" point to a file "<cyan>${stacks[stackOrPath]}</cyan>" that does not exists...`);
        json = require(stacks[stackOrPath]);
    }
    // check path directly
    const potentialPath = path_1.default.resolve(packageRoot_1.default(), stackOrPath);
    if (!json && fs_1.default.existsSync(potentialPath)) {
        json = require(potentialPath);
    }
    // mono repo
    const potentialTopPath = path_1.default.resolve(packageRoot_1.default(process.cwd(), true), stackOrPath);
    if (!json && potentialTopPath !== potentialPath) {
        if (fs_1.default.existsSync(potentialTopPath)) {
            json = require(potentialTopPath);
        }
    }
    if (set.clean && json) {
        Object.keys(json).forEach((prop) => {
            if (prop.match(/^_/))
                delete json[prop];
        });
    }
    return json;
}
exports.default = tsconfigJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNjb25maWdKc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHNjb25maWdKc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0VBQXNEO0FBQ3RELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsc0VBQWdEO0FBMkJoRCxTQUF3QixZQUFZLENBQ2xDLFdBQW1CLEVBQ25CLFFBQXdDO0lBRXhDLE1BQU0sR0FBRyxHQUFHLGdCQUNWLEtBQUssRUFBRSxJQUFJLElBQ1IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLElBQUksSUFBSSxDQUFDO0lBRVQsU0FBUztJQUNULE1BQU0sTUFBTSxHQUFHLGVBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUN2QixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FDYixtRkFBbUYsV0FBVyxxQ0FBcUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQ0FBa0MsQ0FDekwsQ0FBQztRQUNKLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDckM7SUFFRCxzQkFBc0I7SUFDdEIsTUFBTSxhQUFhLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FBQyxxQkFBYSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDbkUsSUFBSSxDQUFDLElBQUksSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQzNDLElBQUksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDL0I7SUFFRCxZQUFZO0lBQ1osTUFBTSxnQkFBZ0IsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUNyQyxxQkFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFDbEMsV0FBVyxDQUNaLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxJQUFJLGdCQUFnQixLQUFLLGFBQWEsRUFBRTtRQUMvQyxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUNyQyxJQUFJLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDbEM7S0FDRjtJQUVELElBQUksR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNqQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUE3Q0QsK0JBNkNDIn0=