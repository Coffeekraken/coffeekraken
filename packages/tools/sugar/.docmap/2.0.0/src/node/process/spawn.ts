/**
*
* @name            spawn
* @namespace            node.process
* @type            Function
* @async
* @platform        ts
* @platform        node
* @status          wip
*
* This function allows you to spawn a new child process just like the native ```spawn``` node function
* but add the support for SEventEmitter communication layers
*
* @param       {String}          command         The command to spawn
* @param       {String[]}        [args=[]]       Some string arguments to use in the command
* @param       {ISpawnSettings}    [settings={}]     An object of settings to configure your spawn process
* @return      {SPromise}                        An SPromise instance that will be resolved or rejected with the command result, and listen for some "events" emited like "close", etc...
*
* @setting     {Any}           ...SpawnOptions     All the supported ```spawn``` options. see: https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
*
* @event       data        emited when some data have been pushed in the child process like console.log, etc...
* @event       error       emited when an error has occured in the child process
* @event       close       emited when the child process has been closed for whatever reason
* @event       close.error     emited when the child process has been closed due to an error
* @event       close.cancel      emited when the child process has been closed due to the call of the ```cancel``` method
* @event       close.kill      emited when the child process has been closed due to a kill call
* @event       close.success   emited when the child process has been closed after a successfull execution
*
* @example       js
* import spawn from '@coffeekraken/sugar/node/process/spawn';
* const pro = spawn('echo "hello world");
* pro.on('close', () => {
*   console.log('closed');
* });
* console.log(await pro);
*
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/