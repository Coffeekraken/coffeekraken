import * as Enquirer from 'enquirer';

export default async function interactiveKill({ log, exec }) {
    
   
    let prompt = new Enquirer.default.Select({
      message: 'How would you like to kill your process?',
      choices: ['by id','by port']
    });
    let res = await prompt.run();

    let command;

    switch(res) {
        case 'by id':
            prompt = new Enquirer.default.Input({
                message: 'Specify the process id you want to kill',
                validate(...args) {
                    if (!args[0].match(/^[0-9]+$/)) return `Process id must be an integer`;
                    return true;
                }
            });
            res = await prompt.run();
            command = `sugar process.kill --id ${res}`;
            log(`> Running command: <yellow>${command}</yellow>`);
            exec(command);
        break;
        case 'by port':
            prompt = new Enquirer.default.Input({
                message: 'Specify the port on which the process you want to kill is running',
                validate(...args) {
                    if (!args[0].match(/^[0-9]+$/)) return `Process id must be an integer`;
                    return true;
                }
            });
            res = await prompt.run();
            command = `sugar process.kill --port ${res}`;
            log(`> Running command: <yellow>${command}</yellow>`);
            exec(command);
        break;
    }
}