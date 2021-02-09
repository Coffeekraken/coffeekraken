"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const linkPackages_1 = __importDefault(require("../../node/monorepo/linkPackages"));
const stdio_1 = __importDefault(require("../../node/process/stdio"));
exports.default = (stringArgs = '') => {
    const pro = linkPackages_1.default();
    stdio_1.default(pro);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaW5rLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxvRkFBOEQ7QUFDOUQscUVBQStDO0FBRS9DLGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sR0FBRyxHQUFHLHNCQUFjLEVBQUUsQ0FBQztJQUM3QixlQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDZixDQUFDLENBQUMifQ==