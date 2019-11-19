"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scssTemplate;

function scssTemplate(data) {
  return [this.renderBlocks(data.filter((block, index) => {
    return index === 0;
  }), {
    title: '@[0].name',
    titleLevelAdd: 1,
    doNotRender: ['name']
  }), this.renderBlocks(data.filter(block => {
    return block.mixin === true && !block.private && !block.protected;
  }), {
    title: 'Mixins'
  }), this.renderBlocks(data.filter(block => {
    return block.function === true && !block.private && !block.protected;
  }), {
    title: 'Functions'
  }), this.renderBlocks(data.filter(block => {
    return block.types && !block.private && !block.protected;
  }), {
    title: 'Variables'
  })].join("\n");
}

module.exports = exports.default;