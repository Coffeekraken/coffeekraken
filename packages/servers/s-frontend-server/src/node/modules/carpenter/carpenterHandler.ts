import __SBench from '@coffeekraken/s-bench';
import __SCarpenter from '@coffeekraken/s-carpenter';
import __SSpecs from '@coffeekraken/s-specs';

export default function carpenterHandler({ req, res, pageConfig }) {
    return new Promise(async (resolve) => {
        const bench = new __SBench('data.carpenterHandler');

        bench.step('beforeSitemapRead');

        // load current component/section/... specs
        const specsInstance = new __SSpecs();
        const currentSpecs = await specsInstance.read(req.params.dotpath);

        // load the global carpenter specs
        const carpenterInstance = new __SCarpenter();
        const carpenterSpecs = await carpenterInstance.loadSpecs();

        const viewPath =
            currentSpecs.viewPath ?? req.params.dotpath.replace(/^views\./, '');

        // render the current component/section, etc...
        const currentViewResult = await res.viewRenderer.render(
            viewPath,
            currentSpecs.metas.path,
        );

        const errors = {
            pageConfig,
            views: [],
            layout: undefined,
        };

        let layoutPath = pageConfig.layout ?? 'sugar.layouts.carpenter';
        const layoutData = Object.assign({}, res.templateData ?? {});
        let finalResult;

        // rendering layout using data
        try {
            const layoutPromise = res.viewRenderer.render(layoutPath, {
                ...layoutData,
                carpenter: carpenterSpecs,
                body: currentViewResult.value,
            });
            const layoutRes = await layoutPromise;

            if (layoutRes.error) {
                errors.layout = {
                    layoutPath,
                    error: layoutRes.error,
                };
            } else {
                finalResult = layoutRes.value;
            }
        } catch (e) {
            console.error(e);
        }

        if (errors.views.length || errors.layout) {
            errors.views = errors.views.map((viewObj) => {
                delete viewObj.data;
                return viewObj;
            });
            finalResult = JSON.stringify(errors, null, 4)
                .split(/\\n/)
                .join(`\n\n`);
        }

        res.status(200);
        res.type(
            errors.views.length || errors.layout
                ? 'application/json'
                : 'text/html',
        );
        res.send(finalResult);
        resolve();
    });
}
