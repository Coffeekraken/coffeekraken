export default async function interactiveKill({ emit, ask, exec }) {
    
    let res;

    res = await ask({
        type: 'select',
        message: 'How would you like to kill your process?',
        choices: ['by id','by port']
    });

    let command;

    switch(res) {
        case 'by id':
            res = await ask({
                type: 'input',
                 validate(...args) {
                    if (!args[0].match(/^[0-9]+$/)) return `Process id must be an integer`;
                    return true;
                }
            });
            
            command = `sugar process.kill --id ${res}`;
            emit('log', {
                value: `> Running command: <yellow>${command}</yellow>`
            });
            exec(command);
        break;
        case 'by port':
            res = await ask({
                type: 'input',
                message: 'Specify the port on which the process you want to kill is running',
                validate(...args) {
                    if (!args[0].match(/^[0-9]+$/)) return `Process id must be an integer`;
                    return true;
                }
            });
            command = `sugar process.kill --port ${res}`;
            emit('log', {
                value: `> Running command: <yellow>${command}</yellow>`
            });
            exec(command);
        break;
    }
}