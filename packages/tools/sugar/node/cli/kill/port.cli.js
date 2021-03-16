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
        __execSync(`kill ${processId}`);
    }
    catch (e) {
        console.log(e);
        return;
    }
    console.log('Process killed');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL2tpbGwvcG9ydC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFFckQsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLFVBQVUsR0FBRyxFQUFFO0lBQ3hDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRTNELElBQUksU0FBUyxDQUFDO0lBQ2QsSUFBSTtRQUNGLFNBQVMsR0FBRyxVQUFVLENBQUMsWUFBWSxJQUFJLEVBQUUsRUFBRTtZQUN6QyxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ3hELE9BQU87S0FDUjtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLElBQUksR0FBRyxDQUFDLENBQUM7SUFDakQsSUFBSTtRQUNGLFVBQVUsQ0FBQyxRQUFRLFNBQVMsRUFBRSxDQUFDLENBQUM7S0FDakM7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixPQUFPO0tBQ1I7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDIn0=