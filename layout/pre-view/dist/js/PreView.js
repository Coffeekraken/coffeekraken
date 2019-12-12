"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const phpServer = require('php-server');

const livereload = require('livereload');

class PreView {
  constructor(config) {
    this._config = config;
  }
  /**
   * Start the server
   */


  async start() {
    try {
      this._phpServer = await phpServer({
        port: this._config.port,
        hostname: this._config.hostname,
        folder: this._config.folder,
        base: process.PWD,
        router: `${__dirname}/../../src/php/index.php`,
        open: this._config.open,
        env: {
          folder: this._config.folder,
          watch: this._config.watch,
          hotkey_selector: this._config.hotkey_selector,
          hotkey_states: this._config.hotkey_states,
          js: this._config.js.charAt(0) !== '/' ? `/${this._config.js}` : this._config.js,
          css: this._config.css.charAt(0) !== '/' ? `/${this._config.css}` : this._config.css,
          states: JSON.stringify(this._config.states)
        }
      });
      console.log(`PHP server running at ${this._phpServer.url}`);
    } catch (err) {
      console.log('error', err);
    }
  }
  /**
   * Start livereload
   */


  startLivereload() {
    const server = livereload.createServer({
      applyCSSLive: false,
      delay: 1000
    });
    server.watch([this._config.folder, ...this._config.watch.split(',')]);
  }

}

exports.default = PreView;
module.exports = exports.default;