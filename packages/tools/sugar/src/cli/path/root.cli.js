"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const packageRoot_1 = __importDefault(require("../../node/path/packageRoot"));
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
module.exports = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    const args = parseArgs_1.default(stringArgs, {
        definition: {
            highest: {
                type: 'Boolean',
                alias: 'h',
                default: false
            }
        }
    });
    console.log(packageRoot_1.default(args.highest));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyb290LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7OztBQUVkLDhFQUF3RDtBQUN4RCx5RUFBbUQ7QUFNbkQsaUJBQVMsQ0FBTyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDakMsTUFBTSxJQUFJLEdBQXFCLG1CQUFXLENBQUMsVUFBVSxFQUFFO1FBQ3JELFVBQVUsRUFBRTtZQUNWLE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsS0FBSzthQUNmO1NBQ0Y7S0FDRixDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFBLENBQUMifQ==