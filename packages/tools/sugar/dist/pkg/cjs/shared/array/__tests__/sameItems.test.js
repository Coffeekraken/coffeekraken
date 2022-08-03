"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sameItems_1 = __importDefault(require("../sameItems"));
describe('@coffeekraken.sugar.shared.array.sameItems', () => {
    it('Should extract same items in simple number array', () => {
        const res = (0, sameItems_1.default)([1, 2, 3, 4, 5, 6], [1, 3, 5, 7]);
        expect(res).toEqual([1, 3, 5]);
    });
    it('Should extract same items in simple string array', () => {
        const res = (0, sameItems_1.default)(['hello', 'world', 'plop', 'coco'], ['world', 'coco']);
        expect(res).toEqual(['world', 'coco']);
    });
    it('Should extract same items in array of objects', () => {
        const res = (0, sameItems_1.default)([{
                hello: 'world'
            }, {
                plop: 'world'
            }, {
                coco: 'world'
            }], [{
                hello1: 'world'
            }, {
                plop: 'world'
            }, {
                something: 'wrong'
            }]);
        expect(res).toEqual([{
                plop: 'world'
            }]);
    });
    it('Should extract same items in more that 2 arrays in simple number array', () => {
        const res = (0, sameItems_1.default)([1, 2, 3, 4, 5, 6], [1, 3, 5, 7], [1, 5, 6]);
        expect(res).toEqual([1, 5]);
    });
    it('Should extract same items in array of objects and hashes disabled', () => {
        const plopObj = {
            plop: 'world'
        };
        const res = (0, sameItems_1.default)([{
                hello: 'world'
            }, plopObj, {
                coco: 'world'
            }], [{
                hello1: 'world'
            }, plopObj, {
                something: 'wrong'
            }], {
            hash: false
        });
        expect(res).toEqual([plopObj]);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXVDO0FBRXZDLFFBQVEsQ0FBQyw0Q0FBNEMsRUFBRSxHQUFHLEVBQUU7SUFFeEQsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEdBQUcsRUFBRTtRQUN4RCxNQUFNLEdBQUcsR0FBRyxJQUFBLG1CQUFXLEVBQ25CLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFDYixDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUNaLENBQUM7UUFDRixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEdBQUcsRUFBRTtRQUN4RCxNQUFNLEdBQUcsR0FBRyxJQUFBLG1CQUFXLEVBQ25CLENBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLEVBQy9CLENBQUMsT0FBTyxFQUFDLE1BQU0sQ0FBQyxDQUNuQixDQUFDO1FBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLCtDQUErQyxFQUFFLEdBQUcsRUFBRTtRQUNyRCxNQUFNLEdBQUcsR0FBRyxJQUFBLG1CQUFXLEVBQ25CLENBQUM7Z0JBQ0csS0FBSyxFQUFFLE9BQU87YUFDakIsRUFBRTtnQkFDQyxJQUFJLEVBQUUsT0FBTzthQUNoQixFQUFDO2dCQUNFLElBQUksRUFBRSxPQUFPO2FBQ2hCLENBQUMsRUFDRixDQUFDO2dCQUNHLE1BQU0sRUFBRSxPQUFPO2FBQ2xCLEVBQUU7Z0JBQ0MsSUFBSSxFQUFFLE9BQU87YUFDaEIsRUFBRTtnQkFDQyxTQUFTLEVBQUUsT0FBTzthQUNyQixDQUFDLENBQ0wsQ0FBQztRQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakIsSUFBSSxFQUFFLE9BQU87YUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx3RUFBd0UsRUFBRSxHQUFHLEVBQUU7UUFDOUUsTUFBTSxHQUFHLEdBQUcsSUFBQSxtQkFBVyxFQUNuQixDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQ2IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFDVCxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQ1YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxtRUFBbUUsRUFBRSxHQUFHLEVBQUU7UUFFekUsTUFBTSxPQUFPLEdBQUc7WUFDUixJQUFJLEVBQUUsT0FBTztTQUNoQixDQUFDO1FBRU4sTUFBTSxHQUFHLEdBQUcsSUFBQSxtQkFBVyxFQUNuQixDQUFDO2dCQUNHLEtBQUssRUFBRSxPQUFPO2FBQ2pCLEVBQUUsT0FBTyxFQUFFO2dCQUNSLElBQUksRUFBRSxPQUFPO2FBQ2hCLENBQUMsRUFDRixDQUFDO2dCQUNHLE1BQU0sRUFBRSxPQUFPO2FBQ2xCLEVBQUUsT0FBTyxFQUFFO2dCQUNSLFNBQVMsRUFBRSxPQUFPO2FBQ3JCLENBQUMsRUFBRTtZQUNBLElBQUksRUFBRSxLQUFLO1NBQ2QsQ0FDSixDQUFDO1FBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7QUFFUCxDQUFDLENBQUMsQ0FBQyJ9