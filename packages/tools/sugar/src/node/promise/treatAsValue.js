// @shared
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
export default fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlYXRBc1ZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJlYXRBc1ZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7QUFzQ1YsTUFBTSxFQUFFLEdBQWtCLFNBQVMsWUFBWSxDQUM3QyxPQUFZLEVBQ1osV0FBa0MsRUFBRTtJQUVwQyxRQUFRLG1CQUNOLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFDUCxRQUFRLENBQ1osQ0FBQztJQUNGLElBQUksTUFBTSxHQUFXLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsSUFBSTtRQUNGLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ3JDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVE7Z0JBQ3hCLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtvQkFDbkIsT0FBTyxNQUFNLENBQUM7aUJBQ2Y7Z0JBQ0QsSUFBSSxNQUFNLEdBQUcsQ0FBQztvQkFBRSxNQUFNLEVBQUUsQ0FBQztxQkFDcEIsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUNyQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ2hCO2dCQUNELGFBQWE7Z0JBQ2IsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDbkMsQ0FBQztTQUNGLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEdBQUcsR0FBRyxFQUFFO1lBQ3hDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNmLE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUMsQ0FBQztRQUNGLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztLQUNwQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxPQUFPLENBQUM7S0FDaEI7QUFDSCxDQUFDLENBQUM7QUFDRixlQUFlLEVBQUUsQ0FBQyJ9