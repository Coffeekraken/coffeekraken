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
    const findPromise = docMap.find();
    stdio_1.default(findPromise, 'inherit');
    yield findPromise;
    process.exit();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL2RvY01hcC9maW5kLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCx3RUFBa0Q7QUFDbEQsbUVBQTZDO0FBQzdDLG9IQUE4RjtBQUM5RiwrRUFBeUQ7QUFFekQsa0JBQWUsQ0FBTyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDdkMsTUFBTSxRQUFRLEdBQUcsc0JBQWMsQ0FBQyxVQUFVLEVBQUU7UUFDMUMsVUFBVSxFQUFFLGtDQUEwQixDQUFDLFVBQVU7S0FDbEQsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxNQUFNLEdBQUcsSUFBSSxpQkFBUyxDQUFDO1FBQzNCLE1BQU0sRUFBRSxRQUFRO0tBQ2pCLENBQUMsQ0FBQztJQUVILE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxlQUFPLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sV0FBVyxDQUFDO0lBQ2xCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUEsQ0FBQyJ9