const phpServer = require('php-server');

export default class PreView {
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
        base: `${process.env.INIT_CWD}/src/php/`,
        router: `${process.env.INIT_CWD}/src/php/index.php`,
        open: this._config.open,
        env: {
          folder: this._config.folder,
          hotkey: this._config.hotkey
        }
      });
      console.log(`PHP server running at ${this._phpServer.url}`);
    } catch(err) {
      console.log('error', err);
    }
  }

}
