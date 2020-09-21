"use strict";

var _request = _interopRequireDefault(require("@coffeekraken/sugar/js/http/request"));

var _SWebComponent = _interopRequireDefault(require("@coffeekraken/sugar/js/webcomponent/SWebComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_SWebComponent.default.on('s-filtrable-input.ready', (_ref) => {
  var {
    target,
    value
  } = _ref;
  target.on('input', value => {
    (0, _request.default)({
      url: "/search/".concat(value),
      method: 'get'
    }).then(response => {
      // set the items in the search dropdown
      var items = response.data.map(item => {
        return {
          title: item.title,
          description: item.description
        };
      });
      target.prop('items', items);
      console.log(items); // do something...
    });
  });
});