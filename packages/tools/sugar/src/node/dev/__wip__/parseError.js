"use strict";
// @ts-nocheck
/**
 * @name                                  parseError
 * @namespace           sugar.node.dev
 * @type                                  Function
 *
 * Parse an error throwed in the terminal and return a nicely formated object like this:
 * {
 *    filename: 'something/cool.js',
 *    message: 'Something cool has appened in the terminal...',
 *    type: 'Error',
 *    line: 65,
 *    row: 23,
 *    stack: [{
 *      filename: 'something.cool.js',
 *      function: 'parseError',
 *      line: 65,
 *      row: 23
 *    }, {
 *      filename: 'other/thing.js',
 *      function: 'require',
 *      line: 30,
 *      row: 18
 *    }]
 * }
 *
 * @param             {Error}                error              The error to parse
 * @return            {Object}                                  A nicely formated object of the error
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function parseError(error) {
    const message = error.message;
    let stackTrace = error.stack.split(/\s{4}at\s/);
    stackTrace.shift();
    error = error.toString();
    error = error.split('\n').join('').replace(/\s+/g, ' ');
    const type = error.match(/([a-zA-Z0-9\s]+):/)[1];
    // let stackArray = stackString.split('    at ');
    // stackArray.shift();
    stackTrace = stackTrace.map((s) => {
        s = s.replace('\n', '').trim();
        let func = s.match(/([\s\S]+)\(/);
        func = func ? func[1] : '';
        let path = s.match(/\(([\s\S]+):[0-9]+:[0-9]+\)/);
        path = path ? path[1] : '';
        let lines = s.match(/[\s\S]+:([0-9]+:[0-9]+)\)$/);
        lines = lines ? lines[1] : '';
        if (!func || !path || !lines)
            return false;
        return {
            function: func,
            filename: path,
            line: lines.split(':')[0],
            row: lines.split(':')[1]
        };
    });
    stackTrace = stackTrace.filter((s) => {
        if (!s)
            return false;
        return true;
    });
    if (!stackTrace || !stackTrace[0]) {
        stackTrace = [
            {
                filename: 'Anonymous',
                message: '...',
                type: 'Error',
                line: 0,
                row: 0,
                stack: []
            }
        ];
    }
    return {
        filename: stackTrace[0].filename ? stackTrace[0].filename : '',
        message: message.split('\n').join('').replace(/\s+/g, ' ').trim(),
        type: type,
        line: stackTrace[0].line ? stackTrace[0].line : '',
        row: stackTrace[0].row ? stackTrace[0].row : '',
        stack: stackTrace
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhcnNlRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVSxDQUFDLEtBQUs7SUFDeEMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUU5QixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRCxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFbkIsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUV4RCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakQsaURBQWlEO0lBQ2pELHNCQUFzQjtJQUN0QixVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ2hDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUvQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUNsRCxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMzQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDbEQsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFOUIsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUUzQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixHQUFHLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2pDLFVBQVUsR0FBRztZQUNYO2dCQUNFLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixPQUFPLEVBQUUsS0FBSztnQkFDZCxJQUFJLEVBQUUsT0FBTztnQkFDYixJQUFJLEVBQUUsQ0FBQztnQkFDUCxHQUFHLEVBQUUsQ0FBQztnQkFDTixLQUFLLEVBQUUsRUFBRTthQUNWO1NBQ0YsQ0FBQztLQUNIO0lBRUQsT0FBTztRQUNMLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzlELE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtRQUNqRSxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2xELEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQy9DLEtBQUssRUFBRSxVQUFVO0tBQ2xCLENBQUM7QUFDSixDQUFDLENBQUMifQ==