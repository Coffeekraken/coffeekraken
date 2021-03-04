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
const SProcess_1 = __importDefault(require("../process/SProcess"));
const SFindImportmapInterface_1 = __importDefault(require("./interface/SFindImportmapInterface"));
const findImportmap_1 = __importDefault(require("./findImportmap"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const toString_1 = __importDefault(require("../string/toString"));
/**
 * @name            SFindImportmapProcess
 * @namespace       sugar.node.importmap
 * @type            Class
 * @extends         SProcess
 *
 * Simple process to find the importmap files depending on the sugar config
 * or on the config you pass as parameters.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
class SFindImportmapProcess extends SProcess_1.default {
    constructor(initialParams = {}, settings = {}) {
        super(initialParams, settings || {});
    }
    process(params, settings) {
        return new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                value: [
                    `Searching for <yellow>importmap</yellow> files using these parameters:`,
                    `- SFile: <magenta>${toString_1.default(params.SFile)}</magenta>`,
                    `- Directories: \n${params.dirs
                        .map((d) => `   <cyan>${d}</cyan>`)
                        .join('\n')}`,
                    `- Names: \n${params.names
                        .map((d) => `   <magenta>${d}</magenta>\n`)
                        .join('')}`
                ].join('\n')
            });
            const resPromise = findImportmap_1.default(params);
            const res = yield resPromise;
            emit('log', {
                value: [
                    `Finded importmap files:`,
                    res.map((d) => `    <green>${d}</green>`)
                ].join('\n')
            });
            resolve(res);
        }));
    }
}
SFindImportmapProcess.interfaces = {
    params: {
        apply: false,
        class: SFindImportmapInterface_1.default
    }
};
exports.default = SFindImportmapProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbmRJbXBvcnRtYXBQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZpbmRJbXBvcnRtYXBQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUVBQTZDO0FBQzdDLGtHQUE0RTtBQUM1RSxvRUFBOEM7QUFDOUMsbUVBQTZDO0FBQzdDLGtFQUE0QztBQUU1Qzs7Ozs7Ozs7Ozs7R0FXRztBQUVILGFBQWE7QUFDYixNQUFNLHFCQUFzQixTQUFRLGtCQUFVO0lBUTVDLFlBQVksYUFBYSxHQUFHLEVBQUUsRUFBRSxXQUFnQixFQUFFO1FBQ2hELEtBQUssQ0FBQyxhQUFhLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVE7UUFDdEIsT0FBTyxJQUFJLGtCQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN4RCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRTtvQkFDTCx3RUFBd0U7b0JBQ3hFLHFCQUFxQixrQkFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWTtvQkFDekQsb0JBQW9CLE1BQU0sQ0FBQyxJQUFJO3lCQUM1QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7eUJBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDZixjQUFjLE1BQU0sQ0FBQyxLQUFLO3lCQUN2QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUM7eUJBQzFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtpQkFDZCxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDYixDQUFDLENBQUM7WUFFSCxNQUFNLFVBQVUsR0FBRyx1QkFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLE1BQU0sR0FBRyxHQUFPLE1BQU0sVUFBVSxDQUFDO1lBRWpDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFO29CQUNMLHlCQUF5QjtvQkFDekIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztpQkFDMUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2IsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBdENNLGdDQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsaUNBQXlCO0tBQ2pDO0NBQ0YsQ0FBQztBQW9DSixrQkFBZSxxQkFBcUIsQ0FBQyJ9