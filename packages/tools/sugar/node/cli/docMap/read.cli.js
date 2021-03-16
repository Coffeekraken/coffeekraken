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
Object.defineProperty(exports, "__esModule", { value: true });
const SDocMap_1 = __importDefault(require("../../node/docMap/SDocMap"));
const stdio_1 = __importDefault(require("../../node/stdio/stdio"));
const SDocMapSettingsInterface_1 = __importDefault(require("../../node/docMap/interface/SDocMapSettingsInterface"));
const argsToObject_1 = __importDefault(require("../../node/cli/argsToObject"));
exports.default = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    const settings = argsToObject_1.default(stringArgs, {
        definition: SDocMapSettingsInterface_1.default.definition
    });
    const docMap = new SDocMap_1.default({
        docMap: settings
    });
    const readPromise = docMap.read();
    const stdio = stdio_1.default(readPromise, 'inherit');
    const res = yield readPromise;
    const logStrArray = [];
    Object.keys(res).forEach((namespace) => {
        logStrArray.push(`- <green>${namespace}</green>`);
    });
    stdio.log({
        value: logStrArray.join('\n')
    });
    process.exit();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL2RvY01hcC9yZWFkLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCx3RUFBa0Q7QUFDbEQsbUVBQTZDO0FBQzdDLG9IQUE4RjtBQUM5RiwrRUFBeUQ7QUFFekQsa0JBQWUsQ0FBTyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDdkMsTUFBTSxRQUFRLEdBQUcsc0JBQWMsQ0FBQyxVQUFVLEVBQUU7UUFDMUMsVUFBVSxFQUFFLGtDQUEwQixDQUFDLFVBQVU7S0FDbEQsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxNQUFNLEdBQUcsSUFBSSxpQkFBUyxDQUFDO1FBQzNCLE1BQU0sRUFBRSxRQUFRO0tBQ2pCLENBQUMsQ0FBQztJQUNILE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxNQUFNLEtBQUssR0FBRyxlQUFPLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sR0FBRyxHQUFHLE1BQU0sV0FBVyxDQUFDO0lBQzlCLE1BQU0sV0FBVyxHQUFhLEVBQUUsQ0FBQztJQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3JDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxTQUFTLFVBQVUsQ0FBQyxDQUFDO0lBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNSLEtBQUssRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUM5QixDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDakIsQ0FBQyxDQUFBLENBQUMifQ==