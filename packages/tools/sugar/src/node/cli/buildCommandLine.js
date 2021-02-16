"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toString_1 = __importDefault(require("../string/toString"));
const argsToString_1 = __importDefault(require("./argsToString"));
const parse_1 = __importDefault(require("../string/parse"));
const stripAnsi_1 = __importDefault(require("../string/stripAnsi"));
const fn = function buildCommandLine(command, args = {}, settings = {}) {
    settings = Object.assign({ definition: undefined, includeAllArgs: true, alias: true }, settings);
    const definition = Object.assign({}, settings.definition);
    // get all the tokens
    const tokens = command.match(/\[[a-zA-Z0-9-_]+\]/gm) || [];
    tokens.forEach((token) => {
        const tokenName = token.replace('[', '').replace(']', '');
        if (tokenName === 'arguments')
            return;
        const tokenValue = args && args[tokenName] !== undefined
            ? args[tokenName]
            : definition[tokenName]
                ? definition[tokenName].default
                : undefined;
        delete definition[tokenName];
        delete args[tokenName];
        if (tokenValue === undefined) {
            command = command.replace(token, '');
            return;
        }
        let tokenValueString = '';
        if (Array.isArray(tokenValue)) {
            tokenValue.forEach((tValue) => {
                let str = tValue.toString !== undefined && typeof tValue.toString === 'function'
                    ? tValue.toString()
                    : toString_1.default(tValue);
                // handle quotes or not
                if (typeof parse_1.default(str) === 'string')
                    str = `"${str}"`;
                // append to the string
                tokenValueString += `${str} `;
            });
            tokenValueString = tokenValueString.trim();
        }
        else {
            tokenValueString =
                tokenValue.toString !== undefined &&
                    typeof tokenValue.toString === 'function'
                    ? tokenValue.toString()
                    : toString_1.default(tokenValue);
            // handle quotes or not
            if (typeof parse_1.default(tokenValueString) === 'string')
                tokenValueString = `"${tokenValueString}"`;
        }
        command = command.replace(token, tokenValueString);
    });
    // args to string
    let argsString = argsToString_1.default(args, settings).trim();
    // sanitize the string
    argsString = stripAnsi_1.default(argsString);
    // replace the command token
    command = command.replace('[arguments]', argsString);
    return command.trim();
};
exports.default = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRDb21tYW5kTGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1aWxkQ29tbWFuZExpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7Ozs7O0FBRVYsa0VBQTRDO0FBQzVDLGtFQUE0QztBQUU1Qyw0REFBc0M7QUFDdEMsb0VBQThDO0FBeUU5QyxNQUFNLEVBQUUsR0FBd0IsU0FBUyxnQkFBZ0IsQ0FDdkQsT0FBZSxFQUNmLE9BQWdDLEVBQUUsRUFDbEMsV0FBc0MsRUFBRTtJQUV4QyxRQUFRLG1CQUNOLFVBQVUsRUFBRSxTQUFTLEVBQ3JCLGNBQWMsRUFBRSxJQUFJLEVBQ3BCLEtBQUssRUFBRSxJQUFJLElBQ1IsUUFBUSxDQUNaLENBQUM7SUFDRixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUQscUJBQXFCO0lBQ3JCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFM0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3ZCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUQsSUFBSSxTQUFTLEtBQUssV0FBVztZQUFFLE9BQU87UUFDdEMsTUFBTSxVQUFVLEdBQ2QsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxTQUFTO1lBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2dCQUN2QixDQUFDLENBQU8sVUFBVSxDQUFDLFNBQVMsQ0FBRSxDQUFDLE9BQU87Z0JBQ3RDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDaEIsT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQzVCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNyQyxPQUFPO1NBQ1I7UUFFRCxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDN0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUM1QixJQUFJLEdBQUcsR0FDTCxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxRQUFRLEtBQUssVUFBVTtvQkFDcEUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7b0JBQ25CLENBQUMsQ0FBQyxrQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN6Qix1QkFBdUI7Z0JBQ3ZCLElBQUksT0FBTyxlQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUTtvQkFBRSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFDdkQsdUJBQXVCO2dCQUN2QixnQkFBZ0IsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDNUM7YUFBTTtZQUNMLGdCQUFnQjtnQkFDZCxVQUFVLENBQUMsUUFBUSxLQUFLLFNBQVM7b0JBQ2pDLE9BQU8sVUFBVSxDQUFDLFFBQVEsS0FBSyxVQUFVO29CQUN2QyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtvQkFDdkIsQ0FBQyxDQUFDLGtCQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0IsdUJBQXVCO1lBQ3ZCLElBQUksT0FBTyxlQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxRQUFRO2dCQUMvQyxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixHQUFHLENBQUM7U0FDOUM7UUFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztJQUVILGlCQUFpQjtJQUNqQixJQUFJLFVBQVUsR0FBRyxzQkFBYyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUV2RCxzQkFBc0I7SUFDdEIsVUFBVSxHQUFHLG1CQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFckMsNEJBQTRCO0lBQzVCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUVyRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN4QixDQUFDLENBQUM7QUFDRixrQkFBZSxFQUFFLENBQUMifQ==