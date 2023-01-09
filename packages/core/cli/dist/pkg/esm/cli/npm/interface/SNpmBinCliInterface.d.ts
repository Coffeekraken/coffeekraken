import _SInterface from '../../../node/class/SInterface';
export default class SNpmBinInterface extends _SInterface {
    static get _definition(): {
        action: {
            type: string;
            required: boolean;
            alias: string;
            values: string[];
            description: string;
        };
        global: {
            type: string;
            required: boolean;
            alias: string;
            description: string;
            default: boolean;
        };
        package: {
            type: string;
            alias: string;
            description: string;
            default: any;
        };
        bin: {
            type: string;
            alias: string;
            description: string;
            default: any;
        };
    };
}
