// @ts-nocheck
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __path from 'path';
import __SSugarJson from '../node/SSugarJson';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        console.log(
            `<yellow>[search]</yellow> Searching for <yellow>sugar.json</yellow> files that are used in your <magenta>current context</magenta>...`,
        );
        const sugarJson = new __SSugarJson();
        const list = await sugarJson.search();
        list.forEach((path) => {
            console.log(
                `<yellow>[file]</yellow> <cyan>${__path.relative(
                    __packageRootDir(),
                    path,
                )}</cyan>`,
            );
        });
        console.log(
            `<green>[success]</green> <magenta>${list.length}</magenta> file(s) found`,
        );
        resolve();
    });
};
