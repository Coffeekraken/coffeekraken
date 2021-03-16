"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const __STestJestCli = require('../../node/test/jest/STestJestCli');
const STestJestProcess_1 = __importDefault(require("../../node/test/jest/STestJestProcess"));
exports.default = (stringArgs = '') => {
    const pro = new STestJestProcess_1.default();
    pro.run(stringArgs);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamVzdC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2xpL19fd2lwX18vdGVzdC9qZXN0LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx1RUFBdUU7QUFDdkUsNkZBQXNFO0FBRXRFLGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sR0FBRyxHQUFHLElBQUksMEJBQWlCLEVBQUUsQ0FBQztJQUNwQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyJ9