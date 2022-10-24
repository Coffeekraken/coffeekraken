import __SBench from '@coffeekraken/s-bench';
import __SPromise from '@coffeekraken/s-promise';
import __SSpecs from '@coffeekraken/s-specs';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import __SCarpenter from '@coffeekraken/s-carpenter';

export default function carpenterHandler({ req, res, pageConfig }) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        __SBench.start('data.carpenterHandler');

        __SBench.step('data.carpenterHandler', 'beforeSitemapRead');

        // load current component/section/... specs
        const specsInstance = new __SSpecs();
        const currentSpecs = await specsInstance.read(req.params.dotpath);

        // load the global carpenter specs
        const carpenterInstance = new __SCarpenter();
        const carpenterSpecs = await carpenterInstance.loadSpecs();

        // render the current component/section, etc...
        const currentViewResult = await res.viewRenderer.render(
            currentSpecs.viewPath,
            currentSpecs.metas.path,
        );

        const errors = {
            pageConfig,
            views: [],
            layout: undefined,
        };

        let layoutPath = pageConfig.layout ?? 'layouts.carpenter';
        const layoutData = Object.assign({}, res.templateData ?? {});
        let finalResult;

        // rendering layout using data
        try {
            const layoutPromise = res.viewRenderer.render(layoutPath, {
                ...layoutData,
                carpenter: carpenterSpecs,
                body: currentViewResult.value,
            });
            pipe(layoutPromise);
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
            console.log(e);
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
