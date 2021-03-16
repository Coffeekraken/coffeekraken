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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvZnMvX190ZXN0c19fL3Bvb2wudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLG1EQUE2QjtBQUM3QixxREFBK0I7QUFDL0IsK0RBQXlDO0FBRXpDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7SUFDbEMsRUFBRSxDQUFDLHdFQUF3RSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDcEYsb0JBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRWxDLE1BQU0sV0FBVyxHQUFHLElBQUksZUFBTyxDQUFDLDJCQUEyQixFQUFFO1lBQzNELElBQUksRUFBRTtnQkFDSixjQUFjLEVBQUUsS0FBSzthQUN0QjtTQUNGLENBQUMsQ0FBQztRQUNILFdBQVcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFckMsTUFBTSxPQUFPLEdBQUcsSUFBSSxlQUFPLENBQUMsa0NBQWtDLEVBQUU7WUFDOUQsSUFBSSxFQUFFO2dCQUNKLGNBQWMsRUFBRSxLQUFLO2FBQ3RCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxJQUFJLEdBQUcsY0FBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFFOUMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDekIsWUFBWSxFQUFFLENBQUM7WUFDZixJQUFJLFlBQVksS0FBSyxDQUFDO2dCQUFFLElBQUksRUFBRSxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN0QixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDekIsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9