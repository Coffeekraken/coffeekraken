import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';

const packageJson = __packageJsonSync();

export default function isLicense(conditional, options) {
    let license = this.license ?? packageJson.license;

    if (license.toLowerCase() === conditional.toLowerCase()) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
}
