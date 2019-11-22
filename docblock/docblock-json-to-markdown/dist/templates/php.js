"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scssTemplate;

function scssTemplate(data) {
  return [this.renderBlocks(data.filter((block, index) => {
    return index === 0;
  }), {
    title: "@[0].name",
    titleLevelAdd: 1,
    doNotRender: ["name"]
  }), this.renderBlocks(data.filter(block => {
    return block.constructor === true;
  }), {
    title: "Constructor",
    doNotRender: ["name"]
  }), this.renderBlocks(data.filter(function (block) {
    return !block.return && block.types !== undefined && !block.private && !block.protected;
  }), {
    title: "Public properties"
  }), this.renderBlocks(data.filter(block => {
    return block.static === true && block.public;
  }), {
    title: "Static methods"
  }), this.renderBlocks(data.filter(block => {
    return block.public === true;
  }), {
    title: "Public methods"
  }), this.renderBlocks(data.filter(block => {
    return block.protected === true;
  }), {
    title: "Protected methods"
  })].join("\n");
}

module.exports = exports.default;