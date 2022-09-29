import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SRequestParamsInterface
 * @namespace           shared.interface
 * @type                      Class
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
                required: true,
            },
            baseUrl: {
                description: 'Specify the base url to call like "https://api.github.com/2.0" for example. If the "url" setting is absolute, this setting will don\'t have any impact on your request...',
                type: 'String',
            },
            method: {
                description: 'The request method to use like GET, DELETE, HEAD, POST, OPTIONS, PUT or PATCH',
                type: 'String',
                values: [
                    'GET',
                    'DELETE',
                    'HEAD',
                    'OPTIONS',
                    'POST',
                    'PUT',
                    'PATCH',
                ],
                default: 'GET',
            },
            headers: {
                description: 'Specify some headers to add to the request',
                type: 'Object',
                default: {},
            },
            params: {
                description: 'Specify some params to be sent through the URL. Must be a plain object or a URLSearchParams object',
                type: 'Object',
                default: {},
            },
            data: {
                description: 'Specify some data you want to send with the request. This setting is available only for `PUT`, `POST`, and `PATCH` requests...',
                type: 'Object',
                default: {},
            },
            timeout: {
                description: 'Specify time to wait before aborting the actual request. If setted in number format, this will mean milliseconds.',
                type: 'Number',
                default: 0,
            },
            transformRequest: {
                description: 'Allows changes to the request data before it is sent to the server. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Function',
            },
            transformResponse: {
                description: 'Allows changes to the response data to be made before it is passed to then/catch. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Function',
            },
            paramsSerializer: {
                description: 'An optional function in charge of serializing. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Function',
            },
            withCredentials: {
                description: 'Indicates whether or not cross-site Access-Control requests should be made using credentials. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Boolean',
                default: false,
            },
            auth: {
                description: 'indicates that HTTP Basic auth should be used, and supplies credentials. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Object',
            },
            responseType: {
                description: 'Indicates encoding to use for decoding responses (Node.js only)',
                type: 'String',
                values: [
                    'arraybuffer',
                    'blob',
                    'document',
                    'json',
                    'text',
                    'stream',
                    'blob',
                ],
                default: 'json',
            },
            responseEncoding: {
                description: 'indicates encoding to use for decoding responses (Node.js only). See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'String',
                default: 'utf8',
            },
            xsrfCookieName: {
                description: 'The name of the cookie to use as a value for xsrf token',
                type: 'String',
                default: 'XSRF-TOKEN',
            },
            xsrfHeaderName: {
                description: 'The name of the http header that carries the xsrf token value',
                type: 'String',
                default: 'X-XSRF-TOKEN',
            },
            onUploadProgress: {
                description: 'Allows handling of progress events for uploads browser only',
                type: 'Function',
            },
            onDownloadProgress: {
                description: 'Allows handling of progress events for downloads browser only',
                type: 'Function',
            },
            maxContentLength: {
                description: 'Defines the max size of the http response content in bytes allowed in node.js',
                type: 'Number',
            },
            maxBodyLength: {
                description: '(Node only option) defines the max size of the http request content in bytes allowed',
                type: 'Number',
            },
            validateStatus: {
                description: 'Defines whether to resolve or reject the promise for a give HTTP response status code. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Function',
            },
            maxRedirects: {
                description: 'Defines the maximum number of redirects to follow in node.js',
                type: 'Number',
                default: 5,
            },
            socketPath: {
                description: 'Defines a UNIX Socket to be used in node.js. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'String',
            },
            httpAgent: {
                description: 'Define a custom agent to be used when performing http. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Object',
            },
            httpsAgent: {
                description: 'Define a custom agent to be used when performing https. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Object',
            },
            proxy: {
                description: 'Defines the hostname, port, and protocol of the proxy server. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Object',
            },
            cancelToken: {
                description: 'Specifies a cancel token that can be used to cancel the request. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Object',
            },
            signal: {
                description: 'an alternative way to cancel Axios requests using AbortController',
                type: 'Object',
            },
            decompress: {
                description: 'indicates whether or not the response body should be decompressed automatically. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Boolean',
                default: true,
            },
            insecureHTTPParser: {
                description: 'Indicates where to use an insecure HTTP parser that accepts invalid HTTP headers. See [axios](https://github.com/axios/axios#response-schema) documentation for more.',
                type: 'Object',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sdUJBQXdCLFNBQVEsWUFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFBRSx3QkFBd0I7Z0JBQ3JDLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCwyS0FBMks7Z0JBQy9LLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCwrRUFBK0U7Z0JBQ25GLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRTtvQkFDSixLQUFLO29CQUNMLFFBQVE7b0JBQ1IsTUFBTTtvQkFDTixTQUFTO29CQUNULE1BQU07b0JBQ04sS0FBSztvQkFDTCxPQUFPO2lCQUNWO2dCQUNELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFBRSw0Q0FBNEM7Z0JBQ3pELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLG9HQUFvRztnQkFDeEcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQ1AsZ0lBQWdJO2dCQUNwSSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCxtSEFBbUg7Z0JBQ3ZILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFB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