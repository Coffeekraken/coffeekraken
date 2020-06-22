const { spawn, Thread, Worker } = require('threads');

const __CoffeeBuilderUI = require('./classes/CoffeeBuilderUI');

const SConfig = require('@coffeekraken/sugar/node/config/SConfig');
const __deepDiff = require('@coffeekraken/sugar/node/object/deepDiff');

const a = {
  hello: 'world',
  plop: 'coco',
  deep: {
    hello: 'world',
    array: [0, 1, 2, 3, 4, 5]
  }
};
const b = {
  hello: 'world',
  deep: {
    array: [0, 2, 4, 6, 8]
  },
  hoho: 'plop'
};

console.log(__deepDiff(a, b));
process.exit();

const config = new SConfig('sugar', {
  allowReset: false,
  allowSet: true,
  allowNewConfig: true
}).then(conf => {
  console.log('CCCCC', conf);
});


config.set('log.transportsByType', {
  coco: 'hello'
});

console.log(config.get('log.transportsByType'));

setTimeout(() => {
  process.exit();
}, 100);

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