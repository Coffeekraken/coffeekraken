"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var __sugarConfig = require('../../../config/sugar');

var __request = require('../../../http/request');
/**
 * @name                views
 * @namespace           node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the "views" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function views(req, server) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (resolve, reject) {
      var viewEngine = server.get('view engine');

      if (viewEngine === 'bladePhp') {
        var bladeSettings = __sugarConfig('blade');

        var viewsSettings = __sugarConfig('views');

        var renderedView = yield __request({
          url: "http://".concat(bladeSettings.server.hostname, ":").concat(bladeSettings.server.port).concat(req.path.substr(6), "?rootDir=").concat(viewsSettings.rootDir, "&cacheDir=").concat(viewsSettings.cacheDir),
          method: 'POST'
        }).catch(e => {
          console.log(e);
        });
        resolve(renderedView.data);
      } // resolve(path);

    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};