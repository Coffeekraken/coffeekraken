var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __pool from '../pool';
import __SFile from '@coffeekraken/s-file';
import __removeSync from '../removeSync';
import __packageTmpDir from '../../path/packageTmpDir';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __wait from '../../../shared/time/wait';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9vbC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUM3QixPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxlQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxNQUFNLE1BQU0sMkJBQTJCLENBQUM7QUFFL0MsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtJQUNoQyxFQUFFLENBQUMsd0VBQXdFLEVBQUUsR0FBRyxFQUFFO1FBQzlFLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtZQUNqQyxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUU1QixNQUFNLGtCQUFrQixHQUFHLEdBQUcsZUFBZSxFQUFFLGFBQWEsQ0FBQztZQUU3RCxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUVqQyxNQUFNLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FDM0IsR0FBRyxrQkFBa0IsY0FBYyxFQUNuQztnQkFDSSxJQUFJLEVBQUU7b0JBQ0YsY0FBYyxFQUFFLEtBQUs7aUJBQ3hCO2FBQ0osQ0FDSixDQUFDO1lBQ0YsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUVyQyxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLGtCQUFrQixlQUFlLEVBQUU7Z0JBQzlELElBQUksRUFBRTtvQkFDRixjQUFjLEVBQUUsS0FBSztpQkFDeEI7YUFDSixDQUFDLENBQUM7WUFFSCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxrQkFBa0IsT0FBTyxFQUFFO2dCQUM5QyxLQUFLLEVBQUUsSUFBSTthQUNkLENB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