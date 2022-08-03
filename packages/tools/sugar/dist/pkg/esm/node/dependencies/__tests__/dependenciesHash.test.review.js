var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __dirname from '../../fs/dirname';
import __dependenciesHash from '../dependenciesHash';
describe('sugar.node.dependencies.dependenciesHash', () => {
    it('Should generate the same dependency hash for the same dependencies object', () => __awaiter(void 0, void 0, void 0, function* () {
        const hash1 = yield __dependenciesHash({
            data: {
                something: 'cool',
                another: 'hello',
            },
        });
        const hash2 = yield __dependenciesHash({
            data: {
                something: 'cool',
                another: 'hello',
            },
        });
        expect(hash1).toBe(hash2);
    }));
    it('Should generate the same dependency hash for the same dependencies object without recursiveness', () => __awaiter(void 0, void 0, void 0, function* () {
        const hash1 = yield __dependenciesHash({
            files: [`${__dirname()}/data/image1.png`],
            data: {
                something: 'cool',
                another: 'hello',
            },
        });
        const hash2 = yield __dependenciesHash({
            files: [`${__dirname()}/data/image1.png`],
            data: {
                something: 'cool',
                another: 'hello',
            },
        });
        expect(hash1).toBe(hash2);
    }));
    it('Should generate the same dependency hash for the same dependencies object with recursiveness', () => __awaiter(void 0, void 0, void 0, function* () {
        const hash1 = yield __dependenciesHash({
            files: [
                `${__dirname()}/data/image1.png`,
                `${__dirname()}/data/testIndex.js`,
            ],
            data: {
                something: 'cool',
                another: 'hello',
            },
        });
        const hash2 = yield __dependenciesHash({
            files: [
                `${__dirname()}/data/image1.png`,
                `${__dirname()}/data/testIndex.js`,
            ],
            data: {
                something: 'cool',
                another: 'hello',
            },
        });
        expect(hash1).toBe(hash2);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLGtCQUFrQixDQUFDO0FBQ3pDLE9BQU8sa0JBQWtCLE1BQU0scUJBQXFCLENBQUM7QUFFckQsUUFBUSxDQUFDLDBDQUEwQyxFQUFFLEdBQUcsRUFBRTtJQUN0RCxFQUFFLENBQUMsMkVBQTJFLEVBQUUsR0FBUyxFQUFFO1FBQ3ZGLE1BQU0sS0FBSyxHQUFHLE1BQU0sa0JBQWtCLENBQUM7WUFDbkMsSUFBSSxFQUFFO2dCQUNGLFNBQVMsRUFBRSxNQUFNO2dCQUNqQixPQUFPLEVBQUUsT0FBTzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQUNILE1BQU0sS0FBSyxHQUFHLE1BQU0sa0JBQWtCLENBQUM7WUFDbkMsSUFBSSxFQUFFO2dCQUNGLFNBQVMsRUFBRSxNQUFNO2dCQUNqQixPQUFPLEVBQUUsT0FBTzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxpR0FBaUcsRUFBRSxHQUFTLEVBQUU7UUFDN0csTUFBTSxLQUFLLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQztZQUNuQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQztZQUN6QyxJQUFJLEVBQUU7Z0JBQ0YsU0FBUyxFQUFFLE1BQU07Z0JBQ2pCLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsTUFBTSxLQUFLLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQztZQUNuQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQztZQUN6QyxJQUFJLEVBQUU7Z0JBQ0YsU0FBUyxFQUFFLE1BQU07Z0JBQ2pCLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDhGQUE4RixFQUFFLEdBQVMsRUFBRTtRQUMxRyxNQUFNLEtBQUssR0FBRyxNQUFNLGtCQUFrQixDQUFDO1lBQ25DLEtBQUssRUFBRTtnQkFDSCxHQUFHLFNBQVMsRUFBRSxrQkFBa0I7Z0JBQ2hDLEdBQUcsU0FBUyxFQUFFLG9CQUFvQjthQUNyQztZQUNELElBQUksRUFBRTtnQkFDRixTQUFTLEVBQUUsTUFBTTtnQkFDakIsT0FBTyxFQUFFLE9BQU87YUFDbkI7U0FDSixDQUFDLENBQUM7UUFDSCxNQUFNLEtBQUssR0FBRyxNQUFNLGtCQUFrQixDQUFDO1lBQ25DLEtBQUssRUFBRTtnQkFDSCxHQUFHLFNBQVMsRUFBRSxrQkFBa0I7Z0JBQ2hDLEdBQUcsU0FBUyxFQUFFLG9CQUFvQjthQUNyQztZQUNELElBQUksRUFBRTtnQkFDRixTQUFTLEVBQUUsTUFBTTtnQkFDakIsT0FBTyxFQUFFLE9BQU87YUFDbkI7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9