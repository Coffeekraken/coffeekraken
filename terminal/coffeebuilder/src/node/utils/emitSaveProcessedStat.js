const __coffeeEvents = require('../events');
const __getOutputFilePath = require('./getOutputFilePath');

/**
 * @name                              emitSaveProcessedStat
 * @namespace                         terminal.coffeebuilder.node.utils
 * @type                              Function
 *
 * Emit a saveProcessed event to the stats
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function emitSaveProcessedStat(filepath, saveExtension, e = 'saveProcessed') {

  __getOutputFilePath(filepath, saveExtension).forEach((output) => {

    console.log('EMIT', e);

    __coffeeEvents.emit(e, {
      sourceFilePath: filepath,
      outputFilePath: output
    });
  });

}
