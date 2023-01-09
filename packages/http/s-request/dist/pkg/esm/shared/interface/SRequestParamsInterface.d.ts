import __SInterface from '@coffeekraken/s-interface';

export default class SRequestParamsInterface extends __SInterface {
    static get _definition(): {
        url: {
            description: string;
            type: string;
            required: boolean;
        };
        baseUrl: {
            description: string;
            type: string;
        };
        method: {
            description: string;
            type: string;
            values: string[];
            default: string;
        };
        headers: {
            description: string;
            type: string;
            default: {};
        };
        params: {
            description: string;
            type: string;
            default: {};
        };
        data: {
            description: string;
            type: string;
            default: {};
        };
        timeout: {
            description: string;
            type: string;
            default: number;
        };
        transformRequest: {
            description: string;
            type: string;
        };
        transformResponse: {
            description: string;
            type: string;
        };
        paramsSerializer: {
            description: string;
            type: string;
        };
        withCredentials: {
            description: string;
            type: string;
            default: boolean;
        };
        auth: {
            description: string;
            type: string;
        };
        responseType: {
            description: string;
            type: string;
            values: string[];
            default: string;
        };
        responseEncoding: {
            description: string;
            type: string;
            default: string;
        };
        xsrfCookieName: {
            description: string;
            type: string;
            default: string;
        };
        xsrfHeaderName: {
            description: string;
            type: string;
            default: string;
        };
        onUploadProgress: {
            description: string;
            type: string;
        };
        onDownloadProgress: {
            description: string;
            type: string;
        };
        maxContentLength: {
            description: string;
            type: string;
        };
        maxBodyLength: {
            description: string;
            type: string;
        };
        validateStatus: {
            description: string;
            type: string;
        };
        maxRedirects: {
            description: string;
            type: string;
            default: number;
        };
        socketPath: {
            description: string;
            type: string;
        };
        httpAgent: {
            description: string;
            type: string;
        };
        httpsAgent: {
            description: string;
            type: string;
        };
        proxy: {
            description: string;
            type: string;
        };
        cancelToken: {
            description: string;
            type: string;
        };
        signal: {
            description: string;
            type: string;
        };
        decompress: {
            description: string;
            type: string;
            default: boolean;
        };
        insecureHTTPParser: {
            description: string;
            type: string;
        };
    };
}
