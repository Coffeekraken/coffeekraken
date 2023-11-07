import { __packageJsonSync } from '@coffeekraken/sugar/package';

export default (api) => {
    return {
        get json() {
            return __packageJsonSync('@coffeekraken/s-sugarcss-plugin');
        },
    };
};
