import __SDataFileGeneric from '@coffeekraken/s-data-file-generic';
import __SSpecs from '@coffeekraken/s-specs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import { __ensureDirSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __fs from 'fs';

export interface ICarpenterViewHandlerViewData {
    $specs?: any;
    $source?: any;
    [key: string]: any;
}

export default async function carpenterNodesHandler({ req, res }) {
    let currentSpecs,
        defaultViewData = {},
        viewData = {},
        viewPath;

    // if a "specs" is present in the body
    // it means that we want to update
    if (req.body.specs && (req.method === 'PUT' || req.method === 'POST')) {
        // load current component/section/... specs
        const specsInstance = new __SSpecs();
        currentSpecs = await specsInstance.read(req.body.specs);
        if (!currentSpecs) {
            return res.send(
                `The requested spec "${req.body.specs}" does not exists...`,
            );
        }
    }

    // render the current component/section, etc...
    const renderer = new __SViewRenderer({
        sharedData: res.templateData.shared ?? {},
    });

    // init the result object
    let result = {};

    // do something different depending on the method...
    // PUT: Render the passed node specs with the passed values and return the new HTML
    // POST: Save the passed node
    // DELETE: Delete the passed node
    // GET: Render the requested node
    switch (req.method) {
        case 'PUT':
        case 'POST':
            defaultViewData = __SSpecs.extractDefaults(currentSpecs);
            viewPath =
                currentSpecs.viewPath ?? req.body.specs.replace(/^views\./, '');
            viewData = <ICarpenterViewHandlerViewData>{};

            // mix defaults values with the passed ones
            viewData = __deepMerge(defaultViewData, req.body.values ?? {});

            // set the uid in the data
            viewData.uid = req.body.uid;

            // load the "...Source.data.js" data file to simulate a source
            // in the editor
            viewData.$source = await __SDataFileGeneric.load(
                currentSpecs.metas.path.replace('.spec.json', 'Source.json'),
            );
            break;
    }

    // handle saving data
    switch (req.method) {
        case 'POST':
            // save the new node
            const nodesDir = __SSugarConfig.get('storage.src.nodesDir');
            __ensureDirSync(nodesDir);
            __fs.writeFileSync(
                `${nodesDir}/${req.body.uid}.json`,
                JSON.stringify(req.body, null, 4),
            );
            break;
    }

    // handle view data
    switch (req.method) {
        case 'PUT': // update node html
            const currentViewResult = await renderer.render(viewPath, viewData);
            result.html = currentViewResult.value;
            result.uid = req.params.uid ?? req.body.uid;
            break;
        case 'POST': // save a node
            result = req.body;
            break;
        case 'DELETE': // delete a node
            result.uid = req.params.uid;
            break;
        case 'GET': // get a node JSON
        default:
            result.uid = req.params.uid;
            break;
    }

    res.status(200);
    res.type('application/json');
    res.send(result);
}
