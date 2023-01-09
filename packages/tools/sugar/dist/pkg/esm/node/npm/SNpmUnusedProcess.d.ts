import _SInterface from '@coffeekraken/s-interface';
import __SProcess, { ISProcessSettings } from '@coffeekraken/s-process';

interface ISNpmUnusedProcessSettings extends ISProcessSettings {
}
interface ISNpmUnusedProcessParams {
    clean: boolean;
    skipMissing: boolean;
    skipDev: boolean;
}
interface ISNpmUnusedProcess {
}
export declare class SNpmUnusedParamsInterface extends _SInterface {
    static get _definition(): {
        clean: {
            type: string;
            alias: string;
            description: string;
            default: boolean;
        };
        skipDev: {
            type: string;
            description: string;
            default: boolean;
        };
        skipMissing: {
            type: string;
            description: string;
            default: boolean;
        };
    };
}
declare class SNpmUnusedProcess extends __SProcess implements ISNpmUnusedProcess {
    
    constructor(initialParams?: {}, settings?: Partial<ISNpmUnusedProcessSettings>);
    
    process(params?: Partial<ISNpmUnusedProcessParams>, settings?: Partial<ISNpmUnusedProcessSettings>): any;
}
export default SNpmUnusedProcess;
