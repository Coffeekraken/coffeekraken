"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = __importDefault(require("../pool"));
const SFile_1 = __importDefault(require("../SFile"));
const removeSync_1 = __importDefault(require("../removeSync"));
describe('sugar.node.fs.pool', () => {
    it('Should correctly start a pool and listen for updates, deletion, etc...', (done) => {
        removeSync_1.default('%tmpDir/poolTests');
        const initialFile = new SFile_1.default(`%tmpDir/poolTests/new.txt`, {
            file: {
                checkExistence: false
            }
        });
        initialFile.writeSync('Hello world');
        const newFile = new SFile_1.default(`%tmpDir/poolTests/coco/other.txt`, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9vbC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsbURBQTZCO0FBQzdCLHFEQUErQjtBQUMvQiwrREFBeUM7QUFFekMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtJQUNsQyxFQUFFLENBQUMsd0VBQXdFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNwRixvQkFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFbEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxlQUFPLENBQUMsMkJBQTJCLEVBQUU7WUFDM0QsSUFBSSxFQUFFO2dCQUNKLGNBQWMsRUFBRSxLQUFLO2FBQ3RCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVyQyxNQUFNLE9BQU8sR0FBRyxJQUFJLGVBQU8sQ0FBQyxrQ0FBa0MsRUFBRTtZQUM5RCxJQUFJLEVBQUU7Z0JBQ0osY0FBYyxFQUFFLEtBQUs7YUFDdEI7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLElBQUksR0FBRyxjQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUU5QyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7UUFFckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN6QixZQUFZLEVBQUUsQ0FBQztZQUNmLElBQUksWUFBWSxLQUFLLENBQUM7Z0JBQUUsSUFBSSxFQUFFLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN6QixPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDdkIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=