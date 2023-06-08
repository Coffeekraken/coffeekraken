import __SClassmap from '@coffeekraken/s-classmap';

export default function ({ root, sharedData, postcssApi, settings, cacheDir }) {
    // if (!settings.compress?.variables) {
    //     return;
    // }

    const classmap = new __SClassmap();
    classmap.applyOnAst(root);
    classmap.saveSync();
    // console.log(classmap.map);
}
