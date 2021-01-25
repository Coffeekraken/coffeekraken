"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toString_1 = __importDefault(require("../string/toString"));
const argsToString_1 = __importDefault(require("./argsToString"));
const parse_1 = __importDefault(require("../string/parse"));
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
    const argsString = argsToString_1.default(args, settings).trim();
    command = command.replace('[arguments]', argsString);
    return command.trim();
};
exports.default = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRDb21tYW5kTGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1aWxkQ29tbWFuZExpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7Ozs7O0FBRVYsa0VBQTRDO0FBQzVDLGtFQUE0QztBQUU1Qyw0REFBc0M7QUF5RXRDLE1BQU0sRUFBRSxHQUF3QixTQUFTLGdCQUFnQixDQUN2RCxPQUFlLEVBQ2YsT0FBZ0MsRUFBRSxFQUNsQyxXQUFzQyxFQUFFO0lBRXhDLFFBQVEsbUJBQ04sVUFBVSxFQUFFLFNBQVMsRUFDckIsY0FBYyxFQUFFLElBQUksRUFDcEIsS0FBSyxFQUFFLElBQUksSUFDUixRQUFRLENBQ1osQ0FBQztJQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxRCxxQkFBcUI7SUFDckIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDdkIsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLFNBQVMsS0FBSyxXQUFXO1lBQUUsT0FBTztRQUN0QyxNQUFNLFVBQVUsR0FDZCxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFNBQVM7WUFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDakIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBTyxVQUFVLENBQUMsU0FBUyxDQUFFLENBQUMsT0FBTztnQkFDdEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNoQixPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QixJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDNUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLE9BQU87U0FDUjtRQUNELElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM3QixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQzVCLElBQUksR0FBRyxHQUNMLE1BQU0sQ0FBQyxRQUFRLEtBQUssU0FBUyxJQUFJLE9BQU8sTUFBTSxDQUFDLFFBQVEsS0FBSyxVQUFVO29CQUNwRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtvQkFDbkIsQ0FBQyxDQUFDLGtCQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pCLHVCQUF1QjtnQkFDdkIsSUFBSSxPQUFPLGVBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRO29CQUFFLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUN2RCx1QkFBdUI7Z0JBQ3ZCLGdCQUFnQixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM1QzthQUFNO1lBQ0wsZ0JBQWdCO2dCQUNkLFVBQVUsQ0FBQyxRQUFRLEtBQUssU0FBUztvQkFDakMsT0FBTyxVQUFVLENBQUMsUUFBUSxLQUFLLFVBQVU7b0JBQ3ZDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO29CQUN2QixDQUFDLENBQUMsa0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3Qix1QkFBdUI7WUFDdkIsSUFBSSxPQUFPLGVBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLFFBQVE7Z0JBQy9DLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLEdBQUcsQ0FBQztTQUM5QztRQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0lBRUgsaUJBQWlCO0lBQ2pCLE1BQU0sVUFBVSxHQUFHLHNCQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pELE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUVyRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN4QixDQUFDLENBQUM7QUFDRixrQkFBZSxFQUFFLENBQUMifQ==