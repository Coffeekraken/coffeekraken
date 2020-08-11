"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var __sugarConfig = require('../../../config/sugar');

var __fs = require('fs');

var __marked = require('marked');

var __jsDom = require('jsdom').JSDOM;

var __filter = require('../../../object/filter');
/**
 * @name                search
 * @namespace           node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the "search" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function search(req, server) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (resolve, reject) {
      var title = "Search results |\xA018 results";
      var keyword = req.params[0] ? req.params[0].split(' ')[0] : 'doc';
      var searchString = req.params[0] ? req.params[0].replace(keyword, '') : '';

      var searchRules = __sugarConfig('frontend.handlers.search.settings.rules'); // preparing the handlers to use for the research


      var handlers = __filter(searchRules, rule => {
        if (rule.keyword && rule.keyword === keyword) return true;
        return false;
      }); // loop on each handlers to proceed to the search


      var resultsArray = [];

      for (var key in handlers) {
        var handler = handlers[key];
        var results = yield handler.handler(searchString, handler.settings);
        resultsArray = [...resultsArray, ...results];
      } // pass all the results info JSON format


      resultsArray = resultsArray.map(item => {
        return item.toJson();
      }); // send back the result

      resolve({
        view: 'components.search',
        title,
        content: resultsArray,
        type: 'application/json'
      });
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};