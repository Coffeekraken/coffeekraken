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
        define(["require", "exports", "../string/toString", "./argsToString", "../string/parse"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var toString_1 = __importDefault(require("../string/toString"));
    var argsToString_1 = __importDefault(require("./argsToString"));
    var parse_1 = __importDefault(require("../string/parse"));
    var fn = function buildCommandLine(command, args, settings) {
        if (args === void 0) { args = {}; }
        if (settings === void 0) { settings = {}; }
        settings = __assign({ definition: undefined, includeAllArgs: true, alias: true }, settings);
        var definition = Object.assign({}, settings.definition);
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
        command = command.replace('[arguments]', argsString);
        return command.trim();
    };
    exports.default = fn;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRDb21tYW5kTGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1aWxkQ29tbWFuZExpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFVixnRUFBNEM7SUFDNUMsZ0VBQTRDO0lBRTVDLDBEQUFzQztJQXlFdEMsSUFBTSxFQUFFLEdBQXdCLFNBQVMsZ0JBQWdCLENBQ3ZELE9BQWUsRUFDZixJQUFrQyxFQUNsQyxRQUF3QztRQUR4QyxxQkFBQSxFQUFBLFNBQWtDO1FBQ2xDLHlCQUFBLEVBQUEsYUFBd0M7UUFFeEMsUUFBUSxjQUNOLFVBQVUsRUFBRSxTQUFTLEVBQ3JCLGNBQWMsRUFBRSxJQUFJLEVBQ3BCLEtBQUssRUFBRSxJQUFJLElBQ1IsUUFBUSxDQUNaLENBQUM7UUFDRixJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUQscUJBQXFCO1FBQ3JCLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7WUFDbkIsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMxRCxJQUFJLFNBQVMsS0FBSyxXQUFXO2dCQUFFLE9BQU87WUFDdEMsSUFBTSxVQUFVLEdBQ2QsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxTQUFTO2dCQUNuQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDakIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7b0JBQ3ZCLENBQUMsQ0FBTyxVQUFVLENBQUMsU0FBUyxDQUFFLENBQUMsT0FBTztvQkFDdEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNoQixPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QixJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7Z0JBQzVCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDckMsT0FBTzthQUNSO1lBQ0QsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDMUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM3QixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTTtvQkFDeEIsSUFBSSxHQUFHLEdBQ0wsTUFBTSxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksT0FBTyxNQUFNLENBQUMsUUFBUSxLQUFLLFVBQVU7d0JBQ3BFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO3dCQUNuQixDQUFDLENBQUMsa0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDekIsdUJBQXVCO29CQUN2QixJQUFJLE9BQU8sZUFBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7d0JBQUUsR0FBRyxHQUFHLE9BQUksR0FBRyxPQUFHLENBQUM7b0JBQ3ZELHVCQUF1QjtvQkFDdkIsZ0JBQWdCLElBQU8sR0FBRyxNQUFHLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFDO2dCQUNILGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO2FBQzVDO2lCQUFNO2dCQUNMLGdCQUFnQjtvQkFDZCxVQUFVLENBQUMsUUFBUSxLQUFLLFNBQVM7d0JBQ2pDLE9BQU8sVUFBVSxDQUFDLFFBQVEsS0FBSyxVQUFVO3dCQUN2QyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTt3QkFDdkIsQ0FBQyxDQUFDLGtCQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzdCLHVCQUF1QjtnQkFDdkIsSUFBSSxPQUFPLGVBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLFFBQVE7b0JBQy9DLGdCQUFnQixHQUFHLE9BQUksZ0JBQWdCLE9BQUcsQ0FBQzthQUM5QztZQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCO1FBQ2pCLElBQU0sVUFBVSxHQUFHLHNCQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pELE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVyRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDLENBQUM7SUFDRixrQkFBZSxFQUFFLENBQUMifQ==