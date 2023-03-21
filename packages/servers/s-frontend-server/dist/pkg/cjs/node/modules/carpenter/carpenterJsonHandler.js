"use strict";
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
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const s_data_file_generic_1 = __importDefault(require("@coffeekraken/s-data-file-generic"));
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
function carpenterJsonHandler({ req, res, pageConfig }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const bench = new s_bench_1.default('data.carpenterJsonHandler');
        const carpenterSources = (_a = s_sugar_config_1.default.get('carpenter.sources')) !== null && _a !== void 0 ? _a : {};
        const frontspec = new s_frontspec_1.default(), frontspecJson = yield frontspec.read();
        const finalSpecs = {};
        for (let [key, source] of Object.entries(carpenterSources)) {
            const specsInstance = new s_specs_1.default();
            const specsArray = specsInstance.list(source.specsNamespaces);
            for (let i = 0; i < specsArray.length; i++) {
                const specs = specsArray[i];
                const specsJson = yield specs.read();
                const data = (_b = (yield s_data_file_generic_1.default.load(specsJson.metas.path))) !== null && _b !== void 0 ? _b : {};
                s_specs_1.default.applyValuesToSpecs(data, specsJson);
                finalSpecs[specs.dotpath] = specsJson;
            }
        }
        bench.step('afterSpecsRead');
        bench.end();
        res.status(200);
        res.type('application/json');
        res.send({
            specs: finalSpecs,
            frontspec: frontspecJson,
        });
        resolve({
            specs: finalSpecs,
            frontspec: frontspecJson,
        });
    }));
}
exports.default = carpenterJsonHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDRGQUFtRTtBQUNuRSw0RUFBcUQ7QUFDckQsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUUxRCxTQUF3QixvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0lBQ2pFLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7UUFDakMsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFFeEQsTUFBTSxnQkFBZ0IsR0FBRyxNQUFBLHdCQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUV2RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFZLEVBQUUsRUFDaEMsYUFBYSxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTNDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUV0QixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ3hELE1BQU0sYUFBYSxHQUFHLElBQUksaUJBQVEsRUFBRSxDQUFDO1lBQ3JDLE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRTlELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QyxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTVCLE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUVyQyxNQUFNLElBQUksR0FDTixNQUFBLENBQUMsTUFBTSw2QkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7Z0JBRWhFLGlCQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUU3QyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQzthQUN6QztTQUNKO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzdCLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVaLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDTCxLQUFLLEVBQUUsVUFBVTtZQUNqQixTQUFTLEVBQUUsYUFBYTtTQUMzQixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUM7WUFDSixLQUFLLEVBQUUsVUFBVTtZQUNqQixTQUFTLEVBQUUsYUFBYTtTQUMzQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQTNDRCx1Q0EyQ0MifQ==