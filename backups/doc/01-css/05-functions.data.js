import { getFunctionsList } from '@coffeekraken/s-sugarcss-plugin';

export default async function () {
    const functions = getFunctionsList();
    return {
        functions,
    };
}
