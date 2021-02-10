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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlYXRBc1ZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJlYXRBc1ZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxVQUFVOztBQXNDVixNQUFNLEVBQUUsR0FBa0IsU0FBUyxZQUFZLENBQzdDLE9BQVksRUFDWixXQUFrQyxFQUFFO0lBRXBDLFFBQVEsbUJBQ04sTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUNQLFFBQVEsQ0FDWixDQUFDO0lBQ0YsSUFBSSxNQUFNLEdBQVcsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxJQUFJO1FBQ0YsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDckMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUTtnQkFDeEIsSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO29CQUNuQixPQUFPLE1BQU0sQ0FBQztpQkFDZjtnQkFDRCxJQUFJLE1BQU0sR0FBRyxDQUFDO29CQUFFLE1BQU0sRUFBRSxDQUFDO3FCQUNwQixJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ3JCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDaEI7Z0JBQ0QsYUFBYTtnQkFDYixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUNuQyxDQUFDO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsR0FBRyxHQUFHLEVBQUU7WUFDeEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2YsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQyxDQUFDO1FBQ0YsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO0tBQ3BCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLE9BQU8sQ0FBQztLQUNoQjtBQUNILENBQUMsQ0FBQztBQUNGLGtCQUFlLEVBQUUsQ0FBQyJ9