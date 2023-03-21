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
import __SSpecs from '@coffeekraken/s-specs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default function carpenterJsonHandler({ req, res, pageConfig }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const bench = new __SBench('data.carpenterJsonHandler');
        const carpenterSources = (_a = __SSugarConfig.get('carpenter.sources')) !== null && _a !== void 0 ? _a : {};
        const frontspec = new __SFrontspec(), frontspecJson = yield frontspec.read();
        const finalSpecs = {};
        for (let [key, source] of Object.entries(carpenterSources)) {
            const specsInstance = new __SSpecs();
            const specsArray = specsInstance.list(source.specsNamespaces);
            for (let i = 0; i < specsArray.length; i++) {
                const specs = specsArray[i];
                const specsJson = yield specs.read();
                const data = (_b = (yield __SDataFileGeneric.load(specsJson.metas.path))) !== null && _b !== void 0 ? _b : {};
                __SSpecs.applyValuesToSpecs(data, specsJson);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sa0JBQWtCLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsTUFBTSxDQUFDLE9BQU8sVUFBVSxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0lBQ2pFLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7UUFDakMsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUV4RCxNQUFNLGdCQUFnQixHQUFHLE1BQUEsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFFdkUsTUFBTSxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsRUFDaEMsYUFBYSxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTNDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUV0QixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ3hELE1BQU0sYUFBYSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7WUFDckMsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFOUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFNUIsTUFBTSxTQUFTLEdBQUcsTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBRXJDLE1BQU0sSUFBSSxHQUNOLE1BQUEsQ0FBQyxNQUFNLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztnQkFFaEUsUUFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFFN0MsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLENBQUM7YUFDekM7U0FDSjtRQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM3QixLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFWixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM3QixHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ0wsS0FBSyxFQUFFLFVBQVU7WUFDakIsU0FBUyxFQUFFLGFBQWE7U0FDM0IsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDO1lBQ0osS0FBSyxFQUFFLFVBQVU7WUFDakIsU0FBUyxFQUFFLGFBQWE7U0FDM0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==