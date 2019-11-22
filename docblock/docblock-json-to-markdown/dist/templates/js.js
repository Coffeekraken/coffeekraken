"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = jsTemplate;

function jsTemplate(data) {
  return [this.renderBlocks(data.filter((block, index) => {
    return index === 0 && block.name && !block.private && !block.protected;
  }), {
    title: "@[0].name",
    titleLevelAdd: 1,
    doNotRender: ["name"]
  }), this.renderBlocks(data.filter(block => {
    return block.constructor === true;
  }), {
    doNotRender: ["name"],
    title: "Constructor"
  }), this.renderBlocks(data.filter(block => {
    return !block.event && block.styleguide !== undefined;
  }), {
    title: "Examples",
    description: "Here's some usage examples."
  }), this.renderBlocks(data.filter(block => {
    return !block.event && (block.prop !== undefined || block.attribute !== undefined);
  }), {
    title: "Attributes",
    description: "Here's the list of available attribute(s)."
  }), this.renderBlocks(data.filter(block => {
    return !block.event && block.setting !== undefined;
  }), {
    title: "Settings",
    description: "Here's the list of available setting(s)."
  }), this.renderBlocks(data.filter(block => {
    return !block.event && !block.return && block.types !== undefined && !block.private && !block.protected;
  }), {
    title: "Properties"
  }), this.renderBlocks(data.filter(block => {
    return !block.event && !block.types && !block.private && !block.protected;
  }), {
    title: "Methods"
  }), this.renderBlocks(data.filter(block => {
    return block.event && !block.private && !block.protected;
  }), {
    title: "Events"
  })].join("\n");
}

module.exports = exports.default;