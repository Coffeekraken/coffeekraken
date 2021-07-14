// @ts-nocheck
import __linkPackages from '../../node/monorepo/linkPackages';
export default (stringArgs = '') => {
    let individual = false;
    if (stringArgs.match(/\s?--individual\s?/) || stringArgs.match(/\s?-i\s?/))
        individual = true;
    __linkPackages({
        individual
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaW5rLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsT0FBTyxjQUFjLE1BQU0sa0NBQWtDLENBQUM7QUFFOUQsZUFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUNqQyxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDdkIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDeEUsVUFBVSxHQUFHLElBQUksQ0FBQztJQUNwQixjQUFjLENBQUM7UUFDYixVQUFVO0tBQ1gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=