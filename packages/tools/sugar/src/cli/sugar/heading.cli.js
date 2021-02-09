"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugarHeading_1 = __importDefault(require("../../node/ascii/sugarHeading"));
const json_1 = __importDefault(require("../../node/package/json"));
function heading(stringArgs = '') {
    console.log(sugarHeading_1.default({
        version: json_1.default(__dirname).version
    }));
}
exports.default = heading;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGluZy5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZWFkaW5nLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxpRkFBMEQ7QUFDMUQsbUVBQW1EO0FBRW5ELFNBQVMsT0FBTyxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsc0JBQWEsQ0FBQztRQUNaLE9BQU8sRUFBRSxjQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTztLQUN6QyxDQUFDLENBQ0gsQ0FBQztBQUNKLENBQUM7QUFFRCxrQkFBZSxPQUFPLENBQUMifQ==