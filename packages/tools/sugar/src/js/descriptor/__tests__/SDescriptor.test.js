"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SDescriptor_1 = __importDefault(require("../SDescriptor"));
describe('sugar.js.convert.toHtml', () => {
    class MyDescriptor extends SDescriptor_1.default {
    }
    MyDescriptor.rules = {
        myProperty: {
            type: 'String',
            required: true,
            default: 'Hello'
        }
    };
    const res = MyDescriptor.apply({
        myProperty: null,
        another: 'Plop'
    });
    expect(res).toBe(true);
});
