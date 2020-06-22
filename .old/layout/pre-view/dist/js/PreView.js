"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const phpServer = require('php-server');

const livereload = require('livereload');

const chalk = require('chalk');

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
        title: this._config.title,
        port: this._config.port,
        hostname: this._config.hostname,
        folder: this._config.folder,
        base: process.PWD,
        router: `${__dirname}/../../src/php/index.php`,
        open: this._config.open,
        env: {
          title: this._config.title,
          folder: this._config.folder,
          watch: this._config.watch,
          hotkey_selector: this._config.hotkey_selector,
          hotkey_states: this._config.hotkey_states,
          js: this._config.js.charAt(0) !== '/' ? `/${this._config.js}` : this._config.js,
          css: this._config.css.charAt(0) !== '/' ? `/${this._config.css}` : this._config.css,
          states: JSON.stringify(this._config.states)
        }
      });
      console.log(chalk(`PHP server running at ${chalk.green.bold(this._phpServer.url)}`));
    } catch (err) {
      console.log(chalk.red.bold(err));
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
    console.log(chalk(`Livereload server started at ${chalk.green.bold('http://127.0.0.1:35729')}`));
  }

}

exports.default = PreView;
module.exports = exports.default;