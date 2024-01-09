import __SDocmap from '@coffeekraken/s-docmap';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __sort } from '@coffeekraken/sugar/object';

export default async function (sharedData) {
    await __SSugarConfig.load();
    const docmap = new __SDocmap();
    const docmapJson = await docmap.read();

    let docblocks;
    const currentDocmapItem = docmapJson.map[sharedData.req.params.id];
    if (currentDocmapItem) {
        docblocks = await currentDocmapItem.parseDocblocksFromSourceFile();
    }

    function sort(items) {
        return __sort(items, (a, b) => {
            if (a.value.name < b.value.name) {
                return -1;
            }
            if (a.value.name > b.value.name) {
                return 1;
            }
            return 0;
        });
    }

    const categories = {
        getStarted: {
            title: 'Get Started',
            description:
                'All the documentations like install, get started, etc...',
            items: sort(
                (
                    await docmap.search({
                        type: 'Markdown',
                        id: '@website.sugarcss-coffeekraken-io.doc.**',
                    })
                ).items,
            ),
        },
        components: {
            title: 'Components',
            description: 'All the available components, etc...',
            items: sort(
                (
                    await docmap.search({
                        type: 'Styleguide',
                        id: '/.*.sugar.style.ui.*/',
                    })
                ).items,
            ),
        },
        helpers: {
            title: 'Helpers',
            description: 'All the available helpers, etc...',
            items: sort(
                (
                    await docmap.search({
                        type: 'Styleguide',
                        id: '/.*.sugar.style.helpers.*/',
                    })
                ).items,
            ),
        },
        mixins: {
            title: 'Mixins',
            description: 'All the available mixins',
            items: sort(
                (
                    await docmap.search({
                        type: 'PostcssMixin',
                        id: '@coffeekraken.s-sugarcss-plugin.**',
                    })
                ).items,
            ),
        },
        functions: {
            title: 'Functions',
            description: 'All the available functions',
            items: sort(
                (
                    await docmap.search({
                        type: 'PostcssFunction',
                        id: '@coffeekraken.s-sugarcss-plugin.**',
                    })
                ).items,
            ),
        },
        theming: {
            title: 'Theming',
            description: 'All the available theming configs',
            items: sort(
                (
                    await docmap.search({
                        type: 'Config',
                        id: '@coffeekraken.s-theme.**',
                    })
                ).items,
            ),
        },
        configs: {
            title: 'Configs',
            description: 'All the available configs',
            items: sort(
                (
                    await docmap.search({
                        type: 'Config',
                        id: '@coffeekraken.s-sugarcss-plugin.**',
                    })
                ).items,
            ),
        },
    };

    return {
        view: {
            clsStyle: true,
        },
        req: sharedData.req,
        docblocks,
        currentDocmapItem,
        categories,
    };
}
