const { spawn, Thread, Worker } = require('threads');

const __CoffeeBuilderUI = require('./classes/CoffeeBuilderUI');

const SConfig = require('@coffeekraken/sugar/node/config/SConfig');

const config = new SConfig('sugar', {
  allowReset: false,
  allowSet: true,
  allowNewConfig: true
});


config.set('log.transportsByType', {
  coco: 'hello'
});

console.log(config.get('log.transportsByType'));

process.exit();

module.exports = class CoffeeBuilder {

  constructor(config = {}) {
    (async () => {
      // init the UI instance
      this.ui = new __CoffeeBuilderUI();
      // init the app through a worker
      this.app = await spawn(new Worker('./workers/Builder.js'));
      // register the the thread events
      Thread.events(this.app).subscribe(event => {
        console.log("Thread event:", event);
      });
      Thread.errors(this.app).subscribe(error => {
        console.log("Thread error:", error);
      });
      // bootstrap the app with the user config
      await this.app.bootstrap(config);
    })();
  }

}