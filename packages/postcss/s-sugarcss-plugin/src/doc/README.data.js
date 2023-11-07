import {
    getFunctionsList,
    getMixinsList,
} from '@coffeekraken/s-sugarcss-plugin';

export default async function () {
    const functions = getFunctionsList(),
        mixins = getMixinsList();
    return {
        mixins,
        functions,
    };
}
