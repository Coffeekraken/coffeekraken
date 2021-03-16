"use strict";
// @ts-nocheck
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
const SActionsStreamAction_1 = __importDefault(require("../../../stream/SActionsStreamAction"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const SBuildFrontspecInterface_1 = __importDefault(require("../interface/SBuildFrontspecInterface"));
const SFrontspec_1 = __importDefault(require("../../SFrontspec"));
const packageRoot_1 = __importDefault(require("../../../path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * @name                SBuildFrontspecStreamAction
 * @namespace           sugar.node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 * @status              wip
 *
 * This function is responsible of rendering the sass string in the "data" property
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBuildFrontspecStreamAction extends SActionsStreamAction_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(deepMerge_1.default({
            name: 'Build Frontspec',
            id: 'SBuildFrontspecStreamAction'
        }, settings));
    }
    /**
     * @name          run
     * @type          Function
     * @async
     *
     * Override the base class run method
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    run(streamObj, settings) {
        return super.run(streamObj, ({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            // compile using the SScssCompiler class
            if (!streamObj.outputStack)
                streamObj.outputStack = {};
            const frontspec = new SFrontspec_1.default({
                filename: streamObj.filename,
                outputDir: streamObj.outputDir,
                dirDepth: streamObj.dirDepth,
                cache: streamObj.cache
            });
            const promise = frontspec.json();
            promise.catch((e) => {
                reject(e);
            });
            const json = yield promise;
            // set in the package.json the "frontspec" property
            const packageJsonPath = `${packageRoot_1.default()}/package.json`;
            if (fs_1.default.existsSync(packageJsonPath)) {
                const json = JSON.parse(fs_1.default.readFileSync(packageJsonPath, 'utf8'));
                json.frontspec = path_1.default.relative(packageRoot_1.default(), `${streamObj.outputDir}/${streamObj.filename}`);
                fs_1.default.writeFileSync(packageJsonPath, JSON.stringify(json, null, 4));
            }
            // set in output stack
            streamObj.data = json;
            streamObj.outputStack.data = `${streamObj.outputDir}/${streamObj.filename}`;
            resolve(streamObj);
        }));
    }
}
exports.default = SBuildFrontspecStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SBuildFrontspecStreamAction.interfaces = {
    this: SBuildFrontspecInterface_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRnJvbnRzcGVjU3RyZWFtQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvZnJvbnRzcGVjL2J1aWxkL2FjdGlvbnMvU0J1aWxkRnJvbnRzcGVjU3RyZWFtQWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLGdHQUEwRTtBQUMxRSwwRUFBb0Q7QUFDcEQscUdBQStFO0FBQy9FLGtFQUE0QztBQUM1Qyw0RUFBc0Q7QUFDdEQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUUxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBcUIsMkJBQTRCLFNBQVEsOEJBQXNCO0lBYzdFOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsRUFBRSxFQUFFLDZCQUE2QjtTQUNsQyxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVE7UUFDckIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzlELHdDQUF3QztZQUV4QyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVc7Z0JBQUUsU0FBUyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFdkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxvQkFBWSxDQUFDO2dCQUNqQyxRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVE7Z0JBQzVCLFNBQVMsRUFBRSxTQUFTLENBQUMsU0FBUztnQkFDOUIsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRO2dCQUM1QixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7YUFDdkIsQ0FBQyxDQUFDO1lBRUgsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDbEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLElBQUksR0FBRyxNQUFNLE9BQU8sQ0FBQztZQUUzQixtREFBbUQ7WUFDbkQsTUFBTSxlQUFlLEdBQUcsR0FBRyxxQkFBYSxFQUFFLGVBQWUsQ0FBQztZQUMxRCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ3BDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFNLENBQUMsUUFBUSxDQUM5QixxQkFBYSxFQUFFLEVBQ2YsR0FBRyxTQUFTLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FDL0MsQ0FBQztnQkFDRixZQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwRTtZQUVELHNCQUFzQjtZQUN0QixTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUN0QixTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRTVFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFoRkgsOENBaUZDO0FBaEZDOzs7Ozs7OztHQVFHO0FBQ0ksc0NBQVUsR0FBRztJQUNsQixJQUFJLEVBQUUsa0NBQTBCO0NBQ2pDLENBQUMifQ==