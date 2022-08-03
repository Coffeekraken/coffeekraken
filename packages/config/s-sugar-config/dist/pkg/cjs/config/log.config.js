"use strict";
// TODO: doc
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name        types
         * @namespace     config.log
         * @type        String[]
         * @values      false,info,warning,error,verbose
         * @default      ['info','warning','error']
         *
         * Set the log types you want for your app.
         * - false: No log at all
         * - info: Default logs
         * - warning: Display the warnings
         * - error: Display the errors
         * - verbose: Detailed logs
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        types: ['info', 'warning', 'error'],
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxZQUFZOztBQUVaLG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNIOzs7Ozs7Ozs7Ozs7Ozs7O1dBZ0JHO1FBQ0gsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUM7S0FDdEMsQ0FBQztBQUNOLENBQUM7QUF2QkQsNEJBdUJDIn0=