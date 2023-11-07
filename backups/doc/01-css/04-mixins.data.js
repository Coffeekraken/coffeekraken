import { getMixinsList } from '@coffeekraken/s-sugarcss-plugin';

export default async function () {
    const mixins = getMixinsList();
    return {
        mixins,
    };
}
