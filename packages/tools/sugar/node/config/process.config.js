"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * @name            asyncStart
     * @namespace       config.process
     * @type            Boolean
     * @default         false
     *
     * Specify if the process has to start asyncronously or not
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    asyncStart: false,
    /**
     * @name              stdio
     * @namespace         config.process
     * @type              String
     * @default           inherit
     *
     * Specify the in/out style to use. Available by default:
     * - inherit: Simply log into console
     * - blessed: Take the entire screen and log items using blessed
     *
     * @since             2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    stdio: 'inherit',
    /**
     * @name              decorators
     * @namespace         config.process
     * @type              Boolean
     * @default           false
     *
     * Specify if you want to log decorators (start message, end message, etc...)
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    decorators: false,
    /**
     * @name          throw
     * @namespace         config.process
     * @type          Boolean
     * @default       true
     *
     * Specify if you want to process class to throw errors when some happend
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    throw: true,
    /**
     * @name          exitAtEnd
     * @namespace         config.process
     * @type          Boolean
     * @default       false
     *
     * Specify if you want the actual node process to exist when the process has ended
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exitAtEnd: false,
    /**
     * @name          runAsChild
     * @namespace     config.process
     * @type          Boolean
     * @default       true
     *
     * Specify if you want the process to be runned into a child process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    runAsChild: true,
    /**
     * @name          definition
     * @namespace     config.process
     * @type          Object
     * @default       undefined
     *
     * Specify a definition object (see SInterface class) to be used for this process parameters
     *
     * @since             2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    definition: undefined,
    /**
     * @name          processPath
     * @namespace         config.process
     * @type          String
     * @default           null
     *
     * Specify the path to the SProcess file. Usually setted automatically and used to start the process as child one
     * when specify the parameter ```runAsChild```
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    processPath: null,
    /**
     * @name      notification
     * @namespace       config.process
     * @type        Boolean
     * @default         '[config.notification]'
     *
     * Notification settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    notification: '[config.notification]'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL3Byb2Nlc3MuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYjs7Ozs7Ozs7OztPQVVHO0lBQ0gsVUFBVSxFQUFFLEtBQUs7SUFFakI7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsS0FBSyxFQUFFLFNBQVM7SUFFaEI7Ozs7Ozs7Ozs7T0FVRztJQUNILFVBQVUsRUFBRSxLQUFLO0lBRWpCOzs7Ozs7Ozs7O09BVUc7SUFDSCxLQUFLLEVBQUUsSUFBSTtJQUVYOzs7Ozs7Ozs7O09BVUc7SUFDSCxTQUFTLEVBQUUsS0FBSztJQUVoQjs7Ozs7Ozs7OztPQVVHO0lBQ0gsVUFBVSxFQUFFLElBQUk7SUFFaEI7Ozs7Ozs7Ozs7T0FVRztJQUNILFVBQVUsRUFBRSxTQUFTO0lBRXJCOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsV0FBVyxFQUFFLElBQUk7SUFFakI7Ozs7Ozs7Ozs7T0FVRztJQUNILFlBQVksRUFBRSx1QkFBdUI7Q0FDdEMsQ0FBQyJ9