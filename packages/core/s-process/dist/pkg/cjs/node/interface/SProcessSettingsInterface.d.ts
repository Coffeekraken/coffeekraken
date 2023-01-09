import __SInterface from '@coffeekraken/s-interface';

declare class SProcessSettingsInterface extends __SInterface {
    static get _definition(): {
        killOnError: {
            description: string;
            type: string;
            default: any;
        };
        stdio: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        collectStdout: {
            description: string;
            type: string;
            default: boolean;
        };
        collectStderr: {
            description: string;
            type: string;
            default: boolean;
        };
        throw: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        exitAtEnd: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        runAsChild: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        processPath: {
            description: string;
            type: string;
            default: any;
        };
    };
}
export default SProcessSettingsInterface;
