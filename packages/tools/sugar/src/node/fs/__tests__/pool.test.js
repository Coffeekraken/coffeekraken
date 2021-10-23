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
    it('Should correctly start a pool and listen for updates, deletion, etc...', (done) => __awaiter(void 0, void 0, void 0, function* () {
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
            yield __wait(100);
            // update / change
            yield newFile.write('plop');
            yield __wait(100);
            // unlink
            yield newFile.unlink();
            yield __wait(100);
            expect(events).toEqual({
                ready: true,
                file: true,
                files: true,
                change: true,
                update: true,
                unlink: true,
                add: true,
            });
            done();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9vbC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUM3QixPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxlQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxNQUFNLE1BQU0sMkJBQTJCLENBQUM7QUFFL0MsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtJQUNoQyxFQUFFLENBQUMsd0VBQXdFLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUN4RixNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1QixNQUFNLGtCQUFrQixHQUFHLEdBQUcsZUFBZSxFQUFFLGFBQWEsQ0FBQztRQUU3RCxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVqQyxNQUFNLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLGtCQUFrQixjQUFjLEVBQUU7WUFDakUsSUFBSSxFQUFFO2dCQUNGLGNBQWMsRUFBRSxLQUFLO2FBQ3hCO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVyQyxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLGtCQUFrQixlQUFlLEVBQUU7WUFDOUQsSUFBSSxFQUFFO2dCQUNGLGNBQWMsRUFBRSxLQUFLO2FBQ3hCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsa0JBQWtCLE9BQU8sRUFBRTtZQUM5QyxLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQztRQUVILElBQUksTUFBTSxHQUFHO1lBQ1QsS0FBSyxFQUFFLEtBQUs7WUFDWixJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxLQUFLO1lBQ1osTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUsS0FBSztZQUNiLE1BQU0sRUFBRSxLQUFLO1lBQ2IsR0FBRyxFQUFFLEtBQUs7U0FDYixDQUFDO1FBRUYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtZQUM1QixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUVwQixNQUFNO1lBQ04sTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRW5DLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWxCLGtCQUFrQjtZQUNsQixNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFNUIsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbEIsU0FBUztZQUNULE1BQU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXZCLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWxCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ25CLEtBQUssRUFBRSxJQUFJO2dCQUNYLElBQUksRUFBRSxJQUFJO2dCQUNWLEtBQUssRUFBRSxJQUFJO2dCQUNYLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sRUFBRSxJQUFJO2dCQUNaLEdBQUcsRUFBRSxJQUFJO2FBQ1osQ0FBQyxDQUFDO1lBRUgsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNyQixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdkIsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3ZCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN2QixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdkIsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3BCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=