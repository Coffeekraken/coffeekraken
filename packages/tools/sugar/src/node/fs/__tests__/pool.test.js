import __pool from '../pool';
import __SFile from '@coffeekraken/s-file';
import __removeSync from '../removeSync';
describe('sugar.node.fs.pool', () => {
    it('Should correctly start a pool and listen for updates, deletion, etc...', (done) => {
        __removeSync('%tmpDir/poolTests');
        const initialFile = new __SFile(`%tmpDir/poolTests/new.txt`, {
            file: {
                checkExistence: false
            }
        });
        initialFile.writeSync('Hello world');
        const newFile = new __SFile(`%tmpDir/poolTests/coco/other.txt`, {
            file: {
                checkExistence: false
            }
        });
        const pool = __pool('%tmpDir/poolTests/**/*');
        let deletedCount = 0;
        pool.on('unlink', (path) => {
            deletedCount++;
            if (deletedCount === 2)
                done();
        });
        pool.on('add', (file) => {
            setTimeout(() => {
                initialFile.unlinkSync();
                newFile.unlinkSync();
            }, 500);
        });
        pool.on('files', (files) => {
            expect(files.length).toBe(1);
            newFile.writeSync('Hello world');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9vbC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUM3QixPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFFekMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtJQUNsQyxFQUFFLENBQUMsd0VBQXdFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNwRixZQUFZLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVsQyxNQUFNLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQywyQkFBMkIsRUFBRTtZQUMzRCxJQUFJLEVBQUU7Z0JBQ0osY0FBYyxFQUFFLEtBQUs7YUFDdEI7U0FDRixDQUFDLENBQUM7UUFDSCxXQUFXLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXJDLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLGtDQUFrQyxFQUFFO1lBQzlELElBQUksRUFBRTtnQkFDSixjQUFjLEVBQUUsS0FBSzthQUN0QjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBRTlDLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUVyQixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3pCLFlBQVksRUFBRSxDQUFDO1lBQ2YsSUFBSSxZQUFZLEtBQUssQ0FBQztnQkFBRSxJQUFJLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN2QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDVixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==