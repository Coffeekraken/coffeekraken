import __SBench from '@coffeekraken/s-bench';
import __SSpecs from '@coffeekraken/s-specs';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import { __serverObjectFromExpressRequest } from '@coffeekraken/sugar/php';

export default async function carpenterViewHandler({
    req,
    res,
    specs,
    // params,
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

    let viewPath =
            currentSpecs.viewPath ?? req.params.dotpath.replace(/^views\./, ''),
        viewData = currentSpecs.metas.path; // path to the data file

    // if the method is "POST",
    // meaning that it's a component update
    // with some component data passed.
    // we use these instead of the default ones
    if (req.method === 'POST' && req.body) {
        viewData = req.body;
    }

    // render the current component/section, etc...
    const renderer = new __SViewRenderer({
        sharedData: res.templateData.shared ?? {},
    });
    const currentViewResult = await renderer.render(viewPath, viewData);

    // if the request if made with a POST method
    // this mean that it's just a component update
    // we don't need to render le layout, etc...
    if (req.method === 'POST') {
        res.status(200);
        res.type('text/html');
        return res.send(currentViewResult.value);
    }

    const errors = {
        views: [],
        layout: undefined,
    };

    let layoutPath = 'sugar.layouts.carpenter.carpenter',
        finalResult;

    // rendering layout using data
    try {
        const layoutPromise = renderer.render(layoutPath, {
            $_SERVER: __serverObjectFromExpressRequest(req),
            ...(res.templateData ?? {}),
            carpenter: specs,
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
