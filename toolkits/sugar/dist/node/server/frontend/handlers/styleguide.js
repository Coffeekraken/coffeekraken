"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var __fs = require('fs');

var __packageRoot = require('../../../path/packageRoot');

var __sugarConfig = require('../../../config/sugar');

var __render = require('../../../template/render');

var __standardizeJson = require('../../../npm/standardizeJson');

var __SPromise = require('../../../promise/SPromise');

var __SDocblock = require('../../../docblock/SDocblock');

var __SBuildScssCli = require('../../../build/scss/SBuildScssCli');

var __trimLines = require('../../../string/trimLines');
/**
 * @name                styleguide
 * @namespace           node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the "styleguide" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @event       server.frontend.handler.styleguide.start
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function styleguide(req, server) {
  return new __SPromise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (resolve, reject, trigger) {
      var viewPath = req.params[0].split('/').join('.');
      trigger('server.frontend.handler.styleguide.start', null);
      var resultObj = {
        view: null,
        data: {}
      };
      var currentPackageJson; // check if the passed request point to a valid coffeekraken sugar ready package

      var pr = __packageRoot();

      var packagePath = "".concat(pr, "/node_modules/").concat(req.params[0]);

      if (__fs.existsSync("".concat(packagePath, "/sugar.json"))) {
        currentPackageJson = require("".concat(packagePath, "/package.json"));

        var sugarJson = require("".concat(packagePath, "/sugar.json"));

        if (sugarJson.views && sugarJson.views.styleguide) {
          viewPath = "".concat(packagePath, "/").concat(sugarJson.views.styleguide);
        }

        resultObj.view = viewPath;
        resultObj.data.currentPackageJson = __standardizeJson(currentPackageJson); // check if we have a styleguide scss file to load

        if (sugarJson.scss && sugarJson.scss.styleguide) {
          var buildScssCli = new __SBuildScssCli({});
          var styleguidePromise = buildScssCli.run({
            input: "".concat(packagePath, "/").concat(sugarJson.scss.styleguide),
            sugarJsonDirs: packagePath
          });

          __SPromise.pipe(styleguidePromise, this);

          var styleguideRes = yield styleguidePromise; // parsing the docblock

          var docblock = new __SDocblock(styleguideRes.value); // set the blocks

          resultObj.data.css = styleguideRes.value;
          resultObj.data.blocks = docblock.toObject();
        }
      }

      resolve(resultObj);
    });

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }(), {
    id: 'server.handler.styleguide'
  }).start();
};