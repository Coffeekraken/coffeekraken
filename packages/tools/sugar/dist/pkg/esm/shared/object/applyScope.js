import __isPlainObject from '../is/isPlainObject';
export default function __applyScope(object, scopes, settings) {
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
                    if (__isPlainObject(value) && !scopedProp) {
                        Object.keys(value).forEach((valueProp) => {
                            obj[valueProp] = value[valueProp];
                        });
                    }
                    else if (__isPlainObject(value) && scopedProp) {
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
                if (__isPlainObject(value)) {
                    obj[prop] = recursive(value);
                }
            });
        }
        return obj;
    }
    const newObj = recursive(object);
    return newObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLHFCQUFxQixDQUFDO0FBbUVsRCxNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FDaEMsTUFBMkIsRUFDM0IsTUFBZ0IsRUFDaEIsUUFBdUM7SUFFdkMsUUFBUSxtQkFDSixJQUFJLEVBQUUsSUFBSSxFQUNWLEtBQUssRUFBRSxLQUFLLElBQ1QsUUFBUSxDQUNkLENBQUM7SUFFRixTQUFTLFNBQVMsQ0FBQyxHQUFHO1FBQ2xCLGtCQUFrQjtRQUNsQixHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM5QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzlCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzVCLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVwQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQzlCLG1DQUFtQztvQkFDbkMsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7d0JBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7NEJBQ3JDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3RDLENBQUMsQ0FBQyxDQUFDO3FCQUNOO3lCQUFNLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLFVBQVUsRUFBRTt3QkFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7NEJBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQzs7NEJBRTFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsbUNBQ1IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUNmLEtBQUssQ0FDWCxDQUFDO3FCQUNUO3lCQUFNLElBQUksVUFBVSxFQUFFO3dCQUNuQixHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDO3FCQUMzQjtpQkFDSjtnQkFDRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM5QixhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixNQUFNO2FBQ1Q7U0FDSjtRQUNELElBQUksYUFBYSxFQUFFO1lBQ2YsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjtRQUVELElBQUksUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUksRUFBRTtZQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUM5QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN4QixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFakMsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyJ9