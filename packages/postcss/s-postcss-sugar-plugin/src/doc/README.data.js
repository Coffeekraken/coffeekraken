import {
    getFunctionsList,
    getMixinsList,
} from '@coffeekraken/s-postcss-sugar-plugin';

export default async function () {
    const functions = getFunctionsList(),
        mixins = getMixinsList();
    return {
        mixins,
        functions,
    };
}
