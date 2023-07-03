"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../deepMerge"));
describe('sugar.shared.object.deepMerge', () => {
    it('Should merge two simple objects correctly', () => {
        const a = {
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
            },
        }, b = {
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world'
            }
        };
        const applied = (0, deepMerge_1.default)(a, b);
        expect(applied).toEqual({
            myValue: 'Hello',
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world'
            },
        });
    });
    it('Should merge two objects with getter on the first one correctly', () => {
        const a = {
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
                get getter() {
                    return 'yop';
                }
            },
        }, b = {
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world'
            }
        };
        const applied = (0, deepMerge_1.default)(a, b);
        expect(applied).toEqual({
            myValue: 'Hello',
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world',
                getter: 'yop'
            },
        });
    });
    it('Should merge two objects with getter on the first AND the second one correctly', () => {
        const a = {
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
                get getter() {
                    return 'yop';
                }
            },
        }, b = {
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world',
                get getter2() {
                    return 'hey';
                }
            }
        };
        const applied = (0, deepMerge_1.default)(a, b);
        expect(applied).toEqual({
            myValue: 'Hello',
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world',
                getter: 'yop',
                getter2: 'hey'
            },
        });
    });
    it('Should merge two objects with getter on the first OVERIDED on the second one correctly', () => {
        const a = {
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
                get getter() {
                    return 'yop';
                }
            },
        }, b = {
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world',
                get getter() {
                    return 'hey';
                }
            }
        };
        const applied = (0, deepMerge_1.default)(a, b);
        expect(applied).toEqual({
            myValue: 'Hello',
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world',
                getter: 'hey'
            },
        });
    });
    it('Should merge objects with array correctly', () => {
        const a = {
            myValue: 'Hello',
            sub: {
                list: ['something']
            },
        }, b = {
            sub: {
                list: ['else']
            }
        };
        const applied = (0, deepMerge_1.default)(a, b, {
            mergeArray: true
        });
        expect(applied).toEqual({
            myValue: 'Hello',
            sub: {
                list: ['something', 'else']
            },
        });
    });
    it('Should merge two objects with getter on the first OVERIDED on the second one AND access the first one value using the "this.$source" keyword correctly', () => {
        const a = {
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
                get getter() {
                    return ['hello'];
                }
            },
        }, b = {
            sub: {
                get getter() {
                    var _a;
                    return [...(((_a = this.$source) === null || _a === void 0 ? void 0 : _a.getter) || []), 'world'];
                }
            }
        };
        const applied = (0, deepMerge_1.default)(a, b, {
            mergeGetterSource: true
        });
        expect(applied).toEqual({
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
                getter: ['hello', 'world']
            },
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXVDO0FBRXZDLFFBQVEsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7SUFDM0MsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLEdBQUcsRUFBRTtRQUVqRCxNQUFNLENBQUMsR0FBRztZQUNOLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLEdBQUcsRUFBRTtnQkFDRCxZQUFZLEVBQUUsTUFBTTthQUN2QjtTQUNKLEVBQUUsQ0FBQyxHQUFHO1lBQ0gsU0FBUyxFQUFFLE1BQU07WUFDakIsR0FBRyxFQUFFO2dCQUNELFlBQVksRUFBRSxLQUFLO2dCQUNuQixRQUFRLEVBQUUsT0FBTzthQUNwQjtTQUNKLENBQUM7UUFHRixNQUFNLE9BQU8sR0FBRyxJQUFBLG1CQUFXLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWxDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDcEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsU0FBUyxFQUFFLE1BQU07WUFDakIsR0FBRyxFQUFFO2dCQUNELFlBQVksRUFBRSxLQUFLO2dCQUNuQixRQUFRLEVBQUUsT0FBTzthQUNwQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGlFQUFpRSxFQUFFLEdBQUcsRUFBRTtRQUV2RSxNQUFNLENBQUMsR0FBRztZQUNOLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLEdBQUcsRUFBRTtnQkFDRCxZQUFZLEVBQUUsTUFBTTtnQkFDcEIsSUFBSSxNQUFNO29CQUNOLE9BQU8sS0FBSyxDQUFDO2dCQUNqQixDQUFDO2FBQ0o7U0FDSixFQUFFLENBQUMsR0FBRztZQUNILFNBQVMsRUFBRSxNQUFNO1lBQ2pCLEdBQUcsRUFBRTtnQkFDRCxZQUFZLEVBQUUsS0FBSztnQkFDbkIsUUFBUSxFQUFFLE9BQU87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