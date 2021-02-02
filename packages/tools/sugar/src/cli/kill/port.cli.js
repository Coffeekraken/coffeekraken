"use strict";
const __execSync = require('child_process').execSync;
module.exports = function (stringArgs = '') {
    const port = parseInt(stringArgs.replace(/"/g, '').trim());
    let processId;
    try {
        processId = __execSync(`lsof -ti:${port}`, {
            shell: true
        });
    }
    catch (e) {
        console.log(`No process running on the port "${port}"`);
        return;
    }
    console.log(`Killing process on port "${port}"`);
    try {
        __execSync(`kill $()`);
    }
    catch (e) {
        console.log(e);
        return;
    }
    console.log('Process killed');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb3J0LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUVyRCxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsVUFBVSxHQUFHLEVBQUU7SUFDeEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFM0QsSUFBSSxTQUFTLENBQUM7SUFDZCxJQUFJO1FBQ0YsU0FBUyxHQUFHLFVBQVUsQ0FBQyxZQUFZLElBQUksRUFBRSxFQUFFO1lBQ3pDLEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLElBQUksR0FBRyxDQUFDLENBQUM7UUFDeEQsT0FBTztLQUNSO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNqRCxJQUFJO1FBQ0YsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3hCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsT0FBTztLQUNSO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQyJ9