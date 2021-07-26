import __SSugarConfig from '@coffeekraken/s-sugar-config';

const packageJson = __SSugarConfig.get('packageJson');

export default function isLicense(conditional, options) {
    let license = this.license ?? packageJson.license;

    if (license.toLowerCase() === conditional.toLowerCase()) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

}