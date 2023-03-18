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
import __SSpecs from '@coffeekraken/s-specs';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import { __serverObjectFromExpressRequest } from '@coffeekraken/sugar/php';
export default function carpenterViewHandler({ req, res, specs, params, }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const bench = new __SBench('data.carpenterViewHandler');
        bench.step('beforeSpecsRead');
        const isRequestFromIframe = req.query.iframe !== undefined;
        // load current component/section/... specs
        const specsInstance = new __SSpecs();
        const currentSpecs = yield specsInstance.read(req.params.dotpath);
        if (!currentSpecs) {
            return res.send(`The requested spec "${req.params.dotpath}" does not exists...`);
        }
        let viewPath = (_a = currentSpecs.viewPath) !== null && _a !== void 0 ? _a : req.params.dotpath.replace(/^views\./, ''), viewData = currentSpecs.metas.path; // path to the data file
        // if the method is "POST",
        // meaning that it's a component update
        // with some component data passed.
        // we use these instead of the default ones
        if (req.method === 'POST' && req.body) {
            viewData = req.body;
        }
        // render the current component/section, etc...
        const renderer = new __SViewRenderer();
        const currentViewResult = yield renderer.render(viewPath, viewData);
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
        let layoutPath = 'sugar.layouts.carpenter.carpenter', finalResult;
        // rendering layout using data
        try {
            const layoutPromise = renderer.render(layoutPath, {
                carpenter: specs,
                $_SERVER: __serverObjectFromExpressRequest(req),
                frontspec: {
                    assets: Object.assign({ carpenterModule: {
                            type: 'module',
                            defer: true,
                            src: params.dev
                                ? `http://0.0.0.0:${params.vitePort}/src/js/index.ts`
                                : '/carpenter/index.esm.js',
                        }, carpenterStyle: {
                            id: 'carpenter',
                            defer: true,
                            src: params.dev
                                ? `http://0.0.0.0:${params.vitePort}/src/css/index.css`
                                : '/carpenter/index.css',
                        } }, (isRequestFromIframe
                        ? {
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
                        }
                        : {})),
                },
                body: currentViewResult.value,
            });
            const layoutRes = yield layoutPromise;
            finalResult = layoutRes.value;
            if (layoutRes.error) {
                errors.layout = {
                    layoutPath,
                    error: layoutRes.error,
                };
            }
            else {
                finalResult = layoutRes.value;
            }
        }
        catch (e) {
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
        res.type(errors.views.length || errors.layout ? 'application/json' : 'text/html');
        res.send(finalResult);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTNFLE1BQU0sQ0FBQyxPQUFPLFVBQWdCLG9CQUFvQixDQUFDLEVBQy9DLEdBQUcsRUFDSCxHQUFHLEVBQ0gsS0FBSyxFQUNMLE1BQU0sR0FDVDs7O1FBQ0csTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUV4RCxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFOUIsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUM7UUFFM0QsMkNBQTJDO1FBQzNDLE1BQU0sYUFBYSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDckMsTUFBTSxZQUFZLEdBQUcsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEUsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNmLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FDWCx1QkFBdUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLHNCQUFzQixDQUNsRSxDQUFDO1NBQ0w7UUFFRCxJQUFJLFFBQVEsR0FDSixNQUFBLFlBQVksQ0FBQyxRQUFRLG1DQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQ3ZFLFFBQVEsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLHdCQUF3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