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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRDb21tYW5kTGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1aWxkQ29tbWFuZExpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSxrRUFBNEM7SUFDNUMsa0VBQTRDO0lBRTVDLDREQUFzQztJQUN0QyxvRUFBOEM7SUF5RTlDLE1BQU0sRUFBRSxHQUF3QixTQUFTLGdCQUFnQixDQUN2RCxPQUFlLEVBQ2YsT0FBZ0MsRUFBRSxFQUNsQyxRQUE2QztRQUU3QyxNQUFNLEdBQUcsR0FBRyxnQkFDVixVQUFVLEVBQUUsU0FBUyxFQUNyQixnQkFBZ0IsRUFBRSxJQUFJLEVBQ3RCLEtBQUssRUFBRSxJQUFJLElBQ1IsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7UUFDRixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckQscUJBQXFCO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFM0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3ZCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDMUQsSUFBSSxTQUFTLEtBQUssV0FBVztnQkFBRSxPQUFPO1lBQ3RDLE1BQU0sVUFBVSxHQUNkLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssU0FBUztnQkFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO29CQUN2QixDQUFDLENBQU8sVUFBVSxDQUFDLFNBQVMsQ0FBRSxDQUFDLE9BQU87b0JBQ3RDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDaEIsT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO2dCQUM1QixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3JDLE9BQU87YUFDUjtZQUVELElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1lBQzFCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDN0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUM1QixJQUFJLEdBQUcsR0FDTCxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxRQUFRLEtBQUssVUFBVTt3QkFDcEUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7d0JBQ25CLENBQUMsQ0FBQyxrQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN6Qix1QkFBdUI7b0JBQ3ZCLElBQUksT0FBTyxlQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUTt3QkFBRSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztvQkFDdkQsdUJBQXVCO29CQUN2QixnQkFBZ0IsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUNoQyxDQUFDLENBQUMsQ0FBQztnQkFDSCxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUM1QztpQkFBTTtnQkFDTCxnQkFBZ0I7b0JBQ2QsVUFBVSxDQUFDLFFBQVEsS0FBSyxTQUFTO3dCQUNqQyxPQUFPLFVBQVUsQ0FBQyxRQUFRLEtBQUssVUFBVTt3QkFDdkMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7d0JBQ3ZCLENBQUMsQ0FBQyxrQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM3Qix1QkFBdUI7Z0JBQ3ZCLElBQUksT0FBTyxlQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxRQUFRO29CQUMvQyxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixHQUFHLENBQUM7YUFDOUM7WUFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztRQUVILGlCQUFpQjtRQUNqQixJQUFJLFVBQVUsR0FBRyxzQkFBYyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV2RCxzQkFBc0I7UUFDdEIsVUFBVSxHQUFHLG1CQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFckMsNEJBQTRCO1FBQzVCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVyRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDLENBQUM7SUFDRixrQkFBZSxFQUFFLENBQUMifQ==