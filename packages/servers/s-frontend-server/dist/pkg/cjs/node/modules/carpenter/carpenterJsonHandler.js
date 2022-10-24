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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
function carpenterJsonHandler({ req, res, pageConfig }) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        s_bench_1.default.start('data.carpenterJsonHandler');
        const carpenterSources = (_a = s_sugar_config_1.default.get('carpenter.sources')) !== null && _a !== void 0 ? _a : {};
        const specsMap = {}, specsBySources = {};
        for (let [key, source] of Object.entries(carpenterSources)) {
            if (!specsBySources[key]) {
                specsBySources[key] = Object.assign(Object.assign({}, source), { specs: {} });
            }
            const specsInstance = new s_specs_1.default();
            const specsArray = specsInstance.list(source.specsNamespaces);
            specsArray.forEach((specs) => {
                const specsJson = specs.read();
                specsBySources[key].specs[specs.dotpath] = specsJson;
                specsMap[specs.dotpath] = specsJson;
            });
        }
        s_bench_1.default.step('data.carpenterJsonHandler', 'afterSpecsRead');
        s_bench_1.default.end('data.carpenterJsonHandler').log();
        res.status(200);
        res.type('application/json');
        res.send({
            specsMap,
            specsBySources,
        });
        resolve({
            specsMap,
            specsBySources,
        });
    }));
}
exports.default = carpenterJsonHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdFQUFpRDtBQUNqRCxvRUFBNkM7QUFDN0Msa0ZBQTBEO0FBRTFELFNBQXdCLG9CQUFvQixDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7SUFDakUsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1FBQzVELGlCQUFRLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFFNUMsTUFBTSxnQkFBZ0IsR0FBRyxNQUFBLHdCQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUV2RSxNQUFNLFFBQVEsR0FBRyxFQUFFLEVBQ2YsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUV4QixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3RCLGNBQWMsQ0FBQyxHQUFHLENBQUMsbUNBRVosTUFBTSxLQUNULEtBQUssRUFBRSxFQUFFLEdBQ1osQ0FBQzthQUNMO1lBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7WUFDckMsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFOUQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUN6QixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQy9CLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQztnQkFDckQsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUVELGlCQUFRLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFN0QsaUJBQVEsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVoRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM3QixHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ0wsUUFBUTtZQUNSLGNBQWM7U0FDakIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDO1lBQ0osUUFBUTtZQUNSLGNBQWM7U0FDakIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUEzQ0QsdUNBMkNDIn0=