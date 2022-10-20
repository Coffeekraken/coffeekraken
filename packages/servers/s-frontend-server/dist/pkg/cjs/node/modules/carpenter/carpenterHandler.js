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
function carpenterHandler({ req, res, pageConfig }) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        s_bench_1.default.start('data.carpenterHandler');
        s_bench_1.default.step('data.carpenterHandler', 'beforeSitemapRead');
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
        s_bench_1.default.step('data.carpenterHandler', 'afterSitemapRead');
        s_bench_1.default.end('data.carpenterHandler').log();
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
exports.default = carpenterHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdFQUFpRDtBQUNqRCxvRUFBNkM7QUFDN0Msa0ZBQTBEO0FBRTFELFNBQXdCLGdCQUFnQixDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7SUFDN0QsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1FBQzVELGlCQUFRLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFeEMsaUJBQVEsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUU1RCxNQUFNLGdCQUFnQixHQUFHLE1BQUEsd0JBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBRXZFLE1BQU0sUUFBUSxHQUFHLEVBQUUsRUFDZixjQUFjLEdBQUcsRUFBRSxDQUFDO1FBRXhCLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdEIsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQ0FFWixNQUFNLEtBQ1QsS0FBSyxFQUFFLEVBQUUsR0FDWixDQUFDO2FBQ0w7WUFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLGlCQUFRLEVBQUUsQ0FBQztZQUNyQyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUU5RCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3pCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDL0IsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO2dCQUNyRCxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsaUJBQVEsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUUzRCxpQkFBUSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTVDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDTCxRQUFRO1lBQ1IsY0FBYztTQUNqQixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUM7WUFDSixRQUFRO1lBQ1IsY0FBYztTQUNqQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQTdDRCxtQ0E2Q0MifQ==