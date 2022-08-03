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
const dirname_1 = __importDefault(require("../../fs/dirname"));
const dependenciesHash_1 = __importDefault(require("../dependenciesHash"));
describe('sugar.node.dependencies.dependenciesHash', () => {
    it('Should generate the same dependency hash for the same dependencies object', () => __awaiter(void 0, void 0, void 0, function* () {
        const hash1 = yield (0, dependenciesHash_1.default)({
            data: {
                something: 'cool',
                another: 'hello',
            },
        });
        const hash2 = yield (0, dependenciesHash_1.default)({
            data: {
                something: 'cool',
                another: 'hello',
            },
        });
        expect(hash1).toBe(hash2);
    }));
    it('Should generate the same dependency hash for the same dependencies object without recursiveness', () => __awaiter(void 0, void 0, void 0, function* () {
        const hash1 = yield (0, dependenciesHash_1.default)({
            files: [`${(0, dirname_1.default)()}/data/image1.png`],
            data: {
                something: 'cool',
                another: 'hello',
            },
        });
        const hash2 = yield (0, dependenciesHash_1.default)({
            files: [`${(0, dirname_1.default)()}/data/image1.png`],
            data: {
                something: 'cool',
                another: 'hello',
            },
        });
        expect(hash1).toBe(hash2);
    }));
    it('Should generate the same dependency hash for the same dependencies object with recursiveness', () => __awaiter(void 0, void 0, void 0, function* () {
        const hash1 = yield (0, dependenciesHash_1.default)({
            files: [
                `${(0, dirname_1.default)()}/data/image1.png`,
                `${(0, dirname_1.default)()}/data/testIndex.js`,
            ],
            data: {
                something: 'cool',
                another: 'hello',
            },
        });
        const hash2 = yield (0, dependenciesHash_1.default)({
            files: [
                `${(0, dirname_1.default)()}/data/image1.png`,
                `${(0, dirname_1.default)()}/data/testIndex.js`,
            ],
            data: {
                something: 'cool',
                another: 'hello',
            },
        });
        expect(hash1).toBe(hash2);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQXlDO0FBQ3pDLDJFQUFxRDtBQUVyRCxRQUFRLENBQUMsMENBQTBDLEVBQUUsR0FBRyxFQUFFO0lBQ3RELEVBQUUsQ0FBQywyRUFBMkUsRUFBRSxHQUFTLEVBQUU7UUFDdkYsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFBLDBCQUFrQixFQUFDO1lBQ25DLElBQUksRUFBRTtnQkFDRixTQUFTLEVBQUUsTUFBTTtnQkFDakIsT0FBTyxFQUFFLE9BQU87YUFDbkI7U0FDSixDQUFDLENBQUM7UUFDSCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUEsMEJBQWtCLEVBQUM7WUFDbkMsSUFBSSxFQUFFO2dCQUNGLFNBQVMsRUFBRSxNQUFNO2dCQUNqQixPQUFPLEVBQUUsT0FBTzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxpR0FBaUcsRUFBRSxHQUFTLEVBQUU7UUFDN0csTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFBLDBCQUFrQixFQUFDO1lBQ25DLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBQSxpQkFBUyxHQUFFLGtCQUFrQixDQUFDO1lBQ3pDLElBQUksRUFBRTtnQkFDRixTQUFTLEVBQUUsTUFBTTtnQkFDakIsT0FBTyxFQUFFLE9BQU87YUFDbkI7U0FDSixDQUFDLENBQUM7UUFDSCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUEsMEJBQWtCLEVBQUM7WUFDbkMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFBLGlCQUFTLEdBQUUsa0JBQWtCLENBQUM7WUFDekMsSUFBSSxFQUFFO2dCQUNGLFNBQVMsRUFBRSxNQUFNO2dCQUNqQixPQUFPLEVBQUUsT0FBTzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw4RkFBOEYsRUFBRSxHQUFTLEVBQUU7UUFDMUcsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFBLDBCQUFrQixFQUFDO1lBQ25DLEtBQUssRUFBRTtnQkFDSCxHQUFHLElBQUEsaUJBQVMsR0FBRSxrQkFBa0I7Z0JBQ2hDLEdBQUcsSUFBQSxpQkFBUyxHQUFFLG9CQUFvQjthQUNyQztZQUNELElBQUksRUFBRTtnQkFDRixTQUFTLEVBQUUsTUFBTTtnQkFDakIsT0FBTyxFQUFFLE9BQU87YUFDbkI7U0FDSixDQUFDLENBQUM7UUFDSCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUEsMEJBQWtCLEVBQUM7WUFDbkMsS0FBSyxFQUFFO2dCQUNILEdBQUcsSUFBQSxpQkFBUyxHQUFFLGtCQUFrQjtnQkFDaEMsR0FBRyxJQUFBLGlCQUFTLEdBQUUsb0JBQW9CO2FBQ3JDO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFNBQVMsRUFBRSxNQUFNO2dCQUNqQixPQUFPLEVBQUUsT0FBTzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=