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
    const findPromise = docMap.find();
    stdio_1.default(findPromise, 'inherit');
    yield findPromise;
    process.exit();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaW5kLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFrRDtBQUNsRCxtRUFBNkM7QUFDN0Msb0hBQThGO0FBQzlGLCtFQUF5RDtBQUV6RCxpQkFBUyxDQUFPLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUNqQyxNQUFNLFFBQVEsR0FBRyxzQkFBYyxDQUFDLFVBQVUsRUFBRTtRQUMxQyxVQUFVLEVBQUUsa0NBQTBCLENBQUMsVUFBVTtLQUNsRCxDQUFDLENBQUM7SUFDSCxNQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFTLENBQUM7UUFDM0IsTUFBTSxFQUFFLFFBQVE7S0FDakIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xDLGVBQU8sQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDaEMsTUFBTSxXQUFXLENBQUM7SUFDbEIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2pCLENBQUMsQ0FBQSxDQUFDIn0=