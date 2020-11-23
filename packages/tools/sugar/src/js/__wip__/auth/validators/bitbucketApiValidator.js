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
                        console.log('resp', response);
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
