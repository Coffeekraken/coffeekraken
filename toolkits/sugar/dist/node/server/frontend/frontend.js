"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var __sugarConfig = require('../../config/sugar');

var __deepMerge = require('../../object/deepMerge');

var __bladePhp = require('../../template/bladePhp');

var __SNav = require('../../nav/SNav');

var __deepMap = require('../../object/deepMap');

var __packageRoot = require('../../path/packageRoot');

var __standardizeJson = require('../../npm/standardizeJson');

var __fs = require('fs');

var __path = require('path');

var __SPromise = require('../../promise/SPromise');

var __rimraf = require('rimraf');

var __render = require('../../template/render');

var __express = require('express');

var __trimLines = require('../../string/trimLines');
/**
 * @name                express
 * @namespace           node.server.frontend
 * @type                Function
 *
 * This function take care of starting a frontend express based server
 *
 * @param         {Object}          [args={}]         The args object to configure the build process. Check the PhpSCli class definition object for available arguments
 * @return        {express}                       The server instance started
 *
 * @event         log       Some informations that you can or not display to your users
 *
 * @example       js
 * const frontendServer = require('@coffeekraken/sugar/node/server/frontend/frontend');
 * frontendServer({});
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */


module.exports = function (args) {
  if (args === void 0) {
    args = {};
  }

  var settings = __deepMerge(__sugarConfig('frontend'), args);

  var server = __express();

  var sNavInstance;
  var promise = new __SPromise(null, {
    id: 'server.frontend'
  }).start();
  settings.assets = __deepMap(settings.assets, (value, prop) => {
    if (prop === 'path') return value.replace(settings.express.rootDir, '');
    return value;
  }); // generate menus

  var menuStack = {};

  if (settings.menu) {
    sNavInstance = new __SNav('main', 'Main', []);
    Object.keys(settings.menu).forEach( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (menuName) {
        // generate the menus
        var generatorObj = settings.menu[menuName].generator;
        menuStack[menuName] = yield generatorObj.fn(generatorObj.directory); // add the nav to the main navigation

        sNavInstance.addItem(menuStack[menuName]);
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  } // build the "templateData" object to pass to the render engines


  var templateData = {
    env: process.env.NODE_ENV || 'development',
    settings: JSON.stringify(settings)
  };
  server.get('/', /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (req, res) {
      var indexHtmlPath = __packageRoot(process.cwd()) + '/index.html';
      var indexViewPath = "".concat(__sugarConfig('views.rootDir'), "/index.blade.php");

      if (__fs.existsSync(indexViewPath)) {
        // get the view content
        var viewContent = __fs.readFileSync("".concat(__sugarConfig('views.rootDir'), "/index.blade.php"), 'utf8');

        var view = 'index';

        var tmpDir = __path.resolve(__sugarConfig('views.rootDir'), 'tmp'); // check if the view does extend a special layout


        if (!viewContent.includes('@extends(')) {
          // make sure we have a tmp dir
          if (!__fs.existsSync(tmpDir)) __fs.mkdirSync(tmpDir); // copy the default layout

          __fs.copyFileSync(__path.resolve(__dirname, 'views/layouts/main.blade.php'), __path.resolve(tmpDir, 'main.blade.php')); // generate a new view that will extends the default one provided by sugar


          var newViewContent = "\n          @extends('tmp.main')\n          @section('content')\n            ".concat(viewContent, "\n          @endsection\n        ");

          __fs.writeFileSync(__path.resolve(tmpDir, 'index.blade.php'), newViewContent); // change the view to render


          view = 'tmp.index';
        } // render the view


        var _result = yield __bladePhp(view, _objectSpread({
          packageJson: __standardizeJson(require(__packageRoot(process.cwd()) + '/package.json'))
        }, templateData)); // remove tmp folder


        __rimraf.sync(tmpDir);

        res.send(_result);
      } else if (__fs.existsSync(indexHtmlPath)) {
        var content = __fs.readFileSync(indexHtmlPath, 'utf8');

        if (!content.includes('<body')) {
          var baseContent = __fs.readFileSync(__dirname + '/static/index.html', 'utf8');

          var stringToCompile = baseContent.replace('[content]', content); // const result = renderTemplate(stringToCompile, templateData);

          res.send(result);
        } else {
          // const result = renderTemplate(content, templateData);
          res.send(result);
        }
      } else {
        res.send("You need to create at least one of these files:\n      <ul>\n        <li>".concat(indexHtmlPath, "</li>\n        <li>").concat(indexViewPath, "</li>\n      </ul>\n      "));
      }
    });

    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }()); // loop on handlers

  Object.keys(settings.handlers).forEach( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(function* (pageName) {
      var handlerSettings = settings.handlers[pageName];

      var handlerFn = require(handlerSettings.handler);

      server.get(["".concat(handlerSettings.slug, "/*"), "".concat(handlerSettings.slug)], /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator(function* (req, res) {
          try {
            var handlerPromise = handlerFn(req, server);

            __SPromise.pipe(handlerPromise, promise);

            var response = yield handlerPromise; // handle response

            var view = response.view || 'pages.404';
            var data = response.data || null;
            var title = response.title || 'Page not found';
            var type = response.type || 'text/html'; // prepariong the result

            var _result2;

            switch (type.toLowerCase()) {
              case 'application/json':
                _result2 = data;
                break;

              case 'text/html':
              default:
                _result2 = yield __render(view, _objectSpread(_objectSpread({
                  packageJson: __standardizeJson(require(__packageRoot(process.cwd()) + '/package.json'))
                }, templateData), data));
                break;
            } // send the result to the client


            res.send(_result2);
          } catch (e) {
            // console.log(e);
            throw new Error(e); // res.redirect('/404');
          }
        });

        return function (_x5, _x6) {
          return _ref4.apply(this, arguments);
        };
      }());
    });

    return function (_x4) {
      return _ref3.apply(this, arguments);
    };
  }());
  promise.trigger('log', {
    type: 'header',
    value: __trimLines("Your <primary>Frontend Express</primary> server is <green>up and running</green>:\n\n      - Hostname        : <yellow>".concat(settings.hostname, "</yellow>\n      - Port            : <yellow>").concat(settings.port, "</yellow>\n      - Root directory  : <yellow>").concat(settings.rootDir, "</yellow>\n      - URL             : <cyan>http://").concat(settings.hostname, ":").concat(settings.port, "</cyan>"))
  });
  server.listen(settings.express.port, settings.express.hostname);
  return promise;
};