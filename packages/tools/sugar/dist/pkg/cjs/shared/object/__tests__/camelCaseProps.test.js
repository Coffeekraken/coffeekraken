"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camelCaseProps_js_1 = __importDefault(require("../camelCaseProps.js"));
describe('sugar.shared.object.camelCaseProps', () => {
    it('Should process a simple 1 level object correctly', () => {
        const newObj = (0, camelCaseProps_js_1.default)({
            'hello-world': true,
            plop: 'world',
            'plop-World': true,
        });
        expect(newObj).toEqual({
            helloWorld: true,
            plop: 'world',
            plopWorld: true,
        });
    });
    it('Should process a multiple levels object correctly', () => {
        const newObj = (0, camelCaseProps_js_1.default)({
            'hello-world': true,
            plop: 'world',
            'plop-World': {
                yep: 'ok',
                plop_please: false,
            },
        });
        expect(newObj).toEqual({
            helloWorld: true,
            plop: 'world',
            plopWorld: {
                yep: 'ok',
                plopPlease: false,
            },
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkVBQW9EO0FBRXBELFFBQVEsQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLEVBQUU7SUFDaEQsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEdBQUcsRUFBRTtRQUN4RCxNQUFNLE1BQU0sR0FBRyxJQUFBLDJCQUFnQixFQUFDO1lBQzVCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLElBQUksRUFBRSxPQUFPO1lBQ2IsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNuQixVQUFVLEVBQUUsSUFBSTtZQUNoQixJQUFJLEVBQUUsT0FBTztZQUNiLFNBQVMsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1EQUFtRCxFQUFFLEdBQUcsRUFBRTtRQUN6RCxNQUFNLE1BQU0sR0FBRyxJQUFBLDJCQUFnQixFQUFDO1lBQzVCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLElBQUksRUFBRSxPQUFPO1lBQ2IsWUFBWSxFQUFFO2dCQUNWLEdBQUcsRUFBRSxJQUFJO2dCQUNULFdBQVcsRUFBRSxLQUFLO2FBQ3JCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNuQixVQUFVLEVBQUUsSUFBSTtZQUNoQixJQUFJLEVBQUUsT0FBTztZQUNiLFNBQVMsRUFBRTtnQkFDUCxHQUFHLEVBQUUsSUFBSTtnQkFDVCxVQUFVLEVBQUUsS0FBSzthQUNwQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==