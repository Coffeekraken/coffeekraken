import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SRequestParamsInterface
 * @namespace           shared.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SRequest parameters
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SRequestParamsInterface extends __SInterface {
    static get _definition() {
        return {
            url: {
                description: 'The url of the request',
                type: 'String',
                required: true
            },
            baseUrl: {
                description: 'Specify the base url to call like "https://api.github.com/2.0" for example. If the "url" setting is absolute, this setting will don\'t have any impact on your request...',
                type: 'String',
            },
            method: {
                description: 'The request method to use like GET, DELETE, HEAD, POST, OPTIONS, PUT or PATCH',
                type: 'String',
                values: ['GET','DELETE','HEAD','OPTIONS','POST','PUT','PATCH'],
                default: 'GET'
            },
            headers: {
                description: 'Specify some headers to add to the request',
                type: 'Object',
                default: {}
            },
            params: {
                description: 'Specify some params to be sent through the URL. Must be a plain object or a URLSearchParams object',
                type: 'Object',
                default: {}
            },
            data: {
                description: 'Specify some data you want to send with the request. This setting is available only for `PUT`, `POST`, and `PATCH` requests...',
                type: 'Object',
                default: {}
            },
            timeout: {
                description: 'Specify time to wait before aborting the actual request. If setted in number format, this will mean milliseconds.',
                type: 'Number',
                default: 0
            },
            transformRequest: {
                description: 'Allows changes to the request data before it is sent to the server. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Function'
            },
            transformResponse: {
                description: 'Allows changes to the response data to be made before it is passed to then/catch. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Function'
            },
            paramsSerializer: {
                description: 'An optional function in charge of serializing. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Function'
            },
            withCredentials: {
                description: 'Indicates whether or not cross-site Access-Control requests should be made using credentials. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Boolean',
                default: false
            },
            auth: {
                description: 'indicates that HTTP Basic auth should be used, and supplies credentials. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Object'
            },
            responseType: {
                description: 'Indicates encoding to use for decoding responses (Node.js only)',
                type: 'String',
                values: ['arraybuffer','blob','document','json','text','stream','blob'],
                default: 'json'
            },
            responseEncoding: {
                description: 'indicates encoding to use for decoding responses (Node.js only). See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'String',
                default: 'utf8',
            },
            xsrfCookieName: {
                description: 'The name of the cookie to use as a value for xsrf token',
                type: 'String',
                default: 'XSRF-TOKEN'
            },
            xsrfHeaderName: {
                description: 'The name of the http header that carries the xsrf token value',
                type: 'String',
                default: 'X-XSRF-TOKEN'
            },
            onUploadProgress: {
                description: 'Allows handling of progress events for uploads browser only',
                type: 'Function'
            },
            onDownloadProgress: {
                description: 'Allows handling of progress events for downloads browser only',
                type: 'Function'
            },
            maxContentLength: {
                description: 'Defines the max size of the http response content in bytes allowed in node.js',
                type: 'Number'
            },
            maxBodyLength: {
                description: '(Node only option) defines the max size of the http request content in bytes allowed',
                type: 'Number'
            },
            validateStatus: {
                description: 'Defines whether to resolve or reject the promise for a give HTTP response status code. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Function'
            },
            maxRedirects: {
                description: 'Defines the maximum number of redirects to follow in node.js',
                type: 'Number',
                default: 5
            },
            socketPath: {
                description: 'Defines a UNIX Socket to be used in node.js. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'String'
            },
            httpAgent: {
                description: 'Define a custom agent to be used when performing http. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Object'
            },
            httpsAgent: {
                description: 'Define a custom agent to be used when performing https. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Object'
            },
            proxy: {
                description: 'Defines the hostname, port, and protocol of the proxy server. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Object'
            },
            cancelToken: {
                description: 'Specifies a cancel token that can be used to cancel the request. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Object'
            },
            signal: {
                description: 'an alternative way to cancel Axios requests using AbortController',
                type: 'Object'
            },
            decompress: {
                description: 'indicates whether or not the response body should be decompressed automatically. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Boolean',
                default: true
            },
            insecureHTTPParser: {
                description: 'Indicates where to use an insecure HTTP parser that accepts invalid HTTP headers. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Object'
            }
        };
    }
}