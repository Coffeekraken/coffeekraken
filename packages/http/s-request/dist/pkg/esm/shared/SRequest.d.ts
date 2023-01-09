import __SClass from '@coffeekraken/s-class';

export interface ISRequestSettings {
}
export interface ISRequestParams {
    url: string;
    baseUrl?: string;
    method: 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH';
    headers: any;
    params: any;
    data: any;
    timeout: number;
}
export interface ISRequestAxiosResonse {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request: any;
}
export interface ISRequestResponse {
    status: number;
    statusText: string;
    data: any;
    count: number;
    axiosResponse: ISRequestAxiosResonse;
    axiosResponses: ISRequestAxiosResonse[];
}
export default class SRequest extends __SClass {
    
    _defaultRequestParams: {};
    
    _currentRequestSettings: {};
    
    _requestsCount: number;
    
    constructor(params: Partial<ISRequestParams>, settings?: Partial<ISRequestSettings>);
    
    _formatSuccessResponse(response: any): Promise<ISRequestResponse> | {
        status: any;
        statusText: any;
        data: any;
        count: any;
        axiosResponse: any;
        axiosResponses: any;
    };
    
    _formatErrorResponse(error: any): {
        count: any;
        axiosResponse: any;
        axiosResponses: any;
    };
    
    _send(requestSettings?: {}): any;
    
    retry(): Promise<ISRequestResponse>;
    
    send(requestSettings?: {}): Promise<ISRequestResponse>;
}
