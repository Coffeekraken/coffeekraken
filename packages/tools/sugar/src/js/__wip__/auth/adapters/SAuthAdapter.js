"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @name                            SAuthAdapter
 * @namespace           node.auth.adapters
 * @type                            Class
 *
 * Base SAuth adapter class that has to be the base of each SAuthAdapters
 *
 * @example         js
 * const SAuthAdapter = require('@coffeekraken/sugar/node/auth/adapters/SAuthAdapter');
 * class MyCoolAdapter extends SAuthAdapter {
 *    construct() {
 *      super();
 *    }
 * }
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SAuthAdapter {
    /**
     * @name                          constructor
     * @type                          Function
     *
     * Construct the SAuthAdapter instance
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(authTypes) {
        /**
         * @name                          _supportedAuthTypes
         * @type                          Array
         * @private
         *
         * Store the supported auth types by the current auth adapter
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._supportedAuthTypes = [];
        // store the supported auth types
        this._supportedAuthTypes = authTypes;
    }
    /**
     * @name                          supportedAuthTypes
     * @type                          Array
     *
     * Access the supported auth types for this adapter
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get supportedAuthTypes() {
        return this._supportedAuthTypes;
    }
    /**
     * @name                            ask
     * @type                            Function
     * @async
     *
     * Ask form some auth informations depending on the auth type you want and the supported auth types of the selected adapter
     *
     * @param         {Object}              [settings={}]
     * - type (settings.type) {String}: Specify the auth type you want to ask like "basic", "bearer", "oauth2", etc...
     * - title (null) {String}: Specify the title to display on top of the form
     * - error (null) {String}: An error message to display to the user. Can be something like "Your credentials have been declined. Please try again..."
     * - info (null) {String}: An info message to display to the user
     *
     * @example           js
     * const authInfos = await myAuth.ask({
     *    type: 'basic'
     * });
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    ask(settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // make sure the adapter support the auth type requested
            if (!this[`_${settings.type}`]) {
                throw new Error(`You try to ask the user for "${settings.type}" auth informations but this auth type is not supported by the current adapter...`);
            }
            // get the auth info using the adapter
            const infos = yield this[`_${settings.type}`](settings);
            return infos;
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0F1dGhBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0F1dGhBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sWUFBWTtJQVlqQzs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxTQUFTO1FBbkJyQjs7Ozs7Ozs7V0FRRztRQUNILHdCQUFtQixHQUFHLEVBQUUsQ0FBQztRQVd2QixpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNHLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRTs7WUFDckIsd0RBQXdEO1lBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRTtnQkFDOUIsTUFBTSxJQUFJLEtBQUssQ0FDYixnQ0FBZ0MsUUFBUSxDQUFDLElBQUksbUZBQW1GLENBQ2pJLENBQUM7YUFDSDtZQUVELHNDQUFzQztZQUN0QyxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0NBQ0YsQ0FBQyJ9