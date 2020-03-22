const __expose = require('threads/worker').expose;

const __CoffeeBuilderApp = require('../classes/CoffeeBuilderApp');

class BuilderWorker {

  constructor() {
    this._app = new __CoffeeBuilderApp();
  }

  async bootstrap(config) {
    // bootstrap the app
    await this._app.bootstrap(config);
  }

  emit(name, ...args) {
    __CoffeeBuilder.events.emit(name, ...args);
  }

}

const builder = new BuilderWorker();

__expose({
  bootstrap: builder.bootstrap.bind(builder),
  events: {
    emit: builder.emit.bind(builder)
  }
});