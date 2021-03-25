"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const linkPackages_1 = __importDefault(require("../../node/monorepo/linkPackages"));
exports.default = (stringArgs = '') => {
    let individual = false;
    if (stringArgs.match(/\s?--individual\s?/) || stringArgs.match(/\s?-i\s?/))
        individual = true;
    linkPackages_1.default({
        individual
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaW5rLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGNBQWM7QUFDZCxvRkFBOEQ7QUFFOUQsa0JBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDakMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3hFLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDcEIsc0JBQWMsQ0FBQztRQUNiLFVBQVU7S0FDWCxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==