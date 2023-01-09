import __SInterface from '@coffeekraken/s-interface';

export default class SPackageCheckDependenciesParamsInterface extends __SInterface {
    static get _definition(): {
        dirs: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
        installMissing: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
        packagesMap: {
            description: string;
            type: string;
            default: any;
        };
    };
}
