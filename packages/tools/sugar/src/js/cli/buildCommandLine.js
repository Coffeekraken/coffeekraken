// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../string/toString", "./argsToString", "../string/parse", "../string/stripAnsi"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var toString_1 = __importDefault(require("../string/toString"));
    var argsToString_1 = __importDefault(require("./argsToString"));
    var parse_1 = __importDefault(require("../string/parse"));
    var stripAnsi_1 = __importDefault(require("../string/stripAnsi"));
    var fn = function buildCommandLine(command, args, settings) {
        if (args === void 0) { args = {}; }
        var set = __assign({ definition: undefined, includeAllParams: true, alias: true }, (settings || {}));
        var definition = Object.assign({}, set.definition);
        // get all the tokens
        var tokens = command.match(/\[[a-zA-Z0-9-_]+\]/gm) || [];
        tokens.forEach(function (token) {
            var tokenName = token.replace('[', '').replace(']', '');
            if (tokenName === 'arguments')
                return;
            var tokenValue = args && args[tokenName] !== undefined
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
            var tokenValueString = '';
            if (Array.isArray(tokenValue)) {
                tokenValue.forEach(function (tValue) {
                    var str = tValue.toString !== undefined && typeof tValue.toString === 'function'
                        ? tValue.toString()
                        : toString_1.default(tValue);
                    // handle quotes or not
                    if (typeof parse_1.default(str) === 'string')
                        str = "\"" + str + "\"";
                    // append to the string
                    tokenValueString += str + " ";
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
                    tokenValueString = "\"" + tokenValueString + "\"";
            }
            command = command.replace(token, tokenValueString);
        });
        // args to string
        var argsString = argsToString_1.default(args, settings).trim();
        // sanitize the string
        argsString = stripAnsi_1.default(argsString);
        // replace the command token
        command = command.replace('[arguments]', argsString);
        return command.trim();
    };
    exports.default = fn;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRDb21tYW5kTGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1aWxkQ29tbWFuZExpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFVixnRUFBNEM7SUFDNUMsZ0VBQTRDO0lBRTVDLDBEQUFzQztJQUN0QyxrRUFBOEM7SUF5RTlDLElBQU0sRUFBRSxHQUF3QixTQUFTLGdCQUFnQixDQUN2RCxPQUFlLEVBQ2YsSUFBa0MsRUFDbEMsUUFBNkM7UUFEN0MscUJBQUEsRUFBQSxTQUFrQztRQUdsQyxJQUFNLEdBQUcsR0FBRyxXQUNWLFVBQVUsRUFBRSxTQUFTLEVBQ3JCLGdCQUFnQixFQUFFLElBQUksRUFDdEIsS0FBSyxFQUFFLElBQUksSUFDUixDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztRQUNGLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRCxxQkFBcUI7UUFDckIsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUzRCxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUNuQixJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFELElBQUksU0FBUyxLQUFLLFdBQVc7Z0JBQUUsT0FBTztZQUN0QyxJQUFNLFVBQVUsR0FDZCxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFNBQVM7Z0JBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNqQixDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztvQkFDdkIsQ0FBQyxDQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUUsQ0FBQyxPQUFPO29CQUN0QyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ2hCLE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQyxPQUFPO2FBQ1I7WUFFRCxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztZQUMxQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzdCLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO29CQUN4QixJQUFJLEdBQUcsR0FDTCxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxRQUFRLEtBQUssVUFBVTt3QkFDcEUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7d0JBQ25CLENBQUMsQ0FBQyxrQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN6Qix1QkFBdUI7b0JBQ3ZCLElBQUksT0FBTyxlQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUTt3QkFBRSxHQUFHLEdBQUcsT0FBSSxHQUFHLE9BQUcsQ0FBQztvQkFDdkQsdUJBQXVCO29CQUN2QixnQkFBZ0IsSUFBTyxHQUFHLE1BQUcsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDNUM7aUJBQU07Z0JBQ0wsZ0JBQWdCO29CQUNkLFVBQVUsQ0FBQyxRQUFRLEtBQUssU0FBUzt3QkFDakMsT0FBTyxVQUFVLENBQUMsUUFBUSxLQUFLLFVBQVU7d0JBQ3ZDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO3dCQUN2QixDQUFDLENBQUMsa0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDN0IsdUJBQXVCO2dCQUN2QixJQUFJLE9BQU8sZUFBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssUUFBUTtvQkFDL0MsZ0JBQWdCLEdBQUcsT0FBSSxnQkFBZ0IsT0FBRyxDQUFDO2FBQzlDO1lBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7UUFFSCxpQkFBaUI7UUFDakIsSUFBSSxVQUFVLEdBQUcsc0JBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdkQsc0JBQXNCO1FBQ3RCLFVBQVUsR0FBRyxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXJDLDRCQUE0QjtRQUM1QixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFckQsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0lBQ0Ysa0JBQWUsRUFBRSxDQUFDIn0=