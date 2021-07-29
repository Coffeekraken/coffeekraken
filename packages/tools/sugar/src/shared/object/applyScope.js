import __isPlainObject from '../is/plainObject';
export default function applyScope(object, scope, settings) {
    settings = Object.assign({ deep: true }, settings);
    const scopes = [];
    Object.keys(scope).forEach(scopeKey => {
        const scopeValue = scope[scopeKey];
        if (Array.isArray(scopeValue)) {
            scopeValue.forEach(v => {
                scopes.push(`${scopeKey}:${v}`);
            });
        }
        else {
            scopes.push(`${scopeKey}:${scopeValue}`);
        }
    });
    function recursive(obj) {
        // break reference
        obj = Object.assign({}, obj);
        Object.keys(obj).forEach(prop => {
            const value = obj[prop];
            if (prop.split(':').length === 2) {
                if (scopes.indexOf(prop) !== -1 || scopes.indexOf(`${prop.split(':')[0]}:*`) !== -1) {
                    if (__isPlainObject(value)) {
                        Object.keys(value).forEach(valueProp => {
                            obj[valueProp] = value[valueProp];
                        });
                    }
                }
                delete obj[prop];
            }
        });
        let needRecursion = false;
        for (let i = 0; i < Object.keys(obj).length; i++) {
            const prop = Object.keys(obj)[i];
            if (prop.split(':').length === 2) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHlTY29wZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcGx5U2NvcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFvRWhELE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVSxDQUFDLE1BQTJCLEVBQUUsS0FBc0MsRUFBRSxRQUF1QztJQUUzSSxRQUFRLG1CQUNKLElBQUksRUFBRSxJQUFJLElBQ1AsUUFBUSxDQUNkLENBQUM7SUFFRixNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDbEMsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMzQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUE7U0FDTDthQUFNO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxTQUFTLFNBQVMsQ0FBQyxHQUFHO1FBRWxCLGtCQUFrQjtRQUNsQixHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM5QixJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUNqRixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7NEJBQ25DLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3RDLENBQUMsQ0FBQyxDQUFDO3FCQUNOO2lCQUNKO2dCQUNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzlCLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLE1BQU07YUFDVDtTQUNKO1FBQ0QsSUFBSSxhQUFhLEVBQUU7WUFDZixHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsSUFBSSxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN4QixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUVmLENBQUM7SUFFRCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFakMsT0FBTyxNQUFNLENBQUM7QUFFbEIsQ0FBQyJ9