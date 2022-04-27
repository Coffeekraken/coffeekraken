import __SDocmap from '@coffeekraken/s-docmap';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default async function docmap(express, settings, config) {
    const docmap = new __SDocmap();
    const docmapJson = await docmap.read();
    const menu = docmapJson.menu;

    // register handler
    config.handlers.styleguide = {
        path: `${__dirname()}/styleguideHandler`,
    };

    // @ts-ignore
    // Object.keys(menu.custom.styleguide?.slug).forEach((slug) => {
    //     config.routes[slug] = {
    //         handler: 'styleguide',
    //     };
    // });

    return true;
}
