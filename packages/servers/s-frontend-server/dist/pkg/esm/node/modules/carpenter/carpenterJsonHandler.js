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
import __SFrontspec from '@coffeekraken/s-frontspec';
import __SPromise from '@coffeekraken/s-promise';
import __SSpecs from '@coffeekraken/s-specs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default function carpenterJsonHandler({ req, res, pageConfig }) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const bench = new __SBench('data.carpenterJsonHandler');
        const carpenterSources = (_a = __SSugarConfig.get('carpenter.sources')) !== null && _a !== void 0 ? _a : {};
        const frontspec = new __SFrontspec(), frontspecJson = yield frontspec.read();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sa0JBQWtCLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsTUFBTSxDQUFDLE9BQU8sVUFBVSxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0lBQ2pFLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1FBQzVELE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFFeEQsTUFBTSxnQkFBZ0IsR0FBRyxNQUFBLGNBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBRXZFLE1BQU0sU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLEVBQ2hDLGFBQWEsR0FBRyxNQUFNLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUzQyxNQUFNLFFBQVEsR0FBRyxFQUFFLEVBQ2YsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUV4QixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3RCLGNBQWMsQ0FBQyxHQUFHLENBQUMsbUNBRVosTUFBTSxLQUNULEtBQUssRUFBRSxFQUFFLEdBQ1osQ0FBQzthQUNMO1lBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNyQyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUU5RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixNQUFNLFNBQVMsR0FBRyxNQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFckMsTUFBTSxJQUFJLEdBQ04sTUFBQSxDQUFDLE1BQU0sa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO2dCQUVoRSxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUU3QyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLENBQUM7Z0JBQ3JELFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO2FBQ3ZDO1NBQ0o7UUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0IsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRVosR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNMLFFBQVE7WUFDUixjQUFjO1lBQ2QsU0FBUyxFQUFFLGFBQWE7U0FDM0IsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDO1lBQ0osUUFBUTtZQUNSLGNBQWM7WUFDZCxTQUFTLEVBQUUsYUFBYTtTQUMzQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9