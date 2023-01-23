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
        const specsMap = {}, specsBySources = {};
        for (let [key, source] of Object.entries(carpenterSources)) {
            if (!specsBySources[key]) {
                specsBySources[key] = Object.assign(Object.assign({}, source), { specs: {} });
            }
            const specsInstance = new s_specs_1.default();
            const specsArray = specsInstance.list(source.specsNamespaces);
            for (let i = 0; i < specsArray.length; i++) {
                const specs = specsArray[i];
                const specsJson = yield specs.read();
                const data = (_b = (yield s_data_file_generic_1.default.load(specsJson.metas.path))) !== null && _b !== void 0 ? _b : {};
                s_specs_1.default.applyValuesToSpecs(data, specsJson);
                specsBySources[key].specs[specs.dotpath] = specsJson;
                specsMap[specs.dotpath] = specsJson;
            }
        }
        bench.step('afterSpecsRead');
        bench.end();
        res.status(200);
        res.type('application/json');
        res.send({
            specsMap,
            specsBySources,
            frontspec: frontspecJson,
        });
        resolve({
            specsMap,
            specsBySources,
            frontspec: frontspecJson,
        });
    }));
}
exports.default = carpenterJsonHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDRGQUFtRTtBQUNuRSw0RUFBcUQ7QUFDckQsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUUxRCxTQUF3QixvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0lBQ2pFLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7UUFDakMsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFFeEQsTUFBTSxnQkFBZ0IsR0FBRyxNQUFBLHdCQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUV2RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFZLEVBQUUsRUFDaEMsYUFBYSxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTNDLE1BQU0sUUFBUSxHQUFHLEVBQUUsRUFDZixjQUFjLEdBQUcsRUFBRSxDQUFDO1FBRXhCLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdEIsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQ0FFWixNQUFNLEtBQ1QsS0FBSyxFQUFFLEVBQUUsR0FDWixDQUFDO2FBQ0w7WUFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLGlCQUFRLEVBQUUsQ0FBQztZQUNyQyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUU5RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixNQUFNLFNBQVMsR0FBRyxNQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFckMsTUFBTSxJQUFJLEdBQ04sTUFBQSxDQUFDLE1BQU0sNkJBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO2dCQUVoRSxpQkFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFFN0MsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO2dCQUNyRCxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQzthQUN2QztTQUNKO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzdCLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVaLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDTCxRQUFRO1lBQ1IsY0FBYztZQUNkLFNBQVMsRUFBRSxhQUFhO1NBQzNCLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQztZQUNKLFFBQVE7WUFDUixjQUFjO1lBQ2QsU0FBUyxFQUFFLGFBQWE7U0FDM0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUF2REQsdUNBdURDIn0=