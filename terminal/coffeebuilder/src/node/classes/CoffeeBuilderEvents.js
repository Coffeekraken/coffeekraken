const __EventEmitter = require('events');

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
class CoffeeBuilderEvents extends __EventEmitter {



}
module.exports = CoffeeBuilderEvents;
