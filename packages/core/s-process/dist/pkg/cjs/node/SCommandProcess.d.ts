import { ISCommandProcessParams, ISCommandProcessSettings, ISProcessResultObject } from './ISProcess';
import __SProcess from './SProcess';

export default class SCommandProcess extends __SProcess {
    
    constructor(initialParams?: Partial<ISCommandProcessParams>, settings?: Partial<ISCommandProcessSettings>);
    
    process(params: Partial<ISCommandProcessParams>, settings?: Partial<ISCommandProcessSettings>): Promise<ISProcessResultObject>;
}
