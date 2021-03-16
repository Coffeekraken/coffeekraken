"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const __log = require('../../log/log');
const __parseError = require('./parseError');
/**
 * @name                              beautifyErrors
 * @namespace           sugar.node.dev
 * @type                              Function
 *
 * Catch the basic errors from the node process and render them to be more readable
 *
 * @example             js
 * const beautifyErrors = require('@coffeekraken/node/dev/beautifyErrors');
 * beautifyErrors();
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function beautifyErrors() {
    return;
    // catch the errors to prettify them
    ['unhandledRejection', 'uncaughtException'].forEach((e) => {
        process.on(e, (err) => __awaiter(this, void 0, void 0, function* () {
            console.log(err);
            return;
            const error = __parseError(err);
            const substract = 12;
            const columns = (process.env.STDOUT_COLUMNS || process.stdout.columns) - substract;
            let finalStack = error.stack.filter((line) => {
                if (line.filename.includes('checkArgs.js'))
                    return false;
                if (line.filename.includes('/node_modules/'))
                    return false;
                return true;
            });
            finalStack = finalStack.map((line) => {
                line.filename = line.filename.replace(process.cwd(), '');
                return line;
            });
            let message = '';
            message += '<br/>';
            message += '<br/>';
            message += '<br/>';
            message += `<bgRed>   ${' '.repeat(error.type.length)}   </bgRed>`;
            message += '<br/>';
            message += `<bgRed>   <bold>${error.type}</bold>   </bgRed>`;
            message += '<br/>';
            message += `<bgRed>   ${' '.repeat(error.type.length)}   </bgRed>`;
            message += '<br/>';
            message += '<br/>';
            message += '<br/>';
            message += error.message;
            message += '<br/>';
            message += '<br/>';
            message += '<br/>';
            finalStack.forEach((line) => {
                const formatedFunc = `<yellow>${line.function}</yellow>`;
                const formatedPath = `${line.filename}`;
                const formatedPosition = `<bold><cyan>${line.line}</cyan></bold>:<cyan>${line.row}</cyan>`;
                message += `<bold>${formatedFunc}</bold>`;
                message += '<br/>';
                message += `${formatedPath}`;
                message += '<br/>';
                message += `${formatedPosition}`;
                message += '<br/>';
                message += '<br/>';
            });
            message += '<br/>';
            message += '<br/>';
            yield __log(message, 'error');
            process.exit(0);
        }));
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVhdXRpZnlFcnJvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9kZXYvX193aXBfXy9iZWF1dGlmeUVycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN2QyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGNBQWM7SUFDdEMsT0FBTztJQUNQLG9DQUFvQztJQUNwQyxDQUFDLG9CQUFvQixFQUFFLG1CQUFtQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDeEQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBTyxHQUFHLEVBQUUsRUFBRTtZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLE9BQU87WUFFUCxNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFaEMsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sT0FBTyxHQUNYLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLENBQUM7WUFFckUsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQ3pELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQzNELE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7WUFDSCxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDekQsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUVqQixPQUFPLElBQUksT0FBTyxDQUFDO1lBQ25CLE9BQU8sSUFBSSxPQUFPLENBQUM7WUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQztZQUVuQixPQUFPLElBQUksYUFBYSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztZQUNuRSxPQUFPLElBQUksT0FBTyxDQUFDO1lBQ25CLE9BQU8sSUFBSSxtQkFBbUIsS0FBSyxDQUFDLElBQUksb0JBQW9CLENBQUM7WUFDN0QsT0FBTyxJQUFJLE9BQU8sQ0FBQztZQUNuQixPQUFPLElBQUksYUFBYSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztZQUVuRSxPQUFPLElBQUksT0FBTyxDQUFDO1lBQ25CLE9BQU8sSUFBSSxPQUFPLENBQUM7WUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQztZQUVuQixPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUV6QixPQUFPLElBQUksT0FBTyxDQUFDO1lBQ25CLE9BQU8sSUFBSSxPQUFPLENBQUM7WUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQztZQUVuQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzFCLE1BQU0sWUFBWSxHQUFHLFdBQVcsSUFBSSxDQUFDLFFBQVEsV0FBVyxDQUFDO2dCQUN6RCxNQUFNLFlBQVksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDeEMsTUFBTSxnQkFBZ0IsR0FBRyxlQUFlLElBQUksQ0FBQyxJQUFJLHdCQUF3QixJQUFJLENBQUMsR0FBRyxTQUFTLENBQUM7Z0JBRTNGLE9BQU8sSUFBSSxTQUFTLFlBQVksU0FBUyxDQUFDO2dCQUMxQyxPQUFPLElBQUksT0FBTyxDQUFDO2dCQUVuQixPQUFPLElBQUksR0FBRyxZQUFZLEVBQUUsQ0FBQztnQkFFN0IsT0FBTyxJQUFJLE9BQU8sQ0FBQztnQkFFbkIsT0FBTyxJQUFJLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDakMsT0FBTyxJQUFJLE9BQU8sQ0FBQztnQkFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxPQUFPLENBQUM7WUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQztZQUVuQixNQUFNLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==