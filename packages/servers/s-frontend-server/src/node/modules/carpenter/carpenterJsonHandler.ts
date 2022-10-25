import __SBench from '@coffeekraken/s-bench';
import __SDataFileGeneric from '@coffeekraken/s-data-file-generic';
import __SPromise from '@coffeekraken/s-promise';
import __SSpecs from '@coffeekraken/s-specs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default function carpenterJsonHandler({ req, res, pageConfig }) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        __SBench.start('data.carpenterJsonHandler');

        const carpenterSources = __SSugarConfig.get('carpenter.sources') ?? {};

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
    });
}
