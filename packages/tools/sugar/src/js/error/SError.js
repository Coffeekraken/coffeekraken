// @ts-nocheck
// @shared
import __parseHtml from '../console/parseHtml';
import __trimLines from '../string/trimLines.js';
import __packageRoot from '../path/packageRoot';
import __toString from '../string/toString';
/**
 * @todo      interface
 * @todo      doc
 * @todo      tests
 */
export default class SError extends Error {
    constructor(messageOrError) {
        let stack, message, originalMessage;
        if (messageOrError instanceof Error) {
            stack = messageOrError.stack;
            message = messageOrError.message;
        }
        else if (typeof messageOrError === 'string') {
            message = messageOrError;
        }
        originalMessage = message;
        if (typeof message !== 'string') {
            if (Array.isArray(message)) {
                message = message.join('\n');
            }
            else {
                message = __toString(message);
            }
        }
        // filter message for integrated stack
        message = message
            .split('\n')
            .filter((line) => {
            if (line.trim().slice(0, 10) === 'Thrown at:')
                return false;
            if (line.trim().slice(0, 3) === 'at ')
                return false;
            return true;
        })
            .join('\n');
        super(message);
        // if (Error && Error.captureStackTrace) {
        //   Error.captureStackTrace(this, this.constructor);
        // }
        let stackArray = [], finalStackArray = [];
        const packageRoot = __packageRoot();
        if (stack) {
            stackArray = stack.split('\n').slice(1);
            stackArray
                .filter((l) => {
                if (l.trim() === 'Error')
                    return false;
                if (l.trim() === '')
                    return false;
                return true;
            })
                .map((l) => {
                l = l.trim();
                l = l
                    .replace(/at\s(.*)\(([a-zA-Z0-9\/-_\.]+:[0-9]{1,10}:[0-9]{1,10})\)$/, '\n<cyan>|</cyan> <magenta>$1</magenta>\n<cyan>|</cyan> <cyan>$2</cyan>')
                    .replace(`${__packageRoot(process.cwd(), true)}/`, '');
                if (l.match(/^at\s/)) {
                    l = `\n<cyan>|</cyan> <cyan>${l.replace('at ', '')}</cyan>`;
                }
                if (l.match(/^->/)) {
                    l = `\n<yellow>|---></yellow><yellow>${l.replace('-> ', '')}</yellow>`;
                }
                return l;
            })
                .forEach((l) => {
                if (l.trim() === '')
                    return;
                finalStackArray.push(l);
            });
        }
        this.name = '';
        this.message = __trimLines(__parseHtml(`
      <red><underline>${this.name || this.constructor.name}</underline></red>

      ${message}

      ${finalStackArray.join('')}
    `));
        this.stack = null;
        this.code = null;
        // let displayed = false;
        // Object.defineProperty(this, 'stack', {
        //   get: function () {
        //     if (displayed) return '';
        //     displayed = true;
        //     return this.message;
        //   },
        //   set: function (value) {
        //     this._stack = value;
        //   }
        // });
        // this.stack = __trimLines(__parseHtml(stack.join('')));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Vycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxXQUFXLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxXQUFXLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxVQUFVLE1BQU0sb0JBQW9CLENBQUM7QUFFNUM7Ozs7R0FJRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLEtBQUs7SUFDdkMsWUFBWSxjQUFjO1FBQ3hCLElBQUksS0FBSyxFQUFFLE9BQU8sRUFBRSxlQUFlLENBQUM7UUFFcEMsSUFBSSxjQUFjLFlBQVksS0FBSyxFQUFFO1lBQ25DLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO1lBQzdCLE9BQU8sR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDO1NBQ2xDO2FBQU0sSUFBSSxPQUFPLGNBQWMsS0FBSyxRQUFRLEVBQUU7WUFDN0MsT0FBTyxHQUFHLGNBQWMsQ0FBQztTQUMxQjtRQUNELGVBQWUsR0FBRyxPQUFPLENBQUM7UUFFMUIsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMxQixPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM5QjtpQkFBTTtnQkFDTCxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQy9CO1NBQ0Y7UUFFRCxzQ0FBc0M7UUFDdEMsT0FBTyxHQUFHLE9BQU87YUFDZCxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ1gsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDZixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLFlBQVk7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDNUQsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQ3BELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsMENBQTBDO1FBQzFDLHFEQUFxRDtRQUNyRCxJQUFJO1FBRUosSUFBSSxVQUFVLEdBQUcsRUFBRSxFQUNqQixlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sV0FBVyxHQUFHLGFBQWEsRUFBRSxDQUFDO1FBQ3BDLElBQUksS0FBSyxFQUFFO1lBQ1QsVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLFVBQVU7aUJBQ1AsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssT0FBTztvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDdkMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDbEMsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDLENBQUM7aUJBQ0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFYixDQUFDLEdBQUcsQ0FBQztxQkFDRixPQUFPLENBQ04sMkRBQTJELEVBQzNELHdFQUF3RSxDQUN6RTtxQkFDQSxPQUFPLENBQUMsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRXpELElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDcEIsQ0FBQyxHQUFHLDBCQUEwQixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDO2lCQUM3RDtnQkFDRCxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ2xCLENBQUMsR0FBRyxtQ0FBbUMsQ0FBQyxDQUFDLE9BQU8sQ0FDOUMsS0FBSyxFQUNMLEVBQUUsQ0FDSCxXQUFXLENBQUM7aUJBQ2Q7Z0JBRUQsT0FBTyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUM7aUJBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtvQkFBRSxPQUFPO2dCQUM1QixlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUN4QixXQUFXLENBQUM7d0JBQ00sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7O1FBRWxELE9BQU87O1FBRVAsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDM0IsQ0FBQyxDQUNELENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQix5QkFBeUI7UUFDekIseUNBQXlDO1FBQ3pDLHVCQUF1QjtRQUN2QixnQ0FBZ0M7UUFDaEMsd0JBQXdCO1FBQ3hCLDJCQUEyQjtRQUMzQixPQUFPO1FBQ1AsNEJBQTRCO1FBQzVCLDJCQUEyQjtRQUMzQixNQUFNO1FBQ04sTUFBTTtRQUNOLHlEQUF5RDtJQUMzRCxDQUFDO0NBQ0YifQ==