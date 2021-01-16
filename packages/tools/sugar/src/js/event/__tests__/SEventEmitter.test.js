const __SEventEmitter = require('../SEventEmitter');

describe('sugar.js.event.SEventEmitter', () => {
  class MyEmitterClass extends __SEventEmitter {
    constructor(settings = {}) {
      super(settings);
    }
  }

  it('Should emit an event correctly', (done) => {
    const eventEmitter = new MyEmitterClass();
    eventEmitter.on('myEvent', (value, metas) => {
      expect(value).toBe('Hello world');
      expect(metas.event).toBe('myEvent');
      expect(metas.name).toBe('myEvent');
      expect(metas.source).toBe('MyEmitterClass');
      expect(metas.level).toBe(1);
      done();
    });
    eventEmitter.emit('myEvent', 'Hello world');
  });

  it('Should emit a complexe event and catch it using glob correctly', (done) => {
    const eventEmitter = new MyEmitterClass();
    eventEmitter.on('*.myEvent', (value, metas) => {
      expect(metas.event).toBe('complexe.myEvent');
      done();
    });
    eventEmitter.emit('myEvent', 'Hello world');
    eventEmitter.emit('complexe.myEvent', 'Hello world');
  });

  it('Should emit an event from an eventEmitter, pipe it and catch it correctly', (done) => {
    const eventEmitter1 = new MyEmitterClass();
    const eventEmitter2 = new __SEventEmitter();
    eventEmitter1.on('myEvent', (value, metas) => {
      expect(metas.event).toBe('myEvent');
      expect(metas.path).toBe('SEventEmitter.MyEmitterClass');
      done();
    });
    eventEmitter1.pipe(eventEmitter2, {});
    eventEmitter2.emit('myEvent', 'Hello world');
  });
});
