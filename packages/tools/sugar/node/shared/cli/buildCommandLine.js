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
const fn = function buildCommandLine(command, args = {}, settings) {
    const set = Object.assign({ definition: undefined, includeAllParams: true, alias: true }, (settings || {}));
    const definition = Object.assign({}, set.definition);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRDb21tYW5kTGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvY2xpL2J1aWxkQ29tbWFuZExpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7Ozs7O0FBRVYsa0VBQTRDO0FBQzVDLGtFQUE0QztBQUU1Qyw0REFBc0M7QUFDdEMsb0VBQThDO0FBeUU5QyxNQUFNLEVBQUUsR0FBd0IsU0FBUyxnQkFBZ0IsQ0FDdkQsT0FBZSxFQUNmLE9BQWdDLEVBQUUsRUFDbEMsUUFBNkM7SUFFN0MsTUFBTSxHQUFHLEdBQUcsZ0JBQ1YsVUFBVSxFQUFFLFNBQVMsRUFDckIsZ0JBQWdCLEVBQUUsSUFBSSxFQUN0QixLQUFLLEVBQUUsSUFBSSxJQUNSLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBQ0YsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JELHFCQUFxQjtJQUNyQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxDQUFDO0lBRTNELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN2QixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFELElBQUksU0FBUyxLQUFLLFdBQVc7WUFBRSxPQUFPO1FBQ3RDLE1BQU0sVUFBVSxHQUNkLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssU0FBUztZQUNuQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNqQixDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztnQkFDdkIsQ0FBQyxDQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUUsQ0FBQyxPQUFPO2dCQUN0QyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2hCLE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUM1QixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckMsT0FBTztTQUNSO1FBRUQsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzdCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxHQUFHLEdBQ0wsTUFBTSxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksT0FBTyxNQUFNLENBQUMsUUFBUSxLQUFLLFVBQVU7b0JBQ3BFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO29CQUNuQixDQUFDLENBQUMsa0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekIsdUJBQXVCO2dCQUN2QixJQUFJLE9BQU8sZUFBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7b0JBQUUsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7Z0JBQ3ZELHVCQUF1QjtnQkFDdkIsZ0JBQWdCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztZQUNILGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1NBQzVDO2FBQU07WUFDTCxnQkFBZ0I7Z0JBQ2QsVUFBVSxDQUFDLFFBQVEsS0FBSyxTQUFTO29CQUNqQyxPQUFPLFVBQVUsQ0FBQyxRQUFRLEtBQUssVUFBVTtvQkFDdkMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7b0JBQ3ZCLENBQUMsQ0FBQyxrQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdCLHVCQUF1QjtZQUN2QixJQUFJLE9BQU8sZUFBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssUUFBUTtnQkFDL0MsZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDO1NBQzlDO1FBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7SUFFSCxpQkFBaUI7SUFDakIsSUFBSSxVQUFVLEdBQUcsc0JBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFdkQsc0JBQXNCO0lBQ3RCLFVBQVUsR0FBRyxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXJDLDRCQUE0QjtJQUM1QixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFckQsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBQ0Ysa0JBQWUsRUFBRSxDQUFDIn0=