var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SFile from '@coffeekraken/s-file';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __wait from '../../../shared/time/wait.js';
import __packageTmpDir from '../../path/packageTmpDir.js';
import __pool from '../pool.js';
import __removeSync from '../removeSync.js';
jest.setTimeout(20000);
describe('sugar.node.fs.pool', () => {
    it('Should correctly start a pool and listen for updates, deletion, etc...', () => {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            yield __SSugarConfig.load();
            const poolTestFolderPath = `${__packageTmpDir()}/tests/pool`;
            __removeSync(poolTestFolderPath);
            const initialFile = new __SFile(`${poolTestFolderPath}/initial.txt`, {
                file: {
                    checkExistence: false,
                },
            });
            initialFile.writeSync('Hello world');
            const newFile = new __SFile(`${poolTestFolderPath}/coco/new.txt`, {
                file: {
                    checkExistence: false,
                },
            });
            const pool = __pool(`${poolTestFolderPath}/**/*`, {
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
                yield __wait(500);
                // update / change
                yield newFile.write('plop');
                yield __wait(500);
                // unlink
                yield newFile.unlink();
                yield __wait(500);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sTUFBTSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xELE9BQU8sZUFBZSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sTUFBTSxNQUFNLFlBQVksQ0FBQztBQUNoQyxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUU1QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXZCLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7SUFDaEMsRUFBRSxDQUFDLHdFQUF3RSxFQUFFLEdBQUcsRUFBRTtRQUM5RSxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7WUFDakMsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFNUIsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLGVBQWUsRUFBRSxhQUFhLENBQUM7WUFFN0QsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFakMsTUFBTSxXQUFXLEdBQUcsSUFBSSxPQUFPLENBQzNCLEdBQUcsa0JBQWtCLGNBQWMsRUFDbkM7Z0JBQ0ksSUFBSSxFQUFFO29CQUNGLGNBQWMsRUFBRSxLQUFLO2lCQUN4QjthQUNKLENBQ0osQ0FBQztZQUNGLFdBQVcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFckMsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxrQkFBa0IsZUFBZSxFQUFFO2dCQUM5RCxJQUFJLEVBQUU7b0JBQ0YsY0FBYyxFQUFFLEtBQUs7aUJBQ3hCO2FBQ0osQ0FBQyxDQUFDO1lBRUgsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsa0JBQWtCLE9B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