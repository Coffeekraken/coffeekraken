
export interface ISDurationObject {
    startTime: number;
    endTime: number;
    duration: number;
    formatedDuration: string;
}
export default class SDuration {
    
    settings: {};
    
    startTime: any;
    
    endTime: any;
    
    duration: any;
    
    constructor(settings?: {});
    
    toObject(settings?: {}): ISDurationObject;
    
    start(startTime?: any): this;
    
    end(settings?: {}): ISDurationObject;
}
