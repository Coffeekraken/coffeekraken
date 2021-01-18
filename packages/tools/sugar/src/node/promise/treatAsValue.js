"use strict";
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
const fn = function treatAsValue(promise, settings = {}) {
    settings = Object.assign({ during: -1 }, settings);
    let during = settings.during || -1;
    try {
        const proxy = Proxy.revocable(promise, {
            get(target, prop, receiver) {
                if (prop === 'then') {
                    return target;
                }
                if (during > 0)
                    during--;
                else if (during === 0) {
                    proxy.revoke();
                }
                // @ts-ignore
                return Reflect.get(...arguments);
            }
        });
        proxy.proxy.restorePromiseBehavior = () => {
            proxy.revoke();
            return promise;
        };
        return proxy.proxy;
    }
    catch (e) {
        return promise;
    }
};
exports.default = fn;
//# sourceMappingURL=treatAsValue.js.map