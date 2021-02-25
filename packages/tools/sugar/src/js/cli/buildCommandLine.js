// @shared
import __toString from '../string/toString';
import __argsToString from './argsToString';
import __parse from '../string/parse';
import __stripAnsi from '../string/stripAnsi';
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
                    : __toString(tValue);
                // handle quotes or not
                if (typeof __parse(str) === 'string')
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
                    : __toString(tokenValue);
            // handle quotes or not
            if (typeof __parse(tokenValueString) === 'string')
                tokenValueString = `"${tokenValueString}"`;
        }
        command = command.replace(token, tokenValueString);
    });
    // args to string
    let argsString = __argsToString(args, settings).trim();
    // sanitize the string
    argsString = __stripAnsi(argsString);
    // replace the command token
    command = command.replace('[arguments]', argsString);
    return command.trim();
};
export default fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRDb21tYW5kTGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1aWxkQ29tbWFuZExpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTtBQUVWLE9BQU8sVUFBVSxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sY0FBYyxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE9BQU8sT0FBTyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBeUU5QyxNQUFNLEVBQUUsR0FBd0IsU0FBUyxnQkFBZ0IsQ0FDdkQsT0FBZSxFQUNmLE9BQWdDLEVBQUUsRUFDbEMsV0FBc0MsRUFBRTtJQUV4QyxRQUFRLG1CQUNOLFVBQVUsRUFBRSxTQUFTLEVBQ3JCLGNBQWMsRUFBRSxJQUFJLEVBQ3BCLEtBQUssRUFBRSxJQUFJLElBQ1IsUUFBUSxDQUNaLENBQUM7SUFDRixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUQscUJBQXFCO0lBQ3JCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFM0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3ZCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUQsSUFBSSxTQUFTLEtBQUssV0FBVztZQUFFLE9BQU87UUFDdEMsTUFBTSxVQUFVLEdBQ2QsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxTQUFTO1lBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2dCQUN2QixDQUFDLENBQU8sVUFBVSxDQUFDLFNBQVMsQ0FBRSxDQUFDLE9BQU87Z0JBQ3RDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDaEIsT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQzVCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNyQyxPQUFPO1NBQ1I7UUFFRCxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDN0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUM1QixJQUFJLEdBQUcsR0FDTCxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxRQUFRLEtBQUssVUFBVTtvQkFDcEUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7b0JBQ25CLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pCLHVCQUF1QjtnQkFDdkIsSUFBSSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRO29CQUFFLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUN2RCx1QkFBdUI7Z0JBQ3ZCLGdCQUFnQixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM1QzthQUFNO1lBQ0wsZ0JBQWdCO2dCQUNkLFVBQVUsQ0FBQyxRQUFRLEtBQUssU0FBUztvQkFDakMsT0FBTyxVQUFVLENBQUMsUUFBUSxLQUFLLFVBQVU7b0JBQ3ZDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO29CQUN2QixDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdCLHVCQUF1QjtZQUN2QixJQUFJLE9BQU8sT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssUUFBUTtnQkFDL0MsZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDO1NBQzlDO1FBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7SUFFSCxpQkFBaUI7SUFDakIsSUFBSSxVQUFVLEdBQUcsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUV2RCxzQkFBc0I7SUFDdEIsVUFBVSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVyQyw0QkFBNEI7SUFDNUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRXJELE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUNGLGVBQWUsRUFBRSxDQUFDIn0=