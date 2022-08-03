import __parseTypeString from './parseTypeString';
import __replaceTokens from '../token/replaceTokens';
export default function resolveTypeString(typeString, settings = {}) {
    var _a, _b, _c;
    const finalSettings = Object.assign({ cwd: process.cwd() }, settings);
    let types, interf;
    // regular types
    if (typeString.match(/^\{.*\}$/)) {
        types = __parseTypeString(typeString);
        // path type
    }
    else if (typeString.match(/^(\.|\/|[a-zA-Z0-9])/)) {
        // resolve tokens
        const path = __replaceTokens(typeString);
        if (blockSettings.filePath) {
            let potentialTypeFilePath;
            if (typeString.match(/^(\.|\/)/)) {
                potentialTypeFilePath = __path.resolve(__path.dirname(blockSettings.filePath), path);
            }
            else {
                potentialTypeFilePath = __path.resolve(__packageRoot(__path.dirname(blockSettings.filePath)), path);
            }
            if (__fs.existsSync(potentialTypeFilePath)) {
                const typeData = (yield import(potentialTypeFilePath)).default;
                type = (_a = [typeData.name]) !== null && _a !== void 0 ? _a : type;
                // save data into the "metas" property on the string directly
                interf = (_c = (_b = typeData.toObject) === null || _b === void 0 ? void 0 : _b.call(typeData)) !== null && _c !== void 0 ? _c : typeData;
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8saUJBQXdDLE1BQU0sbUJBQW1CLENBQUM7QUFFekUsT0FBTyxlQUFlLE1BQU0sd0JBQXdCLENBQUM7QUF1Q3JELE1BQU0sQ0FBQyxPQUFPLFVBQVUsaUJBQWlCLENBQ3JDLFVBQWtCLEVBQ2xCLFdBQWdELEVBQUU7O0lBRWxELE1BQU0sYUFBYSxtQkFDZixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUNmLFFBQVEsQ0FDZCxDQUFDO0lBRUYsSUFBSSxLQUFLLEVBQUUsTUFBTSxDQUFDO0lBRWxCLGdCQUFnQjtJQUNoQixJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDOUIsS0FBSyxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLFlBQVk7S0FDZjtTQUFNLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQ2pELGlCQUFpQjtRQUNqQixNQUFNLElBQUksR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFekMsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFO1lBQ3hCLElBQUkscUJBQXFCLENBQUM7WUFFMUIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM5QixxQkFBcUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUNsQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFDdEMsSUFBSSxDQUNQLENBQUM7YUFDTDtpQkFBTTtnQkFDSCxxQkFBcUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUNsQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsRUFDckQsSUFBSSxDQUNQLENBQUM7YUFDTDtZQUVELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQy9ELElBQUksR0FBRyxNQUFBLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxtQ0FBSSxJQUFJLENBQUM7Z0JBQy9CLDZEQUE2RDtnQkFDN0QsTUFBTSxHQUFHLE1BQUEsTUFBQSxRQUFRLENBQUMsUUFBUSx3REFBSSxtQ0FBSSxRQUFRLENBQUM7YUFDOUM7U0FDSjtLQUNKO0FBQ0wsQ0FBQyJ9