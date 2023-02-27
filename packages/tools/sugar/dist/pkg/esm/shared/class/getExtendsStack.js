import __isClass from '../is/isClass';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLGVBQWUsQ0FBQztBQTRDdEMsTUFBTSxFQUFFLEdBQXFCLFVBQ3pCLEdBQVEsRUFDUixXQUFxQyxFQUFFO0lBRXZDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUVqQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2pCLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO0tBQ3pCO0lBRUQsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxFQUFFO1FBQ3BDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQ3pCO0lBRUQsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBRXBCLE9BQU8sU0FBUyxFQUFFO1FBQ2QsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RCxJQUFJLFlBQVksSUFBSSxZQUFZLEtBQUssTUFBTSxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUU7WUFDOUQsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUM7WUFDeEMsU0FBUyxHQUFHLFlBQVksQ0FBQztTQUM1QjthQUFNO1lBQ0gsTUFBTTtTQUNUO0tBQ0o7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDLENBQUM7QUFDRixlQUFlLEVBQUUsQ0FBQyJ9