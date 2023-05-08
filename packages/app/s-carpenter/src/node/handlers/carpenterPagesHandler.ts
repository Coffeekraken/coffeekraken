import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __glob from 'glob';

export interface ICarpenterPagesHandlerViewData {
    $specs?: any;
    $source?: any;
    [key: string]: any;
}

export interface ICarpenterPage {
    path: string;
    json: any;
}

function _getScopeRootPath(scope: string): string {
    const scopes = __SSugarConfig.get('carpenter.scopes');
    return scopes[scope]?.rootDir;
}

function _getPageJsonByUid(uid: string): ICarpenterPage | false {
    const scopes = __SSugarConfig.get('carpenter.scopes');
    for (let [scope, scopeObj] of Object.entries(scopes)) {
        const pathes = __glob.sync(`${uid}.{json,ts,js}`, {
            cwd: scopeObj.rootDir,
        });
        if (pathes.length) {
            return {
                path: pathes[0],
                json: JSON.parse(
                    __fs.readFileSync(
                        `${scopeObj.rootDir}/${pathes[0]}`,
                        'utf-8',
                    ),
                ),
            };
        }
    }
    return false;
}

export default async function carpenterPagesHandler({ req, res }) {
    let result = {};

    switch (req.method) {
        case 'POST':
            let pageJson = {
                type: 'page',
                uid: req.body.uid,
                name: req.body.name,
                slug: req.body.slug,
                scope: req.body.scope,
                nodes: req.body.nodes,
            };

            // // check if the page already exists
            // const existingPage = _getPageJsonByUid(req.body.uid);
            // if (existingPage) {
            //     res.status(406);
            //     res.type('application/json');
            //     res.send({
            //         error: __i18n('The page "%s" already exists', {
            //             id: 's-carpenter.page.alreadyExists',
            //             tokens: {
            //                 s: req.body.uid,
            //             },
            //         }),
            //     });
            // }

            // check scope
            const rootPath = _getScopeRootPath(req.body.scope);
            if (!rootPath) {
                throw new Error(
                    `<red>[SCarpenter]</red> The requested "${req.body.scope}" scope does not exists...`,
                );
            }

            // save the new page
            __fs.writeFileSync(
                `${rootPath}/${req.body.uid}.json`,
                JSON.stringify(pageJson, null, 4),
            );

            // set the result json
            Object.assign(result, req.body);

            break;
    }

    res.status(200);
    res.type('application/json');
    res.send(result);
}
