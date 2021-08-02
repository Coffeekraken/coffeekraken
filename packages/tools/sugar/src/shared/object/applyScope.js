import __isPlainObject from '../is/plainObject';
export default function applyScope(object, scopes, settings) {
    settings = Object.assign({ deep: true }, settings);
    function recursive(obj) {
        // break reference
        obj = Object.assign({}, obj);
        Object.keys(obj).forEach(prop => {
            const value = obj[prop];
            if (prop.split('@').length === 2) {
                const scope = prop.split('@')[1], scopedProp = prop.split('@')[0];
                if (scopes.indexOf(scope) !== -1) {
                    // plain object with no scoped prop
                    if (__isPlainObject(value) && !scopedProp) {
                        Object.keys(value).forEach(valueProp => {
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
            Object.keys(obj).forEach(prop => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHlTY29wZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcGx5U2NvcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFrRWhELE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVSxDQUFDLE1BQTJCLEVBQUUsTUFBZ0IsRUFBRSxRQUF1QztJQUVySCxRQUFRLG1CQUNKLElBQUksRUFBRSxJQUFJLElBQ1AsUUFBUSxDQUNkLENBQUM7SUFFRixTQUFTLFNBQVMsQ0FBQyxHQUFHO1FBRWxCLGtCQUFrQjtRQUNsQixHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM5QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMxQixVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFdEMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUM5QixtQ0FBbUM7b0JBQ25DLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO3dCQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTs0QkFDbkMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDdEMsQ0FBQyxDQUFDLENBQUM7cUJBQ047eUJBQU0sSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksVUFBVSxFQUFFO3dCQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQzs0QkFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDOzs0QkFDekMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxtQ0FDYixHQUFHLENBQUMsVUFBVSxDQUFDLEdBQ2YsS0FBSyxDQUNYLENBQUM7cUJBQ0w7eUJBQU0sSUFBSSxVQUFVLEVBQUU7d0JBQ25CLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUM7cUJBQzNCO2lCQUNKO2dCQUNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzlCLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLE1BQU07YUFDVDtTQUNKO1FBQ0QsSUFBSSxhQUFhLEVBQUU7WUFDZixHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsSUFBSSxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN4QixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUVmLENBQUM7SUFFRCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFakMsT0FBTyxNQUFNLENBQUM7QUFFbEIsQ0FBQyJ9