"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camelCaseProps_1 = __importDefault(require("../camelCaseProps"));
describe('sugar.shared.object.camelCaseProps', () => {
    it('Should process a simple 1 level object correctly', () => {
        const newObj = (0, camelCaseProps_1.default)({
            'hello-world': true,
            plop: 'world',
            'plop-World': true
        });
        expect(newObj).toEqual({
            helloWorld: true,
            plop: 'world',
            plopWorld: true
        });
    });
    it('Should process a multiple levels object correctly', () => {
        const newObj = (0, camelCaseProps_1.default)({
            'hello-world': true,
            plop: 'world',
            'plop-World': {
                yep: 'ok',
                'plop_please': false
            }
        });
        expect(newObj).toEqual({
            helloWorld: true,
            plop: 'world',
            plopWorld: {
                yep: 'ok',
                plopPlease: false
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUVBQWlEO0FBRWpELFFBQVEsQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLEVBQUU7SUFDaEQsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEdBQUcsRUFBRTtRQUN4RCxNQUFNLE1BQU0sR0FBRyxJQUFBLHdCQUFnQixFQUFDO1lBQzVCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLElBQUksRUFBRSxPQUFPO1lBQ2IsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNuQixVQUFVLEVBQUUsSUFBSTtZQUNoQixJQUFJLEVBQUUsT0FBTztZQUNiLFNBQVMsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLG1EQUFtRCxFQUFFLEdBQUcsRUFBRTtRQUN6RCxNQUFNLE1BQU0sR0FBRyxJQUFBLHdCQUFnQixFQUFDO1lBQzVCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLElBQUksRUFBRSxPQUFPO1lBQ2IsWUFBWSxFQUFFO2dCQUNWLEdBQUcsRUFBRSxJQUFJO2dCQUNULGFBQWEsRUFBRSxLQUFLO2FBQ3ZCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNuQixVQUFVLEVBQUUsSUFBSTtZQUNoQixJQUFJLEVBQUUsT0FBTztZQUNiLFNBQVMsRUFBRTtnQkFDUCxHQUFHLEVBQUUsSUFBSTtnQkFDVCxVQUFVLEVBQUUsS0FBSzthQUNwQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFBO0FBRU4sQ0FBQyxDQUFDLENBQUEifQ==