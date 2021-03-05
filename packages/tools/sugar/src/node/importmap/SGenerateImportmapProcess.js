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
const SGenerateImportmapInterface_1 = __importDefault(require("./interface/SGenerateImportmapInterface"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const toString_1 = __importDefault(require("../string/toString"));
/**
 * @name            SGenerateImportmapProcess
 * @namespace       sugar.node.importmap
 * @type            Class
 * @extends         SProcess
 *
 * Simple process to generate the importmap files depending on the sugar config
 * or on the config you pass as parameters.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
class SGenerateImportmapProcess extends SProcess_1.default {
    constructor(initialParams = {}, settings = {}) {
        super(initialParams, settings || {});
    }
    process(params, settings) {
        return new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                value: [
                    `Generating the <yellow>importmap</yellow> file using these parameters:`,
                    `- SFile: <magenta>${toString_1.default(params.SFile)}</magenta>`
                ].join('\n')
            });
            resolve(true);
        }));
    }
}
SGenerateImportmapProcess.interfaces = {
    params: {
        class: SGenerateImportmapInterface_1.default
    }
};
exports.default = SGenerateImportmapProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dlbmVyYXRlSW1wb3J0bWFwUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNHZW5lcmF0ZUltcG9ydG1hcFByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtRUFBNkM7QUFDN0MsMEdBQW9GO0FBQ3BGLG1FQUE2QztBQUM3QyxrRUFBNEM7QUFFNUM7Ozs7Ozs7Ozs7O0dBV0c7QUFFSCxhQUFhO0FBQ2IsTUFBTSx5QkFBMEIsU0FBUSxrQkFBVTtJQU9oRCxZQUFZLGFBQWEsR0FBRyxFQUFFLEVBQUUsV0FBZ0IsRUFBRTtRQUNoRCxLQUFLLENBQUMsYUFBYSxFQUFFLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ3RCLE9BQU8sSUFBSSxrQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDeEQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQUU7b0JBQ0wsd0VBQXdFO29CQUN4RSxxQkFBcUIsa0JBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVk7aUJBQzFELENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNiLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFyQk0sb0NBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUscUNBQTZCO0tBQ3JDO0NBQ0YsQ0FBQztBQW9CSixrQkFBZSx5QkFBeUIsQ0FBQyJ9