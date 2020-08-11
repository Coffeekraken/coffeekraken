"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = {
  /**
   * @name                          config
   * @namespace           node.express.controllers.AppControllers
   * @type                          Function
   *
   * Return the whole configuration object or the specified value requested using the dot formated object key.
   *
   * @param                     {Object}                      req                     The express "req" object
   * @param                     {Object}                      res                     The express "res" object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  config: function () {
    var _config = _asyncToGenerator(function* (req, res) {
      var value;

      if (req.params[0]) {
        value = yield Squid.config(req.params[0]);
      } else {
        value = yield Squid.config();
      }

      res.send(value);
    });

    function config(_x, _x2) {
      return _config.apply(this, arguments);
    }

    return config;
  }(),

  /**
   * @name                          meta
   * @namespace           node.express.controllers.AppControllers
   * @type                          Function
   *
   * Return the application meta data
   *
   * @param                     {Object}                      req                     The express "req" object
   * @param                     {Object}                      res                     The express "res" object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  meta: (req, res) => {
    var value;

    if (req.params[0]) {
      value = Squid.meta(req.params[0]);
    } else {
      value = Squid.meta();
    }

    res.send(value);
  },

  /**
   * @name                js
   * @namespace           node.express.controllers.AppControllers
   * @type                Function
   *
   * Handle the base javascript route that serve the global and common files
   *
   * @param         {Object}        req           The req express object
   * @param         {Object}        res            The res express object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  js: function () {
    var _js = _asyncToGenerator(function* (req, res) {
      // read the common squid framework file
      var squidCommon = __fs.readFileSync("".concat(__dirname, "/../../../../").concat(yield Squid.config('dist.js.outputFolder'), "/common.bundle.js")); // read the common project file


      var projectCommon = __fs.readFileSync("".concat(process.cwd(), "/").concat(yield Squid.config('dist.js.outputFolder'), "/common.bundle.js"));

      var resultingScript = "".concat(squidCommon).concat(projectCommon); // resultingScript += `
      //   window.__squid = {
      //     config: '${__base64.encrypt(JSON.stringify(Squid.config))}',
      //     meta: '${__base64.encrypt(JSON.stringify(require(process.cwd() + '/package.json')))}'
      //   };`;
      // send gziped javascript files Content

      res.send(resultingScript);
    });

    function js(_x3, _x4) {
      return _js.apply(this, arguments);
    }

    return js;
  }()
};