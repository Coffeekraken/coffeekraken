/**
 * @name                                    set
 * @namespace                               sugar.node.config
 * @type                                    Function
 *
 * Set a sugar config by passing its config path like "log.transportsByType", the wanted value and telling if you want this config
 * to be persistent.
 * Persistent mean that the config value will be saved in a file in the "temp" folder of your system so the config setted using
 * this function will lives only on the current system.
 * You can set where you want these "persistent" configs to be saved using the "setPersistentConfigFilePath" function.
 *
 * @param           {String}              path              The config path to set like "log.transportsByType"
 * @param           {Mixed}               value             The new value to set
 * @param           {Boolean}             [persistent=false]    Specify if you want this config to be persistent and live more that just in this process
 *
 * @example         js
 * const set = require('@coffeekraken/sugar/node/config/set');
 * set('log.transportsByType', {...});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */