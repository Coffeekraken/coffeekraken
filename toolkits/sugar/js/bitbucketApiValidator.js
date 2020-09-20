"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var __axios = require('axios');
/**
 * @name                            bitbucketApiValidator
 * @namespace           node.auth
 * @type                            Function
 * @async
 *
 * Make sure the bitbucket api authentification has been made correctly
 *
 * @param           {Object}              authInfo            The authentification info
 * @return          {Promise}                                 true if ok, false (or error message) if it's not...
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = /*#__PURE__*/function () {
  var _bitbucketApiValidator = _asyncToGenerator(function* (authInfo) {
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (resolve, reject) {
        var url = 'https://api.bitbucket.org/2.0/repositories';

        switch (authInfo.type) {
          case 'basic':
            __axios.get(url, {
              headers: authInfo.headers
            }).then(response => {
              resolve(true);
            }).catch(e => {
              resolve("Your credentials have been declined. Please try again...");
            });

            break;

          case 'bearer':
            __axios.get(url, {
              headers: authInfo.headers
            }).then(response => {
              console.log('resp', response);
              process.exit();
              resolve(true);
            }).catch(e => {
              resolve("Your token has been declined. Please try again...");
            });

            break;
        }
      });

      return function (_x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());
  });

  function bitbucketApiValidator(_x) {
    return _bitbucketApiValidator.apply(this, arguments);
  }

  return bitbucketApiValidator;
}();