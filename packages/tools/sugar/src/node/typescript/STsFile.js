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
const SFile_1 = __importDefault(require("../fs/SFile"));
const SDuration_1 = __importDefault(require("../time/SDuration"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const wait_1 = __importDefault(require("../time/wait"));
const filename_1 = __importDefault(require("../fs/filename"));
const STsCompiler_1 = __importDefault(require("./compile/STsCompiler"));
const STsFileInterface_1 = __importDefault(require("./interface/STsFileInterface"));
// @ts-ignore
class STsFile extends SFile_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(path, settings = {}) {
        super(path, deepMerge_1.default({
            id: filename_1.default(path),
            tsFile: {}
        }, settings));
    }
    /**
     * @name      tsFileSettings
     * @type      ISTsFileSettings
     * @get
     *
     * Access the tsFile settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get tsFileSettings() {
        return this._settings.tsFile;
    }
    /**
     * @name              compile
     * @type              Function
     *
     * Simply compile the file using the settings that you can pass as argument
     *
     * @param         {ISTsFileCompileSettings}         [settings={}]           Some settings to configure your compilation process
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    compile(params, settings) {
        settings = deepMerge_1.default(this.tsFileSettings, settings);
        // init the promise
        return new SPromise_1.default(({ resolve, reject, emit, pipeFrom, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
            pipeTo(this);
            emit('log', {
                type: 'separator'
            });
            // notify start
            emit('log', {
                value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
            });
            const duration = new SDuration_1.default();
            yield wait_1.default(0);
            try {
                emit('log', {
                    value: `<yellow>[compiling]</yellow> file "<cyan>${this.relPath}</cyan>"`
                });
                const compiler = new STsCompiler_1.default();
                pipeFrom(compiler);
                const res = yield compiler.compile(Object.assign({}, params), this.tsFileSettings.compile || {});
                return resolve(res);
            }
            catch (e) {
                return reject(e.toString());
            }
            return true;
        }));
    }
}
STsFile.interfaces = {
    this: {
        apply: true,
        class: STsFileInterface_1.default
    }
};
exports.default = STsFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNUc0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBa0M7QUFFbEMsa0VBQTRDO0FBRTVDLG1FQUE2QztBQUM3QyxvRUFBOEM7QUFJOUMsd0RBQWtDO0FBQ2xDLDhEQUEyQztBQUMzQyx3RUFBa0Q7QUFHbEQsb0ZBQThEO0FBdUM5RCxhQUFhO0FBQ2IsTUFBTSxPQUFRLFNBQVEsZUFBTztJQXNCM0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFZLEVBQUUsV0FBaUMsRUFBRTtRQUMzRCxLQUFLLENBQ0gsSUFBSSxFQUNKLG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsa0JBQWEsQ0FBQyxJQUFJLENBQUM7WUFDdkIsTUFBTSxFQUFFLEVBQUU7U0FDWCxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7SUFDSixDQUFDO0lBbkNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksY0FBYztRQUNoQixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsTUFBTSxDQUFDO0lBQ3RDLENBQUM7SUF5QkQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sQ0FDTCxNQUFtQyxFQUNuQyxRQUFvQztRQUVwQyxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXRELG1CQUFtQjtRQUNuQixPQUFPLElBQUksa0JBQVUsQ0FDbkIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUN4RCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFYixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLElBQUksRUFBRSxXQUFXO2FBQ2xCLENBQUMsQ0FBQztZQUVILGVBQWU7WUFDZixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSw0Q0FBNEMsSUFBSSxDQUFDLE9BQU8sc0JBQXNCO2FBQ3RGLENBQUMsQ0FBQztZQUVILE1BQU0sUUFBUSxHQUFHLElBQUksbUJBQVcsRUFBRSxDQUFDO1lBRW5DLE1BQU0sY0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWhCLElBQUk7Z0JBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEVBQUUsNENBQTRDLElBQUksQ0FBQyxPQUFPLFVBQVU7aUJBQzFFLENBQUMsQ0FBQztnQkFFSCxNQUFNLFFBQVEsR0FBRyxJQUFJLHFCQUFhLEVBQUUsQ0FBQztnQkFDckMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVuQixNQUFNLEdBQUcsR0FBRyxNQUFNLFFBQVEsQ0FBQyxPQUFPLG1CQUUzQixNQUFNLEdBRVgsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUNsQyxDQUFDO2dCQUVGLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3JCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDN0I7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQSxDQUNGLENBQUM7SUFDSixDQUFDOztBQXRHTSxrQkFBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxJQUFJO1FBQ1gsS0FBSyxFQUFFLDBCQUFrQjtLQUMxQjtDQUNGLENBQUM7QUFvR0osa0JBQWUsT0FBTyxDQUFDIn0=