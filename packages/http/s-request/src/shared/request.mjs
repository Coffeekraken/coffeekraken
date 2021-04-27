// @ts-nocheck
import __SRequest from './SRequest';
/**
 * @name                              request
 * @namespace           sugar.js.http
 * @type                              Function
 * @status              wip
 *
 * Easily create and send an http request. This will return an instance of the SAjax class.
 *
 * @param           {Object}              [settings={}]             The request settings. This support these settings and all the axio ones:
 * - url (null) {String}: The url on which to make the request
 * - baseURL (null) {String}: The base url on which to make the request.
 * - method (get) {String}: The method with the one to make the request. Can be GET,DELETE,HEAD,OPTIONS,POST,PUT,PATCH
 * - headers ({}) {Object}: An object to send through the headers
 * - params ({}) {Object}: Specify some params to be sent through the URL. Must be a plain object or a URLSearchParams object
 * - data ({}) {Object}: Specify some data you want to send with the request. This setting is available only for 'PUT', 'POST', and 'PATCH' requests...
 * - timeout (0) {Number}: Specify time to wait before aborting the actual request. If setted in number format, this will mean milliseconds. You can also specify this settings using string format like so: '2s', '1h', '4m', etc...
 * - sendInterval (1000) {Number}: Set the interval time between each requests if the sendCount setting is specified. If setted in number format, this is taken as millisenconds. You can also set the interval in string format like '34s', '1h', '10ms', '2d', etc...
 * - sendCount (1) {Number}: Set how many times the request has to be sent
 * - responseType (json) {String}: Indicates the type of data that the server will respond with
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import request from '@coffeekraken/sugar/js/http/request';
 * request({
 *    url: 'https://api.github.com/something/cool',
 *    method: 'get'
 * }).then(response => {
 *    // do something...
 * });
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function request(settings = {}) {
    const request = new __SRequest(settings);
    return request.send();
}
export default request;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvcy1yZXF1ZXN0L3NyYy9zaGFyZWQvcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILFNBQVMsT0FBTyxDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQzVCLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3hCLENBQUM7QUFDRCxlQUFlLE9BQU8sQ0FBQyJ9