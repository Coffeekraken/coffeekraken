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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3RQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUmVxdWVzdFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLHVCQUF3QixTQUFRLFlBQVk7SUFDN0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsd0JBQXdCO2dCQUNyQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQUUsMktBQTJLO2dCQUN4TCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsK0VBQStFO2dCQUM1RixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLENBQUM7Z0JBQzlELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFBRSw0Q0FBNEM7Z0JBQ3pELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLG9HQUFvRztnQkFDakgsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQUUsZ0lBQWdJO2dCQUM3SSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFBRSxtSEFBbUg7Z0JBQ2hJLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxXQUFXLEVBQUUseUpBQXlKO2dCQUN0SyxJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNELGlCQUFpQixFQUFFO2dCQUNmLFdBQVcsRUFBRSx1S0FBdUs7Z0JBQ3BMLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2QsV0FBVyxFQUFFLG9JQUFvSTtnQkFDakosSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsV0FBVyxFQUFFLG1MQUFtTDtnQkFDaE0sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUFFLDhKQUE4SjtnQkFDM0ssSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUFFLGlFQUFpRTtnQkFDOUUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsYUFBYSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxDQUFDO2dCQUN2RSxPQUFPLEVBQUUsTUFBTTthQUNsQjtZQUNELGdCQUFnQixFQUFFO2dCQUNkLFdBQVcsRUFBRSxzSkFBc0o7Z0JBQ25LLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxNQUFNO2FBQ2xCO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFdBQVcsRUFBRSx5REFBeUQ7Z0JBQ3RFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxZQUFZO2FBQ3hCO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFdBQVcsRUFBRSwrREFBK0Q7Z0JBQzVFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjO2FBQzFCO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2QsV0FBVyxFQUFFLDZEQUE2RDtnQkFDMUUsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRCxrQkFBa0IsRUFBRTtnQkFDaEIsV0FBVyxFQUFFLCtEQUErRDtnQkFDNUUsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxXQUFXLEVBQUUsK0VBQStFO2dCQUM1RixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQUUsc0ZBQXNGO2dCQUNuRyxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELGNBQWMsRUFBRTtnQkFDWixXQUFXLEVBQUUsNEtBQTRLO2dCQUN6TCxJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQUUsOERBQThEO2dCQUMzRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFBRSxrSUFBa0k7Z0JBQy9JLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFBRSw0SUFBNEk7Z0JBQ3pKLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFBRSw2SUFBNkk7Z0JBQzFKLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSxtSkFBbUo7Z0JBQ2hLLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFBRSxzSkFBc0o7Z0JBQ25LLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxtRUFBbUU7Z0JBQ2hGLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFBRSxzS0FBc0s7Z0JBQ25MLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0Qsa0JBQWtCLEVBQUU7Z0JBQ2hCLFdBQVcsRUFBRSx1S0FBdUs7Z0JBQ3BMLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9