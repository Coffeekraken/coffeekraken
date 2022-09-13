"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPlainObject_1 = __importDefault(require("../is/isPlainObject"));
function __applyScope(object, scopes, settings) {
    settings = Object.assign({ deep: true, clone: false }, settings);
    function recursive(obj) {
        // break reference
        obj = Object.assign({}, obj);
        Object.keys(obj).forEach((prop) => {
            const value = obj[prop];
            if (prop.split('@').length === 2) {
                const scope = prop.split('@')[1], scopedProp = prop.split('@')[0];
                if (scopes.indexOf(scope) !== -1) {
                    // plain object with no scoped prop
                    if ((0, isPlainObject_1.default)(value) && !scopedProp) {
                        Object.keys(value).forEach((valueProp) => {
                            obj[valueProp] = value[valueProp];
                        });
                    }
                    else if ((0, isPlainObject_1.default)(value) && scopedProp) {
                        if (!obj[scopedProp])
                            obj[scopedProp] = value;
                        else
                            obj[scopedProp] = Object.assign(Object.assign({}, obj[scopedProp]), value);
                    }
                    else if (scopedProp) {
                        obj[scopedProp] = value;
                    }
                }
                delete obj[prop];
            }
        });
        let needRecursion = false;
        for (let i = 0; i < Object.keys(obj).length; i++) {
            const prop = Object.keys(obj)[i];
            if (prop.split('@').length === 2) {
                needRecursion = true;
                break;
            }
        }
        if (needRecursion) {
            obj = recursive(obj);
        }
        if (settings === null || settings === void 0 ? void 0 : settings.deep) {
            Object.keys(obj).forEach((prop) => {
                const value = obj[prop];
                if ((0, isPlainObject_1.default)(value)) {
                    obj[prop] = recursive(value);
                }
            });
        }
        return obj;
    }
    const newObj = recursive(object);
    return newObj;
}
exports.default = __applyScope;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWtEO0FBbUVsRCxTQUF3QixZQUFZLENBQ2hDLE1BQTJCLEVBQzNCLE1BQWdCLEVBQ2hCLFFBQXVDO0lBRXZDLFFBQVEsbUJBQ0osSUFBSSxFQUFFLElBQUksRUFDVixLQUFLLEVBQUUsS0FBSyxJQUNULFFBQVEsQ0FDZCxDQUFDO0lBRUYsU0FBUyxTQUFTLENBQUMsR0FBRztRQUNsQixrQkFBa0I7UUFDbEIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDOUIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM5QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUM1QixVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFcEMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUM5QixtQ0FBbUM7b0JBQ25DLElBQUksSUFBQSx1QkFBZSxFQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO3dCQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFOzRCQUNyQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN0QyxDQUFDLENBQUMsQ0FBQztxQkFDTjt5QkFBTSxJQUFJLElBQUEsdUJBQWUsRUFBQyxLQUFLLENBQUMsSUFBSSxVQUFVLEVBQUU7d0JBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDOzRCQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUM7OzRCQUUxQyxHQUFHLENBQUMsVUFBVSxDQUFDLG1DQUNSLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FDZixLQUFLLENBQ1gsQ0FBQztxQkFDVDt5QkFBTSxJQUFJLFVBQVUsRUFBRTt3QkFDbkIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQztxQkFDM0I7aUJBQ0o7Z0JBQ0QsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDOUIsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDckIsTUFBTTthQUNUO1NBQ0o7UUFDRCxJQUFJLGFBQWEsRUFBRTtZQUNmLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7UUFFRCxJQUFJLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxJQUFJLEVBQUU7WUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDOUIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QixJQUFJLElBQUEsdUJBQWUsRUFBQyxLQUFLLENBQUMsRUFBRTtvQkFDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDaEM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWpDLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFyRUQsK0JBcUVDIn0=