import __SBench from '@coffeekraken/s-bench';
import __SDataFileGeneric from '@coffeekraken/s-data-file-generic';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __SSpecs from '@coffeekraken/s-specs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default function carpenterJsonHandler({ req, res, pageConfig }) {
    return new Promise(async (resolve) => {
        const bench = new __SBench('data.carpenterJsonHandler');

        const carpenterSources = __SSugarConfig.get('carpenter.sources') ?? {};

        const frontspec = new __SFrontspec(),
            frontspecJson = await frontspec.read();

        const specsMap = {},
            specsBySources = {};

        for (let [key, source] of Object.entries(carpenterSources)) {
            if (!specsBySources[key]) {
                specsBySources[key] = {
                    // @ts-ignore
                    ...source,
                    specs: {},
                };
            }

            const specsInstance = new __SSpecs();
            const specsArray = specsInstance.list(source.specsNamespaces);

            for (let i = 0; i < specsArray.length; i++) {
                const specs = specsArray[i];

                const specsJson = await specs.read();

                const data =
                    (await __SDataFileGeneric.load(specsJson.metas.path)) ?? {};

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
    });
}
