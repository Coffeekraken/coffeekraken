import __SDocmap from '@coffeekraken/s-docmap';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';

export default async function docmap(express, config) {

    const docmap = new __SDocmap();
    const docmapJson = await docmap.read();
    const menu = docmapJson.menu;

    Object.keys(menu.slug).forEach(slug => {
        config.routes[slug] = {
            handler: 'markdown'
        }
    });
    if (menu.packages) {
        Object.keys(menu.packages).forEach(packageName => {
            const packageObj = menu.packages[packageName];
            Object.keys(packageObj.slug).forEach(slug => {
                config.routes[slug] = {
                    handler: 'markdown'
                }
            });
        });
    }

    return true;

}