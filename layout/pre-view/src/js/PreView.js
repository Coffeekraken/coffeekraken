const phpServer = require('php-server');

export default class PreView {
  constructor(config) {
    this._config = config;
    console.log(config);
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
          hotkeys: this._config.hotkeys,
          js: (this._config.js.charAt(0) !== '/') ? `/${this._config.js}` : this._config.js,
          css: (this._config.css.charAt(0) !== '/') ? `/${this._config.css}` : this._config.css,
          states: JSON.stringify(this._config.states)
        }
      });
      console.log(`PHP server running at ${this._phpServer.url}`);
    } catch(err) {
      console.log('error', err);
    }
  }

}
