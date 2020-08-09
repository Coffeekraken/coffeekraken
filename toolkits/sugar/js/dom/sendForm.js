"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sendForm;

var _SAjax = _interopRequireDefault(require("../http/SAjax"));

var _formSerialize = _interopRequireDefault(require("form-serialize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      sendForm
 * @namespace           js.dom
 * @type      Function
 *
 * Send a form through an ajax call and return back a promise resolved with the server response
 *
 * @param 		{HTMLFormElement} 		form 		The form to send
 * @return     {Promise}                    A promise resolved when the forn has been sent
 *
 * @example 	js
 * import sendForm from '@coffeekraken/sugar/js/dom/sendForm'
 * const myCoolForm = document.querySelector('.my-cool-form')
 * sentForm(myCoolForm).then((response) => {
 * 	// do something with the response
 * })
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function sendForm(form) {
  // protect
  if (!form.tagName || form.tagName.toLowerCase() !== 'form') {
    console.error('passed arguments', form);
    throw "The \"form\" parameter passed to the \"sendForm\" function is not a form";
  } // get the enctype


  var enctype = form.getAttribute('enctype') || 'application/x-www-form-urlencoded'; // encode form datas

  var data = null;

  if (enctype === 'application/x-www-form-urlencoded') {
    // serialize the form values
    data = (0, _formSerialize.default)(form);
  } else {
    data = new FormData(form);
  } // create ajax instance


  var ajx = new _SAjax.default({
    url: form.getAttribute('action'),
    method: form.getAttribute('method') || 'POST',
    data: data,
    contentType: enctype
  }); // set the loading attribute on the form

  form.setAttribute('loading', true); // send and return the promise

  var promise = ajx.send(); // listen for the end of loading

  promise.then(success => {
    form.removeAttribute('loading');
  }, error => {
    form.removeAttribute('loading');
  }); // return the promise

  return promise;
}

module.exports = exports.default;