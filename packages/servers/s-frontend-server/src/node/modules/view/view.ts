import __SDocmap from '@coffeekraken/s-docmap';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default async function view(express, settings, config) {
    const docmap = new __SDocmap();
    const docmapJson = await docmap.read();
    const menu = docmapJson.menu;

    // register handler
    config.handlers.view = {
        path: `${__dirname()}/viewHandler`
    };

    // @ts-ignore
    config.routes[settings.slug ?? '/view/*'] = {
        handler: 'view',
    };

    return true;
}
