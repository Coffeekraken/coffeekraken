var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SBench from '@coffeekraken/s-bench';
import __SDataFileGeneric from '@coffeekraken/s-data-file-generic';
import __SPromise from '@coffeekraken/s-promise';
import __SSpecs from '@coffeekraken/s-specs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default function carpenterJsonHandler({ req, res, pageConfig }) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        __SBench.start('data.carpenterJsonHandler');
        const carpenterSources = (_a = __SSugarConfig.get('carpenter.sources')) !== null && _a !== void 0 ? _a : {};
        const specsMap = {}, specsBySources = {};
        for (let [key, source] of Object.entries(carpenterSources)) {
            if (!specsBySources[key]) {
                specsBySources[key] = Object.assign(Object.assign({}, source), { specs: {} });
            }
            const specsInstance = new __SSpecs();
            const specsArray = specsInstance.list(source.specsNamespaces);
            for (let i = 0; i < specsArray.length; i++) {
                const specs = specsArray[i];
                const specsJson = yield specs.read();
                const data = (_b = (yield __SDataFileGeneric.load(specsJson.metas.path))) !== null && _b !== void 0 ? _b : {};
                __SSpecs.applyValuesToSpecs(data, specsJson);
                specsBySources[key].specs[specs.dotpath] = specsJson;
                specsMap[specs.dotpath] = specsJson;
            }
        }
        __SBench.step('data.carpenterJsonHandler', 'afterSpecsRead');
        __SBench.end('data.carpenterJsonHandler').log();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sa0JBQWtCLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsTUFBTSxDQUFDLE9BQU8sVUFBVSxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0lBQ2pFLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1FBQzVELFFBQVEsQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUU1QyxNQUFNLGdCQUFnQixHQUFHLE1BQUEsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFFdkUsTUFBTSxRQUFRLEdBQUcsRUFBRSxFQUNmLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFFeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUN4RCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QixjQUFjLENBQUMsR0FBRyxDQUFDLG1DQUVaLE1BQU0sS0FDVCxLQUFLLEVBQUUsRUFBRSxHQUNaLENBQUM7YUFDTDtZQUVELE1BQU0sYUFBYSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7WUFDckMsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFOUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFNUIsTUFBTSxTQUFTLEdBQUcsTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBRXJDLE1BQU0sSUFBSSxHQUNOLE1BQUEsQ0FBQyxNQUFNLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztnQkFFaEUsUUFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFFN0MsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO2dCQUNyRCxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQzthQUN2QztTQUNKO1FBRUQsUUFBUSxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTdELFFBQVEsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVoRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM3QixHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ0wsUUFBUTtZQUNSLGNBQWM7U0FDakIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDO1lBQ0osUUFBUTtZQUNSLGNBQWM7U0FDakIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==