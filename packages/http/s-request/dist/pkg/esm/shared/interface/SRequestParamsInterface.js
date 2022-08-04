import __SInterface from '@coffeekraken/s-interface';
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
                values: ['GET', 'DELETE', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH'],
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
                values: ['arraybuffer', 'blob', 'document', 'json', 'text', 'stream', 'blob'],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sdUJBQXdCLFNBQVEsWUFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFBRSx3QkFBd0I7Z0JBQ3JDLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFBRSwyS0FBMks7Z0JBQ3hMLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSwrRUFBK0U7Z0JBQzVGLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sQ0FBQztnQkFDOUQsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLDRDQUE0QztnQkFDekQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsb0dBQW9HO2dCQUNqSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFBRSxnSUFBZ0k7Z0JBQzdJLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLG1IQUFtSDtnQkFDaEksSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7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