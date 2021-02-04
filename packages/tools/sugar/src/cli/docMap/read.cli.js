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
const SDocMap_1 = __importDefault(require("../../node/docMap/SDocMap"));
const stdio_1 = __importDefault(require("../../node/stdio/stdio"));
const SDocMapSettingsInterface_1 = __importDefault(require("../../node/docMap/interface/SDocMapSettingsInterface"));
const argsToObject_1 = __importDefault(require("../../node/cli/argsToObject"));
module.exports = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWFkLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFrRDtBQUNsRCxtRUFBNkM7QUFDN0Msb0hBQThGO0FBQzlGLCtFQUF5RDtBQUV6RCxpQkFBUyxDQUFPLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUNqQyxNQUFNLFFBQVEsR0FBRyxzQkFBYyxDQUFDLFVBQVUsRUFBRTtRQUMxQyxVQUFVLEVBQUUsa0NBQTBCLENBQUMsVUFBVTtLQUNsRCxDQUFDLENBQUM7SUFDSCxNQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFTLENBQUM7UUFDM0IsTUFBTSxFQUFFLFFBQVE7S0FDakIsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xDLE1BQU0sS0FBSyxHQUFHLGVBQU8sQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDOUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxXQUFXLENBQUM7SUFDOUIsTUFBTSxXQUFXLEdBQWEsRUFBRSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDckMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLFNBQVMsVUFBVSxDQUFDLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ1IsS0FBSyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQzlCLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUEsQ0FBQyJ9