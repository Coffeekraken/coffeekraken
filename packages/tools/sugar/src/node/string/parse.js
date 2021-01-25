"use strict";
// @ts-nocheck
// @shared
module.exports = (value) => {
    if (typeof value !== 'string')
        return value;
    value = value.split('⠀').join('').trim();
    try {
        return Function(`
      "use strict";
      return (${value});
    `)();
    }
    catch (e) {
        return value;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7QUF3QlYsaUJBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUNqQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUM1QyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekMsSUFBSTtRQUNGLE9BQU8sUUFBUSxDQUFDOztnQkFFSixLQUFLO0tBQ2hCLENBQUMsRUFBRSxDQUFDO0tBQ047SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDLENBQUMifQ==