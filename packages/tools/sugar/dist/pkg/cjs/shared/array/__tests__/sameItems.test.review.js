"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sameItems_js_1 = __importDefault(require("../sameItems.js"));
describe('@coffeekraken.sugar.shared.array.sameItems', () => {
    it('Should extract same items in simple number array', () => {
        const res = (0, sameItems_js_1.default)([1, 2, 3, 4, 5, 6], [1, 3, 5, 7]);
        expect(res).toEqual([1, 3, 5]);
    });
    it('Should extract same items in simple string array', () => {
        const res = (0, sameItems_js_1.default)(['hello', 'world', 'plop', 'coco'], ['world', 'coco']);
        expect(res).toEqual(['world', 'coco']);
    });
    it('Should extract same items in array of objects', () => {
        const res = (0, sameItems_js_1.default)([
            {
                hello: 'world',
            },
            {
                plop: 'world',
            },
            {
                coco: 'world',
            },
        ], [
            {
                hello1: 'world',
            },
            {
                plop: 'world',
            },
            {
                something: 'wrong',
            },
        ]);
        expect(res).toEqual([
            {
                plop: 'world',
            },
        ]);
    });
    it('Should extract same items in more that 2 arrays in simple number array', () => {
        const res = (0, sameItems_js_1.default)([1, 2, 3, 4, 5, 6], [1, 3, 5, 7], [1, 5, 6]);
        expect(res).toEqual([1, 5]);
    });
    it('Should extract same items in array of objects and hashes disabled', () => {
        const plopObj = {
            plop: 'world',
        };
        const res = (0, sameItems_js_1.default)([
            {
                hello: 'world',
            },
            plopObj,
            {
                coco: 'world',
            },
        ], [
            {
                hello1: 'world',
            },
            plopObj,
            {
                something: 'wrong',
            },
        ], {
            hash: false,
        });
        expect(res).toEqual([plopObj]);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbUVBQTBDO0FBRTFDLFFBQVEsQ0FBQyw0Q0FBNEMsRUFBRSxHQUFHLEVBQUU7SUFDeEQsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEdBQUcsRUFBRTtRQUN4RCxNQUFNLEdBQUcsR0FBRyxJQUFBLHNCQUFXLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEdBQUcsRUFBRTtRQUN4RCxNQUFNLEdBQUcsR0FBRyxJQUFBLHNCQUFXLEVBQ25CLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQ2xDLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUNwQixDQUFDO1FBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLCtDQUErQyxFQUFFLEdBQUcsRUFBRTtRQUNyRCxNQUFNLEdBQUcsR0FBRyxJQUFBLHNCQUFXLEVBQ25CO1lBQ0k7Z0JBQ0ksS0FBSyxFQUFFLE9BQU87YUFDakI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsT0FBTzthQUNoQjtZQUNEO2dCQUNJLElBQUksRUFBRSxPQUFPO2FBQ2hCO1NBQ0osRUFDRDtZQUNJO2dCQUNJLE1BQU0sRUFBRSxPQUFPO2FBQ2xCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLE9BQU87YUFDaEI7WUFDRDtnQkFDSSxTQUFTLEVBQUUsT0FBTzthQUNyQjtTQUNKLENBQ0osQ0FBQztRQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDaEI7Z0JBQ0ksSUFBSSxFQUFFLE9BQU87YUFDaEI7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx3RUFBd0UsRUFBRSxHQUFHLEVBQUU7UUFDOUUsTUFBTSxHQUFHLEdBQUcsSUFBQSxzQkFBVyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxtRUFBbUUsRUFBRSxHQUFHLEVBQUU7UUFDekUsTUFBTSxPQUFPLEdBQUc7WUFDWixJQUFJLEVBQUUsT0FBTztTQUNoQixDQUFDO1FBRUYsTUFBTSxHQUFHLEdBQUcsSUFBQSxzQkFBVyxFQUNuQjtZQUNJO2dCQUNJLEtBQUssRUFBRSxPQUFPO2FBQ2pCO1lBQ0QsT0FBTztZQUNQO2dCQUNJLElBQUksRUFBRSxPQUFPO2FBQ2hCO1NBQ0osRUFDRDtZQUNJO2dCQUNJLE1BQU0sRUFBRSxPQUFPO2FBQ2xCO1lBQ0QsT0FBTztZQUNQO2dCQUNJLFNBQVMsRUFBRSxPQUFPO2FBQ3JCO1NBQ0osRUFDRDtZQUNJLElBQUksRUFBRSxLQUFLO1NBQ2QsQ0FDSixDQUFDO1FBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9