const __EventEmitter = require('events');
const { isMainThread, parentPort } = require('worker_threads');
const { Transfer } = require('threads');

/**
 * @name                                              CoffeeBuilderEvents
 * @namespace                                         terminal.coffeebuilder.node.classes
 * @type                                              Function
 *
 * A function that return a CoffeeEvents instance. The instance returned is the same for everyone so you can listen and emit events to the others...
 *
 * @return            {CoffeeEvents}                          The singleton CoffeeEvents instance
 *
 * @example           js
 * const coffeeEvents = require('@coffeekraken/coffeebuilder/node/classes/CoffeeBuilderEvents');
 * coffeeEvents.on('coco', () => {
 *    // do something...
 * });
 * coffeeEvents.emit('coco');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class CoffeeBuilderOriginalEvents extends __EventEmitter { }
const originalEvents = new CoffeeBuilderOriginalEvents();

class CoffeeBuilderEvents {
  emit(name, ...args) {
    originalEvents.emit(name, ...args);
    if (!isMainThread) {
      parentPort.postMessage(name, Transfer(...args));
    }
  }
  on(name, callback) {
    originalEvents.on(name, callback);
    if (!isMainThread) {
      parentPort.on(name, callback);
    }
  }
}

module.exports = CoffeeBuilderEvents;
