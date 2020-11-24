"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rem2px_1 = __importDefault(require("../rem2px"));
describe('sugar.js.unit.rem2px', () => {
    it('Should convert the passed rem value to px correctly', () => {
        expect(rem2px_1.default(2)).toBe(32);
    });
});
