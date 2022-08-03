// @ts-nocheck
import __isPlainObject from '../is/plainObject';
function isCyclic(obj) {
    var seenObjects = [];
    function detect(obj) {
        if (obj && typeof obj === 'object') {
            if (seenObjects.indexOf(obj) !== -1) {
                return true;
            }
            seenObjects.push(obj);
            for (var key in obj) {
                if (obj.hasOwnProperty(key) && detect(obj[key])) {
                    console.log(obj, 'cycle at ' + key);
                    return true;
                }
            }
        }
        return false;
    }
    return detect(obj);
}
export default function (object, settings) {
    const finalSettings = Object.assign({ deep: true }, (settings !== null && settings !== void 0 ? settings : {}));
    function clean(obj) {
        const newObj = Object.assign({}, obj);
        for (let [key, value] of Object.entries(newObj)) {
            newObj[key] = value;
            if (finalSettings.deep && __isPlainObject(newObj[key])) {
                newObj[key] = clean(newObj[key]);
            }
        }
        return newObj;
    }
    const newObj = clean(object);
    return newObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQStCaEQsU0FBUyxRQUFRLENBQUMsR0FBRztJQUNqQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFFckIsU0FBUyxNQUFNLENBQUMsR0FBRztRQUNmLElBQUksR0FBRyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUNoQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ2pDLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO2dCQUNqQixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBQ3BDLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sV0FDVixNQUFXLEVBQ1gsUUFBMEM7SUFFMUMsTUFBTSxhQUFhLG1CQUNmLElBQUksRUFBRSxJQUFJLElBQ1AsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLFNBQVMsS0FBSyxDQUFDLEdBQUc7UUFDZCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0QyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM3QyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksYUFBYSxDQUFDLElBQUksSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDcEM7U0FDSjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFN0IsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyJ9