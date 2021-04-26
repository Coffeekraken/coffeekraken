"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const SFrontspec_1 = __importDefault(require("./SFrontspec"));
const SFrontspecFindParamsInterface_1 = __importDefault(require("./interface/SFrontspecFindParamsInterface"));
exports.default = (stringArgs = '') => {
    const frontspec = new SFrontspec_1.default();
    const pro = s_process_1.default.from(frontspec.read.bind(frontspec), {
        process: {
            interface: SFrontspecFindParamsInterface_1.default
        }
    });
    pro.run(stringArgs);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWFkLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx3RUFBaUQ7QUFDakQsOERBQXdDO0FBQ3hDLDhHQUFvRjtBQUVwRixrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUNqQyxNQUFNLFNBQVMsR0FBRyxJQUFJLG9CQUFZLEVBQUUsQ0FBQztJQUNyQyxNQUFNLEdBQUcsR0FBRyxtQkFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUMxRCxPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUsdUNBQTJCO1NBQ3ZDO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QixDQUFDLENBQUMifQ==