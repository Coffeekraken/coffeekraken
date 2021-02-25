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
const __axios = require('axios');
/**
 * @name                            bitbucketApiValidator
 * @namespace           node.auth
 * @type                            Function
 * @async
 *
 * Make sure the bitbucket api authentification has been made correctly
 *
 * @param           {Object}              authInfo            The authentification info
 * @return          {Promise}                                 true if ok, false (or error message) if it's not...
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function bitbucketApiValidator(authInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const url = 'https://api.bitbucket.org/2.0/repositories';
            switch (authInfo.type) {
                case 'basic':
                    __axios
                        .get(url, {
                        headers: authInfo.headers
                    })
                        .then((response) => {
                        resolve(true);
                    })
                        .catch((e) => {
                        resolve(`Your credentials have been declined. Please try again...`);
                    });
                    break;
                case 'bearer':
                    __axios
                        .get(url, {
                        headers: authInfo.headers
                    })
                        .then((response) => {
                        process.exit();
                        resolve(true);
                    })
                        .catch((e) => {
                        resolve(`Your token has been declined. Please try again...`);
                    });
                    break;
            }
        }));
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml0YnVja2V0QXBpVmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYml0YnVja2V0QXBpVmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRWpDOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBZSxxQkFBcUIsQ0FBQyxRQUFROztRQUM1RCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLE1BQU0sR0FBRyxHQUFHLDRDQUE0QyxDQUFDO1lBRXpELFFBQVEsUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDckIsS0FBSyxPQUFPO29CQUNWLE9BQU87eUJBQ0osR0FBRyxDQUFDLEdBQUcsRUFBRTt3QkFDUixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87cUJBQzFCLENBQUM7eUJBQ0QsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDaEIsQ0FBQyxDQUFDO3lCQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUNYLE9BQU8sQ0FBQywwREFBMEQsQ0FBQyxDQUFDO29CQUN0RSxDQUFDLENBQUMsQ0FBQztvQkFDTCxNQUFNO2dCQUNSLEtBQUssUUFBUTtvQkFDWCxPQUFPO3lCQUNKLEdBQUcsQ0FBQyxHQUFHLEVBQUU7d0JBQ1IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO3FCQUMxQixDQUFDO3lCQUNELElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUNqQixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoQixDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7d0JBQ1gsT0FBTyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7b0JBQy9ELENBQUMsQ0FBQyxDQUFDO29CQUNMLE1BQU07YUFDVDtRQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQUEsQ0FBQyJ9