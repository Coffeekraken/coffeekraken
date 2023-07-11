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
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const wait_js_1 = __importDefault(require("../../../shared/time/wait.js"));
const packageTmpDir_js_1 = __importDefault(require("../../path/packageTmpDir.js"));
const pool_js_1 = __importDefault(require("../pool.js"));
const removeSync_js_1 = __importDefault(require("../removeSync.js"));
jest.setTimeout(20000);
describe('sugar.node.fs.pool', () => {
    it('Should correctly start a pool and listen for updates, deletion, etc...', () => {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            yield s_sugar_config_1.default.load();
            const poolTestFolderPath = `${(0, packageTmpDir_js_1.default)()}/tests/pool`;
            (0, removeSync_js_1.default)(poolTestFolderPath);
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
            const pool = (0, pool_js_1.default)(`${poolTestFolderPath}/**/*`, {
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
                yield (0, wait_js_1.default)(500);
                // update / change
                yield newFile.write('plop');
                yield (0, wait_js_1.default)(500);
                // unlink
                yield newFile.unlink();
                yield (0, wait_js_1.default)(500);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLGtGQUEwRDtBQUMxRCwyRUFBa0Q7QUFDbEQsbUZBQTBEO0FBQzFELHlEQUFnQztBQUNoQyxxRUFBNEM7QUFFNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUV2QixRQUFRLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO0lBQ2hDLEVBQUUsQ0FBQyx3RUFBd0UsRUFBRSxHQUFHLEVBQUU7UUFDOUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sd0JBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUU1QixNQUFNLGtCQUFrQixHQUFHLEdBQUcsSUFBQSwwQkFBZSxHQUFFLGFBQWEsQ0FBQztZQUU3RCxJQUFBLHVCQUFZLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUVqQyxNQUFNLFdBQVcsR0FBRyxJQUFJLGdCQUFPLENBQzNCLEdBQUcsa0JBQWtCLGNBQWMsRUFDbkM7Z0JBQ0ksSUFBSSxFQUFFO29CQUNGLGNBQWMsRUFBRSxLQUFLO2lCQUN4QjthQUNKLENBQ0osQ0FBQztZQUNGLFdBQVcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFckMsTUFBTSxPQUFPLEdBQUcsSUFBSSxnQkFBTyxDQUFDLEdBQUcsa0JBQWtCLGVBQWUsRUFBRTtnQkFDOUQsSUFBSSxFQUFFO29CQUNGLGNBQWMsRUFBRSxLQUFLO2lCQUN4QjthQUNKLENBQUMsQ0FBQztZQUVILE1BQU0sSUFBSSxHQUFHLElBQUEsaUJBQU0sRUFBQyxHQUFHLGtCQUFrQixPQUFPLEVBQUU7Z0JBQzlDLEtBQUssRUFBRSxJQUFJO2FBQ2QsQ0FBQyxDQUFDO1lBRUgsSUFBSSxNQUFNLEdBQUc7Z0JBQ1QsS0FBSyxFQUFFLEtBQUs7Z0JBQ1os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