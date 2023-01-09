import __SInterface from '@coffeekraken/s-interface';

declare class SViteTestParamsInterface extends __SInterface {
    static get _definition(): {
        dir: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
        watch: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
    };
}
export default SViteTestParamsInterface;
