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
const pool_1 = __importDefault(require("../pool"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const removeSync_1 = __importDefault(require("../removeSync"));
const packageTmpDir_1 = __importDefault(require("../../path/packageTmpDir"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const wait_1 = __importDefault(require("../../../shared/time/wait"));
jest.setTimeout(20000);
describe('sugar.node.fs.pool', () => {
    it('Should correctly start a pool and listen for updates, deletion, etc...', () => {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            yield s_sugar_config_1.default.load();
            const poolTestFolderPath = `${(0, packageTmpDir_1.default)()}/tests/pool`;
            (0, removeSync_1.default)(poolTestFolderPath);
            const initialFile = new s_file_1.default(`${poolTestFolderPath}/initial.txt`, {
                file: {
                    checkExistence: false,
                },
            });
            initialFile.writeSync('Hello world');
            const newFile = new s_file_1.default(`${poolTestFolderPath}/coco/new.txt`, {
                file: {
                    checkExistence: false,
                },
            });
            const pool = (0, pool_1.default)(`${poolTestFolderPath}/**/*`, {
                watch: true,
            });
            let events = {
                ready: false,
                file: false,
                files: false,
                change: false,
                update: false,
                unlink: false,
                add: false,
            };
            pool.on('ready', (path) => __awaiter(void 0, void 0, void 0, function* () {
                events.ready = true;
                // add
                yield newFile.write('hello world');
                yield (0, wait_1.default)(500);
                // update / change
                yield newFile.write('plop');
                yield (0, wait_1.default)(500);
                // unlink
                yield newFile.unlink();
                yield (0, wait_1.default)(500);
                expect(events).toEqual({
                    ready: true,
                    file: true,
                    files: true,
                    change: true,
                    update: true,
                    unlink: true,
                    add: true,
                });
                resolve(true);
            }));
            pool.on('file', (file) => {
                events.file = true;
            });
            pool.on('files', (files) => {
                events.files = true;
            });
            pool.on('change', (file) => {
                events.change = true;
            });
            pool.on('update', (file) => {
                events.update = true;
            });
            pool.on('unlink', (file) => {
                events.unlink = true;
            });
            pool.on('add', (file) => {
                events.add = true;
            });
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsbURBQTZCO0FBQzdCLGtFQUEyQztBQUMzQywrREFBeUM7QUFDekMsNkVBQXVEO0FBQ3ZELGtGQUEwRDtBQUMxRCxxRUFBK0M7QUFFL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUV2QixRQUFRLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO0lBQ2hDLEVBQUUsQ0FBQyx3RUFBd0UsRUFBRSxHQUFHLEVBQUU7UUFDOUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sd0JBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUU1QixNQUFNLGtCQUFrQixHQUFHLEdBQUcsSUFBQSx1QkFBZSxHQUFFLGFBQWEsQ0FBQztZQUU3RCxJQUFBLG9CQUFZLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUVqQyxNQUFNLFdBQVcsR0FBRyxJQUFJLGdCQUFPLENBQzNCLEdBQUcsa0JBQWtCLGNBQWMsRUFDbkM7Z0JBQ0ksSUFBSSxFQUFFO29CQUNGLGNBQWMsRUFBRSxLQUFLO2lCQUN4QjthQUNKLENBQ0osQ0FBQztZQUNGLFdBQVcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFckMsTUFBTSxPQUFPLEdBQUcsSUFBSSxnQkFBTyxDQUFDLEdBQUcsa0JBQWtCLGVBQWUsRUFBRTtnQkFDOUQsSUFBSSxFQUFFO29CQUNGLGNBQWMsRUFBRSxLQUFLO2lCQUN4QjthQUNKLENBQUMsQ0FBQztZQUVILE1BQU0sSUFBSSxHQUFHLElBQUEsY0FBTSxFQUFDLEdBQUcsa0JBQWtCLE9BQU8sRUFBRTtnQkFDOUMsS0FBSyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUM7WUFFSCxJQUFJLE1BQU0sR0FBRztnQkFDVCxLQUFLLEVBQUUsS0FBSztnQkFDWixJ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