import __SInterface from '@coffeekraken/s-interface';

declare class SKitchenCopyActionParamsInterface extends __SInterface {
    static get _definition(): {
        src: {
            description: string;
            type: string;
            required: boolean;
        };
        dest: {
            description: string;
            type: string;
            required: boolean;
        };
        chdir: {
            description: string;
            type: string;
            default: boolean;
        };
    };
}
export default SKitchenCopyActionParamsInterface;
