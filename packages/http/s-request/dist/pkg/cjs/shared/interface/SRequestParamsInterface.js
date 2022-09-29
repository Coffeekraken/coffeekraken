"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
class SRequestParamsInterface extends s_interface_1.default {
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
exports.default = SRequestParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLHVCQUF3QixTQUFRLHFCQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUFFLHdCQUF3QjtnQkFDckMsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLDJLQUEySztnQkFDL0ssSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLCtFQUErRTtnQkFDbkYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFO29CQUNKLEtBQUs7b0JBQ0wsUUFBUTtvQkFDUixNQUFNO29CQUNOLFNBQVM7b0JBQ1QsTUFBTTtvQkFDTixLQUFLO29CQUNMLE9BQU87aUJBQ1Y7Z0JBQ0QsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLDRDQUE0QztnQkFDekQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1Asb0dBQW9HO2dCQUN4RyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxnSUFBZ0k7Z0JBQ3BJLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLG1IQUFtSDtnQkFDdkgsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELGdCQUFnQixFQUFFO2dCQUNkLFdBQVcsRUFDUCx5SkFBeUo7Z0JBQzdKLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0QsaUJBQWlCLEVBQUU7Z0JBQ2YsV0FBVyxFQUNQLHVLQUF1SztnQkFDM0ssSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxXQUFXLEVBQ1Asb0lBQW9JO2dCQUN4SSxJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQ1AsbUxBQW1MO2dCQUN2TCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQ1AsOEpBQThKO2dCQUNsSyxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1AsaUVBQWlFO2dCQUNyRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUU7b0JBQ0osYUFBYTtvQkFDYixNQUFNO29CQUNOLFVBQVU7b0JBQ1YsTUFBTTtvQkFDTixNQUFNO29CQUNOLFFBQVE7b0JBQ1IsTUFBTTtpQkFDVDtnQkFDRCxPQUFPLEVBQUUsTUFBTTthQUNsQjtZQUNELGdCQUFnQixFQUFFO2dCQUNkLFdBQVcsRUFDUCxzSkFBc0o7Z0JBQzFKLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxNQUFNO2FBQ2xCO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFdBQVcsRUFDUCx5REFBeUQ7Z0JBQzdELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxZQUFZO2FBQ3hCO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFdBQVcsRUFDUCwrREFBK0Q7Z0JBQ25FLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjO2FBQzFCO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2QsV0FBVyxFQUNQLDZEQUE2RDtnQkFDakUsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRCxrQkFBa0IsRUFBRTtnQkFDaEIsV0FBVyxFQUNQLCtEQUErRDtnQkFDbkUsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxXQUFXLEVBQ1AsK0VBQStFO2dCQUNuRixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQ1Asc0ZBQXNGO2dCQUMxRixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELGNBQWMsRUFBRTtnQkFDWixXQUFXLEVBQ1AsNEtBQTRLO2dCQUNoTCxJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1AsOERBQThEO2dCQUNsRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCxrSUFBa0k7Z0JBQ3RJLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCw0SUFBNEk7Z0JBQ2hKLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCw2SUFBNkk7Z0JBQ2pKLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCxtSkFBbUo7Z0JBQ3ZKLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFDUCxzSkFBc0o7Z0JBQzFKLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxtRUFBbUU7Z0JBQ3ZFLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCxzS0FBc0s7Z0JBQzFLLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0Qsa0JBQWtCLEVBQUU7Z0JBQ2hCLFdBQVcsRUFDUCx1S0FBdUs7Z0JBQzNLLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXhMRCwwQ0F3TEMifQ==