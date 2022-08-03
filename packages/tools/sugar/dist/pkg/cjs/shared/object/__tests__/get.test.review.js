"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("../get"));
describe('sugar.shared.object.get', () => {
    it('Should get the object property correctly', (done) => {
        const obj1 = {
            hello: {
                world: 'hello world',
            },
            plop: {
                array: [0, 1, 2],
            },
        };
        const val1 = (0, get_1.default)(obj1, 'hello.world');
        const val2 = (0, get_1.default)(obj1, 'plop.array.2');
        expect(val1).toBe('hello world');
        expect(val2).toBe(2);
        done();
    });
    it('Should get the object property under an optional one', (done) => {
        const obj1 = {
            hello: {
                world: 'hello world',
            },
            plop: {
                array: [0, 1, 2],
            },
        };
        const obj2 = {
            hello: {
                coco: {
                    world: 'cc',
                },
                world: 'hello world',
            },
            plop: {
                array: [0, 1, 2],
            },
        };
        const obj3 = {
            hello: {
                world: 'xxx',
                ':coco': {
                    world: 'cc',
                },
            },
            plop: {
                array: [0, 1, 2],
            },
        };
        expect((0, get_1.default)(obj1, 'hello.something?.world')).toBe('hello world');
        expect((0, get_1.default)(obj2, 'hello.coco?.world')).toBe('cc');
        expect((0, get_1.default)(obj3, 'hello.plop?.:coco?.world')).toBe('cc');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQTJCO0FBRTNCLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUU7SUFDckMsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDcEQsTUFBTSxJQUFJLEdBQUc7WUFDVCxLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLGFBQWE7YUFDdkI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbkI7U0FDSixDQUFDO1FBRUYsTUFBTSxJQUFJLEdBQUcsSUFBQSxhQUFLLEVBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sSUFBSSxHQUFHLElBQUEsYUFBSyxFQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUV6QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckIsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzREFBc0QsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2hFLE1BQU0sSUFBSSxHQUFHO1lBQ1QsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxhQUFhO2FBQ3ZCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ25CO1NBQ0osQ0FBQztRQUNGLE1BQU0sSUFBSSxHQUFHO1lBQ1QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsSUFBSTtpQkFDZDtnQkFDRCxLQUFLLEVBQUUsYUFBYTthQUN2QjtZQUNELElBQUksRUFBRTtnQkFDRixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNuQjtTQUNKLENBQUM7UUFFRixNQUFNLElBQUksR0FBRztZQUNULEtBQUssRUFBRTtnQkFDSCxLQUFLLEVBQUUsS0FBSztnQkFDWixPQUFPLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLElBQUk7aUJBQ2Q7YUFDSjtZQUNELElBQUksRUFBRTtnQkFDRixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNuQjtTQUNKLENBQUM7UUFFRixNQUFNLENBQUMsSUFBQSxhQUFLLEVBQUMsSUFBSSxFQUFFLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEUsTUFBTSxDQUFDLElBQUEsYUFBSyxFQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxJQUFBLGFBQUssRUFBQyxJQUFJLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzRCxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==