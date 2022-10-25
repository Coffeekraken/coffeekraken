import __SDataFileGeneric from '@coffeekraken/s-data-file-generic';
import __SPromise from '@coffeekraken/s-promise';
import __SSpecs from '@coffeekraken/s-specs';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';

export default function carpenter(app, settings, config) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        // handlers
        config.handlers.carpenterJson = {
            description: 'Serve the carpenter data in JSON',
            path: `${__dirname()}/carpenterJsonHandler`,
            ettings: {},
        };
        config.handlers.carpenter = {
            description:
                'Serve the carpenter page that display a component at a time',
            path: `${__dirname()}/carpenterHandler`,
            ettings: {},
        };

        // pages
        config.pages.carpenterJson = {
            description: 'Serve the carpenter data in JSON',
            slugs: ['/carpenter.json'],
            handler: 'carpenterJson',
        };

        config.pages.carpenter = {
            description:
                'Serve the carpenter page that display a component at a time',
            slugs: ['/carpenter', '/carpenter/:dotpath'],
            handler: 'carpenter',
        };

        app.post('/carpenter/:dotpath', async (req, res) => {
            // read the requested spec file
            const specsInstance = new __SSpecs(),
                specs = await specsInstance.read(req.params.dotpath, {
                    loadDataFile: true,
                });

            // take in consideration the optional "viewPath" property in the spec file
            const viewPath =
                specs.viewPath ?? req.params.dotpath.replace(/^views\./, '');

            // load the original data file alongside the spec one
            let originalData = {};
            if (specs.metas.path) {
                originalData = await __SDataFileGeneric.load(specs.metas.path);
            }

            // render the view with the merged data
            const result = await res.viewRenderer.render(
                viewPath,
                __deepMerge(originalData, req.body ?? {}),
            );

            res.status(200);
            res.type('text/html');
            res.send(result.value);
        });

        resolve(true);
    });
}
