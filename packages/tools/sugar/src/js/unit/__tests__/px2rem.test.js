"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const px2rem_1 = __importDefault(require("../px2rem"));
describe('sugar.js.unit.px2rem', () => {
    it('Should convert the passed px value to rem correctly', () => {
        expect(px2rem_1.default(32)).toBe(2);
    });
});
