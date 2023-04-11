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
        let values = {};
        for (let [key, source] of Object.entries(carpenterSources)) {
            const specsInstance = new s_specs_1.default();
            const specsArray = specsInstance.list(source.specsNamespaces);
            for (let i = 0; i < specsArray.length; i++) {
                const specs = specsArray[i];
                const specsJson = yield specs.read();
                _console.log('spec', specsJson.metas.path);
                values =
                    (_b = (yield s_data_file_generic_1.default.load(specsJson.metas.path))) !== null && _b !== void 0 ? _b : {};
                finalSpecs[specs.dotpath] = specsJson;
            }
        }
        bench.step('afterSpecsRead');
        bench.end();
        res.status(200);
        res.type('application/json');
        res.send({
            values,
            specs: finalSpecs,
            frontspec: frontspecJson,
        });
        resolve({
            values,
            specs: finalSpecs,
            frontspec: frontspecJson,
        });
    }));
}
exports.default = carpenterJsonHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDRGQUFtRTtBQUNuRSw0RUFBcUQ7QUFDckQsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUUxRCxTQUF3QixvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0lBQ2pFLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7UUFDakMsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFFeEQsTUFBTSxnQkFBZ0IsR0FBRyxNQUFBLHdCQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUV2RSxNQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFZLEVBQUUsRUFDaEMsYUFBYSxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTNDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUN4RCxNQUFNLGFBQWEsR0FBRyxJQUFJLGlCQUFRLEVBQUUsQ0FBQztZQUNyQyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUU5RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixNQUFNLFNBQVMsR0FBRyxNQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFckMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFM0MsTUFBTTtvQkFDRixNQUFBLENBQUMsTUFBTSw2QkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7Z0JBRWhFLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO2FBQ3pDO1NBQ0o7UUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0IsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRVosR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNMLE1BQU07WUFDTixLQUFLLEVBQUUsVUFBVTtZQUNqQixTQUFTLEVBQUUsYUFBYTtTQUMzQixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUM7WUFDSixNQUFNO1lBQ04sS0FBSyxFQUFFLFVBQVU7WUFDakIsU0FBUyxFQUFFLGFBQWE7U0FDM0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUE5Q0QsdUNBOENDIn0=