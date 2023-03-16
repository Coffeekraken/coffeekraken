import __SBench from '@coffeekraken/s-bench';
import __SSpecs from '@coffeekraken/s-specs';
import __SViewRenderer from '@coffeekraken/s-view-renderer';

export default async function carpenterViewHandler({
    req,
    res,
    specs,
    params,
}) {
    const bench = new __SBench('data.carpenterViewHandler');

    bench.step('beforeSpecsRead');

    // load current component/section/... specs
    const specsInstance = new __SSpecs();
    const currentSpecs = await specsInstance.read(req.params.dotpath);

    if (!currentSpecs) {
        return res.send(
            `The requested spec "${req.params.dotpath}" does not exists...`,
        );
    }

    const viewPath =
        currentSpecs.viewPath ?? req.params.dotpath.replace(/^views\./, '');

    // render the current component/section, etc...
    const renderer = new __SViewRenderer();
    const currentViewResult = await renderer.render(
        viewPath,
        currentSpecs.metas.path,
    );

    const errors = {
        views: [],
        layout: undefined,
    };

    let layoutPath = 'sugar.layouts.carpenter.carpenter',
        finalResult;

    // rendering layout using data
    try {
        const layoutPromise = renderer.render(layoutPath, {
            carpenter: specs,
            frontspec: {
                assets: {
                    carpenterModule: {
                        type: 'module',
                        defer: true,
                        src: params.dev
                            ? `http://0.0.0.0:${params.vitePort}/src/js/index.ts`
                            : '/carpenter/index.esm.js',
                    },
                    // carpenterStyle: {
                    //     id: 'carpenter',
                    //     defer: true,
                    //     src: '/carpenter/index.css',
                    // },
                    module: {
                        type: 'module',
                        defer: true,
                        src: params.jsPath,
                    },
                    style: {
                        id: 'global',
                        defer: true,
                        src: params.cssPath,
                    },
                },
            },
            body: currentViewResult.value,
        });
        const layoutRes = await layoutPromise;
        finalResult = layoutRes.value;

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
        finalResult = JSON.stringify(errors, null, 4).split(/\\n/).join(`\n\n`);
    }

    bench.end().log();

    res.status(200);
    res.type(
        errors.views.length || errors.layout ? 'application/json' : 'text/html',
    );
    res.send(finalResult);
}
