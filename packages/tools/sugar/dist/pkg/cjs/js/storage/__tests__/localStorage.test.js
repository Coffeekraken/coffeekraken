"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localStorage_1 = __importDefault(require("../localStorage"));
describe('sugar.js.storage.localStorage', () => {
    it('Should store a small data correctly', () => {
        const value = 'a'.repeat(300);
        localStorage_1.default.setItem('something', value);
        expect(localStorage_1.default.getItem('something')).toBe(value);
    });
    // it('Should store a medium data correctly', () => {
    //     const value = 'a'.repeat(1500000);
    //     __localStorage.setItem('something', value);
    //     expect(__localStorage.getItem('something')).toBe(value);
    // });
    // it('Should store a large data correctly', () => {
    //     const value = 'a'.repeat(11500000);
    //     __localStorage.setItem('something', value);
    //     expect(__localStorage.getItem('something')).toBe(value);
    // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbUVBQTZDO0FBRTdDLFFBQVEsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7SUFDM0MsRUFBRSxDQUFDLHFDQUFxQyxFQUFFLEdBQUcsRUFBRTtRQUMzQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLHNCQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsc0JBQWMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDSCxxREFBcUQ7SUFDckQseUNBQXlDO0lBQ3pDLGtEQUFrRDtJQUNsRCwrREFBK0Q7SUFDL0QsTUFBTTtJQUNOLG9EQUFvRDtJQUNwRCwwQ0FBMEM7SUFDMUMsa0RBQWtEO0lBQ2xELCtEQUErRDtJQUMvRCxNQUFNO0FBQ1YsQ0FBQyxDQUFDLENBQUMifQ==