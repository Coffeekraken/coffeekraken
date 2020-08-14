"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sugarHeading;

function sugarHeading(data) {
  if (data === void 0) {
    data = {};
  }

  var version = '';
  if (data.version) version = "<white>".concat(data.version, "</white>");
  var author = 'Coffeekraken';
  if (data.author) author = data.author;
  var value = ["<yellow>\u2588</yellow>", "<yellow>\u2588     ____                           </yellow>", "<yellow>\u2588   / ____|</yellow><white>Coffee<cyan>kraken</cyan></white><yellow> __ _ _ __   </yellow>", // `<yellow>█   / ___| _   _  __ _  __ _ _ __   </yellow>`,
  '<yellow>█   \\___ \\| | | |/ _` |/ _` | `__|  </yellow>', "<yellow>\u2588    ___) | |_| | (_| | (_| | |       </yellow>", "<yellow>\u2588   |____/ \\__,_|\\__, |\\__,_|_|</yellow> ".concat(version, "    "), "<yellow>\u2588                |___/</yellow>", "<yellow>\u2588</yellow>"].join('\n');
  return value;
}

module.exports = exports.default;