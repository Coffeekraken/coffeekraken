"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = __importDefault(require("../pool"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const removeSync_1 = __importDefault(require("../removeSync"));
describe('sugar.node.fs.pool', () => {
    it('Should correctly start a pool and listen for updates, deletion, etc...', (done) => {
        removeSync_1.default('%tmpDir/poolTests');
        const initialFile = new s_file_1.default(`%tmpDir/poolTests/new.txt`, {
            file: {
                checkExistence: false
            }
        });
        initialFile.writeSync('Hello world');
        const newFile = new s_file_1.default(`%tmpDir/poolTests/coco/other.txt`, {
            file: {
                checkExistence: false
            }
        });
        const pool = pool_1.default('%tmpDir/poolTests/**/*');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9vbC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsbURBQTZCO0FBQzdCLGtFQUEyQztBQUMzQywrREFBeUM7QUFFekMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtJQUNsQyxFQUFFLENBQUMsd0VBQXdFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNwRixvQkFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFbEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxnQkFBTyxDQUFDLDJCQUEyQixFQUFFO1lBQzNELElBQUksRUFBRTtnQkFDSixjQUFjLEVBQUUsS0FBSzthQUN0QjtTQUNGLENBQUMsQ0FBQztRQUNILFdBQVcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFckMsTUFBTSxPQUFPLEdBQUcsSUFBSSxnQkFBTyxDQUFDLGtDQUFrQyxFQUFFO1lBQzlELElBQUksRUFBRTtnQkFDSixjQUFjLEVBQUUsS0FBSzthQUN0QjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxHQUFHLGNBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBRTlDLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUVyQixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3pCLFlBQVksRUFBRSxDQUFDO1lBQ2YsSUFBSSxZQUFZLEtBQUssQ0FBQztnQkFBRSxJQUFJLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN2QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDVixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==