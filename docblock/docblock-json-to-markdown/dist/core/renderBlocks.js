"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderBlocks;

const _get = require("lodash/get");

function renderBlocks(blocks, settings = {}) {
  blocks = blocks.filter(block => {
    return !block._done;
  });
  if (!blocks.length) return;
  const ret = [];

  if (settings.title) {
    if (settings.title.substr(0, 1) === "@") {
      ret.push(`\n${Array(this._titleLevel() + 1).join("#")} ${_get(blocks, settings.title.substr(1))}\n`);
    } else {
      ret.push(`\n${Array(this._titleLevel() + 1).join("#")} ${settings.title}\n`);
    }
  }

  if (settings.description) {
    if (settings.description.substr(0, 1) === "@") {
      ret.push(`${_get(blocks, settings.description.substr(1))}`);
    } else {
      ret.push(settings.description);
    }
  } // handle doNotRender


  if (settings.doNotRender) {
    settings.doNotRender.forEach(doNotRenderProperty => {
      blocks.forEach(block => {
        settings.doNotRender.forEach(property => {
          delete block[property];
        });
      });
    });
  }

  blocks.forEach(block => {
    ret.push(this._renderBlock(block));
  }); // if we have an titleLevelAdd in settings,
  // increase the title level by this value

  if (settings.titleLevelAdd) {
    this._titleLevel(settings.titleLevelAdd);
  }

  return ret.join("\n");
}

module.exports = exports.default;