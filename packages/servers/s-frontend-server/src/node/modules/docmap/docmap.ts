import __SDocmap from '@coffeekraken/s-docmap';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';

export default async function docmapRoutes(express, config) {

    const docmap = new __SDocmap();

    const menu = await docmap.extractMenu();

    Object.keys(menu.slug).forEach(slug => {
        config.routes[slug] = {
            handler: 'markdown'
        }
    });

}