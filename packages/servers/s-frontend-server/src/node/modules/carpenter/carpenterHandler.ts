import __SBench from '@coffeekraken/s-bench';
import __SPromise from '@coffeekraken/s-promise';
import __SSpecs from '@coffeekraken/s-specs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default function carpenterHandler({ req, res, pageConfig }) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        __SBench.start('data.carpenterHandler');

        __SBench.step('data.carpenterHandler', 'beforeSitemapRead');

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

            specsArray.forEach((specs) => {
                const specsJson = specs.read();
                specsBySources[key].specs[specs.dotpath] = specsJson;
                specsMap[specs.dotpath] = specsJson;
            });
        }

        __SBench.step('data.carpenterHandler', 'afterSitemapRead');

        __SBench.end('data.carpenterHandler').log();

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
