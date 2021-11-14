import __isClass from '../../is/class';
const fn = function (cls, settings = {}) {
    const stack = {};
    if (!__isClass(cls)) {
        cls = cls.constructor;
    }
    if (settings.includeBaseClass === true) {
        stack[cls.name] = cls;
    }
    let baseClass = cls;
    while (baseClass) {
        const newBaseClass = Object.getPrototypeOf(baseClass);
        if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
            stack[newBaseClass.name] = newBaseClass;
            baseClass = newBaseClass;
        }
        else {
            break;
        }
    }
    return stack;
};
export default fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RXh0ZW5kc1N0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0RXh0ZW5kc1N0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLGdCQUFnQixDQUFDO0FBMEN2QyxNQUFNLEVBQUUsR0FBcUIsVUFDekIsR0FBUSxFQUNSLFdBQXFDLEVBQUU7SUFFdkMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBRWpCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDakIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7S0FDekI7SUFFRCxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLEVBQUU7UUFDcEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7S0FDekI7SUFFRCxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFFcEIsT0FBTyxTQUFTLEVBQUU7UUFDZCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksWUFBWSxJQUFJLFlBQVksS0FBSyxNQUFNLElBQUksWUFBWSxDQUFDLElBQUksRUFBRTtZQUM5RCxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQztZQUN4QyxTQUFTLEdBQUcsWUFBWSxDQUFDO1NBQzVCO2FBQU07WUFDSCxNQUFNO1NBQ1Q7S0FDSjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQUNGLGVBQWUsRUFBRSxDQUFDIn0=